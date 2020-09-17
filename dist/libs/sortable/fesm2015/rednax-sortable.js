import { ɵɵdirectiveInject, ElementRef, ChangeDetectorRef, ɵɵdefineDirective, ɵɵNgOnChangesFeature, ɵsetClassMetadata, Directive, Input, ɵɵelementContainer, ɵɵelementContainerStart, ɵɵtemplate, ɵɵelementContainerEnd, ɵɵnextContext, ɵɵadvance, ɵɵproperty, ɵɵpureFunction1, ɵɵdefineComponent, ɵɵcontentQuery, TemplateRef, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵProvidersFeature, ɵɵInheritDefinitionFeature, Component, ChangeDetectionStrategy, ContentChildren, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { SkyhookDndService, SkyhookDndModule } from '@rednax/core';
import { NgForOf, NgTemplateOutlet, CommonModule } from '@angular/common';
import { distinctUntilChanged, filter } from 'rxjs/operators';

class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    style() {
        return {
            width: this.width + 'px',
            height: this.height + 'px',
        };
    }
}
var HoverTrigger;
(function (HoverTrigger) {
    HoverTrigger["halfway"] = "halfway";
    HoverTrigger["fixed"] = "fixed";
})(HoverTrigger || (HoverTrigger = {}));

/** @ignore
 * Returns isEmpty, whether it's an immutable List or an array
 */
function isEmpty(list) {
    for (let _ of list) {
        return false;
    }
    return true;
}

class SkyhookSortable {
    /** @ignore */
    constructor(dnd, el, cdr) {
        this.dnd = dnd;
        this.el = el;
        this.cdr = cdr;
        this.listId = Math.random().toString();
        this.horizontal = false;
        /** Possible values:
         *
         * - 'halfway' (default): triggers a reorder when you drag halfway over a neighbour
         * - 'fixed': triggers as soon as you move over a neighbouring element. Does not work with variable size elements. */
        this.hoverTrigger = HoverTrigger.halfway;
        /** @ignore */
        this.childrenSubject$ = new BehaviorSubject([]);
        /**
         * A handy way to subscribe to spec.getList().
         */
        this.children$ = this.childrenSubject$;
        /** @ignore */
        this.subs = new Subscription();
        /** @ignore */
        this.listSubs = new Subscription();
        this.target = this.dnd.dropTarget(null, {
            canDrop: (monitor) => {
                if (!this.acceptsType(monitor.getItemType())) {
                    return false;
                }
                const item = monitor.getItem();
                if (!item) {
                    return false;
                }
                return this.getCanDrop(item, monitor);
            },
            drop: (monitor) => {
                const item = monitor.getItem();
                if (item && this.getCanDrop(item, monitor)) {
                    this.spec &&
                        this.spec.drop &&
                        this.spec.drop(item, monitor);
                }
                return {};
            },
            hover: (monitor) => {
                const item = monitor.getItem();
                if (this.children && isEmpty(this.children) && item) {
                    const canDrop = this.getCanDrop(item, monitor);
                    if (canDrop && monitor.isOver({ shallow: true })) {
                        this.callHover(item, monitor, {
                            listId: this.listId,
                            index: 0,
                        });
                    }
                }
            },
        }, this.subs);
    }
    /** @ignore */
    updateSubscription() {
        const anyListId = typeof this.listId !== 'undefined' && this.listId !== null;
        if (anyListId && this.spec) {
            if (this.listSubs) {
                this.subs.remove(this.listSubs);
                this.listSubs.unsubscribe();
            }
            if (this.spec.getList) {
                const cs$ = this.spec.getList(this.listId);
                this.listSubs =
                    cs$ &&
                        cs$.subscribe((l) => {
                            if (l) {
                                this.childrenSubject$.next(l);
                                this.children = l;
                                this.cdr.markForCheck();
                            }
                        });
                this.subs.add(this.listSubs);
            }
        }
    }
    contextFor(data, index) {
        return {
            data,
            index,
            listId: this.listId,
            spec: this.spec,
            horizontal: this.horizontal,
            hoverTrigger: this.hoverTrigger,
        };
    }
    /** @ignore */
    getCanDrop(item, monitor, _default = true) {
        if (this.spec && this.spec.canDrop) {
            return this.spec.canDrop(item, monitor);
        }
        return _default;
    }
    /** @ignore */
    callHover(item, monitor, newHover) {
        if (newHover) {
            // mutate the object
            item.hover = newHover;
            // but also shallow clone so distinct from previous,
            // useful if you rely on that for ngrx
            item = Object.assign({}, item);
        }
        this.spec && this.spec.hover && this.spec.hover(item, monitor);
    }
    /** @ignore */
    ngOnInit() {
        this.updateSubscription();
        this.target.setTypes(this.getTargetType());
    }
    getTargetType() {
        if (Array.isArray(this.spec.accepts)) {
            return this.spec.accepts;
        }
        else {
            return this.spec.accepts || this.spec.type;
        }
    }
    acceptsType(ty) {
        if (ty == null)
            return false;
        if (Array.isArray(this.spec.accepts)) {
            const arr = this.spec.accepts;
            return arr.indexOf(ty) !== -1;
        }
        else {
            let acc = this.getTargetType();
            return ty == acc;
        }
    }
    /** @ignore */
    ngOnChanges({ spec, listId }) {
        if (listId) {
            this.updateSubscription();
        }
        if (spec) {
            this.updateSubscription();
        }
        this.target.setTypes(this.getTargetType());
    }
    /** @ignore */
    ngAfterViewInit() {
        if (this.el) {
            this.target.connectDropTarget(this.el.nativeElement);
        }
        else {
            throw new Error('ssSortable directive must have ElementRef');
        }
    }
    /** @ignore */
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
SkyhookSortable.ɵfac = function SkyhookSortable_Factory(t) { return new (t || SkyhookSortable)(ɵɵdirectiveInject(SkyhookDndService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef)); };
SkyhookSortable.ɵdir = ɵɵdefineDirective({ type: SkyhookSortable, selectors: [["", "ssSortable", ""]], inputs: { listId: ["ssSortableListId", "listId"], horizontal: ["ssSortableHorizontal", "horizontal"], spec: ["ssSortableSpec", "spec"], children: ["ssSortableChildren", "children"], hoverTrigger: ["ssSortableTrigger", "hoverTrigger"] }, exportAs: ["ssSortable"], features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookSortable, [{
        type: Directive,
        args: [{
                selector: '[ssSortable]',
                exportAs: 'ssSortable',
            }]
    }], function () { return [{ type: SkyhookDndService }, { type: ElementRef }, { type: ChangeDetectorRef }]; }, { listId: [{
            type: Input,
            args: ['ssSortableListId']
        }], horizontal: [{
            type: Input,
            args: ['ssSortableHorizontal']
        }], spec: [{
            type: Input,
            args: ['ssSortableSpec']
        }], children: [{
            type: Input,
            args: ['ssSortableChildren']
        }], hoverTrigger: [{
            type: Input,
            args: ['ssSortableTrigger']
        }] }); })();

