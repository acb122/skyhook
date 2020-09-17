import { OnInit, OnChanges, OnDestroy, AfterViewInit, ElementRef, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DropTarget, SkyhookDndService } from '@rednax/core';
import { SortableSpec, DraggedItem, RenderContext, HoverTrigger } from '../types';
import * as i0 from "@angular/core";
export declare class SkyhookSortable<Data> implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    protected dnd: SkyhookDndService;
    protected el: ElementRef<HTMLElement>;
    protected cdr: ChangeDetectorRef;
    listId: any;
    horizontal: boolean;
    protected spec: SortableSpec<Data>;
    children?: Iterable<Data>;
    /** Possible values:
     *
     * - 'halfway' (default): triggers a reorder when you drag halfway over a neighbour
     * - 'fixed': triggers as soon as you move over a neighbouring element. Does not work with variable size elements. */
    hoverTrigger: HoverTrigger;
    /** @ignore */
    private childrenSubject$;
    /**
     * A handy way to subscribe to spec.getList().
     */
    children$: Observable<Iterable<Data>>;
    /** @ignore */
    subs: Subscription;
    /** @ignore */
    listSubs: Subscription;
    /** This DropTarget is attached to the whole list.
     *
     * You may monitor it for information like 'is an item hovering over this entire list somewhere?'
     */
    target: DropTarget<DraggedItem<Data>>;
    /** @ignore */
    constructor(dnd: SkyhookDndService, el: ElementRef<HTMLElement>, cdr: ChangeDetectorRef);
    /** @ignore */
    private updateSubscription;
    contextFor(data: Data, index: number): RenderContext<Data>;
    /** @ignore */
    private getCanDrop;
    /** @ignore */
    private callHover;
    /** @ignore */
    ngOnInit(): void;
    getTargetType(): string | symbol | (string | symbol)[];
    acceptsType(ty: string | symbol | null): boolean;
    /** @ignore */
    ngOnChanges({ spec, listId }: SimpleChanges): void;
    /** @ignore */
    ngAfterViewInit(): void;
    /** @ignore */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<SkyhookSortable<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<SkyhookSortable<any>, "[ssSortable]", ["ssSortable"], { "listId": "ssSortableListId"; "horizontal": "ssSortableHorizontal"; "spec": "ssSortableSpec"; "children": "ssSortableChildren"; "hoverTrigger": "ssSortableTrigger"; }, {}, never>;
}
