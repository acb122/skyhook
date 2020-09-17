import { ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { SkyhookDndService, DragSource } from '@rednax/core';
import { DraggedItem, SortableSpec } from '../types';
import * as i0 from "@angular/core";
export declare const EXTERNAL_LIST_ID: symbol;
export declare class SkyhookSortableExternal<Data> implements OnChanges, OnDestroy {
    private dnd;
    private el;
    spec: SortableSpec<Data>;
    /** This source has beginDrag and endDrag implemented in line with what ssRender does.
     *
     * You must, like ssRender, attach it with [dragSource] somewhere.
     */
    source: DragSource<DraggedItem<Data>>;
    /** @ignore */
    constructor(dnd: SkyhookDndService, el: ElementRef<Element>);
    /** @ignore */
    private size;
    /** @ignore */
    ngOnChanges(): void;
    /** @ignore */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<SkyhookSortableExternal<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<SkyhookSortableExternal<any>, "[ssExternal]", ["ssExternal"], { "spec": "ssExternal"; }, {}, never>;
}
