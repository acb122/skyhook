import { InjectionToken, NgZone, Inject, Injectable, ElementRef, Directive, Input, NgModule } from '@angular/core';
import { Subscriber, ReplaySubject, Subscription, BehaviorSubject } from 'rxjs';
import { take, switchMapTo, map, distinctUntilChanged } from 'rxjs/operators';
import { createDragDropManager } from 'dnd-core';

/**
 * @module Misc
 */
/** The injection token for the dnd-core compatible backend currently in use. */
const DRAG_DROP_BACKEND = new InjectionToken('dnd-core compatible backend');
/** The injection token for the dnd-core compatible backend's options. */
const DRAG_DROP_BACKEND_OPTIONS = new InjectionToken('options for dnd-core compatible backend');
/** The injection token for the dnd-core compatible backend currently in use. */
const DRAG_DROP_BACKEND_DEBUG_MODE = new InjectionToken('should dnd-core run in debug mode?');
/** The injection token for the dnd-core DragDropManager */
const DRAG_DROP_MANAGER = new InjectionToken('dnd-core DragDropManager');
/** The injection token for the dnd-core compatible backend currently in use. */
const DRAG_DROP_GLOBAL_CONTEXT = new InjectionToken('dnd-core context');
/** The type a source or target is given as a marker for 'you supplied null as a type',
 *  so that library consumers can be reminded to use setType/setTypes manually.
 *  See {@link DragSource#setType}, {@link DropTarget#setTypes}.
 */
const TYPE_DYNAMIC = Symbol('no type specified, you must provide one with setType/setTypes');

function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    const hasOwn = Object.prototype.hasOwnProperty;
    for (let i = 0; i < keysA.length; i += 1) {
        if (!hasOwn.call(objB, keysA[i]) ||
            objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
        const valA = objA[keysA[i]];
        const valB = objB[keysA[i]];
        if (valA !== valB) {
            return false;
        }
    }
    return true;
}

function areOptionsEqual(nextOptions, currentOptions) {
    if (currentOptions === nextOptions) {
        return true;
    }
    return currentOptions !== null &&
        nextOptions !== null &&
        shallowEqual(currentOptions, nextOptions);
}

class Reconnector {
    constructor(backendConnector) {
        this.backendConnector = backendConnector;
        this.reconnect = (parentHandlerId) => {
            if (this.disconnect) {
                this.disconnect();
                this.disconnect = null;
            }
            this.handlerId = parentHandlerId;
            if (this.handlerId && this.node) {
                this.disconnect = this.backendConnector(this.handlerId, this.node, this.options);
            }
        };
        this.hook = (nativeElement, options) => {
            if (nativeElement === this.node &&
                areOptionsEqual(options, this.options)) {
                return;
            }
            this.node = nativeElement;
            this.options = options;
            this.reconnect(this.handlerId);
        };
    }
}

class TargetConnector {
    constructor(backend) {
        this.backend = backend;
        this.dropTarget = new Reconnector((handlerId, node, options) => {
            return this.backend.connectDropTarget(handlerId, node, options);
        });
        this.hooks = {
            dropTarget: this.dropTarget.hook
        };
    }
    receiveHandlerId(handlerId) {
        if (handlerId === this.currentHandlerId) {
            return;
        }
        this.currentHandlerId = handlerId;
        this.dropTarget.reconnect(handlerId);
    }
    reconnect() {
        this.dropTarget.reconnect(this.currentHandlerId);
    }
}
function createTargetConnector(backend) {
    return new TargetConnector(backend);
}

function registerTarget(type, target, manager) {
    const registry = manager.getRegistry();
    const targetId = registry.addTarget(type, target);
    function unregisterTarget() {
        registry.removeTarget(targetId);
    }
    return {
        handlerId: targetId,
        unregister: unregisterTarget,
    };
}

