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
SkyhookDndService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DRAG_DROP_MANAGER,] }] },
    { type: NgZone }
];
SkyhookDndService.decorators = [
    { type: Injectable }
];
SkyhookDndService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DRAG_DROP_MANAGER,] }] },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcmVkbmF4L2NvcmUvIiwic291cmNlcyI6WyJzcmMvbGliL2Nvbm5lY3Rvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsdUJBQXVCO0FBRXZCLGlDQUFpQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUkzRCxPQUFPLHFCQUFxQixNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sY0FBYyxNQUFNLDRCQUE0QixDQUFDO0FBR3hELE9BQU8scUJBQXFCLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxjQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsT0FBTztBQUNILDJCQUEyQjtBQUMzQiwyQkFBMkI7QUFDM0IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixHQUNuQixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBV3JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBR0gsTUFBTSxPQUFPLGlCQUFpQjtJQTBDMUIsY0FBYztJQUNkLFlBQ3VDLE9BQXdCLEVBQ25ELE1BQWM7UUFEYSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUNuRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBNUMxQixjQUFjO1FBQ04s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WUFDRixJQUFJLFlBQVksRUFBRTtnQkFDZCxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7NENBNUdJLE1BQU0sU0FBQyxpQkFBaUI7WUFDVCxNQUFNOzs7WUE5QzdCLFVBQVU7Ozs0Q0E2Q0YsTUFBTSxTQUFDLGlCQUFpQjtZQXZHSixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlIDEtVG9wLUxldmVsXG4gKi9cbi8qKiBhIHNlY29uZCBjb21tZW50ICovXG5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiem9uZS5qc1wiIC8+XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVFlQRV9EWU5BTUlDLCBEUkFHX0RST1BfTUFOQUdFUiB9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IERyYWdEcm9wTWFuYWdlciB9IGZyb20gJ2RuZC1jb3JlJztcblxuaW1wb3J0IHsgRHJvcFRhcmdldFNwZWMgfSBmcm9tICcuL2Ryb3AtdGFyZ2V0LXNwZWNpZmljYXRpb24nO1xuaW1wb3J0IGNyZWF0ZVRhcmdldENvbm5lY3RvciBmcm9tICcuL2ludGVybmFsL2NyZWF0ZVRhcmdldENvbm5lY3Rvcic7XG5pbXBvcnQgcmVnaXN0ZXJUYXJnZXQgZnJvbSAnLi9pbnRlcm5hbC9yZWdpc3Rlci10YXJnZXQnO1xuXG5pbXBvcnQgeyBEcmFnU291cmNlU3BlYyB9IGZyb20gJy4vZHJhZy1zb3VyY2Utc3BlY2lmaWNhdGlvbic7XG5pbXBvcnQgY3JlYXRlU291cmNlQ29ubmVjdG9yIGZyb20gJy4vaW50ZXJuYWwvY3JlYXRlU291cmNlQ29ubmVjdG9yJztcbmltcG9ydCByZWdpc3RlclNvdXJjZSBmcm9tICcuL2ludGVybmFsL3JlZ2lzdGVyLXNvdXJjZSc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbkxpa2UsIFRlYXJkb3duTG9naWMgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFR5cGVPclR5cGVBcnJheSB9IGZyb20gJy4vdHlwZS1pc2gnO1xuaW1wb3J0IHtcbiAgICAvLyBzb3VyY2VDb25uZWN0aW9uRmFjdG9yeSxcbiAgICAvLyB0YXJnZXRDb25uZWN0aW9uRmFjdG9yeSxcbiAgICBTb3VyY2VDb25uZWN0aW9uLFxuICAgIFRhcmdldENvbm5lY3Rpb24sXG59IGZyb20gJy4vaW50ZXJuYWwvY29ubmVjdGlvbi1mYWN0b3J5JztcbmltcG9ydCB7IERyYWdMYXllckNvbm5lY3Rpb25DbGFzcyB9IGZyb20gJy4vaW50ZXJuYWwvZHJhZy1sYXllci1jb25uZWN0aW9uJztcblxuaW1wb3J0IHsgRHJhZ1NvdXJjZSwgRHJvcFRhcmdldCwgRHJhZ0xheWVyIH0gZnJvbSAnLi9jb25uZWN0aW9uLXR5cGVzJztcbmltcG9ydCB7IGNyZWF0ZVNvdXJjZU1vbml0b3IgfSBmcm9tICcuL2ludGVybmFsL2NyZWF0ZVNvdXJjZU1vbml0b3InO1xuaW1wb3J0IHsgY3JlYXRlVGFyZ2V0RmFjdG9yeSB9IGZyb20gJy4vaW50ZXJuYWwvY3JlYXRlVGFyZ2V0RmFjdG9yeSc7XG5pbXBvcnQgeyBjcmVhdGVUYXJnZXRNb25pdG9yIH0gZnJvbSAnLi9pbnRlcm5hbC9jcmVhdGVUYXJnZXRNb25pdG9yJztcbmltcG9ydCB7IGNyZWF0ZVNvdXJjZUZhY3RvcnkgfSBmcm9tICcuL2ludGVybmFsL2NyZWF0ZVNvdXJjZUZhY3RvcnknO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gUnhKUyBTdWJzY3JpcHRpb24sIHdpdGggbXVsdGktdmVyc2lvbiBjb21wYXRpYmlsaXR5LlxuICogVGhlIHN0YW5kYXJkIFN1YnNjcmlwdGlvbkxpa2UgZG9lcyBub3QgY29udGFpbiBhbiBhZGQoKSBtZXRob2QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWRkU3Vic2NyaXB0aW9uIGV4dGVuZHMgU3Vic2NyaXB0aW9uTGlrZSB7XG4gICAgLyoqIFNhbWUgYXMgUnhKUyBgU3Vic2NyaXB0aW9uI2FkZGAgKi9cbiAgICBhZGQodGVhcmRvd25Mb2dpYzogVGVhcmRvd25Mb2dpYyk6IEFkZFN1YnNjcmlwdGlvbjtcbn1cblxuLyoqIEZvciBhIHNpbXBsZSBjb21wb25lbnQsIHVuc3Vic2NyaWJpbmcgaXMgYXMgZWFzeSBhcyBgY29ubmVjdGlvbi51bnN1YnNjcmliZSgpYCBpbiBgbmdPbkRlc3Ryb3koKWBcbiAqICBJZiB5b3VyIGNvbXBvbmVudHMgaGF2ZSBsb3RzIG9mIHN1YnNjcmlwdGlvbnMsIGl0IGNhbiBnZXQgdGVkaW91cyBoYXZpbmcgdG9cbiAqICB1bnN1YnNjcmliZSBmcm9tIGFsbCBvZiB0aGVtLCBhbmQgeW91IG1pZ2h0IGZvcmdldC4gQSBjb21tb24gcGF0dGVybiBpcyB0byBjcmVhdGUgYW4gUnhKUyBTdWJzY3JpcHRpb25cbiAqICAobWF5YmUgY2FsbGVkIGBkZXN0cm95YCksIHRvIHVzZSBgdGhpcy5kZXN0cm95LmFkZCh4eHguc3Vic2NyaWJlKC4uLikpYFxuICogIGFuZCB0byBjYWxsIGBkZXN0cm95LnVuc3Vic2NyaWJlKClgIG9uY2UgdG8gY2xlYW4gdXAgYWxsIG9mIHRoZW0uIEByZWRuYXgvY29yZVxuICogIHN1cHBvcnRzIHRoaXMgcGF0dGVybiB3aXRoIGJ5IHVzaW5nIHRoZSBgc3Vic2NyaXB0aW9uYCBwYXJhbWV0ZXIgb24gdGhlXG4gKiAgY29uc3RydWN0b3JzLiBTaW1wbHk6XG4gKlxuYGBgdHlwZXNjcmlwdFxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG4vLyAuLi5cbmRlc3Ryb3kgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG50YXJnZXQgPSB0aGlzLmRuZC5kcm9wVGFyZ2V0KHtcbiAgLy8gLi4uXG59LCB0aGlzLmRlc3Ryb3kpO1xubmdPbkRlc3Ryb3koKSB7IHRoaXMuZGVzdHJveS51bnN1YnNjcmliZSgpOyB9XG5gYGBcbiAqXG4gKiBJdCBpcyBhIGdvb2QgaGFiaXQgZm9yIGF2b2lkaW5nIGxlYWtlZCBzdWJzY3JpcHRpb25zLCBiZWNhdXNlIC5cbiAqL1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2t5aG9va0RuZFNlcnZpY2Uge1xuICAgIC8qKiBAaWdub3JlICovXG4gICAgcHJpdmF0ZSBza3lob29rWm9uZTogWm9uZSA9IFpvbmUucm9vdC5mb3JrKHtcbiAgICAgICAgbmFtZTogJ3NreWhvb2tab25lJyxcbiAgICAgICAgb25IYXNUYXNrOiAoX3BhcmVudFpvbmVEZWxlZ2F0ZSwgX2N1cnJlbnRab25lLCBfdGFyZ2V0Wm9uZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UndmUgfCBkcmFpbmVkIHRoZSBtaWNyb1Rhc2sgcXVldWU7IG9yICAgICAgICAgICAgICAgICAgICB8IC4uLiBydW4gYSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLlxuICAgICAgICAgICAgLy8gICAgICAgICAgICB8IGV4ZWN1dGVkIG9yIGNhbmNlbGxlZCBhIG1hY3JvVGFzayAoZWcgYSB0aW1lcik7IG9yIHxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfCBoYW5kbGVkIGFuIGV2ZW50ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG5cbiAgICAgICAgICAgIC8vIG5vdGU6IHdlIG11c3QgdXNlIG5nWm9uZS5ydW4oKSBpbnN0ZWFkIG9mIEFwcGxpY2F0aW9uUmVmLnRpY2soKVxuICAgICAgICAgICAgLy8gdGhpcyBpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyAxLiB0aGlzIGNhbGxiYWNrIHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lXG4gICAgICAgICAgICAvLyAyLiB0aGVyZWZvcmUgaWYgeW91IHVzZSBhcHBSZWYudGljaygpLCB0aGUgZXZlbnQgaGFuZGxlcnMgc2V0IHVwIGR1cmluZyB0aGUgdGljaygpIGFyZVxuICAgICAgICAgICAgLy8gICAgbm90IGluIHRoZSBhbmd1bGFyIHpvbmUsIGV2ZW4gdGhvdWdoIGFueXRoaW5nIHNldCB1cCBkdXJpbmcgdGljaygpIHNob3VsZCBiZVxuICAgICAgICAgICAgLy8gMy4gdGhlcmVmb3JlIHlvdSBnZXQgcmVndWxhciAoY2xpY2spIGhhbmRsZXJzIGZyb20gdGVtcGxhdGVzIHJ1bm5pbmcgaW4gc2t5aG9va1pvbmVcbiAgICAgICAgICAgIC8vICAgIGFuZCBub3QgY2F1c2luZyBjaGFuZ2UgZGV0ZWN0aW9uXG5cbiAgICAgICAgICAgIC8vIEFsc28sIG5vdyB3ZSB3YXRjaCBmb3IgbWFjcm9UYXNrcyBhcyB3ZWxsLlxuICAgICAgICAgICAgLy8gVGhpcyBtZWFucyBpZiB3ZSBzZXQgdXAgdGltZXJzIGluIHRoZSBza3lob29rIHpvbmUsIHRoZXkgd2lsbCBmaXJlIGFuZCBjYXVzZSBjaGFuZ2VcbiAgICAgICAgICAgIC8vIGRldGVjdGlvbi4gVXNlZnVsIGlmIGRvaW5nIC5saXN0ZW4oLi4uKS5kZWxheSgxMDAwKSBhbmQgdGhlIHJlc3VsdGluZyBhc3luY2hyb25vdXNcbiAgICAgICAgICAgIC8vIHN1YnNjcmliZXJzLlxuICAgICAgICAgICAgLy8gQXBwcm9wcmlhdGVseSwgd2UgcnVuIG1vcmUgc2V0dXAgaGFuZGxlcnMgaW4gc2t5aG9va1pvbmUgbm93LlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFByb3BlciBldmVudCBoYW5kbGVycyAoc2V0IHVwIGJ5IHRoZSBiYWNrZW5kKSBkb24ndCB0cmlnZ2VyIGFueSwgYmVjYXVzZSBza3lob29rWm9uZVxuICAgICAgICAgICAgLy8gb25seSBjYXJlcyBhYm91dCAjIG9mIGhhbmRsZXJzIGNoYW5naW5nID0+IDAuIEJ1dCBpZiB3ZSBjYXJlIGFib3V0IHRoZW0sIGl0IHdpbGwgYmVcbiAgICAgICAgICAgIC8vIHRocm91Z2ggbGlzdGVuKCksIHVwZGF0ZXMgdG8gd2hpY2ggd2lsbCBzY2hlZHVsZSBhIG1pY3JvVGFzay5cblxuICAgICAgICAgICAgaWYgKCFzdGF0ZVtzdGF0ZS5jaGFuZ2VdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9vcCwgYnV0IGNhdXNlcyBjaGFuZ2UgZGV0ZWN0aW9uIChpLmUuIG9uTGVhdmUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIG9uSW52b2tlVGFzazogKHpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmUsIHRhcmdldFpvbmUsIHRhc2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzKSA9PiB7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gb25TY2hlZHVsZVRhc2socGFyZW50Wm9uZURlbGVnYXRlLCBjdXJyZW50Wm9uZSwgdGFyZ2V0Wm9uZSwgdGFzaykge1xuICAgICAgICAvLyAgIHJldHVybiBwYXJlbnRab25lRGVsZWdhdGUuc2NoZWR1bGVUYXNrKHRhcmdldFpvbmUsIHRhc2spO1xuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBvbkludm9rZTogKHBhcmVudFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmUsIHRhcmdldFpvbmUsIGRlbGVnYXRlLCBhcHBseVRoaXMsIGFwcGx5QXJncywgc291cmNlKSA9PiB7XG4gICAgICAgIC8vIH1cbiAgICB9KTtcblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoRFJBR19EUk9QX01BTkFHRVIpIHByaXZhdGUgbWFuYWdlcjogRHJhZ0Ryb3BNYW5hZ2VyLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBkcm9wIHRhcmdldCB3aWxsIG9ubHkgcmVhY3QgdG8gdGhlIGl0ZW1zIHByb2R1Y2VkIGJ5IHRoZSBkcmFnIHNvdXJjZXNcbiAgICAgKiBvZiB0aGUgc3BlY2lmaWVkIHR5cGUgb3IgdHlwZXMuXG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCBhIGR5bmFtaWMgdHlwZSwgcGFzcyBgbnVsbGAgYXMgdGhlIHR5cGU7IGFuZCBjYWxsXG4gICAgICoge0BsaW5rIERyb3BUYXJnZXQjc2V0VHlwZXN9IGluIGEgbGlmZWN5Y2xlIGhvb2suXG4gICAgICovXG4gICAgcHVibGljIGRyb3BUYXJnZXQ8SXRlbSA9IHt9LCBEcm9wUmVzdWx0ID0ge30+KFxuICAgICAgICB0eXBlczogVHlwZU9yVHlwZUFycmF5IHwgbnVsbCxcbiAgICAgICAgc3BlYzogRHJvcFRhcmdldFNwZWM8SXRlbSwgRHJvcFJlc3VsdD4sXG4gICAgICAgIHN1YnNjcmlwdGlvbj86IEFkZFN1YnNjcmlwdGlvblxuICAgICk6IERyb3BUYXJnZXQ8SXRlbSwgRHJvcFJlc3VsdD4ge1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5za3lob29rWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlVGFyZ2V0OiBhbnkgPSBjcmVhdGVUYXJnZXRGYWN0b3J5KFxuICAgICAgICAgICAgICAgIHNwZWMsXG4gICAgICAgICAgICAgICAgdGhpcy5za3lob29rWm9uZVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgY29ubjogYW55ID0gbmV3IFRhcmdldENvbm5lY3Rpb24oXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVIYW5kbGVyOiBjcmVhdGVUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVySGFuZGxlcjogcmVnaXN0ZXJUYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1vbml0b3I6IGNyZWF0ZVRhcmdldE1vbml0b3IsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbm5lY3RvcjogY3JlYXRlVGFyZ2V0Q29ubmVjdG9yLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLFxuICAgICAgICAgICAgICAgIHRoaXMuc2t5aG9va1pvbmUsXG4gICAgICAgICAgICAgICAgdHlwZXMgfHwgVFlQRV9EWU5BTUlDXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmFkZChjb25uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25uO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogVGhpcyBtZXRob2QgY3JlYXRlcyBhIHtAbGluayBEcmFnU291cmNlfSBvYmplY3QuIEl0IHJlcHJlc2VudHMgYSBkcmFnXG4gICAgICogIHNvdXJjZSBhbmQgaXRzIGJlaGF2aW91ciwgYW5kIGNhbiBiZSBjb25uZWN0ZWQgdG8gYSBET00gZWxlbWVudCBieVxuICAgICAqICBhc3NpZ25pbmcgaXQgdG8gdGhlIGBbZHJhZ1NvdXJjZV1gIGRpcmVjdGl2ZSBvbiB0aGF0IGVsZW1lbnQgaW4geW91clxuICAgICAqICB0ZW1wbGF0ZS5cbiAgICAgKlxuICAgICAqIEl0IGlzIHRoZSBjb3JvbGxhcnkgb2YgW2ByZWFjdC1kbmRgJ3NcbiAgICAgKiBgRHJhZ1NvdXJjZWBdKGh0dHA6Ly9yZWFjdC1kbmQuZ2l0aHViLmlvL3JlYWN0LWRuZC9kb2NzLWRyYWctc291cmNlLmh0bWwpLlxuICAgICAqXG4gICAgICogVGhlIGBzcGVjYCBhcmd1bWVudCAoe0BsaW5rIERyYWdTb3VyY2VTcGVjfSkgaXMgYSBzZXQgb2YgX3F1ZXJpZXNfIGFuZFxuICAgICAqIF9jYWxsYmFja3NfIHRoYXQgYXJlIGNhbGxlZCBhdCBhcHByb3ByaWF0ZSB0aW1lcyBieSB0aGUgaW50ZXJuYWxzLiBUaGVcbiAgICAgKiBxdWVyaWVzIGFyZSBmb3IgYXNraW5nIHlvdXIgY29tcG9uZW50IHdoZXRoZXIgdG8gZHJhZy9saXN0ZW4gYW5kIHdoYXRcbiAgICAgKiBpdGVtIGRhdGEgdG8gaG9pc3QgdXA7IHRoZSBjYWxsYmFjayAoanVzdCAxKSBpcyBmb3Igbm90aWZ5aW5nIHlvdSB3aGVuXG4gICAgICogdGhlIGRyYWcgZW5kcy5cbiAgICAgKlxuICAgICAqIE9ubHkgdGhlIGRyb3AgdGFyZ2V0cyByZWdpc3RlcmVkIGZvciB0aGUgc2FtZSB0eXBlIHdpbGxcbiAgICAgKiByZWFjdCB0byB0aGUgaXRlbXMgcHJvZHVjZWQgYnkgdGhpcyBkcmFnIHNvdXJjZS4gSWYgeW91IHdhbnQgYSBkeW5hbWljXG4gICAgICogdHlwZSwgcGFzcyBgbnVsbGAgYXMgdGhlIHR5cGU7IGFuZCBjYWxsIHtAbGluayBEcmFnU291cmNlI3NldFR5cGV9IGluXG4gICAgICogYSBsaWZlY3ljbGUgaG9vay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdWJzY3JpcHRpb24gQW4gUnhKUyBTdWJzY3JpcHRpb24gdG8gdGllIHRoZSBsaWZldGltZSBvZiB0aGVcbiAgICAgKiBjb25uZWN0aW9uIHRvLlxuICAgICAqL1xuXG4gICAgcHVibGljIGRyYWdTb3VyY2U8SXRlbSwgRHJvcFJlc3VsdCA9IHt9PihcbiAgICAgICAgdHlwZTogc3RyaW5nIHwgc3ltYm9sIHwgbnVsbCxcbiAgICAgICAgc3BlYzogRHJhZ1NvdXJjZVNwZWM8SXRlbSwgRHJvcFJlc3VsdD4sXG4gICAgICAgIHN1YnNjcmlwdGlvbj86IEFkZFN1YnNjcmlwdGlvblxuICAgICk6IERyYWdTb3VyY2U8SXRlbSwgRHJvcFJlc3VsdD4ge1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5za3lob29rWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlU291cmNlID0gY3JlYXRlU291cmNlRmFjdG9yeShzcGVjLCB0aGlzLnNreWhvb2tab25lKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbm4gPSBuZXcgU291cmNlQ29ubmVjdGlvbihcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUhhbmRsZXI6IGNyZWF0ZVNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJIYW5kbGVyOiByZWdpc3RlclNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTW9uaXRvcjogY3JlYXRlU291cmNlTW9uaXRvcixcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29ubmVjdG9yOiBjcmVhdGVTb3VyY2VDb25uZWN0b3IsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIsXG4gICAgICAgICAgICAgICAgdGhpcy5za3lob29rWm9uZSxcbiAgICAgICAgICAgICAgICB0eXBlIHx8IFRZUEVfRFlOQU1JQ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uYWRkKGNvbm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbm47XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYSB7QGxpbmsgRHJhZ0xheWVyfSBvYmplY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgZHJhZ0xheWVyPEl0ZW0gPSBhbnk+KFxuICAgICAgICBzdWJzY3JpcHRpb24/OiBBZGRTdWJzY3JpcHRpb25cbiAgICApOiBEcmFnTGF5ZXI8SXRlbT4ge1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5za3lob29rWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29ubiA9IG5ldyBEcmFnTGF5ZXJDb25uZWN0aW9uQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLFxuICAgICAgICAgICAgICAgIHRoaXMuc2t5aG9va1pvbmVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmFkZChjb25uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25uO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=