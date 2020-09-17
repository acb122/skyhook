import { TouchBackend } from 'react-dnd-touch-backend';
export { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
export { HTML5Backend } from 'react-dnd-html5-backend';
import { MouseTransition, TouchTransition, MultiBackend } from 'dnd-multi-backend';
export { HTML5DragTransition, MouseTransition, MultiBackend, TouchTransition, createTransition } from 'dnd-multi-backend';
import { ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵprojectionDef, ɵɵelementStart, ɵɵpipe, ɵɵprojection, ɵɵelementEnd, ɵɵproperty, ɵɵpipeBind1, ɵsetClassMetadata, Component, ChangeDetectionStrategy, ɵɵelementContainer, ɵɵelementContainerStart, ɵɵtemplate, ɵɵelementContainerEnd, ɵɵnextContext, ɵɵadvance, ɵɵpureFunction3, ɵɵcontentQuery, TemplateRef, ɵɵqueryRefresh, ɵɵloadQuery, Inject, Input, ContentChild, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NgStyle, AsyncPipe, NgIf, NgTemplateOutlet, CommonModule } from '@angular/common';
import { SkyhookDndService, DRAG_DROP_MANAGER } from '@rednax/core';
import { map } from 'rxjs/operators';

const HTML5ToTouch = {
    backends: [
        {
            backend: HTML5Backend,
            transition: MouseTransition,
        },
        {
            backend: (manager, ctx) => TouchBackend(manager, ctx, { enableMouseEvents: false }),
            preview: true,
            transition: TouchTransition,
        },
    ],
};
function createDefaultMultiBackend() {
    return (manager, ctx) => MultiBackend(HTML5ToTouch)(manager, ctx);
}

const _c0 = ["*"];
/**
 * This is internal, you probably won't ever need to use it directly.
 *
 * For understanding's sake, it helps to know that this component
 * essentially just renders whatever is placed between its tags, but
 * in a `position: fixed` container that is translated according to
 * the drag in progress and how far it has travelled.
 *
 * It currently has a workaround for some Firefox versions where the
 * whole thing wouldn't re-render unless you animated the border.
 */
class SkyhookPreviewRendererComponent {
    /** @ignore */
    constructor(skyhook) {
        this.skyhook = skyhook;
        /** @ignore */
        this.layer = this.skyhook.dragLayer();
        /** @ignore */
        this.collect$ = this.layer.listen((monitor) => ({
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
        }));
        /** @ignore */
        this.style$ = this.collect$.pipe(map((c) => {
            const { initialOffset, currentOffset } = c;
            if (!initialOffset || !currentOffset) {
                return {
                    display: 'none',
                };
            }
            let { x, y } = currentOffset;
            const transform = `translate(${x}px, ${y}px)`;
            return {
                transform,
                WebkitTransform: transform,
            };
        }));
    }
    /** @ignore */
    ngOnDestroy() {
        this.layer.unsubscribe();
    }
}
SkyhookPreviewRendererComponent.ɵfac = function SkyhookPreviewRendererComponent_Factory(t) { return new (t || SkyhookPreviewRendererComponent)(ɵɵdirectiveInject(SkyhookDndService)); };
SkyhookPreviewRendererComponent.ɵcmp = ɵɵdefineComponent({ type: SkyhookPreviewRendererComponent, selectors: [["skyhook-preview-renderer"]], ngContentSelectors: _c0, decls: 3, vars: 3, consts: [[1, "firefox-bug", 3, "ngStyle"]], template: function SkyhookPreviewRendererComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵpipe(1, "async");
        ɵɵprojection(2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("ngStyle", ɵɵpipeBind1(1, 1, ctx.style$));
    } }, directives: [NgStyle], pipes: [AsyncPipe], styles: ["[_nghost-%COMP%] {\n                display: block;\n                position: fixed;\n                pointer-events: none;\n                z-index: 100;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n            }\n            @keyframes animatedBorder {\n                from {\n                    border-color: rgba(0, 0, 0, 0);\n                }\n                to {\n                    border-color: rgba(0, 0, 0, 1);\n                }\n            }\n            .firefox-bug[_ngcontent-%COMP%] {\n                animation-name: animatedBorder;\n                animation-duration: 1s;\n                animation-iteration-count: infinite;\n                animation-timing-function: linear;\n            }"], changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookPreviewRendererComponent, [{
        type: Component,
        args: [{
                selector: 'skyhook-preview-renderer',
                template: `
        <div class="firefox-bug" [ngStyle]="style$ | async">
            <ng-content></ng-content>
        </div>
    `,
                styles: [
                    `
            :host {
                display: block;
                position: fixed;
                pointer-events: none;
                z-index: 100;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            @keyframes animatedBorder {
                from {
                    border-color: rgba(0, 0, 0, 0);
                }
                to {
                    border-color: rgba(0, 0, 0, 1);
                }
            }
            .firefox-bug {
                animation-name: animatedBorder;
                animation-duration: 1s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
        `,
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: SkyhookDndService }]; }, null); })();

function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c0$1 = function (a0, a1, a2) { return { $implicit: a0, type: a1, item: a2 }; };
function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 1);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r1 = ɵɵnextContext(2).ngIf;
    const ctx_r3 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r3.content)("ngTemplateOutletContext", ɵɵpureFunction3(2, _c0$1, c_r1.itemType, c_r1.itemType, c_r1.item));
} }
function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "skyhook-preview-renderer");
    ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_Template, 2, 6, "ng-container", 0);
    ɵɵelementEnd();
} if (rf & 2) {
    const c_r1 = ɵɵnextContext().ngIf;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", c_r1.isDragging);
} }
function SkyhookPreviewComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_Template, 2, 1, "skyhook-preview-renderer", 0);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r1 = ctx.ngIf;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", c_r1.previewEnabled);
} }
/**
 * If you pass an `<ng-template let-type let-item="item">` to `<skyhook-preview>` as a child,
 * then that template will be rendered so as to follow the mouse around while dragging.
 * What you put in that template is up to you, but in most cases this will be:
 *
```html
<skyhook-preview>
  <ng-template let-type let-item="item">
    <ng-content [ngSwitch]="type">
      <!-- one kind of preview per type, using *ngSwitchCase="'TYPE'" -->
      <div *ngSwitchCase="'TYPE'">{{ item | json }}</div>
    </ng-content>
  </ng-template>
</skyhook-preview>
```
 */
