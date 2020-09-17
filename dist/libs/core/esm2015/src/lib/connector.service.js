/// <reference types="zone.js" />
/**
 * @module 1-Top-Level
 */
/** a second comment */
/// <reference types="zone.js" />
import { Injectable, Inject, NgZone } from '@angular/core';
import { TYPE_DYNAMIC, DRAG_DROP_MANAGER } from './tokens';
import createTargetConnector from './internal/createTargetConnector';
import registerTarget from './internal/register-target';
import createSourceConnector from './internal/createSourceConnector';
import registerSource from './internal/register-source';
import { 
// sourceConnectionFactory,
// targetConnectionFactory,
SourceConnection, TargetConnection, } from './internal/connection-factory';
import { DragLayerConnectionClass } from './internal/drag-layer-connection';
import { createSourceMonitor } from './internal/createSourceMonitor';
import { createTargetFactory } from './internal/createTargetFactory';
import { createTargetMonitor } from './internal/createTargetMonitor';
import { createSourceFactory } from './internal/createSourceFactory';
import * as i0 from "@angular/core";
/** For a simple component, unsubscribing is as easy as `connection.unsubscribe()` in `ngOnDestroy()`
 *  If your components have lots of subscriptions, it can get tedious having to
 *  unsubscribe from all of them, and you might forget. A common pattern is to create an RxJS Subscription
 *  (maybe called `destroy`), to use `this.destroy.add(xxx.subscribe(...))`
 *  and to call `destroy.unsubscribe()` once to clean up all of them. @rednax/core
 *  supports this pattern with by using the `subscription` parameter on the
 *  constructors. Simply:
 *
```typescript
import { Subscription } from 'rxjs';
// ...
destroy = new Subscription();
target = this.dnd.dropTarget({
  // ...
}, this.destroy);
ngOnDestroy() { this.destroy.unsubscribe(); }
```
 *
 * It is a good habit for avoiding leaked subscriptions, because .
 */