class SourceConnector {
    constructor(backend) {
        this.backend = backend;
        this.dragSource = new Reconnector((handlerId, node, options) => {
            return this.backend.connectDragSource(handlerId, node, options);
        });
        this.dragPreview = new Reconnector((handlerId, node, options) => {
            return this.backend.connectDragPreview(handlerId, node, options);
        });
        this.hooks = {
            dragSource: this.dragSource.hook,
            dragPreview: this.dragPreview.hook,
        };
    }
    receiveHandlerId(handlerId) {
        if (handlerId === this.currentHandlerId) {
            return;
        }
        this.currentHandlerId = handlerId;
        this.dragSource.reconnect(handlerId);
        this.dragPreview.reconnect(handlerId);
    }
    reconnect() {
        this.dragSource.reconnect(this.currentHandlerId);
        this.dragPreview.reconnect(this.currentHandlerId);
    }
}
function createSourceConnector(backend) {
    return new SourceConnector(backend);
}

function registerSource(type, source, manager) {
    const registry = manager.getRegistry();
    const sourceId = registry.addSource(type, source);
    function unregisterSource() {
        registry.removeSource(sourceId);
    }
    return {
        handlerId: sourceId,
        unregister: unregisterSource,
    };
}

function invariant(assertion, msg) {
    if (!assertion) {
        throw new Error(msg);
    }
}

function areCollectsEqual(a, b) {
    if (a == null || b == null) {
        return false;
    }
    if (typeof a !== 'object' || typeof b !== 'object') {
        return a === b;
    }
    return shallowEqual(a, b);
}

/**
 * @ignore
 * This is an RxJS operator to schedule a microtask just after all
 * the synchronous subscribers have been processed.
 * It's useful because we use `microTasks !== 0` to determine when we are finished
 * processing all the listeners and are ready for Angular to perform change detection.
 */
function scheduleMicroTaskAfter(zone, uTask) {
    return (source) => {
        return source.lift(new RunInZoneOperator(zone, uTask));
    };
}
/**
 * @ignore
 */
class ZoneSubscriber extends Subscriber {
    constructor(destination, zone, uTask = (() => { })) {
        super(destination);
        this.zone = zone;
        this.uTask = uTask;
    }
    _next(val) {
        this.destination.next && this.destination.next(val);
        this.zone.scheduleMicroTask('ZoneSubscriber', this.uTask);
    }
}
/**
 * @ignore
 */
class RunInZoneOperator {
    constructor(zone, uTask) {
        this.zone = zone;
        this.uTask = uTask;
    }
    call(subscriber, source) {
        return source.subscribe(new ZoneSubscriber(subscriber, this.zone, this.uTask));
    }
}

class Connection {
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
const TargetConnection = Connection;
const SourceConnection = Connection;

class DragLayerConnectionClass {
    constructor(manager, zone) {
        this.manager = manager;
        this.zone = zone;
        this.subscription = new Subscription();
        this.isTicking = false;
        this.handleStateChange = () => {
            const monitor = this.manager.getMonitor();
            this.collector$.next(monitor);
        };
        this.handleOffsetChange = () => {
            const monitor = this.manager.getMonitor();
            this.collector$.next(monitor);
        };
        const monitor = this.manager.getMonitor();
        this.collector$ = new BehaviorSubject(monitor);
        this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleOffsetChange);
        this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleStateChange);
        this.subscription.add(() => {
            this.unsubscribeFromOffsetChange();
            this.unsubscribeFromStateChange();
        });
        this.handleStateChange();
    }
    listen(mapFn) {
        return this.collector$.pipe(map(mapFn), distinctUntilChanged(areCollectsEqual), scheduleMicroTaskAfter(this.zone));
    }
    unsubscribe() {
        this.collector$.complete();
        this.subscription.unsubscribe();
    }
    add(teardown) {
        return this.subscription.add(teardown);
    }
    get closed() {
        return this.subscription.closed;
    }
}

