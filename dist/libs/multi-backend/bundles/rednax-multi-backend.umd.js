(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react-dnd-touch-backend'), require('react-dnd-html5-backend'), require('dnd-multi-backend'), require('@angular/core'), require('@angular/common'), require('@rednax/core'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@rednax/multi-backend', ['exports', 'react-dnd-touch-backend', 'react-dnd-html5-backend', 'dnd-multi-backend', '@angular/core', '@angular/common', '@rednax/core', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.rednax = global.rednax || {}, global.rednax['multi-backend'] = {}), global.reactDndTouchBackend, global.reactDndHtml5Backend, global.dndMultiBackend, global.ng.core, global.ng.common, global.i1, global.rxjs.operators));
}(this, (function (exports, reactDndTouchBackend, reactDndHtml5Backend, dndMultiBackend, i0, i2, i1, operators) { 'use strict';

    var HTML5ToTouch = {
        backends: [
            {
                backend: reactDndHtml5Backend.HTML5Backend,
                transition: dndMultiBackend.MouseTransition,
            },
            {
                backend: function (manager, ctx) { return reactDndTouchBackend.TouchBackend(manager, ctx, { enableMouseEvents: false }); },
                preview: true,
                transition: dndMultiBackend.TouchTransition,
            },
        ],
    };
    function createDefaultMultiBackend() {
        return function (manager, ctx) { return dndMultiBackend.MultiBackend(HTML5ToTouch)(manager, ctx); };
    }

    var _c0 = ["*"];
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
    var SkyhookPreviewRendererComponent = /** @class */ (function () {
        /** @ignore */
        function SkyhookPreviewRendererComponent(skyhook) {
            this.skyhook = skyhook;
            /** @ignore */
            this.layer = this.skyhook.dragLayer();
            /** @ignore */
            this.collect$ = this.layer.listen(function (monitor) { return ({
                initialOffset: monitor.getInitialSourceClientOffset(),
                currentOffset: monitor.getSourceClientOffset(),
            }); });
            /** @ignore */
            this.style$ = this.collect$.pipe(operators.map(function (c) {
                var initialOffset = c.initialOffset, currentOffset = c.currentOffset;
                if (!initialOffset || !currentOffset) {
                    return {
                        display: 'none',
                    };
                }
                var x = currentOffset.x, y = currentOffset.y;
                var transform = "translate(" + x + "px, " + y + "px)";
                return {
                    transform: transform,
                    WebkitTransform: transform,
                };
            }));
        }
        /** @ignore */
        SkyhookPreviewRendererComponent.prototype.ngOnDestroy = function () {
            this.layer.unsubscribe();
        };
        return SkyhookPreviewRendererComponent;
    }());
    SkyhookPreviewRendererComponent.ɵfac = function SkyhookPreviewRendererComponent_Factory(t) { return new (t || SkyhookPreviewRendererComponent)(i0.ɵɵdirectiveInject(i1.SkyhookDndService)); };
    SkyhookPreviewRendererComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SkyhookPreviewRendererComponent, selectors: [["skyhook-preview-renderer"]], ngContentSelectors: _c0, decls: 3, vars: 3, consts: [[1, "firefox-bug", 3, "ngStyle"]], template: function SkyhookPreviewRendererComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵpipe(1, "async");
                i0.ɵɵprojection(2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngStyle", i0.ɵɵpipeBind1(1, 1, ctx.style$));
            }
        }, directives: [i2.NgStyle], pipes: [i2.AsyncPipe], styles: ["[_nghost-%COMP%] {\n                display: block;\n                position: fixed;\n                pointer-events: none;\n                z-index: 100;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n            }\n            @keyframes animatedBorder {\n                from {\n                    border-color: rgba(0, 0, 0, 0);\n                }\n                to {\n                    border-color: rgba(0, 0, 0, 1);\n                }\n            }\n            .firefox-bug[_ngcontent-%COMP%] {\n                animation-name: animatedBorder;\n                animation-duration: 1s;\n                animation-iteration-count: infinite;\n                animation-timing-function: linear;\n            }"], changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookPreviewRendererComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'skyhook-preview-renderer',
                        template: "\n        <div class=\"firefox-bug\" [ngStyle]=\"style$ | async\">\n            <ng-content></ng-content>\n        </div>\n    ",
                        styles: [
                            "\n            :host {\n                display: block;\n                position: fixed;\n                pointer-events: none;\n                z-index: 100;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n            }\n            @keyframes animatedBorder {\n                from {\n                    border-color: rgba(0, 0, 0, 0);\n                }\n                to {\n                    border-color: rgba(0, 0, 0, 1);\n                }\n            }\n            .firefox-bug {\n                animation-name: animatedBorder;\n                animation-duration: 1s;\n                animation-iteration-count: infinite;\n                animation-timing-function: linear;\n            }\n        ",
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    }]
            }], function () { return [{ type: i1.SkyhookDndService }]; }, null);
    })();

    function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c0$1 = function (a0, a1, a2) { return { $implicit: a0, type: a1, item: a2 }; };
    function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var c_r1 = i0.ɵɵnextContext(2).ngIf;
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r3.content)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c0$1, c_r1.itemType, c_r1.itemType, c_r1.item));
        }
    }
    function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "skyhook-preview-renderer");
            i0.ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_Template, 2, 6, "ng-container", 0);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var c_r1 = i0.ɵɵnextContext().ngIf;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", c_r1.isDragging);
        }
    }
    function SkyhookPreviewComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_Template, 2, 1, "skyhook-preview-renderer", 0);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var c_r1 = ctx.ngIf;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", c_r1.previewEnabled);
        }
    }
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
    var SkyhookPreviewComponent = /** @class */ (function () {
        /** @ignore */
        function SkyhookPreviewComponent(skyhook, manager) {
            var _this = this;
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
            this.collect$ = this.layer.listen(function (monitor) { return ({
                item: monitor.getItem(),
                itemType: monitor.getItemType(),
                isDragging: monitor.isDragging(),
                previewEnabled: _this.isPreviewEnabled(),
            }); });
            /** @ignore */
            this.warned = false;
        }
        /** @ignore */
        SkyhookPreviewComponent.prototype.ngOnDestroy = function () {
            this.layer.unsubscribe();
        };
        /** @ignore */
        SkyhookPreviewComponent.prototype.warn = function (msg) {
            if (!this.warned) {
                console.warn(msg);
            }
            this.warned = true;
        };
        /** @ignore */
        SkyhookPreviewComponent.prototype.isPreviewEnabled = function () {
            if (this.allBackends) {
                return true;
            }
            if (this.manager == null) {
                this.warn('no drag and drop manager defined, are you sure you imported SkyhookDndModule?');
                return false;
            }
            var backend = this.manager.getBackend();
            if (backend == null) {
                this.warn('no drag and drop backend defined, are you sure you imported SkyhookDndModule.forRoot(backend)?');
                return false;
            }
            // for when you are not using dnd-multi-backend
            if (backend.previewEnabled == null) {
                return true;
            }
            return backend.previewEnabled();
        };
        return SkyhookPreviewComponent;
    }());
    SkyhookPreviewComponent.ɵfac = function SkyhookPreviewComponent_Factory(t) { return new (t || SkyhookPreviewComponent)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(i1.DRAG_DROP_MANAGER)); };
    SkyhookPreviewComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SkyhookPreviewComponent, selectors: [["skyhook-preview"]], contentQueries: function SkyhookPreviewComponent_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, i0.TemplateRef, true);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.content = _t.first);
            }
        }, inputs: { allBackends: "allBackends" }, decls: 2, vars: 3, consts: [[4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function SkyhookPreviewComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, SkyhookPreviewComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
                i0.ɵɵpipe(1, "async");
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.collect$));
            }
        }, directives: [i2.NgIf, SkyhookPreviewRendererComponent, i2.NgTemplateOutlet], pipes: [i2.AsyncPipe], encapsulation: 2, changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookPreviewComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'skyhook-preview',
                        template: "\n        <ng-container *ngIf=\"collect$ | async as c\">\n            <skyhook-preview-renderer *ngIf=\"c.previewEnabled\">\n                <ng-container *ngIf=\"c.isDragging\">\n                    <ng-container\n                        *ngTemplateOutlet=\"\n                            content;\n                            context: {\n                                $implicit: c.itemType,\n                                type: c.itemType,\n                                item: c.item\n                            }\n                        \"\n                    >\n                    </ng-container>\n                </ng-container>\n            </skyhook-preview-renderer>\n        </ng-container>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    }]
            }], function () {
            return [{ type: i1.SkyhookDndService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.DRAG_DROP_MANAGER]
                        }] }];
        }, { allBackends: [{
                    type: i0.Input
                }], content: [{
                    type: i0.ContentChild,
                    args: [i0.TemplateRef, { static: false }]
                }] });
    })();

    /** @ignore */
    var EXPORTS = [
        SkyhookPreviewComponent,
        SkyhookPreviewRendererComponent,
    ];
    var SkyhookMultiBackendModule = /** @class */ (function () {
        function SkyhookMultiBackendModule() {
        }
        return SkyhookMultiBackendModule;
    }());
    SkyhookMultiBackendModule.ɵmod = i0.ɵɵdefineNgModule({ type: SkyhookMultiBackendModule });
    SkyhookMultiBackendModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SkyhookMultiBackendModule_Factory(t) { return new (t || SkyhookMultiBackendModule)(); }, imports: [[i2.CommonModule]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SkyhookMultiBackendModule, { declarations: [SkyhookPreviewComponent,
                SkyhookPreviewRendererComponent], imports: [i2.CommonModule], exports: [SkyhookPreviewComponent,
                SkyhookPreviewRendererComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookMultiBackendModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule],
                        declarations: EXPORTS,
                        exports: EXPORTS,
                    }]
            }], null, null);
    })();

    // import no symbols to get typings but not execute the monkey-patching module loader

    /**
     * Generated bundle index. Do not edit.
     */

    Object.defineProperty(exports, 'TouchBackend', {
        enumerable: true,
        get: function () {
            return reactDndTouchBackend.TouchBackend;
        }
    });
    Object.defineProperty(exports, 'HTML5Backend', {
        enumerable: true,
        get: function () {
            return reactDndHtml5Backend.HTML5Backend;
        }
    });
    Object.defineProperty(exports, 'HTML5DragTransition', {
        enumerable: true,
        get: function () {
            return dndMultiBackend.HTML5DragTransition;
        }
    });
    Object.defineProperty(exports, 'MouseTransition', {
        enumerable: true,
        get: function () {
            return dndMultiBackend.MouseTransition;
        }
    });
    Object.defineProperty(exports, 'MultiBackend', {
        enumerable: true,
        get: function () {
            return dndMultiBackend.MultiBackend;
        }
    });
    Object.defineProperty(exports, 'TouchTransition', {
        enumerable: true,
        get: function () {
            return dndMultiBackend.TouchTransition;
        }
    });
    Object.defineProperty(exports, 'createTransition', {
        enumerable: true,
        get: function () {
            return dndMultiBackend.createTransition;
        }
    });
    exports.HTML5ToTouch = HTML5ToTouch;
    exports.SkyhookMultiBackendModule = SkyhookMultiBackendModule;
    exports.SkyhookPreviewComponent = SkyhookPreviewComponent;
    exports.SkyhookPreviewRendererComponent = SkyhookPreviewRendererComponent;
    exports.createDefaultMultiBackend = createDefaultMultiBackend;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=rednax-multi-backend.umd.js.map
