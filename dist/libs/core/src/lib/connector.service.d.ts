/**
 * @module 1-Top-Level
 */
/** a second comment */
import { NgZone } from '@angular/core';
import { DragDropManager } from 'dnd-core';
import { DropTargetSpec } from './drop-target-specification';
import { DragSourceSpec } from './drag-source-specification';
import { SubscriptionLike, TeardownLogic } from 'rxjs';
import { TypeOrTypeArray } from './type-ish';
import { DragSource, DropTarget, DragLayer } from './connection-types';
import * as i0 from "@angular/core";
/**
 * Represents an RxJS Subscription, with multi-version compatibility.
 * The standard SubscriptionLike does not contain an add() method.
 */
export interface AddSubscription extends SubscriptionLike {
    /** Same as RxJS `Subscription#add` */
    add(teardownLogic: TeardownLogic): AddSubscription;
}
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
export declare class SkyhookDndService {
    private manager;
    private ngZone;
    /** @ignore */
    private skyhookZone;
    /** @ignore */
    constructor(manager: DragDropManager, ngZone: NgZone);
    /**
     * This drop target will only react to the items produced by the drag sources
     * of the specified type or types.
     *
     * If you want a dynamic type, pass `null` as the type; and call
     * {@link DropTarget#setTypes} in a lifecycle hook.
     */
    dropTarget<Item = {}, DropResult = {}>(types: TypeOrTypeArray | null, spec: DropTargetSpec<Item, DropResult>, subscription?: AddSubscription): DropTarget<Item, DropResult>;
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
    dragSource<Item, DropResult = {}>(type: string | symbol | null, spec: DragSourceSpec<Item, DropResult>, subscription?: AddSubscription): DragSource<Item, DropResult>;
    /**
     * This method creates a {@link DragLayer} object
     */
    dragLayer<Item = any>(subscription?: AddSubscription): DragLayer<Item>;
    static ɵfac: i0.ɵɵFactoryDef<SkyhookDndService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SkyhookDndService>;
}