let isCallingCanDrag = false;
let isCallingIsDragging = false;
class DragSourceMonitorClass {
    constructor(manager) {
        this.internalMonitor = manager.getMonitor();
    }
    receiveHandlerId(sourceId) {
        this.sourceId = sourceId;
    }
    canDrag() {
        invariant(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');
        try {
            isCallingCanDrag = true;
            return this.internalMonitor.canDragSource(this.sourceId);
        }
        finally {
            isCallingCanDrag = false;
        }
    }
    isDragging() {
        invariant(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');
        try {
            isCallingIsDragging = true;
            return this.internalMonitor.isDraggingSource(this.sourceId);
        }
        finally {
            isCallingIsDragging = false;
        }
    }
    getItemType() {
        return this.internalMonitor.getItemType();
    }
    getItem() {
        return this.internalMonitor.getItem();
    }
    getDropResult() {
        return this.internalMonitor.getDropResult();
    }
    didDrop() {
        return this.internalMonitor.didDrop();
    }
    getInitialClientOffset() {
        return this.internalMonitor.getInitialClientOffset();
    }
    getInitialSourceClientOffset() {
        return this.internalMonitor.getInitialSourceClientOffset();
    }
    getSourceClientOffset() {
        return this.internalMonitor.getSourceClientOffset();
    }
    getClientOffset() {
        return this.internalMonitor.getClientOffset();
    }
    getDifferenceFromInitialOffset() {
        return this.internalMonitor.getDifferenceFromInitialOffset();
    }
}
function createSourceMonitor(manager) {
    return new DragSourceMonitorClass(manager);
}

class Target {
    constructor(spec, zone, monitor) {
        this.spec = spec;
        this.zone = zone;
        this.monitor = monitor;
        this.monitor = monitor;
    }
    withChangeDetection(fn) {
        let x = fn();
        this.zone.scheduleMicroTask('DropTarget', () => { });
        return x;
    }
    receiveMonitor(monitor) {
        this.monitor = monitor;
    }
    canDrop() {
        if (!this.spec.canDrop) {
            return true;
        }
        // don't run isDragging in the zone. Should be a pure function of `this`.
        return this.spec.canDrop(this.monitor);
    }
    hover() {
        if (!this.spec.hover) {
            return;
        }
        this.withChangeDetection(() => {
            this.spec.hover && this.spec.hover(this.monitor);
        });
    }
    drop() {
        if (!this.spec.drop) {
            return undefined;
        }
        return this.withChangeDetection(() => {
            const dropResult = this.spec.drop && this.spec.drop(this.monitor);
            return dropResult;
        });
    }
}
function createTargetFactory(spec, zone) {
    return function createTarget(monitor) {
        return new Target(spec, zone, monitor);
    };
}

let isCallingCanDrop = false;
class DropTargetMonitorClass {
    constructor(manager) {
        this.internalMonitor = manager.getMonitor();
    }
    receiveHandlerId(targetId) {
        this.targetId = targetId;
    }
    canDrop() {
        invariant(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html');
        try {
            isCallingCanDrop = true;
            return this.internalMonitor.canDropOnTarget(this.targetId);
        }
        finally {
            isCallingCanDrop = false;
        }
    }
    isOver(options = { shallow: false }) {
        return this.internalMonitor.isOverTarget(this.targetId, options);
    }
    getItemType() {
        return this.internalMonitor.getItemType();
    }
    getItem() {
        return this.internalMonitor.getItem();
    }
    getDropResult() {
        return this.internalMonitor.getDropResult();
    }
    didDrop() {
        return this.internalMonitor.didDrop();
    }
    getInitialClientOffset() {
        return this.internalMonitor.getInitialClientOffset();
    }
    getInitialSourceClientOffset() {
        return this.internalMonitor.getInitialSourceClientOffset();
    }
    getSourceClientOffset() {
        return this.internalMonitor.getSourceClientOffset();
    }
    getClientOffset() {
        return this.internalMonitor.getClientOffset();
    }
    getDifferenceFromInitialOffset() {
        return this.internalMonitor.getDifferenceFromInitialOffset();
    }
}
function createTargetMonitor(manager) {
    return new DropTargetMonitorClass(manager);
}

class Source {
    constructor(spec, zone, monitor) {
        this.spec = spec;
        this.zone = zone;
        this.monitor = monitor;
    }
    withChangeDetection(fn) {
        let x = fn();
        this.zone.scheduleMicroTask('DragSource', () => { });
        return x;
    }
    canDrag() {
        if (!this.spec.canDrag) {
            return true;
        }
        return this.withChangeDetection(() => {
            return this.spec.canDrag && this.spec.canDrag(this.monitor) || false;
        });
    }
    isDragging(globalMonitor, sourceId) {
        if (!this.spec.isDragging) {
            return sourceId === globalMonitor.getSourceId();
        }
        return this.spec.isDragging(this.monitor);
    }
    beginDrag() {
        return this.withChangeDetection(() => {
            return this.spec.beginDrag(this.monitor);
        });
    }
    endDrag() {
        if (!this.spec.endDrag) {
            return;
        }
        return this.withChangeDetection(() => {
            if (this.spec.endDrag) {
                this.spec.endDrag(this.monitor);
            }
        });
    }
}
function createSourceFactory(spec, zone) {
    return function createSource(monitor) {
        return new Source(spec, zone, monitor);
    };
}

/**
 * @module 1-Top-Level
 */
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
class SkyhookDndService {
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

/** @ignore */
const explanation = 'You can only pass exactly one connection object to [dropTarget]. ' +
    'There is only one of each source/target/preview allowed per DOM element.';
/**
 * @ignore
 */
class DndDirective {
    /** @ignore */
    constructor(elRef, zone) {
        this.elRef = elRef;
        this.zone = zone;
        this.deferredRequest = new Subscription();
    }
    ngOnChanges() {
        invariant(typeof this.connection === 'object' && !Array.isArray(this.connection), explanation);
        this.zone.runOutsideAngular(() => {
            // discard an unresolved connection request
            // in the case where the previous one succeeded, deferredRequest is
            // already closed.
            this.deferredRequest.unsubscribe();
            // replace it with a new one
            if (this.connection) {
                this.deferredRequest = this.callHooks(this.connection);
            }
        });
    }
    ngOnDestroy() { this.deferredRequest.unsubscribe(); }
    // @ts-ignore
    callHooks(conn) {
        return new Subscription();
    }
}
DndDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
DndDirective.decorators = [
    { type: Directive, args: [{
                selector: '[abstractDndDirective]'
            },] }
];
DndDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
// Note: the T | undefined everywhere is from https://github.com/angular/angular-cli/issues/2034
/**
 * Allows you to connect a {@link DropTarget} to an element in a component template.
 */
class DropTargetDirective extends DndDirective {
    /** Reduce typo confusion by allowing non-plural version of dropTargetTypes */
    set dropTargetType(t) {
        this.dropTargetTypes = t;
    }
    ngOnChanges() {
        this.connection = this.dropTarget;
        if (this.connection && this.dropTargetTypes != null) {
            this.connection.setTypes(this.dropTargetTypes);
        }
        super.ngOnChanges();
    }
    callHooks(conn) {
        return conn.connectDropTarget(this.elRef.nativeElement);
    }
}
DropTargetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dropTarget]'
            },] }
];
DropTargetDirective.propDecorators = {
    dropTarget: [{ type: Input, args: ['dropTarget',] }],
    dropTargetTypes: [{ type: Input, args: ['dropTargetTypes',] }],
    dropTargetType: [{ type: Input, args: ['dropTargetType',] }]
};
/**
 * Allows you to connect a {@link DragSource} to an element in a component template.
 */