export class SkyhookDndService {
    /** @ignore */
    constructor(manager, ngZone) {
        this.manager = manager;
        this.ngZone = ngZone;
        /** @ignore */
        this.skyhookZone = Zone.root.fork({
            name: 'skyhookZone',
            onHasTask: (_parentZoneDelegate, _currentZone, _targetZone, state) => {
                // when we've | drained the microTask queue; or                    | ... run a change detection cycle.
                //            | executed or cancelled a macroTask (eg a timer); or |
                //            | handled an event                                   |
                // note: we must use ngZone.run() instead of ApplicationRef.tick()
                // this is because
                // 1. this callback runs outside the angular zone
                // 2. therefore if you use appRef.tick(), the event handlers set up during the tick() are
                //    not in the angular zone, even though anything set up during tick() should be
                // 3. therefore you get regular (click) handlers from templates running in skyhookZone
                //    and not causing change detection
                // Also, now we watch for macroTasks as well.
                // This means if we set up timers in the skyhook zone, they will fire and cause change
                // detection. Useful if doing .listen(...).delay(1000) and the resulting asynchronous
                // subscribers.
                // Appropriately, we run more setup handlers in skyhookZone now.
                //
                // Proper event handlers (set up by the backend) don't trigger any, because skyhookZone
                // only cares about # of handlers changing => 0. But if we care about them, it will be
                // through listen(), updates to which will schedule a microTask.
                if (!state[state.change]) {
                    this.ngZone.run(() => {
                        // noop, but causes change detection (i.e. onLeave)
                    });
                }
            },
        });
    }
    /**
     * This drop target will only react to the items produced by the drag sources
     * of the specified type or types.
     *
     * If you want a dynamic type, pass `null` as the type; and call
     * {@link DropTarget#setTypes} in a lifecycle hook.
     */
    dropTarget(types, spec, subscription) {
        // return this.ngZone.runOutsideAngular(() => {
        return this.skyhookZone.run(() => {
            const createTarget = createTargetFactory(spec, this.skyhookZone);
            const conn = new TargetConnection({
                createHandler: createTarget,
                registerHandler: registerTarget,
                createMonitor: createTargetMonitor,
                createConnector: createTargetConnector,
            }, this.manager, this.skyhookZone, types || TYPE_DYNAMIC);
            if (subscription) {
                subscription.add(conn);
            }
            return conn;
        });
    }
    /** This method creates a {@link DragSource} object. It represents a drag
     *  source and its behaviour, and can be connected to a DOM element by
     *  assigning it to the `[dragSource]` directive on that element in your
     *  template.
     *
     * It is the corollary of [`react-dnd`'s
     * `DragSource`](http://react-dnd.github.io/react-dnd/docs-drag-source.html).
     *
     * The `spec` argument ({@link DragSourceSpec}) is a set of _queries_ and
     * _callbacks_ that are called at appropriate times by the internals. The
     * queries are for asking your component whether to drag/listen and what
     * item data to hoist up; the callback (just 1) is for notifying you when
     * the drag ends.
     *
     * Only the drop targets registered for the same type will
     * react to the items produced by this drag source. If you want a dynamic
     * type, pass `null` as the type; and call {@link DragSource#setType} in
     * a lifecycle hook.
     *
     * @param subscription An RxJS Subscription to tie the lifetime of the
     * connection to.
     */
    dragSource(type, spec, subscription) {
        // return this.ngZone.runOutsideAngular(() => {
        return this.skyhookZone.run(() => {
            const createSource = createSourceFactory(spec, this.skyhookZone);
            const conn = new SourceConnection({
                createHandler: createSource,
                registerHandler: registerSource,
                createMonitor: createSourceMonitor,
                createConnector: createSourceConnector,
            }, this.manager, this.skyhookZone, type || TYPE_DYNAMIC);
            if (subscription) {
                subscription.add(conn);
            }
            return conn;
        });
    }
    /**
     * This method creates a {@link DragLayer} object
     */
    dragLayer(subscription) {
        // return this.ngZone.runOutsideAngular(() => {
        return this.skyhookZone.run(() => {
            const conn = new DragLayerConnectionClass(this.manager, this.skyhookZone);
            if (subscription) {
                subscription.add(conn);
            }
            return conn;
        });
    }
}
SkyhookDndService.ɵfac = function SkyhookDndService_Factory(t) { return new (t || SkyhookDndService)(i0.ɵɵinject(DRAG_DROP_MANAGER), i0.ɵɵinject(i0.NgZone)); };
SkyhookDndService.ɵprov = i0.ɵɵdefineInjectable({ token: SkyhookDndService, factory: SkyhookDndService.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SkyhookDndService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DRAG_DROP_MANAGER]
            }] }, { type: i0.NgZone }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL2NvcmUvc3JjL2xpYi9jb25uZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxpQ0FBaUM7QUFMakM7O0dBRUc7QUFDSCx1QkFBdUI7QUFFdkIsaUNBQWlDO0FBQ2pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBSTNELE9BQU8scUJBQXFCLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxjQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFHeEQsT0FBTyxxQkFBcUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLGNBQWMsTUFBTSw0QkFBNEIsQ0FBQztBQUl4RCxPQUFPO0FBQ0gsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEdBQ25CLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHNUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O0FBV3JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBR0gsTUFBTSxPQUFPLGlCQUFpQjtJQTBDMUIsY0FBYztJQUNkLFlBQ3VDLE9BQXdCLEVBQ25ELE1BQWM7UUFEYSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUNuRCxXQUFNLEdBQU4sTUFB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QUksQ0FBQyxXQUFXLENBQ25CLENBQUM7WUFDRixJQUFJLFlBQVksRUFBRTtnQkFDZCxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztrRkF4SlEsaUJBQWlCLGNBNENkLGlCQUFpQjt5REE1Q3BCLGlCQUFpQixXQUFqQixpQkFBaUI7a0RBQWpCLGlCQUFpQjtjQUQ3QixVQUFVOztzQkE2Q0YsTUFBTTt1QkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGUgMS1Ub3AtTGV2ZWxcbiAqL1xuLyoqIGEgc2Vjb25kIGNvbW1lbnQgKi9cblxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ6b25lLmpzXCIgLz5cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUWVBFX0RZTkFNSUMsIERSQUdfRFJPUF9NQU5BR0VSIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNYW5hZ2VyIH0gZnJvbSAnZG5kLWNvcmUnO1xuXG5pbXBvcnQgeyBEcm9wVGFyZ2V0U3BlYyB9IGZyb20gJy4vZHJvcC10YXJnZXQtc3BlY2lmaWNhdGlvbic7XG5pbXBvcnQgY3JlYXRlVGFyZ2V0Q29ubmVjdG9yIGZyb20gJy4vaW50ZXJuYWwvY3JlYXRlVGFyZ2V0Q29ubmVjdG9yJztcbmltcG9ydCByZWdpc3RlclRhcmdldCBmcm9tICcuL2ludGVybmFsL3JlZ2lzdGVyLXRhcmdldCc7XG5cbmltcG9ydCB7IERyYWdTb3VyY2VTcGVjIH0gZnJvbSAnLi9kcmFnLXNvdXJjZS1zcGVjaWZpY2F0aW9uJztcbmltcG9ydCBjcmVhdGVTb3VyY2VDb25uZWN0b3IgZnJvbSAnLi9pbnRlcm5hbC9jcmVhdGVTb3VyY2VDb25uZWN0b3InO1xuaW1wb3J0IHJlZ2lzdGVyU291cmNlIGZyb20gJy4vaW50ZXJuYWwvcmVnaXN0ZXItc291cmNlJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uTGlrZSwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVHlwZU9yVHlwZUFycmF5IH0gZnJvbSAnLi90eXBlLWlzaCc7XG5pbXBvcnQge1xuICAgIC8vIHNvdXJjZUNvbm5lY3Rpb25GYWN0b3J5LFxuICAgIC8vIHRhcmdldENvbm5lY3Rpb25GYWN0b3J5LFxuICAgIFNvdXJjZUNvbm5lY3Rpb24sXG4gICAgVGFyZ2V0Q29ubmVjdGlvbixcbn0gZnJvbSAnLi9pbnRlcm5hbC9jb25uZWN0aW9uLWZhY3RvcnknO1xuaW1wb3J0IHsgRHJhZ0xheWVyQ29ubmVjdGlvbkNsYXNzIH0gZnJvbSAnLi9pbnRlcm5hbC9kcmFnLWxheWVyLWNvbm5lY3Rpb24nO1xuXG5pbXBvcnQgeyBEcmFnU291cmNlLCBEcm9wVGFyZ2V0LCBEcmFnTGF5ZXIgfSBmcm9tICcuL2Nvbm5lY3Rpb24tdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlU291cmNlTW9uaXRvciB9IGZyb20gJy4vaW50ZXJuYWwvY3JlYXRlU291cmNlTW9uaXRvcic7XG5pbXBvcnQgeyBjcmVhdGVUYXJnZXRGYWN0b3J5IH0gZnJvbSAnLi9pbnRlcm5hbC9jcmVhdGVUYXJnZXRGYWN0b3J5JztcbmltcG9ydCB7IGNyZWF0ZVRhcmdldE1vbml0b3IgfSBmcm9tICcuL2ludGVybmFsL2NyZWF0ZVRhcmdldE1vbml0b3InO1xuaW1wb3J0IHsgY3JlYXRlU291cmNlRmFjdG9yeSB9IGZyb20gJy4vaW50ZXJuYWwvY3JlYXRlU291cmNlRmFjdG9yeSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBSeEpTIFN1YnNjcmlwdGlvbiwgd2l0aCBtdWx0aS12ZXJzaW9uIGNvbXBhdGliaWxpdHkuXG4gKiBUaGUgc3RhbmRhcmQgU3Vic2NyaXB0aW9uTGlrZSBkb2VzIG5vdCBjb250YWluIGFuIGFkZCgpIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZGRTdWJzY3JpcHRpb24gZXh0ZW5kcyBTdWJzY3JpcHRpb25MaWtlIHtcbiAgICAvKiogU2FtZSBhcyBSeEpTIGBTdWJzY3JpcHRpb24jYWRkYCAqL1xuICAgIGFkZCh0ZWFyZG93bkxvZ2ljOiBUZWFyZG93bkxvZ2ljKTogQWRkU3Vic2NyaXB0aW9uO1xufVxuXG4vKiogRm9yIGEgc2ltcGxlIGNvbXBvbmVudCwgdW5zdWJzY3JpYmluZyBpcyBhcyBlYXN5IGFzIGBjb25uZWN0aW9uLnVuc3Vic2NyaWJlKClgIGluIGBuZ09uRGVzdHJveSgpYFxuICogIElmIHlvdXIgY29tcG9uZW50cyBoYXZlIGxvdHMgb2Ygc3Vic2NyaXB0aW9ucywgaXQgY2FuIGdldCB0ZWRpb3VzIGhhdmluZyB0b1xuICogIHVuc3Vic2NyaWJlIGZyb20gYWxsIG9mIHRoZW0sIGFuZCB5b3UgbWlnaHQgZm9yZ2V0LiBBIGNvbW1vbiBwYXR0ZXJuIGlzIHRvIGNyZWF0ZSBhbiBSeEpTIFN1YnNjcmlwdGlvblxuICogIChtYXliZSBjYWxsZWQgYGRlc3Ryb3lgKSwgdG8gdXNlIGB0aGlzLmRlc3Ryb3kuYWRkKHh4eC5zdWJzY3JpYmUoLi4uKSlgXG4gKiAgYW5kIHRvIGNhbGwgYGRlc3Ryb3kudW5zdWJzY3JpYmUoKWAgb25jZSB0byBjbGVhbiB1cCBhbGwgb2YgdGhlbS4gQHJlZG5heC9jb3JlXG4gKiAgc3VwcG9ydHMgdGhpcyBwYXR0ZXJuIHdpdGggYnkgdXNpbmcgdGhlIGBzdWJzY3JpcHRpb25gIHBhcmFtZXRlciBvbiB0aGVcbiAqICBjb25zdHJ1Y3RvcnMuIFNpbXBseTpcbiAqXG5gYGB0eXBlc2NyaXB0XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbi8vIC4uLlxuZGVzdHJveSA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbnRhcmdldCA9IHRoaXMuZG5kLmRyb3BUYXJnZXQoe1xuICAvLyAuLi5cbn0sIHRoaXMuZGVzdHJveSk7XG5uZ09uRGVzdHJveSgpIHsgdGhpcy5kZXN0cm95LnVuc3Vic2NyaWJlKCk7IH1cbmBgYFxuICpcbiAqIEl0IGlzIGEgZ29vZCBoYWJpdCBmb3IgYXZvaWRpbmcgbGVha2VkIHN1YnNjcmlwdGlvbnMsIGJlY2F1c2UgLlxuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTa3lob29rRG5kU2VydmljZSB7XG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBwcml2YXRlIHNreWhvb2tab25lOiBab25lID0gWm9uZS5yb290LmZvcmsoe1xuICAgICAgICBuYW1lOiAnc2t5aG9va1pvbmUnLFxuICAgICAgICBvbkhhc1Rhc2s6IChfcGFyZW50Wm9uZURlbGVnYXRlLCBfY3VycmVudFpvbmUsIF90YXJnZXRab25lLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSd2ZSB8IGRyYWluZWQgdGhlIG1pY3JvVGFzayBxdWV1ZTsgb3IgICAgICAgICAgICAgICAgICAgIHwgLi4uIHJ1biBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHwgZXhlY3V0ZWQgb3IgY2FuY2VsbGVkIGEgbWFjcm9UYXNrIChlZyBhIHRpbWVyKTsgb3IgfFxuICAgICAgICAgICAgLy8gICAgICAgICAgICB8IGhhbmRsZWQgYW4gZXZlbnQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcblxuICAgICAgICAgICAgLy8gbm90ZTogd2UgbXVzdCB1c2Ugbmdab25lLnJ1bigpIGluc3RlYWQgb2YgQXBwbGljYXRpb25SZWYudGljaygpXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIDEuIHRoaXMgY2FsbGJhY2sgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmVcbiAgICAgICAgICAgIC8vIDIuIHRoZXJlZm9yZSBpZiB5b3UgdXNlIGFwcFJlZi50aWNrKCksIHRoZSBldmVudCBoYW5kbGVycyBzZXQgdXAgZHVyaW5nIHRoZSB0aWNrKCkgYXJlXG4gICAgICAgICAgICAvLyAgICBub3QgaW4gdGhlIGFuZ3VsYXIgem9uZSwgZXZlbiB0aG91Z2ggYW55dGhpbmcgc2V0IHVwIGR1cmluZyB0aWNrKCkgc2hvdWxkIGJlXG4gICAgICAgICAgICAvLyAzLiB0aGVyZWZvcmUgeW91IGdldCByZWd1bGFyIChjbGljaykgaGFuZGxlcnMgZnJvbSB0ZW1wbGF0ZXMgcnVubmluZyBpbiBza3lob29rWm9uZVxuICAgICAgICAgICAgLy8gICAgYW5kIG5vdCBjYXVzaW5nIGNoYW5nZSBkZXRlY3Rpb25cblxuICAgICAgICAgICAgLy8gQWxzbywgbm93IHdlIHdhdGNoIGZvciBtYWNyb1Rhc2tzIGFzIHdlbGwuXG4gICAgICAgICAgICAvLyBUaGlzIG1lYW5zIGlmIHdlIHNldCB1cCB0aW1lcnMgaW4gdGhlIHNreWhvb2sgem9uZSwgdGhleSB3aWxsIGZpcmUgYW5kIGNhdXNlIGNoYW5nZVxuICAgICAgICAgICAgLy8gZGV0ZWN0aW9uLiBVc2VmdWwgaWYgZG9pbmcgLmxpc3RlbiguLi4pLmRlbGF5KDEwMDApIGFuZCB0aGUgcmVzdWx0aW5nIGFzeW5jaHJvbm91c1xuICAgICAgICAgICAgLy8gc3Vic2NyaWJlcnMuXG4gICAgICAgICAgICAvLyBBcHByb3ByaWF0ZWx5LCB3ZSBydW4gbW9yZSBzZXR1cCBoYW5kbGVycyBpbiBza3lob29rWm9uZSBub3cuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gUHJvcGVyIGV2ZW50IGhhbmRsZXJzIChzZXQgdXAgYnkgdGhlIGJhY2tlbmQpIGRvbid0IHRyaWdnZXIgYW55LCBiZWNhdXNlIHNreWhvb2tab25lXG4gICAgICAgICAgICAvLyBvbmx5IGNhcmVzIGFib3V0ICMgb2YgaGFuZGxlcnMgY2hhbmdpbmcgPT4gMC4gQnV0IGlmIHdlIGNhcmUgYWJvdXQgdGhlbSwgaXQgd2lsbCBiZVxuICAgICAgICAgICAgLy8gdGhyb3VnaCBsaXN0ZW4oKSwgdXBkYXRlcyB0byB3aGljaCB3aWxsIHNjaGVkdWxlIGEgbWljcm9UYXNrLlxuXG4gICAgICAgICAgICBpZiAoIXN0YXRlW3N0YXRlLmNoYW5nZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBub29wLCBidXQgY2F1c2VzIGNoYW5nZSBkZXRlY3Rpb24gKGkuZS4gb25MZWF2ZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gb25JbnZva2VUYXNrOiAoem9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZSwgdGFyZ2V0Wm9uZSwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpID0+IHtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBvblNjaGVkdWxlVGFzayhwYXJlbnRab25lRGVsZWdhdGUsIGN1cnJlbnRab25lLCB0YXJnZXRab25lLCB0YXNrKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIHBhcmVudFpvbmVEZWxlZ2F0ZS5zY2hlZHVsZVRhc2sodGFyZ2V0Wm9uZSwgdGFzayk7XG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIG9uSW52b2tlOiAocGFyZW50Wm9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZSwgdGFyZ2V0Wm9uZSwgZGVsZWdhdGUsIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpID0+IHtcbiAgICAgICAgLy8gfVxuICAgIH0pO1xuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChEUkFHX0RST1BfTUFOQUdFUikgcHJpdmF0ZSBtYW5hZ2VyOiBEcmFnRHJvcE1hbmFnZXIsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGRyb3AgdGFyZ2V0IHdpbGwgb25seSByZWFjdCB0byB0aGUgaXRlbXMgcHJvZHVjZWQgYnkgdGhlIGRyYWcgc291cmNlc1xuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgdHlwZSBvciB0eXBlcy5cbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IGEgZHluYW1pYyB0eXBlLCBwYXNzIGBudWxsYCBhcyB0aGUgdHlwZTsgYW5kIGNhbGxcbiAgICAgKiB7QGxpbmsgRHJvcFRhcmdldCNzZXRUeXBlc30gaW4gYSBsaWZlY3ljbGUgaG9vay5cbiAgICAgKi9cbiAgICBwdWJsaWMgZHJvcFRhcmdldDxJdGVtID0ge30sIERyb3BSZXN1bHQgPSB7fT4oXG4gICAgICAgIHR5cGVzOiBUeXBlT3JUeXBlQXJyYXkgfCBudWxsLFxuICAgICAgICBzcGVjOiBEcm9wVGFyZ2V0U3BlYzxJdGVtLCBEcm9wUmVzdWx0PixcbiAgICAgICAgc3Vic2NyaXB0aW9uPzogQWRkU3Vic2NyaXB0aW9uXG4gICAgKTogRHJvcFRhcmdldDxJdGVtLCBEcm9wUmVzdWx0PiB7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNreWhvb2tab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVUYXJnZXQ6IGFueSA9IGNyZWF0ZVRhcmdldEZhY3RvcnkoXG4gICAgICAgICAgICAgICAgc3BlYyxcbiAgICAgICAgICAgICAgICB0aGlzLnNreWhvb2tab25lXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBjb25uOiBhbnkgPSBuZXcgVGFyZ2V0Q29ubmVjdGlvbihcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUhhbmRsZXI6IGNyZWF0ZVRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJIYW5kbGVyOiByZWdpc3RlclRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTW9uaXRvcjogY3JlYXRlVGFyZ2V0TW9uaXRvcixcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29ubmVjdG9yOiBjcmVhdGVUYXJnZXRDb25uZWN0b3IsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIsXG4gICAgICAgICAgICAgICAgdGhpcy5za3lob29rWm9uZSxcbiAgICAgICAgICAgICAgICB0eXBlcyB8fCBUWVBFX0RZTkFNSUNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uYWRkKGNvbm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbm47XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGEge0BsaW5rIERyYWdTb3VyY2V9IG9iamVjdC4gSXQgcmVwcmVzZW50cyBhIGRyYWdcbiAgICAgKiAgc291cmNlIGFuZCBpdHMgYmVoYXZpb3VyLCBhbmQgY2FuIGJlIGNvbm5lY3RlZCB0byBhIERPTSBlbGVtZW50IGJ5XG4gICAgICogIGFzc2lnbmluZyBpdCB0byB0aGUgYFtkcmFnU291cmNlXWAgZGlyZWN0aXZlIG9uIHRoYXQgZWxlbWVudCBpbiB5b3VyXG4gICAgICogIHRlbXBsYXRlLlxuICAgICAqXG4gICAgICogSXQgaXMgdGhlIGNvcm9sbGFyeSBvZiBbYHJlYWN0LWRuZGAnc1xuICAgICAqIGBEcmFnU291cmNlYF0oaHR0cDovL3JlYWN0LWRuZC5naXRodWIuaW8vcmVhY3QtZG5kL2RvY3MtZHJhZy1zb3VyY2UuaHRtbCkuXG4gICAgICpcbiAgICAgKiBUaGUgYHNwZWNgIGFyZ3VtZW50ICh7QGxpbmsgRHJhZ1NvdXJjZVNwZWN9KSBpcyBhIHNldCBvZiBfcXVlcmllc18gYW5kXG4gICAgICogX2NhbGxiYWNrc18gdGhhdCBhcmUgY2FsbGVkIGF0IGFwcHJvcHJpYXRlIHRpbWVzIGJ5IHRoZSBpbnRlcm5hbHMuIFRoZVxuICAgICAqIHF1ZXJpZXMgYXJlIGZvciBhc2tpbmcgeW91ciBjb21wb25lbnQgd2hldGhlciB0byBkcmFnL2xpc3RlbiBhbmQgd2hhdFxuICAgICAqIGl0ZW0gZGF0YSB0byBob2lzdCB1cDsgdGhlIGNhbGxiYWNrIChqdXN0IDEpIGlzIGZvciBub3RpZnlpbmcgeW91IHdoZW5cbiAgICAgKiB0aGUgZHJhZyBlbmRzLlxuICAgICAqXG4gICAgICogT25seSB0aGUgZHJvcCB0YXJnZXRzIHJlZ2lzdGVyZWQgZm9yIHRoZSBzYW1lIHR5cGUgd2lsbFxuICAgICAqIHJlYWN0IHRvIHRoZSBpdGVtcyBwcm9kdWNlZCBieSB0aGlzIGRyYWcgc291cmNlLiBJZiB5b3Ugd2FudCBhIGR5bmFtaWNcbiAgICAgKiB0eXBlLCBwYXNzIGBudWxsYCBhcyB0aGUgdHlwZTsgYW5kIGNhbGwge0BsaW5rIERyYWdTb3VyY2Ujc2V0VHlwZX0gaW5cbiAgICAgKiBhIGxpZmVjeWNsZSBob29rLlxuICAgICAqXG4gICAgICogQHBhcmFtIHN1YnNjcmlwdGlvbiBBbiBSeEpTIFN1YnNjcmlwdGlvbiB0byB0aWUgdGhlIGxpZmV0aW1lIG9mIHRoZVxuICAgICAqIGNvbm5lY3Rpb24gdG8uXG4gICAgICovXG5cbiAgICBwdWJsaWMgZHJhZ1NvdXJjZTxJdGVtLCBEcm9wUmVzdWx0ID0ge30+KFxuICAgICAgICB0eXBlOiBzdHJpbmcgfCBzeW1ib2wgfCBudWxsLFxuICAgICAgICBzcGVjOiBEcmFnU291cmNlU3BlYzxJdGVtLCBEcm9wUmVzdWx0PixcbiAgICAgICAgc3Vic2NyaXB0aW9uPzogQWRkU3Vic2NyaXB0aW9uXG4gICAgKTogRHJhZ1NvdXJjZTxJdGVtLCBEcm9wUmVzdWx0PiB7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNreWhvb2tab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVTb3VyY2UgPSBjcmVhdGVTb3VyY2VGYWN0b3J5KHNwZWMsIHRoaXMuc2t5aG9va1pvbmUpO1xuICAgICAgICAgICAgY29uc3QgY29ubiA9IG5ldyBTb3VyY2VDb25uZWN0aW9uKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlSGFuZGxlcjogY3JlYXRlU291cmNlLFxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlckhhbmRsZXI6IHJlZ2lzdGVyU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVNb25pdG9yOiBjcmVhdGVTb3VyY2VNb25pdG9yLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDb25uZWN0b3I6IGNyZWF0ZVNvdXJjZUNvbm5lY3RvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlcixcbiAgICAgICAgICAgICAgICB0aGlzLnNreWhvb2tab25lLFxuICAgICAgICAgICAgICAgIHR5cGUgfHwgVFlQRV9EWU5BTUlDXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoY29ubik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29ubjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgY3JlYXRlcyBhIHtAbGluayBEcmFnTGF5ZXJ9IG9iamVjdFxuICAgICAqL1xuICAgIHB1YmxpYyBkcmFnTGF5ZXI8SXRlbSA9IGFueT4oXG4gICAgICAgIHN1YnNjcmlwdGlvbj86IEFkZFN1YnNjcmlwdGlvblxuICAgICk6IERyYWdMYXllcjxJdGVtPiB7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNreWhvb2tab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25uID0gbmV3IERyYWdMYXllckNvbm5lY3Rpb25DbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIsXG4gICAgICAgICAgICAgICAgdGhpcy5za3lob29rWm9uZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uYWRkKGNvbm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbm47XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==