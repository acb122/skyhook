import { SortableSpec, DraggedItem } from './types';
import { DropTargetMonitor, DragSourceMonitor } from '@rednax/core';
import { Observable } from 'rxjs';
export declare enum SortableEvents {
    BeginDrag = "BeginDrag",
    Hover = "Hover",
    Drop = "Drop",
    EndDrag = "EndDrag"
}
export declare class BeginDragAction<AT, T> {
    readonly type: AT;
    readonly item: DraggedItem<T>;
    readonly event = SortableEvents.BeginDrag;
    constructor(type: AT, item: DraggedItem<T>);
}
export declare class HoverAction<AT, T> {
    readonly type: AT;
    readonly item: DraggedItem<T>;
    readonly event = SortableEvents.Hover;
    constructor(type: AT, item: DraggedItem<T>);
}
export declare class DropAction<AT, T> {
    readonly type: AT;
    readonly item: DraggedItem<T>;
    readonly event = SortableEvents.Drop;
    constructor(type: AT, item: DraggedItem<T>);
}
export declare class EndDragAction<AT, T> {
    readonly type: AT;
    readonly item: DraggedItem<T>;
    readonly event = SortableEvents.EndDrag;
    constructor(type: AT, item: DraggedItem<T>);
}
export declare type SortableAction<AT, D> = BeginDragAction<AT, D> | HoverAction<AT, D> | DropAction<AT, D> | EndDragAction<AT, D>;
/** Intended to be your NgRx Store object */
export interface Dispatcher {
    dispatch: (action: SortableAction<any, any>) => void;
}
export interface NgRxSortableConfiguration<D> {
    type: string | symbol;
    accepts?: string | symbol | (string | symbol)[];
    trackBy: (data: D) => any;
    getList: (listId: any) => Observable<Iterable<D>>;
    canDrop?: (item: DraggedItem<D>, monitor: DropTargetMonitor<DraggedItem<D>>) => boolean;
    canDrag?: (data: D, listId: any, monitor: DragSourceMonitor<void, void>) => boolean;
    isDragging?: (ground: D, inFlight: DraggedItem<D>) => boolean;
    createData?: () => D;
}
export declare class NgRxSortable<D> implements SortableSpec<D> {
    protected store: Dispatcher;
    protected actionType: string;
    type: string | symbol;
    accepts?: string | symbol | (string | symbol)[];
    trackBy: (data: D) => any;
    getList: (listId: any) => Observable<Iterable<D>>;
    canDrop?: (item: DraggedItem<D>, monitor: DropTargetMonitor<DraggedItem<D>>) => boolean;
    canDrag?: (data: D, listId: any, monitor: DragSourceMonitor<void, void>) => boolean;
    isDragging?: (ground: D, inFlight: DraggedItem<D>) => boolean;
    createData?: () => D;
    /**
     * @param store      An @ngrx store instance.
     * @param actionType The type in your own @ngrx/store `ActionTypes` enum you want the sortable actions to use.
     * @param configure  You must provide `trackBy` and `getList` functions here. Hopefully your `getList` will select from the store you passed!
     * */
    constructor(store: Dispatcher, actionType: string, configure: NgRxSortableConfiguration<D>);
    beginDrag: (item: DraggedItem<D>, _monitor: DragSourceMonitor<void, void>) => void;
    hover: (item: DraggedItem<D>, _monitor: DropTargetMonitor<DraggedItem<D>>) => void;
    drop: (item: DraggedItem<D>, _monitor: DropTargetMonitor<DraggedItem<D>>) => void;
    endDrag: (item: DraggedItem<D>, _monitor: DragSourceMonitor<DraggedItem<D>>) => void;
}