class SkyhookPreviewComponent {
    /** @ignore */
    constructor(skyhook, manager) {
        this.skyhook = skyhook;
        this.manager = manager;
        /** Disables the check for whether the current MultiBackend wants the preview enabled */
        this.allBackends = false;
        /** @ignore */
        this.layer = this.skyhook.dragLayer();
        // we don't need all the fast-moving props here, so this optimises change detection
        // on the projected template's inputs (i.e. the context).
        // the fast-moving stuff is contained in the preview renderer.
        // also, we include this.isPreviewEnabled() because in this component with OnPush,
        // a plain getter isn't checked more than once, and this forces it to be called on each event.
        /** @ignore */
        this.collect$ = this.layer.listen((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            isDragging: monitor.isDragging(),
            previewEnabled: this.isPreviewEnabled(),
        }));
        /** @ignore */
        this.warned = false;
    }
    /** @ignore */
    ngOnDestroy() {
        this.layer.unsubscribe();
    }
    /** @ignore */
    warn(msg) {
        if (!this.warned) {
            console.warn(msg);
        }
        this.warned = true;
    }
    /** @ignore */
    isPreviewEnabled() {
        if (this.allBackends) {
            return true;
        }
        if (this.manager == null) {
            this.warn('no drag and drop manager defined, are you sure you imported SkyhookDndModule?');
            return false;
        }
        const backend = this.manager.getBackend();
        if (backend == null) {
            this.warn('no drag and drop backend defined, are you sure you imported SkyhookDndModule.forRoot(backend)?');
            return false;
        }
        // for when you are not using dnd-multi-backend
        if (backend.previewEnabled == null) {
            return true;
        }
        return backend.previewEnabled();
    }
}
SkyhookPreviewComponent.ɵfac = function SkyhookPreviewComponent_Factory(t) { return new (t || SkyhookPreviewComponent)(ɵɵdirectiveInject(SkyhookDndService), ɵɵdirectiveInject(DRAG_DROP_MANAGER)); };
SkyhookPreviewComponent.ɵcmp = ɵɵdefineComponent({ type: SkyhookPreviewComponent, selectors: [["skyhook-preview"]], contentQueries: function SkyhookPreviewComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
    } }, inputs: { allBackends: "allBackends" }, decls: 2, vars: 3, consts: [[4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function SkyhookPreviewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, SkyhookPreviewComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
        ɵɵpipe(1, "async");
    } if (rf & 2) {
        ɵɵproperty("ngIf", ɵɵpipeBind1(1, 1, ctx.collect$));
    } }, directives: [NgIf, SkyhookPreviewRendererComponent, NgTemplateOutlet], pipes: [AsyncPipe], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookPreviewComponent, [{
        type: Component,
        args: [{
                selector: 'skyhook-preview',
                template: `
        <ng-container *ngIf="collect$ | async as c">
            <skyhook-preview-renderer *ngIf="c.previewEnabled">
                <ng-container *ngIf="c.isDragging">
                    <ng-container
                        *ngTemplateOutlet="
                            content;
                            context: {
                                $implicit: c.itemType,
                                type: c.itemType,
                                item: c.item
                            }
                        "
                    >
                    </ng-container>
                </ng-container>
            </skyhook-preview-renderer>
        </ng-container>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: SkyhookDndService }, { type: undefined, decorators: [{
                type: Inject,
                args: [DRAG_DROP_MANAGER]
            }] }]; }, { allBackends: [{
            type: Input
        }], content: [{
            type: ContentChild,
            args: [TemplateRef, { static: false }]
        }] }); })();

/** @ignore */
const EXPORTS = [
    SkyhookPreviewComponent,
    SkyhookPreviewRendererComponent,
];
class SkyhookMultiBackendModule {
}
SkyhookMultiBackendModule.ɵmod = ɵɵdefineNgModule({ type: SkyhookMultiBackendModule });
SkyhookMultiBackendModule.ɵinj = ɵɵdefineInjector({ factory: function SkyhookMultiBackendModule_Factory(t) { return new (t || SkyhookMultiBackendModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(SkyhookMultiBackendModule, { declarations: [SkyhookPreviewComponent,
        SkyhookPreviewRendererComponent], imports: [CommonModule], exports: [SkyhookPreviewComponent,
        SkyhookPreviewRendererComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(SkyhookMultiBackendModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: EXPORTS,
                exports: EXPORTS,
            }]
    }], null, null); })();

// import no symbols to get typings but not execute the monkey-patching module loader

/**
 * Generated bundle index. Do not edit.
 */

export { HTML5ToTouch, SkyhookMultiBackendModule, SkyhookPreviewComponent, SkyhookPreviewRendererComponent, createDefaultMultiBackend };
//# sourceMappingURL=rednax-multi-backend.js.map
