(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@rednax/core'), require('@angular/common'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@rednax/sortable', ['exports', '@angular/core', 'rxjs', '@rednax/core', '@angular/common', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.rednax = global.rednax || {}, global.rednax.sortable = {}), global.ng.core, global.rxjs, global.i1, global.ng.common, global.rxjs.operators));
}(this, (function (exports, i0, rxjs, i1, i2, operators) { 'use strict';

    var Size = /** @class */ (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        Size.prototype.style = function () {
            return {
                width: this.width + 'px',
                height: this.height + 'px',
            };
        };
        return Size;
    }());
    (function (HoverTrigger) {
        HoverTrigger["halfway"] = "halfway";
        HoverTrigger["fixed"] = "fixed";
    })(exports.HoverTrigger || (exports.HoverTrigger = {}));

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /** @ignore
     * Returns isEmpty, whether it's an immutable List or an array
     */
    function isEmpty(list) {
        var e_1, _a;
        try {
            for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                var _ = list_1_1.value;
                return false;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    }

    var SkyhookSortable = /** @class */ (function () {
        /** @ignore */
        function SkyhookSortable(dnd, el, cdr) {
            var _this = this;
            this.dnd = dnd;
            this.el = el;
            this.cdr = cdr;
            this.listId = Math.random().toString();
            this.horizontal = false;
            /** Possible values:
             *
             * - 'halfway' (default): triggers a reorder when you drag halfway over a neighbour
             * - 'fixed': triggers as soon as you move over a neighbouring element. Does not work with variable size elements. */
            this.hoverTrigger = exports.HoverTrigger.halfway;
            /** @ignore */
            this.childrenSubject$ = new rxjs.BehaviorSubject([]);
            /**
             * A handy way to subscribe to spec.getList().
             */
            this.children$ = this.childrenSubject$;
            /** @ignore */
            this.subs = new rxjs.Subscription();
            /** @ignore */
            this.listSubs = new rxjs.Subscription();
            this.target = this.dnd.dropTarget(null, {
                canDrop: function (monitor) {
                    if (!_this.acceptsType(monitor.getItemType())) {
                        return false;
                    }
                    var item = monitor.getItem();
                    if (!item) {
                        return false;
                    }
                    return _this.getCanDrop(item, monitor);
                },
                drop: function (monitor) {
                    var item = monitor.getItem();
                    if (item && _this.getCanDrop(item, monitor)) {
                        _this.spec &&
                            _this.spec.drop &&
                            _this.spec.drop(item, monitor);
                    }
                    return {};
                },
                hover: function (monitor) {
                    var item = monitor.getItem();
                    if (_this.children && isEmpty(_this.children) && item) {
                        var canDrop = _this.getCanDrop(item, monitor);
                        if (canDrop && monitor.isOver({ shallow: true })) {
                            _this.callHover(item, monitor, {
                                listId: _this.listId,
                                index: 0,
                            });
                        }
                    }
                },
            }, this.subs);
        }
        /** @ignore */
        SkyhookSortable.prototype.updateSubscription = function () {
            var _this = this;
            var anyListId = typeof this.listId !== 'undefined' && this.listId !== null;
            if (anyListId && this.spec) {
                if (this.listSubs) {
                    this.subs.remove(this.listSubs);
                    this.listSubs.unsubscribe();
                }
                if (this.spec.getList) {
                    var cs$ = this.spec.getList(this.listId);
                    this.listSubs =
                        cs$ &&
                            cs$.subscribe(function (l) {
                                if (l) {
                                    _this.childrenSubject$.next(l);
                                    _this.children = l;
                                    _this.cdr.markForCheck();
                                }
                            });
                    this.subs.add(this.listSubs);
                }
            }
        };
        SkyhookSortable.prototype.contextFor = function (data, index) {
            return {
                data: data,
                index: index,
                listId: this.listId,
                spec: this.spec,
                horizontal: this.horizontal,
                hoverTrigger: this.hoverTrigger,
            };
        };
        /** @ignore */
        SkyhookSortable.prototype.getCanDrop = function (item, monitor, _default) {
            if (_default === void 0) { _default = true; }
            if (this.spec && this.spec.canDrop) {
                return this.spec.canDrop(item, monitor);
            }
            return _default;
        };
        /** @ignore */
        SkyhookSortable.prototype.callHover = function (item, monitor, newHover) {
            if (newHover) {
                // mutate the object
                item.hover = newHover;
                // but also shallow clone so distinct from previous,
                // useful if you rely on that for ngrx
                item = Object.assign({}, item);
            }
            this.spec && this.spec.hover && this.spec.hover(item, monitor);
        };
        /** @ignore */
        SkyhookSortable.prototype.ngOnInit = function () {
            this.updateSubscription();
            this.target.setTypes(this.getTargetType());
        };
        SkyhookSortable.prototype.getTargetType = function () {
            if (Array.isArray(this.spec.accepts)) {
                return this.spec.accepts;
            }
            else {
                return this.spec.accepts || this.spec.type;
            }
        };
        SkyhookSortable.prototype.acceptsType = function (ty) {
            if (ty == null)
                return false;
            if (Array.isArray(this.spec.accepts)) {
                var arr = this.spec.accepts;
                return arr.indexOf(ty) !== -1;
            }
            else {
                var acc = this.getTargetType();
                return ty == acc;
            }
        };
        /** @ignore */
        SkyhookSortable.prototype.ngOnChanges = function (_a) {
            var spec = _a.spec, listId = _a.listId;
            if (listId) {
                this.updateSubscription();
            }
            if (spec) {
                this.updateSubscription();
            }
            this.target.setTypes(this.getTargetType());
        };
        /** @ignore */
        SkyhookSortable.prototype.ngAfterViewInit = function () {
            if (this.el) {
                this.target.connectDropTarget(this.el.nativeElement);
            }
            else {
                throw new Error('ssSortable directive must have ElementRef');
            }
        };
        /** @ignore */
        SkyhookSortable.prototype.ngOnDestroy = function () {
            this.subs.unsubscribe();
        };
        return SkyhookSortable;
    }());
    SkyhookSortable.ɵfac = function SkyhookSortable_Factory(t) { return new (t || SkyhookSortable)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    SkyhookSortable.ɵdir = i0.ɵɵdefineDirective({ type: SkyhookSortable, selectors: [["", "ssSortable", ""]], inputs: { listId: ["ssSortableListId", "listId"], horizontal: ["ssSortableHorizontal", "horizontal"], spec: ["ssSortableSpec", "spec"], children: ["ssSortableChildren", "children"], hoverTrigger: ["ssSortableTrigger", "hoverTrigger"] }, exportAs: ["ssSortable"], features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookSortable, [{
                type: i0.Directive,
                args: [{
                        selector: '[ssSortable]',
                        exportAs: 'ssSortable',
                    }]
            }], function () { return [{ type: i1.SkyhookDndService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { listId: [{
                    type: i0.Input,
                    args: ['ssSortableListId']
                }], horizontal: [{
                    type: i0.Input,
                    args: ['ssSortableHorizontal']
                }], spec: [{
                    type: i0.Input,
                    args: ['ssSortableSpec']
                }], children: [{
                    type: i0.Input,
                    args: ['ssSortableChildren']
                }], hoverTrigger: [{
                    type: i0.Input,
                    args: ['ssSortableTrigger']
                }] });
    })();

    var SkyhookSortableTemplate = /** @class */ (function () {
        function SkyhookSortableTemplate() {
        }
        return SkyhookSortableTemplate;
    }());
    SkyhookSortableTemplate.ɵfac = function SkyhookSortableTemplate_Factory(t) { return new (t || SkyhookSortableTemplate)(); };
    SkyhookSortableTemplate.ɵdir = i0.ɵɵdefineDirective({ type: SkyhookSortableTemplate, selectors: [["", "ssTemplate", ""]] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookSortableTemplate, [{
                type: i0.Directive,
                args: [{
                        selector: '[ssTemplate]'
                    }]
            }], null, null);
    })();

    function SkyhookSortableList_ng_container_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c0 = function (a0) { return { $implicit: a0 }; };
    function SkyhookSortableList_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, SkyhookSortableList_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 1);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var card_r1 = ctx.$implicit;
            var i_r2 = ctx.index;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx_r0.contextFor(card_r1, i_r2)));
        }
    }
    var SkyhookSortableList = /** @class */ (function (_super) {
        __extends(SkyhookSortableList, _super);
        /** @ignore */
        function SkyhookSortableList(dnd, el, cdr) {
            var _this = _super.call(this, dnd, el, cdr) || this;
            /** @ignore */
            _this.trackById = function (_, data) {
                return _this.spec && _this.spec.trackBy(data);
            };
            return _this;
        }
        Object.defineProperty(SkyhookSortableList.prototype, "ssRenderTemplates", {
            /** @ignore */
            set: function (ql) {
                if (ql.length > 0) {
                    this.template = ql.first;
                }
            },
            enumerable: false,
            configurable: true
        });
        /** @ignore */
        SkyhookSortableList.prototype.ngAfterContentInit = function () {
            if (!this.template) {
                throw new Error('You must provide a <ng-template cardTemplate> as a content child, or with [template]="myTemplateRef"');
            }
        };
        // forwarding lifecycle events is required until Ivy renderer
        /** @ignore */
        SkyhookSortableList.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
        };
        /** @ignore */
        SkyhookSortableList.prototype.ngAfterViewInit = function () {
            _super.prototype.ngAfterViewInit.call(this);
        };
        /** @ignore */
        SkyhookSortableList.prototype.ngOnChanges = function (changes) {
            _super.prototype.ngOnChanges.call(this, changes);
        };
        /** @ignore */
        SkyhookSortableList.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
        };
        return SkyhookSortableList;
    }(SkyhookSortable));
    SkyhookSortableList.ɵfac = function SkyhookSortableList_Factory(t) { return new (t || SkyhookSortableList)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    SkyhookSortableList.ɵcmp = i0.ɵɵdefineComponent({ type: SkyhookSortableList, selectors: [["skyhook-sortable-list"]], contentQueries: function SkyhookSortableList_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0.ɵɵcontentQuery(dirIndex, SkyhookSortableTemplate, false, i0.TemplateRef);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.ssRenderTemplates = _t);
            }
        }, inputs: { template: ["ssTemplate", "template"] }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: SkyhookSortable,
                    useExisting: SkyhookSortableList,
                },
            ]), i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 1, vars: 2, consts: [[4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function SkyhookSortableList_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, SkyhookSortableList_ng_container_0_Template, 2, 4, "ng-container", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngForOf", ctx.children)("ngForTrackBy", ctx.trackById);
            }
        }, directives: [i2.NgForOf, i2.NgTemplateOutlet], styles: ["[_nghost-%COMP%] {\n                display: block;\n            }"], changeDetection: 0 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookSortableList, [{
                type: i0.Component,
                args: [{
                        selector: 'skyhook-sortable-list',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        template: "\n        <ng-container\n            *ngFor=\"let card of children; let i = index; trackBy: trackById\"\n        >\n            <ng-container\n                *ngTemplateOutlet=\"\n                    template;\n                    context: {\n                        $implicit: contextFor(card, i)\n                    }\n                \"\n            >\n            </ng-container>\n        </ng-container>\n    ",
                        styles: [
                            "\n            :host {\n                display: block;\n            }\n        ",
                        ],
                        // allow injecting the directive and getting the component
                        providers: [
                            {
                                provide: SkyhookSortable,
                                useExisting: SkyhookSortableList,
                            },
                        ],
                    }]
            }], function () { return [{ type: i1.SkyhookDndService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { template: [{
                    type: i0.Input,
                    args: ['ssTemplate']
                }], ssRenderTemplates: [{
                    type: i0.ContentChildren,
                    args: [SkyhookSortableTemplate, {
                            read: i0.TemplateRef,
                        }]
                }] });
    })();

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
        var hover = item.hover;
        var dim = ctx.horizontal
            ? rect.width || rect.right - rect.left
            : rect.height || rect.bottom - rect.top;
        var start = ctx.horizontal ? rect.left : rect.top;
        var targetCentre = start + dim / 2.0;
        var mouse = ctx.horizontal ? clientOffset.x : clientOffset.y;
        var topHalf = mouse < targetCentre;
        var suggestedIndex;
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
            case exports.HoverTrigger.fixed:
                return suggestFixed;
            default:
                return suggestHalfway;
        }
    }

    /** @ignore */
    var _scheduleMicroTaskPolyfill = requestAnimationFrame ||
        webkitRequestAnimationFrame ||
        (function (f) { return setTimeout(f, 0); });
    var SkyhookSortableRenderer = /** @class */ (function () {
        /** @ignore */
        function SkyhookSortableRenderer(dnd, el) {
            var _this = this;
            this.dnd = dnd;
            this.el = el;
            /** @ignore */
            this.subs = new rxjs.Subscription();
            /** @ignore */
            this.sameIds = function (data, other) {
                return (data &&
                    other.data &&
                    _this.spec.trackBy(data) === _this.spec.trackBy(other.data));
            };
            this.target = this.dnd.dropTarget(null, {
                // this is a hover-only situation
                canDrop: function () { return false; },
                hover: function (monitor) {
                    _this.hover(monitor);
                },
            }, this.subs);
            this.source = this.dnd.dragSource(null, {
                canDrag: function (monitor) {
                    return _this.getCanDrag(monitor);
                },
                isDragging: function (monitor) {
                    return _this.isDragging(monitor.getItem());
                },
                beginDrag: function (monitor) {
                    var item = _this.createItem();
                    // Chromium bug since 2016: if you modify styles or DOM
                    // synchronously within 'dragstart' handler, Chrome fires
                    // a 'dragend' immediately.
                    //
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=674882
                    // although recommended Promise.resolve().then() doesn't work.
                    _this.spec &&
                        _this.spec.beginDrag &&
                        _scheduleMicroTaskPolyfill(function () {
                            _this.spec &&
                                _this.spec.beginDrag &&
                                _this.spec.beginDrag(item, monitor);
                        });
                    return item;
                },
                endDrag: function (monitor) {
                    var item = monitor.getItem();
                    if (item) {
                        _this.spec &&
                            _this.spec.endDrag &&
                            _this.spec.endDrag(item, monitor);
                    }
                },
            }, this.subs);
            this.isDragging$ = this.source.listen(function (m) { return m.isDragging(); });
        }
        Object.defineProperty(SkyhookSortableRenderer.prototype, "data", {
            get: function () {
                return this.context.data;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SkyhookSortableRenderer.prototype, "type", {
            /** @ignore */
            get: function () {
                return this.context.spec && this.context.spec.type;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SkyhookSortableRenderer.prototype, "accepts", {
            /** @ignore */
            get: function () {
                var spec = this.context.spec;
                if (!spec)
                    return [];
                if (Array.isArray(spec.accepts)) {
                    return spec.accepts;
                }
                else {
                    return spec.accepts || spec.type;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SkyhookSortableRenderer.prototype, "listId", {
            /** @ignore */
            get: function () {
                return this.context.listId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SkyhookSortableRenderer.prototype, "index", {
            /** @ignore */
            get: function () {
                return this.context.index;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SkyhookSortableRenderer.prototype, "spec", {
            /** @ignore */
            get: function () {
                return this.context.spec;
            },
            enumerable: false,
            configurable: true
        });
        /** @ignore */
        SkyhookSortableRenderer.prototype.createItem = function () {
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
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.getCanDrag = function (monitor) {
            if (this.spec && this.spec.canDrag) {
                return this.spec.canDrag(this.data, this.listId, monitor);
            }
            return true;
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.isDragging = function (item) {
            if (this.spec && this.spec.isDragging) {
                return (item && this.spec.isDragging(this.data, item)) || false;
            }
            else {
                return (item && this.sameIds(this.data, item)) || false;
            }
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.hover = function (monitor) {
            var item = monitor.getItem();
            var clientOffset = monitor.getClientOffset();
            if (item == null || clientOffset == null) {
                return;
            }
            // hovering on yourself should do nothing
            if (this.isDragging(item) &&
                this.index === item.hover.index &&
                this.listId === item.hover.listId) {
                return;
            }
            var hover = item.hover;
            var suggester = getSuggester(this.context.hoverTrigger);
            var suggestedIndex = suggester(this.context, item, this.rect(), clientOffset);
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
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.rect = function () {
            if (!this.el) {
                throw new Error('@rednax/sortable: [ssRender] expected to be attached to a real DOM element');
            }
            var rect = this.el.nativeElement.getBoundingClientRect();
            return rect;
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.size = function () {
            var rect = this.rect();
            var width = rect.width || rect.right - rect.left;
            var height = rect.height || rect.bottom - rect.top;
            return new Size(width, height);
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.ngOnInit = function () {
            this.target.setTypes(this.accepts);
            this.source.setType(this.type);
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.ngAfterViewInit = function () {
            if (this.el) {
                this.target.connectDropTarget(this.el.nativeElement);
            }
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.ngOnChanges = function () {
            this.target.setTypes(this.accepts);
            this.source.setType(this.type);
        };
        /** @ignore */
        SkyhookSortableRenderer.prototype.ngOnDestroy = function () {
            this.subs.unsubscribe();
        };
        return SkyhookSortableRenderer;
    }());
    SkyhookSortableRenderer.ɵfac = function SkyhookSortableRenderer_Factory(t) { return new (t || SkyhookSortableRenderer)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
    SkyhookSortableRenderer.ɵdir = i0.ɵɵdefineDirective({ type: SkyhookSortableRenderer, selectors: [["", "ssRender", ""]], inputs: { context: ["ssRender", "context"] }, exportAs: ["ssRender"], features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookSortableRenderer, [{
                type: i0.Directive,
                args: [{
                        selector: '[ssRender]',
                        exportAs: 'ssRender',
                    }]
            }], function () { return [{ type: i1.SkyhookDndService }, { type: i0.ElementRef }]; }, { context: [{
                    type: i0.Input,
                    args: ['ssRender']
                }] });
    })();

    var EXTERNAL_LIST_ID = Symbol('EXTERNAL_LIST_ID');
    var SkyhookSortableExternal = /** @class */ (function () {
        /** @ignore */
        function SkyhookSortableExternal(dnd, el) {
            var _this = this;
            this.dnd = dnd;
            this.el = el;
            this.source = this.dnd.dragSource(null, {
                canDrag: function (monitor) {
                    if (_this.spec && _this.spec.canDrag) {
                        // beginDrag has not been called yet, so there is no data, and this is not part of a list.
                        // you should be able to decide canDrag without these anyway.
                        return _this.spec.canDrag(undefined, undefined, monitor);
                    }
                    return true;
                },
                beginDrag: function () {
                    if (typeof _this.spec.createData !== 'function') {
                        throw new Error('spec.createData must be a function');
                    }
                    return {
                        type: _this.spec.type,
                        data: _this.spec.createData(),
                        hover: { index: -1, listId: EXTERNAL_LIST_ID },
                        isInternal: false,
                        index: -1,
                        listId: EXTERNAL_LIST_ID,
                        size: _this.size(),
                    };
                },
                endDrag: function (monitor) {
                    var item = monitor.getItem();
                    if (item) {
                        _this.spec &&
                            _this.spec.endDrag &&
                            _this.spec.endDrag(item, monitor);
                    }
                },
            });
        }
        /** @ignore */
        SkyhookSortableExternal.prototype.size = function () {
            var rect = this.el.nativeElement.getBoundingClientRect();
            return new Size(rect.width || rect.right - rect.left, rect.height || rect.bottom - rect.top);
        };
        /** @ignore */
        SkyhookSortableExternal.prototype.ngOnChanges = function () {
            this.source.setType(this.spec.type);
        };
        /** @ignore */
        SkyhookSortableExternal.prototype.ngOnDestroy = function () {
            this.source.unsubscribe();
        };
        return SkyhookSortableExternal;
    }());
    SkyhookSortableExternal.ɵfac = function SkyhookSortableExternal_Factory(t) { return new (t || SkyhookSortableExternal)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
    SkyhookSortableExternal.ɵdir = i0.ɵɵdefineDirective({ type: SkyhookSortableExternal, selectors: [["", "ssExternal", ""]], inputs: { spec: ["ssExternal", "spec"] }, exportAs: ["ssExternal"], features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookSortableExternal, [{
                type: i0.Directive,
                args: [{
                        selector: '[ssExternal]',
                        exportAs: 'ssExternal',
                    }]
            }], function () { return [{ type: i1.SkyhookDndService }, { type: i0.ElementRef }]; }, { spec: [{
                    type: i0.Input,
                    args: ['ssExternal']
                }] });
    })();

    (function (SortableEvents) {
        SortableEvents["BeginDrag"] = "BeginDrag";
        SortableEvents["Hover"] = "Hover";
        SortableEvents["Drop"] = "Drop";
        SortableEvents["EndDrag"] = "EndDrag";
    })(exports.SortableEvents || (exports.SortableEvents = {}));
    var BeginDragAction = /** @class */ (function () {
        function BeginDragAction(type, item) {
            this.type = type;
            this.item = item;
            this.event = exports.SortableEvents.BeginDrag;
        }
        return BeginDragAction;
    }());
    var HoverAction = /** @class */ (function () {
        function HoverAction(type, item) {
            this.type = type;
            this.item = item;
            this.event = exports.SortableEvents.Hover;
        }
        return HoverAction;
    }());
    var DropAction = /** @class */ (function () {
        function DropAction(type, item) {
            this.type = type;
            this.item = item;
            this.event = exports.SortableEvents.Drop;
        }
        return DropAction;
    }());
    var EndDragAction = /** @class */ (function () {
        function EndDragAction(type, item) {
            this.type = type;
            this.item = item;
            this.event = exports.SortableEvents.EndDrag;
        }
        return EndDragAction;
    }());
    var NgRxSortable = /** @class */ (function () {
        /**
         * @param store      An @ngrx store instance.
         * @param actionType The type in your own @ngrx/store `ActionTypes` enum you want the sortable actions to use.
         * @param configure  You must provide `trackBy` and `getList` functions here. Hopefully your `getList` will select from the store you passed!
         * */
        function NgRxSortable(store, actionType, configure) {
            var _this = this;
            this.store = store;
            this.actionType = actionType;
            // We now implement the SortableSpec interface by dispatching actions
            this.beginDrag = function (item, _monitor) {
                _this.store.dispatch(new BeginDragAction(_this.actionType, item));
            };
            this.hover = function (item, _monitor) {
                _this.store.dispatch(new HoverAction(_this.actionType, item));
            };
            this.drop = function (item, _monitor) {
                _this.store.dispatch(new DropAction(_this.actionType, item));
            };
            this.endDrag = function (item, _monitor) {
                _this.store.dispatch(new EndDragAction(_this.actionType, item));
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
        return NgRxSortable;
    }());

    var SPILLED_LIST_ID = Symbol('SPILLED_LIST_ID');
    function spillTarget(dnd, types, config) {
        var mutate = function (item) {
            if (!item)
                return null;
            item.hover = { listId: SPILLED_LIST_ID, index: -1 };
            return Object.assign({}, item);
        };
        var hover$ = new rxjs.Subject();
        var target = dnd.dropTarget(types, {
            hover: function (monitor) {
                if (monitor.canDrop() && monitor.isOver({ shallow: true })) {
                    var item = mutate(monitor.getItem());
                    hover$.next(item);
                }
                else {
                    hover$.next(null);
                }
            },
            drop: (config.drop &&
                (function (monitor) {
                    var item = mutate(monitor.getItem());
                    if (!monitor.didDrop()) {
                        config.drop && item && config.drop(item);
                    }
                })) ||
                undefined,
        });
        var spilled$ = hover$.pipe(operators.distinctUntilChanged(), operators.filter(function (a) { return !!a; }));
        var subs = spilled$.subscribe(function (item) {
            config.hover && item && config.hover(item);
        });
        target.add(subs);
        return target;
    }

    /** @ignore */
    var EXPORTS = [
        SkyhookSortable,
        SkyhookSortableList,
        SkyhookSortableTemplate,
        SkyhookSortableRenderer,
        SkyhookSortableExternal,
    ];
    var SkyhookSortableModule = /** @class */ (function () {
        function SkyhookSortableModule() {
        }
        return SkyhookSortableModule;
    }());
    SkyhookSortableModule.ɵmod = i0.ɵɵdefineNgModule({ type: SkyhookSortableModule });
    SkyhookSortableModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SkyhookSortableModule_Factory(t) { return new (t || SkyhookSortableModule)(); }, imports: [[i2.CommonModule, i1.SkyhookDndModule]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SkyhookSortableModule, { declarations: [SkyhookSortable,
                SkyhookSortableList,
                SkyhookSortableTemplate,
                SkyhookSortableRenderer,
                SkyhookSortableExternal], imports: [i2.CommonModule, i1.SkyhookDndModule], exports: [SkyhookSortable,
                SkyhookSortableList,
                SkyhookSortableTemplate,
                SkyhookSortableRenderer,
                SkyhookSortableExternal] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookSortableModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: EXPORTS,
                        exports: EXPORTS,
                        imports: [i2.CommonModule, i1.SkyhookDndModule],
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BeginDragAction = BeginDragAction;
    exports.DropAction = DropAction;
    exports.EXTERNAL_LIST_ID = EXTERNAL_LIST_ID;
    exports.EndDragAction = EndDragAction;
    exports.HoverAction = HoverAction;
    exports.NgRxSortable = NgRxSortable;
    exports.SPILLED_LIST_ID = SPILLED_LIST_ID;
    exports.Size = Size;
    exports.SkyhookSortable = SkyhookSortable;
    exports.SkyhookSortableExternal = SkyhookSortableExternal;
    exports.SkyhookSortableList = SkyhookSortableList;
    exports.SkyhookSortableModule = SkyhookSortableModule;
    exports.SkyhookSortableRenderer = SkyhookSortableRenderer;
    exports.SkyhookSortableTemplate = SkyhookSortableTemplate;
    exports.spillTarget = spillTarget;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=rednax-sortable.umd.js.map