class SkyhookSortableTemplate {
}
SkyhookSortableTemplate.ɵfac = function SkyhookSortableTemplate_Factory(t) { return new (t || SkyhookSortableTemplate)(); };
SkyhookSortableTemplate.ɵdir = ɵɵdefineDirective({ type: SkyhookSortableTemplate, selectors: [["", "ssTemplate", ""]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookSortableTemplate, [{
        type: Directive,
        args: [{
                selector: '[ssTemplate]'
            }]
    }], null, null); })();

function SkyhookSortableList_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c0 = function (a0) { return { $implicit: a0 }; };
function SkyhookSortableList_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, SkyhookSortableList_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const card_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.contextFor(card_r1, i_r2)));
} }
class SkyhookSortableList extends SkyhookSortable {
    /** @ignore */
    constructor(dnd, el, cdr) {
        super(dnd, el, cdr);
        /** @ignore */
        this.trackById = (_, data) => {
            return this.spec && this.spec.trackBy(data);
        };
    }
    /** @ignore */
    set ssRenderTemplates(ql) {
        if (ql.length > 0) {
            this.template = ql.first;
        }
    }
    /** @ignore */
    ngAfterContentInit() {
        if (!this.template) {
            throw new Error('You must provide a <ng-template cardTemplate> as a content child, or with [template]="myTemplateRef"');
        }
    }
    // forwarding lifecycle events is required until Ivy renderer
    /** @ignore */
    ngOnInit() {
        super.ngOnInit();
    }
    /** @ignore */
    ngAfterViewInit() {
        super.ngAfterViewInit();
    }
    /** @ignore */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
    }
    /** @ignore */
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
SkyhookSortableList.ɵfac = function SkyhookSortableList_Factory(t) { return new (t || SkyhookSortableList)(ɵɵdirectiveInject(SkyhookDndService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef)); };
SkyhookSortableList.ɵcmp = ɵɵdefineComponent({ type: SkyhookSortableList, selectors: [["skyhook-sortable-list"]], contentQueries: function SkyhookSortableList_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, SkyhookSortableTemplate, false, TemplateRef);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.ssRenderTemplates = _t);
    } }, inputs: { template: ["ssTemplate", "template"] }, features: [ɵɵProvidersFeature([
            {
                provide: SkyhookSortable,
                useExisting: SkyhookSortableList,
            },
        ]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature], decls: 1, vars: 2, consts: [[4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function SkyhookSortableList_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, SkyhookSortableList_ng_container_0_Template, 2, 4, "ng-container", 0);
    } if (rf & 2) {
        ɵɵproperty("ngForOf", ctx.children)("ngForTrackBy", ctx.trackById);
    } }, directives: [NgForOf, NgTemplateOutlet], styles: ["[_nghost-%COMP%] {\n                display: block;\n            }"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookSortableList, [{
        type: Component,
        args: [{
                selector: 'skyhook-sortable-list',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
        <ng-container
            *ngFor="let card of children; let i = index; trackBy: trackById"
        >
            <ng-container
                *ngTemplateOutlet="
                    template;
                    context: {
                        $implicit: contextFor(card, i)
                    }
                "
            >
            </ng-container>
        </ng-container>
    `,
                styles: [
                    `
            :host {
                display: block;
            }
        `,
                ],
                // allow injecting the directive and getting the component
                providers: [
                    {
                        provide: SkyhookSortable,
                        useExisting: SkyhookSortableList,
                    },
                ],
            }]
    }], function () { return [{ type: SkyhookDndService }, { type: ElementRef }, { type: ChangeDetectorRef }]; }, { template: [{
            type: Input,
            args: ['ssTemplate']
        }], ssRenderTemplates: [{
            type: ContentChildren,
            args: [SkyhookSortableTemplate, {
                    read: TemplateRef,
                }]
        }] }); })();

//     ~ List ~
// [
//   [ index 0 ]
//   [ index 1 ] <-- index 1 gets picked up
//   [ index 2 ]
// ]
//
// We want to emit a hover when:
//   - the mouse moves over the top half of 0
//   - the mouse moves over the bottom half of 2
//
// ,----------------------,
// | target 0 top half    | => emits 0
// |----------------------|
// | target 0 bottom half | => computes 1, doesn't emit
// '----------------------'
// ,----------------------,
// | target 1 (inert)     | => computes 1, doesn't emit
// '----------------------'
// ,----------------------,
// | target 2 top half    | => computes 1, doesn't emit
// |----------------------|
// | target 2 bottom half | => emits 2
// '----------------------'
//
function suggestHalfway(ctx, item, rect, clientOffset) {
    const { hover } = item;
    const dim = ctx.horizontal
        ? rect.width || rect.right - rect.left
        : rect.height || rect.bottom - rect.top;
    const start = ctx.horizontal ? rect.left : rect.top;
    const targetCentre = start + dim / 2.0;
    const mouse = ctx.horizontal ? clientOffset.x : clientOffset.y;
    const topHalf = mouse < targetCentre;
    let suggestedIndex;
    if (ctx.listId === hover.listId) {
        if (ctx.index < hover.index) {
            suggestedIndex = topHalf ? ctx.index : ctx.index + 1;
        }
        else {
            suggestedIndex = topHalf ? ctx.index - 1 : ctx.index;
        }
    }
    else {
        // first hover on a different list;
        // there is no relevant hover.index to compare to
        suggestedIndex = topHalf ? ctx.index : ctx.index + 1;
    }
    return suggestedIndex;
}
function suggestFixed(ctx) {
    return ctx.index;
}
function getSuggester(trigger) {
    switch (trigger) {
        case HoverTrigger.fixed:
            return suggestFixed;
        default:
            return suggestHalfway;
    }
}

/** @ignore */
const _scheduleMicroTaskPolyfill = requestAnimationFrame ||
    webkitRequestAnimationFrame ||
    ((f) => setTimeout(f, 0));
class SkyhookSortableRenderer {
    /** @ignore */
    constructor(dnd, el) {
        this.dnd = dnd;
        this.el = el;
        /** @ignore */
        this.subs = new Subscription();
        /** @ignore */
        this.sameIds = (data, other) => {
            return (data &&
                other.data &&
                this.spec.trackBy(data) === this.spec.trackBy(other.data));
        };
        this.target = this.dnd.dropTarget(null, {
            // this is a hover-only situation
            canDrop: () => false,
            hover: (monitor) => {
                this.hover(monitor);
            },
        }, this.subs);
        this.source = this.dnd.dragSource(null, {
            canDrag: (monitor) => {
                return this.getCanDrag(monitor);
            },
            isDragging: (monitor) => {
                return this.isDragging(monitor.getItem());
            },
            beginDrag: (monitor) => {
                const item = this.createItem();
                // Chromium bug since 2016: if you modify styles or DOM
                // synchronously within 'dragstart' handler, Chrome fires
                // a 'dragend' immediately.
                //
                // https://bugs.chromium.org/p/chromium/issues/detail?id=674882
                // although recommended Promise.resolve().then() doesn't work.
                this.spec &&
                    this.spec.beginDrag &&
                    _scheduleMicroTaskPolyfill(() => {
                        this.spec &&
                            this.spec.beginDrag &&
                            this.spec.beginDrag(item, monitor);
                    });
                return item;
            },
            endDrag: (monitor) => {
                const item = monitor.getItem();
                if (item) {
                    this.spec &&
                        this.spec.endDrag &&
                        this.spec.endDrag(item, monitor);
                }
            },
        }, this.subs);
        this.isDragging$ = this.source.listen((m) => m.isDragging());
    }
    get data() {
        return this.context.data;
    }
    /** @ignore */
    get type() {
        return this.context.spec && this.context.spec.type;
    }
    /** @ignore */
    get accepts() {
        const spec = this.context.spec;
        if (!spec)
            return [];
        if (Array.isArray(spec.accepts)) {
            return spec.accepts;
        }
        else {
            return spec.accepts || spec.type;
        }
    }
    /** @ignore */
    get listId() {
        return this.context.listId;
    }
    /** @ignore */
    get index() {
        return this.context.index;
    }
    /** @ignore */
    get spec() {
        return this.context.spec;
    }
    /** @ignore */
    createItem() {
        return {
            data: this.data,
            index: this.index,
            size: this.size(),
            type: this.type,
            isInternal: true,
            listId: this.listId,
            hover: {
                index: this.index,
                listId: this.listId,
            },
        };
    }
    /** @ignore */
    getCanDrag(monitor) {
        if (this.spec && this.spec.canDrag) {
            return this.spec.canDrag(this.data, this.listId, monitor);
        }
        return true;
    }
    /** @ignore */
    isDragging(item) {
        if (this.spec && this.spec.isDragging) {
            return (item && this.spec.isDragging(this.data, item)) || false;
        }
        else {
            return (item && this.sameIds(this.data, item)) || false;
        }
    }
    /** @ignore */
    hover(monitor) {
        const item = monitor.getItem();
        const clientOffset = monitor.getClientOffset();
        if (item == null || clientOffset == null) {
            return;
        }
        // hovering on yourself should do nothing
        if (this.isDragging(item) &&
            this.index === item.hover.index &&
            this.listId === item.hover.listId) {
            return;
        }
        const { hover } = item;
        let suggester = getSuggester(this.context.hoverTrigger);
        let suggestedIndex = suggester(this.context, item, this.rect(), clientOffset);
        // happens if you aren't implementing SortableSpec correctly.
        if (suggestedIndex < 0) {
            // console.warn('this.listId',this.listId, 'hover.listId', hover.listId)
            // suggestedIndex = 0;
            throw new Error('@rednax/sortable: Cannot move a card to an index < 0.');
        }
        // move the item if its new position is different
        if (suggestedIndex !== hover.index || this.listId !== hover.listId) {
            item.hover = {
                index: suggestedIndex,
                listId: this.listId,
            };
            if (this.spec &&
                this.spec.canDrop &&
                !this.spec.canDrop(item, monitor)) {
                return;
            }
            // shallow clone so library consumers don't mutate our items
            this.spec &&
                this.spec.hover &&
                this.spec.hover(Object.assign({}, item), monitor);
        }
    }
    /** @ignore */
    rect() {
        if (!this.el) {
            throw new Error('@rednax/sortable: [ssRender] expected to be attached to a real DOM element');
        }
        const rect = this.el.nativeElement.getBoundingClientRect();
        return rect;
    }
    /** @ignore */
    size() {
        const rect = this.rect();
        const width = rect.width || rect.right - rect.left;
        const height = rect.height || rect.bottom - rect.top;
        return new Size(width, height);
    }
    /** @ignore */
    ngOnInit() {
        this.target.setTypes(this.accepts);
        this.source.setType(this.type);
    }
    /** @ignore */
    ngAfterViewInit() {
        if (this.el) {
            this.target.connectDropTarget(this.el.nativeElement);
        }
    }
    /** @ignore */
    ngOnChanges() {
        this.target.setTypes(this.accepts);
        this.source.setType(this.type);
    }
    /** @ignore */
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
SkyhookSortableRenderer.ɵfac = function SkyhookSortableRenderer_Factory(t) { return new (t || SkyhookSortableRenderer)(ɵɵdirectiveInject(SkyhookDndService), ɵɵdirectiveInject(ElementRef)); };
SkyhookSortableRenderer.ɵdir = ɵɵdefineDirective({ type: SkyhookSortableRenderer, selectors: [["", "ssRender", ""]], inputs: { context: ["ssRender", "context"] }, exportAs: ["ssRender"], features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookSortableRenderer, [{
        type: Directive,
        args: [{
                selector: '[ssRender]',
                exportAs: 'ssRender',
            }]
    }], function () { return [{ type: SkyhookDndService }, { type: ElementRef }]; }, { context: [{
            type: Input,
            args: ['ssRender']
        }] }); })();

const EXTERNAL_LIST_ID = Symbol('EXTERNAL_LIST_ID');
class SkyhookSortableExternal {
    /** @ignore */
    constructor(dnd, el) {
        this.dnd = dnd;
        this.el = el;
        this.source = this.dnd.dragSource(null, {
            canDrag: (monitor) => {
                if (this.spec && this.spec.canDrag) {
                    // beginDrag has not been called yet, so there is no data, and this is not part of a list.
                    // you should be able to decide canDrag without these anyway.
                    return this.spec.canDrag(undefined, undefined, monitor);
                }
                return true;
            },
            beginDrag: () => {
                if (typeof this.spec.createData !== 'function') {
                    throw new Error('spec.createData must be a function');
                }
                return {
                    type: this.spec.type,
                    data: this.spec.createData(),
                    hover: { index: -1, listId: EXTERNAL_LIST_ID },
                    isInternal: false,
                    index: -1,
                    listId: EXTERNAL_LIST_ID,
                    size: this.size(),
                };
            },
            endDrag: (monitor) => {
                const item = monitor.getItem();
                if (item) {
                    this.spec &&
                        this.spec.endDrag &&
                        this.spec.endDrag(item, monitor);
                }
            },
        });
    }
    /** @ignore */
    size() {
        const rect = this.el.nativeElement.getBoundingClientRect();
        return new Size(rect.width || rect.right - rect.left, rect.height || rect.bottom - rect.top);
    }
    /** @ignore */
    ngOnChanges() {
        this.source.setType(this.spec.type);
    }
    /** @ignore */
    ngOnDestroy() {
        this.source.unsubscribe();
    }
}
SkyhookSortableExternal.ɵfac = function SkyhookSortableExternal_Factory(t) { return new (t || SkyhookSortableExternal)(ɵɵdirectiveInject(SkyhookDndService), ɵɵdirectiveInject(ElementRef)); };
SkyhookSortableExternal.ɵdir = ɵɵdefineDirective({ type: SkyhookSortableExternal, selectors: [["", "ssExternal", ""]], inputs: { spec: ["ssExternal", "spec"] }, exportAs: ["ssExternal"], features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookSortableExternal, [{
        type: Directive,
        args: [{
                selector: '[ssExternal]',
                exportAs: 'ssExternal',
            }]
    }], function () { return [{ type: SkyhookDndService }, { type: ElementRef }]; }, { spec: [{
            type: Input,
            args: ['ssExternal']
        }] }); })();

var SortableEvents;
(function (SortableEvents) {
    SortableEvents["BeginDrag"] = "BeginDrag";
    SortableEvents["Hover"] = "Hover";
    SortableEvents["Drop"] = "Drop";
    SortableEvents["EndDrag"] = "EndDrag";
})(SortableEvents || (SortableEvents = {}));
class BeginDragAction {
    constructor(type, item) {
        this.type = type;
        this.item = item;
        this.event = SortableEvents.BeginDrag;
    }
}
class HoverAction {
    constructor(type, item) {
        this.type = type;
        this.item = item;
        this.event = SortableEvents.Hover;
    }
}
class DropAction {
    constructor(type, item) {
        this.type = type;
        this.item = item;
        this.event = SortableEvents.Drop;
    }
}
class EndDragAction {
    constructor(type, item) {
        this.type = type;
        this.item = item;
        this.event = SortableEvents.EndDrag;
    }
}
class NgRxSortable {
    /**
     * @param store      An @ngrx store instance.
     * @param actionType The type in your own @ngrx/store `ActionTypes` enum you want the sortable actions to use.
     * @param configure  You must provide `trackBy` and `getList` functions here. Hopefully your `getList` will select from the store you passed!
     * */
    constructor(store, actionType, configure) {
        this.store = store;
        this.actionType = actionType;
        // We now implement the SortableSpec interface by dispatching actions
        this.beginDrag = (item, _monitor) => {
            this.store.dispatch(new BeginDragAction(this.actionType, item));
        };
        this.hover = (item, _monitor) => {
            this.store.dispatch(new HoverAction(this.actionType, item));
        };
        this.drop = (item, _monitor) => {
            this.store.dispatch(new DropAction(this.actionType, item));
        };
        this.endDrag = (item, _monitor) => {
            this.store.dispatch(new EndDragAction(this.actionType, item));
        };
        if (configure.type !== undefined)
            this.type = configure.type;
        if (configure.accepts !== undefined)
            this.accepts = configure.accepts;
        if (configure.trackBy !== undefined)
            this.trackBy = configure.trackBy;
        if (configure.getList !== undefined)
            this.getList = configure.getList;
        if (configure.canDrag !== undefined)
            this.canDrag = configure.canDrag;
        if (configure.canDrop !== undefined)
            this.canDrop = configure.canDrop;
        if (configure.isDragging !== undefined)
            this.isDragging = configure.isDragging;
        if (configure.createData !== undefined)
            this.createData = configure.createData;
    }
}

const SPILLED_LIST_ID = Symbol('SPILLED_LIST_ID');
function spillTarget(dnd, types, config) {
    const mutate = (item) => {
        if (!item)
            return null;
        item.hover = { listId: SPILLED_LIST_ID, index: -1 };
        return Object.assign({}, item);
    };
    const hover$ = new Subject();
    const target = dnd.dropTarget(types, {
        hover: (monitor) => {
            if (monitor.canDrop() && monitor.isOver({ shallow: true })) {
                const item = mutate(monitor.getItem());
                hover$.next(item);
            }
            else {
                hover$.next(null);
            }
        },
        drop: (config.drop &&
            ((monitor) => {
                const item = mutate(monitor.getItem());
                if (!monitor.didDrop()) {
                    config.drop && item && config.drop(item);
                }
            })) ||
            undefined,
    });
    const spilled$ = hover$.pipe(distinctUntilChanged(), filter((a) => !!a));
    const subs = spilled$.subscribe((item) => {
        config.hover && item && config.hover(item);
    });
    target.add(subs);
    return target;
}

/** @ignore */
const EXPORTS = [
    SkyhookSortable,
    SkyhookSortableList,
    SkyhookSortableTemplate,
    SkyhookSortableRenderer,
    SkyhookSortableExternal,
];
class SkyhookSortableModule {
}
SkyhookSortableModule.ɵmod = ɵɵdefineNgModule({ type: SkyhookSortableModule });
SkyhookSortableModule.ɵinj = ɵɵdefineInjector({ factory: function SkyhookSortableModule_Factory(t) { return new (t || SkyhookSortableModule)(); }, imports: [[CommonModule, SkyhookDndModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(SkyhookSortableModule, { declarations: [SkyhookSortable,
        SkyhookSortableList,
        SkyhookSortableTemplate,
        SkyhookSortableRenderer,
        SkyhookSortableExternal], imports: [CommonModule, SkyhookDndModule], exports: [SkyhookSortable,
        SkyhookSortableList,
        SkyhookSortableTemplate,
        SkyhookSortableRenderer,
        SkyhookSortableExternal] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookSortableModule, [{
        type: NgModule,
        args: [{
                declarations: EXPORTS,
                exports: EXPORTS,
                imports: [CommonModule, SkyhookDndModule],
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { BeginDragAction, DropAction, EXTERNAL_LIST_ID, EndDragAction, HoverAction, HoverTrigger, NgRxSortable, SPILLED_LIST_ID, Size, SkyhookSortable, SkyhookSortableExternal, SkyhookSortableList, SkyhookSortableModule, SkyhookSortableRenderer, SkyhookSortableTemplate, SortableEvents, spillTarget };
//# sourceMappingURL=rednax-sortable.js.map
