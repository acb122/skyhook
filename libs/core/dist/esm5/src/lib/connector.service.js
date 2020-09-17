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
var SkyhookDndService = /** @class */ (function () {
    /** @ignore */
    function SkyhookDndService(manager, ngZone) {
        var _this = this;
        this.manager = manager;
        this.ngZone = ngZone;
        /** @ignore */
        this.skyhookZone = Zone.root.fork({
            name: 'skyhookZone',
            onHasTask: function (_parentZoneDelegate, _currentZone, _targetZone, state) {
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
                    _this.ngZone.run(function () {
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
    SkyhookDndService.prototype.dropTarget = function (types, spec, subscription) {
        var _this = this;
        // return this.ngZone.runOutsideAngular(() => {
        return this.skyhookZone.run(function () {
            var createTarget = createTargetFactory(spec, _this.skyhookZone);
            var conn = new TargetConnection({
                createHandler: createTarget,
                registerHandler: registerTarget,
                createMonitor: createTargetMonitor,
                createConnector: createTargetConnector,
            }, _this.manager, _this.skyhookZone, types || TYPE_DYNAMIC);
            if (subscription) {
                subscription.add(conn);
            }
            return conn;
        });
    };
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
    SkyhookDndService.prototype.dragSource = function (type, spec, subscription) {
        var _this = this;
        // return this.ngZone.runOutsideAngular(() => {
        return this.skyhookZone.run(function () {
            var createSource = createSourceFactory(spec, _this.skyhookZone);
            var conn = new SourceConnection({
                createHandler: createSource,
                registerHandler: registerSource,
                createMonitor: createSourceMonitor,
                createConnector: createSourceConnector,
            }, _this.manager, _this.skyhookZone, type || TYPE_DYNAMIC);
            if (subscription) {
                subscription.add(conn);
            }
            return conn;
        });
    };
    /**
     * This method creates a {@link DragLayer} object
     */
    SkyhookDndService.prototype.dragLayer = function (subscription) {
        var _this = this;
        // return this.ngZone.runOutsideAngular(() => {
        return this.skyhookZone.run(function () {
            var conn = new DragLayerConnectionClass(_this.manager, _this.skyhookZone);
            if (subscription) {
                subscription.add(conn);
            }
            return conn;
        });
    };
    SkyhookDndService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DRAG_DROP_MANAGER,] }] },
        { type: NgZone }
    ]; };
    SkyhookDndService.decorators = [
        { type: Injectable }
    ];
    SkyhookDndService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DRAG_DROP_MANAGER,] }] },
        { type: NgZone }
    ]; };
    return SkyhookDndService;
}());
export { SkyhookDndService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcmVkbmF4L2NvcmUvIiwic291cmNlcyI6WyJzcmMvbGliL2Nvbm5lY3Rvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsdUJBQXVCO0FBRXZCLGlDQUFpQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUkzRCxPQUFPLHFCQUFxQixNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sY0FBYyxNQUFNLDRCQUE0QixDQUFDO0FBR3hELE9BQU8scUJBQXFCLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxjQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsT0FBTztBQUNILDJCQUEyQjtBQUMzQiwyQkFBMkI7QUFDM0IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixHQUNuQixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBV3JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUg7SUEyQ0ksY0FBYztJQUNkLDJCQUN1QyxPQUF3QixFQUNuRCxNQUFjO1FBRjFCLGlCQUdJO1FBRm1DLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ25ELFdBQU0sR0FBTixNQUFNLENBQVE7UUE1QzFCLGNBQWM7UUFDTixnQkFB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QUM7WUFDRixJQUFJLFlBQVksRUFBRTtnQkFDZCxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztnREE1R0ksTUFBTSxTQUFDLGlCQUFpQjtnQkFDVCxNQUFNOzs7Z0JBOUM3QixVQUFVOzs7Z0RBNkNGLE1BQU0sU0FBQyxpQkFBaUI7Z0JBdkdKLE1BQU07O0lBb05uQyx3QkFBQztDQUFBLEFBMUpELElBMEpDO1NBekpZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZSAxLVRvcC1MZXZlbFxuICovXG4vKiogYSBzZWNvbmQgY29tbWVudCAqL1xuXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInpvbmUuanNcIiAvPlxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRZUEVfRFlOQU1JQywgRFJBR19EUk9QX01BTkFHRVIgfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBEcmFnRHJvcE1hbmFnZXIgfSBmcm9tICdkbmQtY29yZSc7XG5cbmltcG9ydCB7IERyb3BUYXJnZXRTcGVjIH0gZnJvbSAnLi9kcm9wLXRhcmdldC1zcGVjaWZpY2F0aW9uJztcbmltcG9ydCBjcmVhdGVUYXJnZXRDb25uZWN0b3IgZnJvbSAnLi9pbnRlcm5hbC9jcmVhdGVUYXJnZXRDb25uZWN0b3InO1xuaW1wb3J0IHJlZ2lzdGVyVGFyZ2V0IGZyb20gJy4vaW50ZXJuYWwvcmVnaXN0ZXItdGFyZ2V0JztcblxuaW1wb3J0IHsgRHJhZ1NvdXJjZVNwZWMgfSBmcm9tICcuL2RyYWctc291cmNlLXNwZWNpZmljYXRpb24nO1xuaW1wb3J0IGNyZWF0ZVNvdXJjZUNvbm5lY3RvciBmcm9tICcuL2ludGVybmFsL2NyZWF0ZVNvdXJjZUNvbm5lY3Rvcic7XG5pbXBvcnQgcmVnaXN0ZXJTb3VyY2UgZnJvbSAnLi9pbnRlcm5hbC9yZWdpc3Rlci1zb3VyY2UnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb25MaWtlLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUeXBlT3JUeXBlQXJyYXkgfSBmcm9tICcuL3R5cGUtaXNoJztcbmltcG9ydCB7XG4gICAgLy8gc291cmNlQ29ubmVjdGlvbkZhY3RvcnksXG4gICAgLy8gdGFyZ2V0Q29ubmVjdGlvbkZhY3RvcnksXG4gICAgU291cmNlQ29ubmVjdGlvbixcbiAgICBUYXJnZXRDb25uZWN0aW9uLFxufSBmcm9tICcuL2ludGVybmFsL2Nvbm5lY3Rpb24tZmFjdG9yeSc7XG5pbXBvcnQgeyBEcmFnTGF5ZXJDb25uZWN0aW9uQ2xhc3MgfSBmcm9tICcuL2ludGVybmFsL2RyYWctbGF5ZXItY29ubmVjdGlvbic7XG5cbmltcG9ydCB7IERyYWdTb3VyY2UsIERyb3BUYXJnZXQsIERyYWdMYXllciB9IGZyb20gJy4vY29ubmVjdGlvbi10eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVTb3VyY2VNb25pdG9yIH0gZnJvbSAnLi9pbnRlcm5hbC9jcmVhdGVTb3VyY2VNb25pdG9yJztcbmltcG9ydCB7IGNyZWF0ZVRhcmdldEZhY3RvcnkgfSBmcm9tICcuL2ludGVybmFsL2NyZWF0ZVRhcmdldEZhY3RvcnknO1xuaW1wb3J0IHsgY3JlYXRlVGFyZ2V0TW9uaXRvciB9IGZyb20gJy4vaW50ZXJuYWwvY3JlYXRlVGFyZ2V0TW9uaXRvcic7XG5pbXBvcnQgeyBjcmVhdGVTb3VyY2VGYWN0b3J5IH0gZnJvbSAnLi9pbnRlcm5hbC9jcmVhdGVTb3VyY2VGYWN0b3J5JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFJ4SlMgU3Vic2NyaXB0aW9uLCB3aXRoIG11bHRpLXZlcnNpb24gY29tcGF0aWJpbGl0eS5cbiAqIFRoZSBzdGFuZGFyZCBTdWJzY3JpcHRpb25MaWtlIGRvZXMgbm90IGNvbnRhaW4gYW4gYWRkKCkgbWV0aG9kLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFkZFN1YnNjcmlwdGlvbiBleHRlbmRzIFN1YnNjcmlwdGlvbkxpa2Uge1xuICAgIC8qKiBTYW1lIGFzIFJ4SlMgYFN1YnNjcmlwdGlvbiNhZGRgICovXG4gICAgYWRkKHRlYXJkb3duTG9naWM6IFRlYXJkb3duTG9naWMpOiBBZGRTdWJzY3JpcHRpb247XG59XG5cbi8qKiBGb3IgYSBzaW1wbGUgY29tcG9uZW50LCB1bnN1YnNjcmliaW5nIGlzIGFzIGVhc3kgYXMgYGNvbm5lY3Rpb24udW5zdWJzY3JpYmUoKWAgaW4gYG5nT25EZXN0cm95KClgXG4gKiAgSWYgeW91ciBjb21wb25lbnRzIGhhdmUgbG90cyBvZiBzdWJzY3JpcHRpb25zLCBpdCBjYW4gZ2V0IHRlZGlvdXMgaGF2aW5nIHRvXG4gKiAgdW5zdWJzY3JpYmUgZnJvbSBhbGwgb2YgdGhlbSwgYW5kIHlvdSBtaWdodCBmb3JnZXQuIEEgY29tbW9uIHBhdHRlcm4gaXMgdG8gY3JlYXRlIGFuIFJ4SlMgU3Vic2NyaXB0aW9uXG4gKiAgKG1heWJlIGNhbGxlZCBgZGVzdHJveWApLCB0byB1c2UgYHRoaXMuZGVzdHJveS5hZGQoeHh4LnN1YnNjcmliZSguLi4pKWBcbiAqICBhbmQgdG8gY2FsbCBgZGVzdHJveS51bnN1YnNjcmliZSgpYCBvbmNlIHRvIGNsZWFuIHVwIGFsbCBvZiB0aGVtLiBAcmVkbmF4L2NvcmVcbiAqICBzdXBwb3J0cyB0aGlzIHBhdHRlcm4gd2l0aCBieSB1c2luZyB0aGUgYHN1YnNjcmlwdGlvbmAgcGFyYW1ldGVyIG9uIHRoZVxuICogIGNvbnN0cnVjdG9ycy4gU2ltcGx5OlxuICpcbmBgYHR5cGVzY3JpcHRcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuLy8gLi4uXG5kZXN0cm95ID0gbmV3IFN1YnNjcmlwdGlvbigpO1xudGFyZ2V0ID0gdGhpcy5kbmQuZHJvcFRhcmdldCh7XG4gIC8vIC4uLlxufSwgdGhpcy5kZXN0cm95KTtcbm5nT25EZXN0cm95KCkgeyB0aGlzLmRlc3Ryb3kudW5zdWJzY3JpYmUoKTsgfVxuYGBgXG4gKlxuICogSXQgaXMgYSBnb29kIGhhYml0IGZvciBhdm9pZGluZyBsZWFrZWQgc3Vic2NyaXB0aW9ucywgYmVjYXVzZSAuXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNreWhvb2tEbmRTZXJ2aWNlIHtcbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIHByaXZhdGUgc2t5aG9va1pvbmU6IFpvbmUgPSBab25lLnJvb3QuZm9yayh7XG4gICAgICAgIG5hbWU6ICdza3lob29rWm9uZScsXG4gICAgICAgIG9uSGFzVGFzazogKF9wYXJlbnRab25lRGVsZWdhdGUsIF9jdXJyZW50Wm9uZSwgX3RhcmdldFpvbmUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAvLyB3aGVuIHdlJ3ZlIHwgZHJhaW5lZCB0aGUgbWljcm9UYXNrIHF1ZXVlOyBvciAgICAgICAgICAgICAgICAgICAgfCAuLi4gcnVuIGEgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfCBleGVjdXRlZCBvciBjYW5jZWxsZWQgYSBtYWNyb1Rhc2sgKGVnIGEgdGltZXIpOyBvciB8XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHwgaGFuZGxlZCBhbiBldmVudCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuXG4gICAgICAgICAgICAvLyBub3RlOiB3ZSBtdXN0IHVzZSBuZ1pvbmUucnVuKCkgaW5zdGVhZCBvZiBBcHBsaWNhdGlvblJlZi50aWNrKClcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gMS4gdGhpcyBjYWxsYmFjayBydW5zIG91dHNpZGUgdGhlIGFuZ3VsYXIgem9uZVxuICAgICAgICAgICAgLy8gMi4gdGhlcmVmb3JlIGlmIHlvdSB1c2UgYXBwUmVmLnRpY2soKSwgdGhlIGV2ZW50IGhhbmRsZXJzIHNldCB1cCBkdXJpbmcgdGhlIHRpY2soKSBhcmVcbiAgICAgICAgICAgIC8vICAgIG5vdCBpbiB0aGUgYW5ndWxhciB6b25lLCBldmVuIHRob3VnaCBhbnl0aGluZyBzZXQgdXAgZHVyaW5nIHRpY2soKSBzaG91bGQgYmVcbiAgICAgICAgICAgIC8vIDMuIHRoZXJlZm9yZSB5b3UgZ2V0IHJlZ3VsYXIgKGNsaWNrKSBoYW5kbGVycyBmcm9tIHRlbXBsYXRlcyBydW5uaW5nIGluIHNreWhvb2tab25lXG4gICAgICAgICAgICAvLyAgICBhbmQgbm90IGNhdXNpbmcgY2hhbmdlIGRldGVjdGlvblxuXG4gICAgICAgICAgICAvLyBBbHNvLCBub3cgd2Ugd2F0Y2ggZm9yIG1hY3JvVGFza3MgYXMgd2VsbC5cbiAgICAgICAgICAgIC8vIFRoaXMgbWVhbnMgaWYgd2Ugc2V0IHVwIHRpbWVycyBpbiB0aGUgc2t5aG9vayB6b25lLCB0aGV5IHdpbGwgZmlyZSBhbmQgY2F1c2UgY2hhbmdlXG4gICAgICAgICAgICAvLyBkZXRlY3Rpb24uIFVzZWZ1bCBpZiBkb2luZyAubGlzdGVuKC4uLikuZGVsYXkoMTAwMCkgYW5kIHRoZSByZXN1bHRpbmcgYXN5bmNocm9ub3VzXG4gICAgICAgICAgICAvLyBzdWJzY3JpYmVycy5cbiAgICAgICAgICAgIC8vIEFwcHJvcHJpYXRlbHksIHdlIHJ1biBtb3JlIHNldHVwIGhhbmRsZXJzIGluIHNreWhvb2tab25lIG5vdy5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBQcm9wZXIgZXZlbnQgaGFuZGxlcnMgKHNldCB1cCBieSB0aGUgYmFja2VuZCkgZG9uJ3QgdHJpZ2dlciBhbnksIGJlY2F1c2Ugc2t5aG9va1pvbmVcbiAgICAgICAgICAgIC8vIG9ubHkgY2FyZXMgYWJvdXQgIyBvZiBoYW5kbGVycyBjaGFuZ2luZyA9PiAwLiBCdXQgaWYgd2UgY2FyZSBhYm91dCB0aGVtLCBpdCB3aWxsIGJlXG4gICAgICAgICAgICAvLyB0aHJvdWdoIGxpc3RlbigpLCB1cGRhdGVzIHRvIHdoaWNoIHdpbGwgc2NoZWR1bGUgYSBtaWNyb1Rhc2suXG5cbiAgICAgICAgICAgIGlmICghc3RhdGVbc3RhdGUuY2hhbmdlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5vb3AsIGJ1dCBjYXVzZXMgY2hhbmdlIGRldGVjdGlvbiAoaS5lLiBvbkxlYXZlKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBvbkludm9rZVRhc2s6ICh6b25lRGVsZWdhdGUsIGN1cnJlbnRab25lLCB0YXJnZXRab25lLCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncykgPT4ge1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIG9uU2NoZWR1bGVUYXNrKHBhcmVudFpvbmVEZWxlZ2F0ZSwgY3VycmVudFpvbmUsIHRhcmdldFpvbmUsIHRhc2spIHtcbiAgICAgICAgLy8gICByZXR1cm4gcGFyZW50Wm9uZURlbGVnYXRlLnNjaGVkdWxlVGFzayh0YXJnZXRab25lLCB0YXNrKTtcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gb25JbnZva2U6IChwYXJlbnRab25lRGVsZWdhdGUsIGN1cnJlbnRab25lLCB0YXJnZXRab25lLCBkZWxlZ2F0ZSwgYXBwbHlUaGlzLCBhcHBseUFyZ3MsIHNvdXJjZSkgPT4ge1xuICAgICAgICAvLyB9XG4gICAgfSk7XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERSQUdfRFJPUF9NQU5BR0VSKSBwcml2YXRlIG1hbmFnZXI6IERyYWdEcm9wTWFuYWdlcixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZHJvcCB0YXJnZXQgd2lsbCBvbmx5IHJlYWN0IHRvIHRoZSBpdGVtcyBwcm9kdWNlZCBieSB0aGUgZHJhZyBzb3VyY2VzXG4gICAgICogb2YgdGhlIHNwZWNpZmllZCB0eXBlIG9yIHR5cGVzLlxuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgYSBkeW5hbWljIHR5cGUsIHBhc3MgYG51bGxgIGFzIHRoZSB0eXBlOyBhbmQgY2FsbFxuICAgICAqIHtAbGluayBEcm9wVGFyZ2V0I3NldFR5cGVzfSBpbiBhIGxpZmVjeWNsZSBob29rLlxuICAgICAqL1xuICAgIHB1YmxpYyBkcm9wVGFyZ2V0PEl0ZW0gPSB7fSwgRHJvcFJlc3VsdCA9IHt9PihcbiAgICAgICAgdHlwZXM6IFR5cGVPclR5cGVBcnJheSB8IG51bGwsXG4gICAgICAgIHNwZWM6IERyb3BUYXJnZXRTcGVjPEl0ZW0sIERyb3BSZXN1bHQ+LFxuICAgICAgICBzdWJzY3JpcHRpb24/OiBBZGRTdWJzY3JpcHRpb25cbiAgICApOiBEcm9wVGFyZ2V0PEl0ZW0sIERyb3BSZXN1bHQ+IHtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2t5aG9va1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVRhcmdldDogYW55ID0gY3JlYXRlVGFyZ2V0RmFjdG9yeShcbiAgICAgICAgICAgICAgICBzcGVjLFxuICAgICAgICAgICAgICAgIHRoaXMuc2t5aG9va1pvbmVcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbm46IGFueSA9IG5ldyBUYXJnZXRDb25uZWN0aW9uKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlSGFuZGxlcjogY3JlYXRlVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlckhhbmRsZXI6IHJlZ2lzdGVyVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVNb25pdG9yOiBjcmVhdGVUYXJnZXRNb25pdG9yLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDb25uZWN0b3I6IGNyZWF0ZVRhcmdldENvbm5lY3RvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlcixcbiAgICAgICAgICAgICAgICB0aGlzLnNreWhvb2tab25lLFxuICAgICAgICAgICAgICAgIHR5cGVzIHx8IFRZUEVfRFlOQU1JQ1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoY29ubik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29ubjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYSB7QGxpbmsgRHJhZ1NvdXJjZX0gb2JqZWN0LiBJdCByZXByZXNlbnRzIGEgZHJhZ1xuICAgICAqICBzb3VyY2UgYW5kIGl0cyBiZWhhdmlvdXIsIGFuZCBjYW4gYmUgY29ubmVjdGVkIHRvIGEgRE9NIGVsZW1lbnQgYnlcbiAgICAgKiAgYXNzaWduaW5nIGl0IHRvIHRoZSBgW2RyYWdTb3VyY2VdYCBkaXJlY3RpdmUgb24gdGhhdCBlbGVtZW50IGluIHlvdXJcbiAgICAgKiAgdGVtcGxhdGUuXG4gICAgICpcbiAgICAgKiBJdCBpcyB0aGUgY29yb2xsYXJ5IG9mIFtgcmVhY3QtZG5kYCdzXG4gICAgICogYERyYWdTb3VyY2VgXShodHRwOi8vcmVhY3QtZG5kLmdpdGh1Yi5pby9yZWFjdC1kbmQvZG9jcy1kcmFnLXNvdXJjZS5odG1sKS5cbiAgICAgKlxuICAgICAqIFRoZSBgc3BlY2AgYXJndW1lbnQgKHtAbGluayBEcmFnU291cmNlU3BlY30pIGlzIGEgc2V0IG9mIF9xdWVyaWVzXyBhbmRcbiAgICAgKiBfY2FsbGJhY2tzXyB0aGF0IGFyZSBjYWxsZWQgYXQgYXBwcm9wcmlhdGUgdGltZXMgYnkgdGhlIGludGVybmFscy4gVGhlXG4gICAgICogcXVlcmllcyBhcmUgZm9yIGFza2luZyB5b3VyIGNvbXBvbmVudCB3aGV0aGVyIHRvIGRyYWcvbGlzdGVuIGFuZCB3aGF0XG4gICAgICogaXRlbSBkYXRhIHRvIGhvaXN0IHVwOyB0aGUgY2FsbGJhY2sgKGp1c3QgMSkgaXMgZm9yIG5vdGlmeWluZyB5b3Ugd2hlblxuICAgICAqIHRoZSBkcmFnIGVuZHMuXG4gICAgICpcbiAgICAgKiBPbmx5IHRoZSBkcm9wIHRhcmdldHMgcmVnaXN0ZXJlZCBmb3IgdGhlIHNhbWUgdHlwZSB3aWxsXG4gICAgICogcmVhY3QgdG8gdGhlIGl0ZW1zIHByb2R1Y2VkIGJ5IHRoaXMgZHJhZyBzb3VyY2UuIElmIHlvdSB3YW50IGEgZHluYW1pY1xuICAgICAqIHR5cGUsIHBhc3MgYG51bGxgIGFzIHRoZSB0eXBlOyBhbmQgY2FsbCB7QGxpbmsgRHJhZ1NvdXJjZSNzZXRUeXBlfSBpblxuICAgICAqIGEgbGlmZWN5Y2xlIGhvb2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3Vic2NyaXB0aW9uIEFuIFJ4SlMgU3Vic2NyaXB0aW9uIHRvIHRpZSB0aGUgbGlmZXRpbWUgb2YgdGhlXG4gICAgICogY29ubmVjdGlvbiB0by5cbiAgICAgKi9cblxuICAgIHB1YmxpYyBkcmFnU291cmNlPEl0ZW0sIERyb3BSZXN1bHQgPSB7fT4oXG4gICAgICAgIHR5cGU6IHN0cmluZyB8IHN5bWJvbCB8IG51bGwsXG4gICAgICAgIHNwZWM6IERyYWdTb3VyY2VTcGVjPEl0ZW0sIERyb3BSZXN1bHQ+LFxuICAgICAgICBzdWJzY3JpcHRpb24/OiBBZGRTdWJzY3JpcHRpb25cbiAgICApOiBEcmFnU291cmNlPEl0ZW0sIERyb3BSZXN1bHQ+IHtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2t5aG9va1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVNvdXJjZSA9IGNyZWF0ZVNvdXJjZUZhY3Rvcnkoc3BlYywgdGhpcy5za3lob29rWm9uZSk7XG4gICAgICAgICAgICBjb25zdCBjb25uID0gbmV3IFNvdXJjZUNvbm5lY3Rpb24oXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVIYW5kbGVyOiBjcmVhdGVTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVySGFuZGxlcjogcmVnaXN0ZXJTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1vbml0b3I6IGNyZWF0ZVNvdXJjZU1vbml0b3IsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbm5lY3RvcjogY3JlYXRlU291cmNlQ29ubmVjdG9yLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLFxuICAgICAgICAgICAgICAgIHRoaXMuc2t5aG9va1pvbmUsXG4gICAgICAgICAgICAgICAgdHlwZSB8fCBUWVBFX0RZTkFNSUNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmFkZChjb25uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25uO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGEge0BsaW5rIERyYWdMYXllcn0gb2JqZWN0XG4gICAgICovXG4gICAgcHVibGljIGRyYWdMYXllcjxJdGVtID0gYW55PihcbiAgICAgICAgc3Vic2NyaXB0aW9uPzogQWRkU3Vic2NyaXB0aW9uXG4gICAgKTogRHJhZ0xheWVyPEl0ZW0+IHtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2t5aG9va1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbm4gPSBuZXcgRHJhZ0xheWVyQ29ubmVjdGlvbkNsYXNzKFxuICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlcixcbiAgICAgICAgICAgICAgICB0aGlzLnNreWhvb2tab25lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoY29ubik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29ubjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19