class DragSourceDirective extends DndDirective {
    constructor() {
        super(...arguments);
        /** Do not render an HTML5 preview. Only applies when using the HTML5 backend.
         * It does not use { captureDraggingState: true } for IE11 support; that is broken.
         */
        this.noHTML5Preview = false;
    }
    ngOnChanges() {
        this.connection = this.dragSource;
        if (this.connection && this.dragSourceType != null) {
            this.connection.setType(this.dragSourceType);
        }
        super.ngOnChanges();
    }
    callHooks(conn) {
        const sub = new Subscription();
        sub.add(conn.connectDragSource(this.elRef.nativeElement, this.dragSourceOptions));
        if (this.noHTML5Preview) {
            sub.add(conn.connectDragPreview(getEmptyImage()));
        }
        return sub;
    }
}
DragSourceDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dragSource]'
            },] }
];
DragSourceDirective.propDecorators = {
    dragSource: [{ type: Input, args: ['dragSource',] }],
    dragSourceType: [{ type: Input, args: ['dragSourceType',] }],
    dragSourceOptions: [{ type: Input, args: ['dragSourceOptions',] }],
    noHTML5Preview: [{ type: Input, args: ['noHTML5Preview',] }]
};
/**
 * Allows you to specify which element a {@link DragSource} should screenshot as an HTML5 drag preview.
 *
 * Only relevant when using the HTML5 backend.
 */
