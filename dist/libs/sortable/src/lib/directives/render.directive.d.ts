import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { SkyhookDndService, DragSource, DropTarget } from '@rednax/core';
import { DraggedItem, RenderContext } from '../types';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SkyhookSortableRenderer<Data> implements OnInit, OnDestroy {
    private dnd;
    private el;
    context: RenderContext<Data>;
    get data(): Data;
    /** @ignore */
    private get type();
    /** @ignore */
    private get accepts();
    /** @ignore */
    private get listId();
    /** @ignore */
    private get index();
    /** @ignore */
    private get spec();
    /** @ignore */
    private subs;
    /** This DropTarget is attached where [ssRender] is.
     *
     * It is responsible for triggering {@link SortableSpec.hover} when the place you are hovering changes.
     */
    target: DropTarget<DraggedItem<Data>>;
    /** This DragSource is NOT attached for you.
     *
     *  You need to attach it yourself, by pulling #render="ssRender", and applying [dragSource]="render.source".
     */
    source: DragSource<DraggedItem<Data>>;
    /**
     * Shortcut for `this.source.listen(m => m.isDragging())`
     *
     */
    isDragging$: Observable<boolean>;
    /** @ignore */
    constructor(dnd: SkyhookDndService, el: ElementRef<HTMLElement>);
    /** @ignore */
    private createItem;
    /** @ignore */
    private sameIds;
    /** @ignore */
    private getCanDrag;
    /** @ignore */
    private isDragging;
    /** @ignore */
    private hover;
    /** @ignore */
    private rect;
    /** @ignore */
    private size;
    /** @ignore */
    ngOnInit(): void;
    /** @ignore */
    ngAfterViewInit(): void;
    /** @ignore */
    ngOnChanges(): void;
    /** @ignore */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<SkyhookSortableRenderer<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<SkyhookSortableRenderer<any>, "[ssRender]", ["ssRender"], { "context": "ssRender"; }, {}, never>;
}
