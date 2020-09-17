import { NgZone } from '@angular/core';
import { invariant } from './invariant';
import { Subscription, ReplaySubject, BehaviorSubject } from 'rxjs';
import { TYPE_DYNAMIC } from '../tokens';
import { take, map, distinctUntilChanged, switchMapTo } from 'rxjs/operators';
import { areCollectsEqual } from '../utils/areCollectsEqual';
import { scheduleMicroTaskAfter } from './scheduleMicroTaskAfter';
export class Connection {
    constructor(factoryArgs, manager, skyhookZone, initialType) {
        this.factoryArgs = factoryArgs;
        this.manager = manager;
        this.skyhookZone = skyhookZone;
        /** A subject basically used to kick off any observables waiting for a type to be set via setType/setTypes */
        this.resolvedType$ = new ReplaySubject(1);
        /**
         * This one lives exactly as long as the connection.
         * It is responsible for disposing of the handlerConnector, and any internal listen() subscriptions.
         */
        this.subscriptionConnectionLifetime = new Subscription();
        this.onUpdate = () => {
            this.handlerConnector.reconnect();
        };
        this.handleChange = () => {
            this.collector$.next(this.handlerMonitor);
        };
        invariant(typeof manager === 'object', 
        // TODO: update this mini-documentation
        'Could not find the drag and drop manager in the context of %s. ' +
            'Make sure to wrap the top-level component of your app with DragDropContext. '
        // tslint:disable-next-line:max-line-length
        // 'Read more: ',
        );
        NgZone.assertNotInAngularZone();
        this.handlerMonitor = this.factoryArgs.createMonitor(this.manager);
        this.collector$ = new BehaviorSubject(this.handlerMonitor);
        this.handler = this.factoryArgs.createHandler(this.handlerMonitor);
        this.handlerConnector = this.factoryArgs.createConnector(this.manager.getBackend());
        // handlerConnector lives longer than any per-type subscription
        this.subscriptionConnectionLifetime.add(() => this.handlerConnector.receiveHandlerId(null));
        if (initialType && initialType !== TYPE_DYNAMIC) {
            this.setTypes(initialType);
        }
    }
    listen(mapFn) {
        // Listeners are generally around as long as the connection.
        // This isn't 100% true, but there is no way of knowing (even if you ref-count it)
        // when a component no longer needs it.
        return this.resolvedType$.pipe(
        // this ensures we don't start emitting values until there is a type resolved
        take(1), 
        // switch our attention to the incoming firehose of 'something changed' events
        switchMapTo(this.collector$), 
        // turn them into 'interesting state' via the monitor and a user-provided function
        map(mapFn), 
        // don't emit EVERY time the firehose says something changed, only when the interesting state changes
        distinctUntilChanged(areCollectsEqual), 
        // this schedules a single batch change detection run after all the listeners have heard their newest value
        // thus all changes resulting from subscriptions to this are caught by the
        // change detector.
        scheduleMicroTaskAfter(this.skyhookZone, this.onUpdate));
    }
    connect(fn) {
        const subscription = this.resolvedType$.pipe(take(1)).subscribe(() => {
            // must run inside skyhookZone, so things like timers firing after a long hover with touch backend
            // will cause change detection (via executing a macro or event task)
            this.skyhookZone.run(() => {
                fn(this.handlerConnector.hooks);
            });
        });
        // now chain this onto the connection's unsubscribe call.
        // just in case you destroy your component before setting a type on anything
        // i.e.:
        // conn without a type
        //     source = this.dnd.dragSource(null, { ... })
        // manually connect to the DOM, which won't handle the returned subscription like the directive does
        //     ngAfterViewInit() { this.source.connectDragSource(this.myDiv.nativeElement); }
        // never set a type
        // then destroy your component, the source, but not the connection request.
        //     ngOnDestroy() { this.source.unsubscribe(); }
        //
        // without this, you would have a hanging resolvedType$.pipe(take(1)) subscription
        // with this, it dies with the source's unsubscribe call.
        //
        // doesn't need this.subscriptionTypeLifetime, because pipe(take(1)) already does that
        this.subscriptionConnectionLifetime.add(subscription);
        return subscription;
    }
    connectDropTarget(node) {
        return this.connect(c => c.dropTarget(node));
    }
    connectDragSource(node, options) {
        return this.connect(c => c.dragSource(node, options));
    }
    connectDragPreview(node, options) {
        return this.connect(c => c.dragPreview(node, options));
    }
    setTypes(type) {
        // must run inside skyhookZone, so things like timers firing after a long hover with touch backend
        // will cause change detection (via executing a macro or event task)
        this.skyhookZone.run(() => {
            this.receiveType(type);
            this.resolvedType$.next(1);
        });
    }
    setType(type) {
        this.setTypes(type);
    }
    getHandlerId() {
        return this.handlerId;
    }
    receiveType(type) {
        if (type === this.currentType) {
            return;
        }
        NgZone.assertNotInAngularZone();
        this.currentType = type;
        if (this.subscriptionTypeLifetime) {
            this.subscriptionTypeLifetime.unsubscribe();
        }
        // console.debug('subscribed to ' + type.toString());
        this.subscriptionTypeLifetime = new Subscription();
        const { handlerId, unregister } = this.factoryArgs.registerHandler(type, this.handler, this.manager);
        this.handlerId = handlerId;
        this.handlerMonitor.receiveHandlerId(handlerId);
        this.handlerConnector.receiveHandlerId(handlerId);
        const globalMonitor = this.manager.getMonitor();
        const unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, { handlerIds: [handlerId] });
        this.subscriptionTypeLifetime.add(unsubscribe);
        this.subscriptionTypeLifetime.add(unregister);
        // this.subscriptionTypeLifetime.add(() => console.debug("unsubscribed from " + type.toString()));
    }
    unsubscribe() {
        if (this.subscriptionTypeLifetime) {
            this.subscriptionTypeLifetime.unsubscribe();
        }
        this.subscriptionConnectionLifetime.unsubscribe();
    }
    add(teardown) {
        return this.subscriptionConnectionLifetime.add(teardown);
    }
    get closed() {
        return (this.subscriptionConnectionLifetime &&
            this.subscriptionConnectionLifetime.closed);
    }
}
export const TargetConnection = Connection;
export const SourceConnection = Connection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9jb3JlL3NyYy9saWIvaW50ZXJuYWwvY29ubmVjdGlvbi1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV4QyxPQUFPLEVBQ0gsWUFBWSxFQUVaLGFBQWEsRUFDYixlQUFlLEVBRWxCLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV6QyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVk3RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWtCbEUsTUFBTSxPQUFPLFVBQVU7SUE0Qm5CLFlBQ1ksV0FBOEMsRUFDOUMsT0FBd0IsRUFDeEIsV0FBaUIsRUFDekIsV0FBd0M7UUFIaEMsZ0JBQVcsR0FBWCxXQUFXLENBQW1DO1FBQzlDLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFNO1FBdkI3Qiw2R0FBNkc7UUFDNUYsa0JBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBTSxDQUFDLENBQUMsQ0FBQztRQWEzRDs7O1dBR0c7UUFDSyxtQ0FBOEIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBc0RwRCxhQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUM7UUEwR00saUJBQVksR0FBRyxHQUFHLEVBQUU7WUFD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WUFDbkMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLE1BQU0sQ0FDN0MsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQW1CRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxVQUErQixDQUFDO0FBQ2hFLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLFVBQStCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYWNrZW5kLCBEcmFnRHJvcE1hbmFnZXIgfSBmcm9tICdkbmQtY29yZSc7XG5pbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGludmFyaWFudCB9IGZyb20gJy4vaW52YXJpYW50JztcbmltcG9ydCB7IFR5cGVPclR5cGVBcnJheSB9IGZyb20gJy4uL3R5cGUtaXNoJztcbmltcG9ydCB7XG4gICAgU3Vic2NyaXB0aW9uLFxuICAgIE9ic2VydmFibGUsXG4gICAgUmVwbGF5U3ViamVjdCxcbiAgICBCZWhhdmlvclN1YmplY3QsXG4gICAgVGVhcmRvd25Mb2dpY1xufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRZUEVfRFlOQU1JQyB9IGZyb20gJy4uL3Rva2Vucyc7XG5cbmltcG9ydCB7IHRha2UsIG1hcCwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcFRvIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBhcmVDb2xsZWN0c0VxdWFsIH0gZnJvbSAnLi4vdXRpbHMvYXJlQ29sbGVjdHNFcXVhbCc7XG5cbmltcG9ydCB7IERyb3BUYXJnZXRNb25pdG9yIH0gZnJvbSAnLi4vdGFyZ2V0LW1vbml0b3InO1xuaW1wb3J0IHsgRHJhZ1NvdXJjZU1vbml0b3IgfSBmcm9tICcuLi9zb3VyY2UtbW9uaXRvcic7XG5pbXBvcnQgKiBhcyB0IGZyb20gJy4uL2Nvbm5lY3Rpb24tdHlwZXMnO1xuaW1wb3J0IHtcbiAgICBEcm9wVGFyZ2V0Q29ubmVjdG9yLFxuICAgIERyYWdTb3VyY2VDb25uZWN0b3IsXG4gICAgRHJhZ1NvdXJjZU9wdGlvbnMsXG4gICAgRHJhZ1ByZXZpZXdPcHRpb25zXG59IGZyb20gJy4uL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSAnLi9jcmVhdGVTb3VyY2VDb25uZWN0b3InO1xuaW1wb3J0IHsgc2NoZWR1bGVNaWNyb1Rhc2tBZnRlciB9IGZyb20gJy4vc2NoZWR1bGVNaWNyb1Rhc2tBZnRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjdG9yeUFyZ3M8VE1vbml0b3IsIFRDb25uZWN0b3I+IHtcbiAgICBjcmVhdGVIYW5kbGVyOiAoaGFuZGxlck1vbml0b3I6IGFueSkgPT4gYW55O1xuICAgIGNyZWF0ZU1vbml0b3I6IChtYW5hZ2VyOiBEcmFnRHJvcE1hbmFnZXIpID0+IFRNb25pdG9yO1xuICAgIGNyZWF0ZUNvbm5lY3RvcjogKFxuICAgICAgICBiYWNrZW5kOiBCYWNrZW5kXG4gICAgKSA9PiBDb25uZWN0b3I8VENvbm5lY3Rvcj47XG4gICAgcmVnaXN0ZXJIYW5kbGVyOiAoXG4gICAgICAgIHR5cGU6IGFueSxcbiAgICAgICAgaGFuZGxlcjogYW55LFxuICAgICAgICBtYW5hZ2VyOiBEcmFnRHJvcE1hbmFnZXJcbiAgICApID0+IHtcbiAgICAgICAgaGFuZGxlcklkOiBhbnk7XG4gICAgICAgIHVucmVnaXN0ZXI6IFN1YnNjcmlwdGlvbiB8IEZ1bmN0aW9uO1xuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uPFRNb25pdG9yIGV4dGVuZHMgRHJhZ1NvdXJjZU1vbml0b3IgfCBEcm9wVGFyZ2V0TW9uaXRvciwgVENvbm5lY3Rvcj4ge1xuICAgIC8vIGltbXV0YWJsZSBhZnRlciBpbnN0YW50aWF0aW9uXG4gICAgcHJpdmF0ZSByZWFkb25seSBoYW5kbGVyTW9uaXRvcjogYW55O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaGFuZGxlckNvbm5lY3RvcjogQ29ubmVjdG9yPFRDb25uZWN0b3I+O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaGFuZGxlcjogYW55O1xuXG4gICAgLyoqIFRoZSBzdHJlYW0gb2YgYWxsIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgaW50ZXJuYWwgc3Vic2NyaXB0aW9uJ3MgaGFuZGxlQ2hhbmdlICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2xsZWN0b3IkOiBCZWhhdmlvclN1YmplY3Q8VE1vbml0b3I+O1xuICAgIC8qKiBBIHN1YmplY3QgYmFzaWNhbGx5IHVzZWQgdG8ga2ljayBvZmYgYW55IG9ic2VydmFibGVzIHdhaXRpbmcgZm9yIGEgdHlwZSB0byBiZSBzZXQgdmlhIHNldFR5cGUvc2V0VHlwZXMgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc29sdmVkVHlwZSQgPSBuZXcgUmVwbGF5U3ViamVjdDxhbnk+KDEpO1xuXG4gICAgLy8gbXV0YWJsZSBzdGF0ZVxuICAgIHByaXZhdGUgY3VycmVudFR5cGU/OiBUeXBlT3JUeXBlQXJyYXk7XG4gICAgcHJpdmF0ZSBoYW5kbGVySWQ6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgb25lIGlzIGNyZWF0ZWQgYW5kIGRlc3Ryb3llZCBvbmNlIHBlciB0eXBlIG9yIGxpc3Qgb2YgdHlwZXMuXG4gICAgICogQmVjYXVzZSBlYWNoIHRpbWUgd2UgY2hhbmdlIHRoZSB0eXBlLCB3ZSB1bnN1YnNjcmliZSBmcm9tIHRoZSBnbG9iYWwgc3RhdGUgc3RvcmFnZSBhbmRcbiAgICAgKiByZS1zdWJzY3JpYmUgd2l0aCB0aGUgbmV3IHR5cGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb25UeXBlTGlmZXRpbWU/OiBTdWJzY3JpcHRpb247XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG9uZSBsaXZlcyBleGFjdGx5IGFzIGxvbmcgYXMgdGhlIGNvbm5lY3Rpb24uXG4gICAgICogSXQgaXMgcmVzcG9uc2libGUgZm9yIGRpc3Bvc2luZyBvZiB0aGUgaGFuZGxlckNvbm5lY3RvciwgYW5kIGFueSBpbnRlcm5hbCBsaXN0ZW4oKSBzdWJzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uQ29ubmVjdGlvbkxpZmV0aW1lID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZmFjdG9yeUFyZ3M6IEZhY3RvcnlBcmdzPFRNb25pdG9yLCBUQ29ubmVjdG9yPixcbiAgICAgICAgcHJpdmF0ZSBtYW5hZ2VyOiBEcmFnRHJvcE1hbmFnZXIsXG4gICAgICAgIHByaXZhdGUgc2t5aG9va1pvbmU6IFpvbmUsXG4gICAgICAgIGluaXRpYWxUeXBlOiBUeXBlT3JUeXBlQXJyYXkgfCB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgdHlwZW9mIG1hbmFnZXIgPT09ICdvYmplY3QnLFxuICAgICAgICAgICAgLy8gVE9ETzogdXBkYXRlIHRoaXMgbWluaS1kb2N1bWVudGF0aW9uXG4gICAgICAgICAgICAnQ291bGQgbm90IGZpbmQgdGhlIGRyYWcgYW5kIGRyb3AgbWFuYWdlciBpbiB0aGUgY29udGV4dCBvZiAlcy4gJyArXG4gICAgICAgICAgICAnTWFrZSBzdXJlIHRvIHdyYXAgdGhlIHRvcC1sZXZlbCBjb21wb25lbnQgb2YgeW91ciBhcHAgd2l0aCBEcmFnRHJvcENvbnRleHQuICdcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgIC8vICdSZWFkIG1vcmU6ICcsXG4gICAgICAgICk7XG4gICAgICAgIE5nWm9uZS5hc3NlcnROb3RJbkFuZ3VsYXJab25lKCk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVyTW9uaXRvciA9IHRoaXMuZmFjdG9yeUFyZ3MuY3JlYXRlTW9uaXRvcih0aGlzLm1hbmFnZXIpO1xuICAgICAgICB0aGlzLmNvbGxlY3RvciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRoaXMuaGFuZGxlck1vbml0b3IpO1xuICAgICAgICB0aGlzLmhhbmRsZXIgPSB0aGlzLmZhY3RvcnlBcmdzLmNyZWF0ZUhhbmRsZXIodGhpcy5oYW5kbGVyTW9uaXRvcik7XG4gICAgICAgIHRoaXMuaGFuZGxlckNvbm5lY3RvciA9IHRoaXMuZmFjdG9yeUFyZ3MuY3JlYXRlQ29ubmVjdG9yKFxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmdldEJhY2tlbmQoKVxuICAgICAgICApO1xuICAgICAgICAvLyBoYW5kbGVyQ29ubmVjdG9yIGxpdmVzIGxvbmdlciB0aGFuIGFueSBwZXItdHlwZSBzdWJzY3JpcHRpb25cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25Db25uZWN0aW9uTGlmZXRpbWUuYWRkKCgpID0+XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJDb25uZWN0b3IucmVjZWl2ZUhhbmRsZXJJZChudWxsKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpbml0aWFsVHlwZSAmJiBpbml0aWFsVHlwZSAhPT0gVFlQRV9EWU5BTUlDKSB7XG4gICAgICAgICAgICB0aGlzLnNldFR5cGVzKGluaXRpYWxUeXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxpc3RlbjxQPihtYXBGbjogKG1vbml0b3I6IFRNb25pdG9yKSA9PiBQKTogT2JzZXJ2YWJsZTxQPiB7XG4gICAgICAgIC8vIExpc3RlbmVycyBhcmUgZ2VuZXJhbGx5IGFyb3VuZCBhcyBsb25nIGFzIHRoZSBjb25uZWN0aW9uLlxuICAgICAgICAvLyBUaGlzIGlzbid0IDEwMCUgdHJ1ZSwgYnV0IHRoZXJlIGlzIG5vIHdheSBvZiBrbm93aW5nIChldmVuIGlmIHlvdSByZWYtY291bnQgaXQpXG4gICAgICAgIC8vIHdoZW4gYSBjb21wb25lbnQgbm8gbG9uZ2VyIG5lZWRzIGl0LlxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlZFR5cGUkLnBpcGUoXG4gICAgICAgICAgICAvLyB0aGlzIGVuc3VyZXMgd2UgZG9uJ3Qgc3RhcnQgZW1pdHRpbmcgdmFsdWVzIHVudGlsIHRoZXJlIGlzIGEgdHlwZSByZXNvbHZlZFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgIC8vIHN3aXRjaCBvdXIgYXR0ZW50aW9uIHRvIHRoZSBpbmNvbWluZyBmaXJlaG9zZSBvZiAnc29tZXRoaW5nIGNoYW5nZWQnIGV2ZW50c1xuICAgICAgICAgICAgc3dpdGNoTWFwVG8odGhpcy5jb2xsZWN0b3IkKSxcbiAgICAgICAgICAgIC8vIHR1cm4gdGhlbSBpbnRvICdpbnRlcmVzdGluZyBzdGF0ZScgdmlhIHRoZSBtb25pdG9yIGFuZCBhIHVzZXItcHJvdmlkZWQgZnVuY3Rpb25cbiAgICAgICAgICAgIG1hcChtYXBGbiksXG4gICAgICAgICAgICAvLyBkb24ndCBlbWl0IEVWRVJZIHRpbWUgdGhlIGZpcmVob3NlIHNheXMgc29tZXRoaW5nIGNoYW5nZWQsIG9ubHkgd2hlbiB0aGUgaW50ZXJlc3Rpbmcgc3RhdGUgY2hhbmdlc1xuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoYXJlQ29sbGVjdHNFcXVhbCksXG4gICAgICAgICAgICAvLyB0aGlzIHNjaGVkdWxlcyBhIHNpbmdsZSBiYXRjaCBjaGFuZ2UgZGV0ZWN0aW9uIHJ1biBhZnRlciBhbGwgdGhlIGxpc3RlbmVycyBoYXZlIGhlYXJkIHRoZWlyIG5ld2VzdCB2YWx1ZVxuICAgICAgICAgICAgLy8gdGh1cyBhbGwgY2hhbmdlcyByZXN1bHRpbmcgZnJvbSBzdWJzY3JpcHRpb25zIHRvIHRoaXMgYXJlIGNhdWdodCBieSB0aGVcbiAgICAgICAgICAgIC8vIGNoYW5nZSBkZXRlY3Rvci5cbiAgICAgICAgICAgIHNjaGVkdWxlTWljcm9UYXNrQWZ0ZXIodGhpcy5za3lob29rWm9uZSwgdGhpcy5vblVwZGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVXBkYXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZXJDb25uZWN0b3IucmVjb25uZWN0KCk7XG4gICAgfTtcblxuICAgIGNvbm5lY3QoZm46IChjb25uZWN0b3I6IFRDb25uZWN0b3IpID0+IHZvaWQpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLnJlc29sdmVkVHlwZSQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gbXVzdCBydW4gaW5zaWRlIHNreWhvb2tab25lLCBzbyB0aGluZ3MgbGlrZSB0aW1lcnMgZmlyaW5nIGFmdGVyIGEgbG9uZyBob3ZlciB3aXRoIHRvdWNoIGJhY2tlbmRcbiAgICAgICAgICAgIC8vIHdpbGwgY2F1c2UgY2hhbmdlIGRldGVjdGlvbiAodmlhIGV4ZWN1dGluZyBhIG1hY3JvIG9yIGV2ZW50IHRhc2spXG4gICAgICAgICAgICB0aGlzLnNreWhvb2tab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm4odGhpcy5oYW5kbGVyQ29ubmVjdG9yLmhvb2tzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbm93IGNoYWluIHRoaXMgb250byB0aGUgY29ubmVjdGlvbidzIHVuc3Vic2NyaWJlIGNhbGwuXG4gICAgICAgIC8vIGp1c3QgaW4gY2FzZSB5b3UgZGVzdHJveSB5b3VyIGNvbXBvbmVudCBiZWZvcmUgc2V0dGluZyBhIHR5cGUgb24gYW55dGhpbmdcbiAgICAgICAgLy8gaS5lLjpcbiAgICAgICAgLy8gY29ubiB3aXRob3V0IGEgdHlwZVxuICAgICAgICAvLyAgICAgc291cmNlID0gdGhpcy5kbmQuZHJhZ1NvdXJjZShudWxsLCB7IC4uLiB9KVxuICAgICAgICAvLyBtYW51YWxseSBjb25uZWN0IHRvIHRoZSBET00sIHdoaWNoIHdvbid0IGhhbmRsZSB0aGUgcmV0dXJuZWQgc3Vic2NyaXB0aW9uIGxpa2UgdGhlIGRpcmVjdGl2ZSBkb2VzXG4gICAgICAgIC8vICAgICBuZ0FmdGVyVmlld0luaXQoKSB7IHRoaXMuc291cmNlLmNvbm5lY3REcmFnU291cmNlKHRoaXMubXlEaXYubmF0aXZlRWxlbWVudCk7IH1cbiAgICAgICAgLy8gbmV2ZXIgc2V0IGEgdHlwZVxuICAgICAgICAvLyB0aGVuIGRlc3Ryb3kgeW91ciBjb21wb25lbnQsIHRoZSBzb3VyY2UsIGJ1dCBub3QgdGhlIGNvbm5lY3Rpb24gcmVxdWVzdC5cbiAgICAgICAgLy8gICAgIG5nT25EZXN0cm95KCkgeyB0aGlzLnNvdXJjZS51bnN1YnNjcmliZSgpOyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHdpdGhvdXQgdGhpcywgeW91IHdvdWxkIGhhdmUgYSBoYW5naW5nIHJlc29sdmVkVHlwZSQucGlwZSh0YWtlKDEpKSBzdWJzY3JpcHRpb25cbiAgICAgICAgLy8gd2l0aCB0aGlzLCBpdCBkaWVzIHdpdGggdGhlIHNvdXJjZSdzIHVuc3Vic2NyaWJlIGNhbGwuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGRvZXNuJ3QgbmVlZCB0aGlzLnN1YnNjcmlwdGlvblR5cGVMaWZldGltZSwgYmVjYXVzZSBwaXBlKHRha2UoMSkpIGFscmVhZHkgZG9lcyB0aGF0XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uQ29ubmVjdGlvbkxpZmV0aW1lLmFkZChzdWJzY3JpcHRpb24pO1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGNvbm5lY3REcm9wVGFyZ2V0KG5vZGU6IE5vZGUpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0KGMgPT5cbiAgICAgICAgICAgICgoYyBhcyBhbnkpIGFzIERyb3BUYXJnZXRDb25uZWN0b3IpLmRyb3BUYXJnZXQobm9kZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25uZWN0RHJhZ1NvdXJjZShcbiAgICAgICAgbm9kZTogTm9kZSxcbiAgICAgICAgb3B0aW9uczogRHJhZ1NvdXJjZU9wdGlvbnNcbiAgICApOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0KGMgPT5cbiAgICAgICAgICAgICgoYyBhcyBhbnkpIGFzIERyYWdTb3VyY2VDb25uZWN0b3IpLmRyYWdTb3VyY2Uobm9kZSwgb3B0aW9ucylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25uZWN0RHJhZ1ByZXZpZXcoXG4gICAgICAgIG5vZGU6IE5vZGUsXG4gICAgICAgIG9wdGlvbnM6IERyYWdQcmV2aWV3T3B0aW9uc1xuICAgICk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3QoYyA9PlxuICAgICAgICAgICAgKChjIGFzIGFueSkgYXMgRHJhZ1NvdXJjZUNvbm5lY3RvcikuZHJhZ1ByZXZpZXcobm9kZSwgb3B0aW9ucylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZXRUeXBlcyh0eXBlOiBUeXBlT3JUeXBlQXJyYXkpIHtcbiAgICAgICAgLy8gbXVzdCBydW4gaW5zaWRlIHNreWhvb2tab25lLCBzbyB0aGluZ3MgbGlrZSB0aW1lcnMgZmlyaW5nIGFmdGVyIGEgbG9uZyBob3ZlciB3aXRoIHRvdWNoIGJhY2tlbmRcbiAgICAgICAgLy8gd2lsbCBjYXVzZSBjaGFuZ2UgZGV0ZWN0aW9uICh2aWEgZXhlY3V0aW5nIGEgbWFjcm8gb3IgZXZlbnQgdGFzaylcbiAgICAgICAgdGhpcy5za3lob29rWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlVHlwZSh0eXBlKTtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZWRUeXBlJC5uZXh0KDEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRUeXBlKHR5cGU6IHN0cmluZyB8IHN5bWJvbCkge1xuICAgICAgICB0aGlzLnNldFR5cGVzKHR5cGUpO1xuICAgIH1cblxuICAgIGdldEhhbmRsZXJJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlcklkO1xuICAgIH1cblxuICAgIHJlY2VpdmVUeXBlKHR5cGU6IFR5cGVPclR5cGVBcnJheSkge1xuICAgICAgICBpZiAodHlwZSA9PT0gdGhpcy5jdXJyZW50VHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgTmdab25lLmFzc2VydE5vdEluQW5ndWxhclpvbmUoKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRUeXBlID0gdHlwZTtcblxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25UeXBlTGlmZXRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uVHlwZUxpZmV0aW1lLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5kZWJ1Zygnc3Vic2NyaWJlZCB0byAnICsgdHlwZS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25UeXBlTGlmZXRpbWUgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgeyBoYW5kbGVySWQsIHVucmVnaXN0ZXIgfSA9IHRoaXMuZmFjdG9yeUFyZ3MucmVnaXN0ZXJIYW5kbGVyKFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcixcbiAgICAgICAgICAgIHRoaXMubWFuYWdlclxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlcklkID0gaGFuZGxlcklkO1xuICAgICAgICB0aGlzLmhhbmRsZXJNb25pdG9yLnJlY2VpdmVIYW5kbGVySWQoaGFuZGxlcklkKTtcbiAgICAgICAgdGhpcy5oYW5kbGVyQ29ubmVjdG9yLnJlY2VpdmVIYW5kbGVySWQoaGFuZGxlcklkKTtcblxuICAgICAgICBjb25zdCBnbG9iYWxNb25pdG9yID0gdGhpcy5tYW5hZ2VyLmdldE1vbml0b3IoKTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSBnbG9iYWxNb25pdG9yLnN1YnNjcmliZVRvU3RhdGVDaGFuZ2UoXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgICAgICAgIHsgaGFuZGxlcklkczogW2hhbmRsZXJJZF0gfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uVHlwZUxpZmV0aW1lLmFkZCh1bnN1YnNjcmliZSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uVHlwZUxpZmV0aW1lLmFkZCh1bnJlZ2lzdGVyKTtcbiAgICAgICAgLy8gdGhpcy5zdWJzY3JpcHRpb25UeXBlTGlmZXRpbWUuYWRkKCgpID0+IGNvbnNvbGUuZGVidWcoXCJ1bnN1YnNjcmliZWQgZnJvbSBcIiArIHR5cGUudG9TdHJpbmcoKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbGxlY3RvciQubmV4dCh0aGlzLmhhbmRsZXJNb25pdG9yKTtcbiAgICB9O1xuXG4gICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvblR5cGVMaWZldGltZSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25UeXBlTGlmZXRpbWUudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkNvbm5lY3Rpb25MaWZldGltZS51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGFkZCh0ZWFyZG93bjogVGVhcmRvd25Mb2dpYyk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbkNvbm5lY3Rpb25MaWZldGltZS5hZGQodGVhcmRvd24pO1xuICAgIH1cblxuICAgIGdldCBjbG9zZWQoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkNvbm5lY3Rpb25MaWZldGltZSAmJlxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25Db25uZWN0aW9uTGlmZXRpbWUuY2xvc2VkXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZUNvbnN0cnVjdG9yPEl0ZW0gPSB7fSwgRHJvcFJlc3VsdCA9IHt9PiB7XG4gICAgbmV3IChcbiAgICAgICAgZmFjdG9yeUFyZ3M6IEZhY3RvcnlBcmdzPERyYWdTb3VyY2VNb25pdG9yLCBEcmFnU291cmNlQ29ubmVjdG9yPixcbiAgICAgICAgbWFuYWdlcjogRHJhZ0Ryb3BNYW5hZ2VyLFxuICAgICAgICBza3lob29rWm9uZTogWm9uZSxcbiAgICAgICAgaW5pdGlhbFR5cGU6IHN0cmluZyB8IHN5bWJvbCB8IHVuZGVmaW5lZFxuICAgICk6IHQuRHJhZ1NvdXJjZTxJdGVtLCBEcm9wUmVzdWx0Pjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgVGFyZ2V0Q29uc3RydWN0b3Ige1xuICAgIG5ldyAoXG4gICAgICAgIGZhY3RvcnlBcmdzOiBGYWN0b3J5QXJnczxEcm9wVGFyZ2V0TW9uaXRvciwgRHJvcFRhcmdldENvbm5lY3Rvcj4sXG4gICAgICAgIG1hbmFnZXI6IERyYWdEcm9wTWFuYWdlcixcbiAgICAgICAgc2t5aG9va1pvbmU6IFpvbmUsXG4gICAgICAgIGluaXRpYWxUeXBlOiBUeXBlT3JUeXBlQXJyYXkgfCB1bmRlZmluZWRcbiAgICApOiB0LkRyb3BUYXJnZXQ7XG59XG5cbmV4cG9ydCBjb25zdCBUYXJnZXRDb25uZWN0aW9uID0gQ29ubmVjdGlvbiBhcyBUYXJnZXRDb25zdHJ1Y3RvcjtcbmV4cG9ydCBjb25zdCBTb3VyY2VDb25uZWN0aW9uID0gQ29ubmVjdGlvbiBhcyBTb3VyY2VDb25zdHJ1Y3RvcjtcbiJdfQ==