class DragPreviewDirective extends DndDirective {
    ngOnChanges() {
        this.connection = this.dragPreview;
        super.ngOnChanges();
    }
    callHooks(conn) {
        return conn.connectDragPreview(this.elRef.nativeElement, this.dragPreviewOptions);
    }
}
DragPreviewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dragPreview]',
                inputs: ['dragPreview', 'dragPreviewOptions']
            },] }
];
DragPreviewDirective.propDecorators = {
    dragPreview: [{ type: Input, args: ['dragPreview',] }],
    dragPreviewOptions: [{ type: Input, args: ['dragPreviewOptions',] }]
};
// import { getEmptyImage } from 'react-dnd-html5-backend';
// we don't want to depend on the backend, so here that is, copied
/** @ignore */
let emptyImage;
/**
 * Returns a 0x0 empty GIF for use as a drag preview.
 * @ignore
 * */
function getEmptyImage() {
    if (!emptyImage) {
        emptyImage = new Image();
        emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }
    return emptyImage;
}

/** @ignore */
function unpackBackendForEs5Users(backendOrModule) {
    // Auto-detect ES6 default export for people still using ES5
    let backend = backendOrModule;
    if (typeof backend === 'object' && typeof backend.default === 'function') {
        backend = backend.default;
    }
    invariant(typeof backend === 'function', 'Expected the backend to be a function or an ES6 module exporting a default function. ' +
        'Read more: http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html');
    return backend;
}
// TODO allow injecting window
/** @ignore */
// @dynamic
function managerFactory(backendFactory, zone, context, backendOptions, debugMode) {
    backendFactory = unpackBackendForEs5Users(backendFactory);
    return zone.runOutsideAngular(() => createDragDropManager(backendFactory, context, backendOptions, debugMode));
}
/** @ignore */
function getGlobalContext() {
    return typeof global !== 'undefined' ? global : window;
}
/** @ignore */
const EXPORTS = [
    DndDirective,
    DragSourceDirective,
    DropTargetDirective,
    DragPreviewDirective,
];
// @dynamic
class SkyhookDndModule {
    static forRoot(backendOrBackendFactory) {
        return {
            ngModule: SkyhookDndModule,
            providers: [
                {
                    provide: DRAG_DROP_BACKEND,
                    // whichever one they have provided, the other will be undefined
                    useValue: backendOrBackendFactory.backend,
                    useFactory: backendOrBackendFactory
                        .backendFactory,
                },
                {
                    provide: DRAG_DROP_BACKEND_OPTIONS,
                    // whichever one they have provided, the other will be undefined
                    useValue: backendOrBackendFactory.options,
                },
                {
                    provide: DRAG_DROP_BACKEND_DEBUG_MODE,
                    // whichever one they have provided, the other will be undefined
                    useValue: backendOrBackendFactory.debug,
                },
                {
                    provide: DRAG_DROP_GLOBAL_CONTEXT,
                    useFactory: getGlobalContext,
                },
                {
                    provide: DRAG_DROP_MANAGER,
                    useFactory: managerFactory,
                    deps: [
                        DRAG_DROP_BACKEND,
                        NgZone,
                        DRAG_DROP_GLOBAL_CONTEXT,
                        DRAG_DROP_BACKEND_OPTIONS,
                        DRAG_DROP_BACKEND_DEBUG_MODE,
                    ],
                },
                SkyhookDndService,
            ],
        };
    }
}
SkyhookDndModule.decorators = [
    { type: NgModule, args: [{
                declarations: EXPORTS,
                exports: EXPORTS,
            },] }
];

// import no symbols to get typings but not execute the monkey-patching module loader

/**
 * Generated bundle index. Do not edit.
 */

export { DRAG_DROP_BACKEND, DRAG_DROP_MANAGER, DndDirective, DragPreviewDirective, DragSourceDirective, DropTargetDirective, SkyhookDndModule, SkyhookDndService, managerFactory as ɵa, getGlobalContext as ɵb, DRAG_DROP_BACKEND_OPTIONS as ɵc, DRAG_DROP_BACKEND_DEBUG_MODE as ɵd, DRAG_DROP_GLOBAL_CONTEXT as ɵe };
//# sourceMappingURL=rednax-core.js.map
