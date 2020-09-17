import { TemplateRef, ChangeDetectorRef, OnDestroy, OnChanges, AfterViewInit, AfterContentInit, ElementRef, QueryList, SimpleChanges } from '@angular/core';
import { SkyhookDndService } from '@rednax/core';
import { TemplateContext } from './template.directive';
import { SkyhookSortable } from './sortable.directive';
import * as i0 from "@angular/core";
export declare class SkyhookSortableList<Data> extends SkyhookSortable<Data> implements OnDestroy, OnChanges, AfterContentInit, AfterViewInit {
    template?: TemplateRef<TemplateContext<Data>>;
    /** @ignore */
    set ssRenderTemplates(ql: QueryList<TemplateRef<TemplateContext<Data>>>);
    /** @ignore */
    constructor(dnd: SkyhookDndService, el: ElementRef<HTMLElement>, cdr: ChangeDetectorRef);
    /** @ignore */
    trackById: (_: number, data: Data) => any;
    /** @ignore */
    ngAfterContentInit(): void;
    /** @ignore */
    ngOnInit(): void;
    /** @ignore */
    ngAfterViewInit(): void;
    /** @ignore */
    ngOnChanges(changes: SimpleChanges): void;
    /** @ignore */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<SkyhookSortableList<any>, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SkyhookSortableList<any>, "skyhook-sortable-list", never, { "template": "ssTemplate"; }, {}, ["ssRenderTemplates"], never>;
}
