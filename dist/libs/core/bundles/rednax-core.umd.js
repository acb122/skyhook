(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('dnd-core')) :
    typeof define === 'function' && define.amd ? define('@rednax/core', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'dnd-core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.rednax = global.rednax || {}, global.rednax.core = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.dndCore));
}(this, (function (exports, i0, rxjs, operators, dndCore) { 'use strict';

    /**
     * @module Misc
     */
    /** The injection token for the dnd-core compatible backend currently in use. */
    var DRAG_DROP_BACKEND = new i0.InjectionToken('dnd-core compatible backend');
    /** The injection token for the dnd-core compatible backend's options. */
    var DRAG_DROP_BACKEND_OPTIONS = new i0.InjectionToken('options for dnd-core compatible backend');
    /** The injection token for the dnd-core compatible backend currently in use. */
    var DRAG_DROP_BACKEND_DEBUG_MODE = new i0.InjectionToken('should dnd-core run in debug mode?');
    /** The injection token for the dnd-core DragDropManager */
    var DRAG_DROP_MANAGER = new i0.InjectionToken('dnd-core DragDropManager');
    /** The injection token for the dnd-core compatible backend currently in use. */
    var DRAG_DROP_GLOBAL_CONTEXT = new i0.InjectionToken('dnd-core context');
    /** The type a source or target is given as a marker for 'you supplied null as a type',
     *  so that library consumers can be reminded to use setType/setTypes manually.
     *  See {@link DragSource#setType}, {@link DropTarget#setTypes}.
     */
    var TYPE_DYNAMIC = Symbol('no type specified, you must provide one with setType/setTypes');

    function shallowEqual(objA, objB) {
        if (objA === objB) {
            return true;
        }
        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) {
            return false;
        }
        // Test for A's keys different from B.
        var hasOwn = Object.prototype.hasOwnProperty;
        for (var i = 0; i < keysA.length; i += 1) {
            if (!hasOwn.call(objB, keysA[i]) ||
                objA[keysA[i]] !== objB[keysA[i]]) {
                return false;
            }
            var valA = objA[keysA[i]];
            var valB = objB[keysA[i]];
            if (valA !== valB) {
                return false;
            }
        }
        return true;
    }

    function areOptionsEqual(nextOptions, currentOptions) {
        if (currentOptions === nextOptions) {
            return true;
        }
        return currentOptions !== null &&
            nextOptions !== null &&
            shallowEqual(currentOptions, nextOptions);
    }

    var Reconnector = /** @class */ (function () {
        function Reconnector(backendConnector) {
            var _this = this;
            this.backendConnector = backendConnector;
            this.reconnect = function (parentHandlerId) {
                if (_this.disconnect) {
                    _this.disconnect();
                    _this.disconnect = null;
                }
                _this.handlerId = parentHandlerId;
                if (_this.handlerId && _this.node) {
                    _this.disconnect = _this.backendConnector(_this.handlerId, _this.node, _this.options);
                }
            };
            this.hook = function (nativeElement, options) {
                if (nativeElement === _this.node &&
                    areOptionsEqual(options, _this.options)) {
                    return;
                }
                _this.node = nativeElement;
                _this.options = options;
                _this.reconnect(_this.handlerId);
            };
        }
        return Reconnector;
    }());

    var TargetConnector = /** @class */ (function () {
        function TargetConnector(backend) {
            var _this = this;
            this.backend = backend;
            this.dropTarget = new Reconnector(function (handlerId, node, options) {
                return _this.backend.connectDropTarget(handlerId, node, options);
            });
            this.hooks = {
                dropTarget: this.dropTarget.hook
            };
        }
        TargetConnector.prototype.receiveHandlerId = function (handlerId) {
            if (handlerId === this.currentHandlerId) {
                return;
            }
            this.currentHandlerId = handlerId;
            this.dropTarget.reconnect(handlerId);
        };
        TargetConnector.prototype.reconnect = function () {
            this.dropTarget.reconnect(this.currentHandlerId);
        };
        return TargetConnector;
    }());
    function createTargetConnector(backend) {
        return new TargetConnector(backend);
    }

    function registerTarget(type, target, manager) {
        var registry = manager.getRegistry();
        var targetId = registry.addTarget(type, target);
        function unregisterTarget() {
            registry.removeTarget(targetId);
        }
        return {
            handlerId: targetId,
            unregister: unregisterTarget,
        };
    }

    var SourceConnector = /** @class */ (function () {
        function SourceConnector(backend) {
            var _this = this;
            this.backend = backend;
            this.dragSource = new Reconnector(function (handlerId, node, options) {
                return _this.backend.connectDragSource(handlerId, node, options);
            });
            this.dragPreview = new Reconnector(function (handlerId, node, options) {
                return _this.backend.connectDragPreview(handlerId, node, options);
            });
            this.hooks = {
                dragSource: this.dragSource.hook,
                dragPreview: this.dragPreview.hook,
            };
        }
        SourceConnector.prototype.receiveHandlerId = function (handlerId) {
            if (handlerId === this.currentHandlerId) {
                return;
            }
            this.currentHandlerId = handlerId;
            this.dragSource.reconnect(handlerId);
            this.dragPreview.reconnect(handlerId);
        };
        SourceConnector.prototype.reconnect = function () {
            this.dragSource.reconnect(this.currentHandlerId);
            this.dragPreview.reconnect(this.currentHandlerId);
        };
        return SourceConnector;
    }());
    function createSourceConnector(backend) {
        return new SourceConnector(backend);
    }

    function registerSource(type, source, manager) {
        var registry = manager.getRegistry();
        var sourceId = registry.addSource(type, source);
        function unregisterSource() {
            registry.removeSource(sourceId);
        }
        return {
            handlerId: sourceId,
            unregister: unregisterSource,
        };
    }

    function invariant(assertion, msg) {
        if (!assertion) {
            throw new Error(msg);
        }
    }

    function areCollectsEqual(a, b) {
        if (a == null || b == null) {
            return false;
        }
        if (typeof a !== 'object' || typeof b !== 'object') {
            return a === b;
        }
        return shallowEqual(a, b);
    }

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

    /**
     * @ignore
     * This is an RxJS operator to schedule a microtask just after all
     * the synchronous subscribers have been processed.
     * It's useful because we use `microTasks !== 0` to determine when we are finished
     * processing all the listeners and are ready for Angular to perform change detection.
     */
    function scheduleMicroTaskAfter(zone, uTask) {
        return function (source) {
            return source.lift(new RunInZoneOperator(zone, uTask));
        };
    }
    /**
     * @ignore
     */
    var ZoneSubscriber = /** @class */ (function (_super) {
        __extends(ZoneSubscriber, _super);
        function ZoneSubscriber(destination, zone, uTask) {
            if (uTask === void 0) { uTask = (function () { }); }
            var _this = _super.call(this, destination) || this;
            _this.zone = zone;
            _this.uTask = uTask;
            return _this;
        }
        ZoneSubscriber.prototype._next = function (val) {
            this.destination.next && this.destination.next(val);
            this.zone.scheduleMicroTask('ZoneSubscriber', this.uTask);
        };
        return ZoneSubscriber;
    }(rxjs.Subscriber));
    /**
     * @ignore
     */
    var RunInZoneOperator = /** @class */ (function () {
        function RunInZoneOperator(zone, uTask) {
            this.zone = zone;
            this.uTask = uTask;
        }
        RunInZoneOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ZoneSubscriber(subscriber, this.zone, this.uTask));
        };
        return RunInZoneOperator;
    }());

    var Connection = /** @class */ (function () {
        function Connection(factoryArgs, manager, skyhookZone, initialType) {
            var _this = this;
            this.factoryArgs = factoryArgs;
            this.manager = manager;
            this.skyhookZone = skyhookZone;
            /** A subject basically used to kick off any observables waiting for a type to be set via setType/setTypes */
            this.resolvedType$ = new rxjs.ReplaySubject(1);
            /**
             * This one lives exactly as long as the connection.
             * It is responsible for disposing of the handlerConnector, and any internal listen() subscriptions.
             */
            this.subscriptionConnectionLifetime = new rxjs.Subscription();
            this.onUpdate = function () {
                _this.handlerConnector.reconnect();
            };
            this.handleChange = function () {
                _this.collector$.next(_this.handlerMonitor);
            };
            invariant(typeof manager === 'object', 
            // TODO: update this mini-documentation
            'Could not find the drag and drop manager in the context of %s. ' +
                'Make sure to wrap the top-level component of your app with DragDropContext. '
            // tslint:disable-next-line:max-line-length
            // 'Read more: ',
            );
            i0.NgZone.assertNotInAngularZone();
            this.handlerMonitor = this.factoryArgs.createMonitor(this.manager);
            this.collector$ = new rxjs.BehaviorSubject(this.handlerMonitor);
            this.handler = this.factoryArgs.createHandler(this.handlerMonitor);
            this.handlerConnector = this.factoryArgs.createConnector(this.manager.getBackend());
            // handlerConnector lives longer than any per-type subscription
            this.subscriptionConnectionLifetime.add(function () { return _this.handlerConnector.receiveHandlerId(null); });
            if (initialType && initialType !== TYPE_DYNAMIC) {
                this.setTypes(initialType);
            }
        }
        Connection.prototype.listen = function (mapFn) {
            // Listeners are generally around as long as the connection.
            // This isn't 100% true, but there is no way of knowing (even if you ref-count it)
            // when a component no longer needs it.
            return this.resolvedType$.pipe(
            // this ensures we don't start emitting values until there is a type resolved
            operators.take(1), 
            // switch our attention to the incoming firehose of 'something changed' events
            operators.switchMapTo(this.collector$), 
            // turn them into 'interesting state' via the monitor and a user-provided function
            operators.map(mapFn), 
            // don't emit EVERY time the firehose says something changed, only when the interesting state changes
            operators.distinctUntilChanged(areCollectsEqual), 
            // this schedules a single batch change detection run after all the listeners have heard their newest value
            // thus all changes resulting from subscriptions to this are caught by the
            // change detector.
            scheduleMicroTaskAfter(this.skyhookZone, this.onUpdate));
        };
        Connection.prototype.connect = function (fn) {
            var _this = this;
            var subscription = this.resolvedType$.pipe(operators.take(1)).subscribe(function () {
                // must run inside skyhookZone, so things like timers firing after a long hover with touch backend
                // will cause change detection (via executing a macro or event task)
                _this.skyhookZone.run(function () {
                    fn(_this.handlerConnector.hooks);
                });
            });
            // now chain this onto the connection's unsubscribe call.
            // just in case you destroy your component before setting a type on anything
            // i.e.:
            // conn without a type
            //     source = this.dnd.dragSource(null, { ... })
            // manually connect to the DOM, which won't handle the returned subscription like the directive does
            //     ngAfterViewInit() { this.source.connectDragSource(this.myDiv.nativeElement); }
            // never set a type
            // then destroy your component, the source, but not the connection request.
            //     ngOnDestroy() { this.source.unsubscribe(); }
            //
            // without this, you would have a hanging resolvedType$.pipe(take(1)) subscription
            // with this, it dies with the source's unsubscribe call.
            //
            // doesn't need this.subscriptionTypeLifetime, because pipe(take(1)) already does that
            this.subscriptionConnectionLifetime.add(subscription);
            return subscription;
        };
        Connection.prototype.connectDropTarget = function (node) {
            return this.connect(function (c) { return c.dropTarget(node); });
        };
        Connection.prototype.connectDragSource = function (node, options) {
            return this.connect(function (c) { return c.dragSource(node, options); });
        };
        Connection.prototype.connectDragPreview = function (node, options) {
            return this.connect(function (c) { return c.dragPreview(node, options); });
        };
        Connection.prototype.setTypes = function (type) {
            var _this = this;
            // must run inside skyhookZone, so things like timers firing after a long hover with touch backend
            // will cause change detection (via executing a macro or event task)
            this.skyhookZone.run(function () {
                _this.receiveType(type);
                _this.resolvedType$.next(1);
            });
        };
        Connection.prototype.setType = function (type) {
            this.setTypes(type);
        };
        Connection.prototype.getHandlerId = function () {
            return this.handlerId;
        };
        Connection.prototype.receiveType = function (type) {
            if (type === this.currentType) {
                return;
            }
            i0.NgZone.assertNotInAngularZone();
            this.currentType = type;
            if (this.subscriptionTypeLifetime) {
                this.subscriptionTypeLifetime.unsubscribe();
            }
            // console.debug('subscribed to ' + type.toString());
            this.subscriptionTypeLifetime = new rxjs.Subscription();
            var _a = this.factoryArgs.registerHandler(type, this.handler, this.manager), handlerId = _a.handlerId, unregister = _a.unregister;
            this.handlerId = handlerId;
            this.handlerMonitor.receiveHandlerId(handlerId);
            this.handlerConnector.receiveHandlerId(handlerId);
            var globalMonitor = this.manager.getMonitor();
            var unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, { handlerIds: [handlerId] });
            this.subscriptionTypeLifetime.add(unsubscribe);
            this.subscriptionTypeLifetime.add(unregister);
            // this.subscriptionTypeLifetime.add(() => console.debug("unsubscribed from " + type.toString()));
        };
        Connection.prototype.unsubscribe = function () {
            if (this.subscriptionTypeLifetime) {
                this.subscriptionTypeLifetime.unsubscribe();
            }
            this.subscriptionConnectionLifetime.unsubscribe();
        };
        Connection.prototype.add = function (teardown) {
            return this.subscriptionConnectionLifetime.add(teardown);
        };
        Object.defineProperty(Connection.prototype, "closed", {
            get: function () {
                return (this.subscriptionConnectionLifetime &&
                    this.subscriptionConnectionLifetime.closed);
            },
            enumerable: false,
            configurable: true
        });
        return Connection;
    }());
    var TargetConnection = Connection;
    var SourceConnection = Connection;

    var DragLayerConnectionClass = /** @class */ (function () {
        function DragLayerConnectionClass(manager, zone) {
            var _this = this;
            this.manager = manager;
            this.zone = zone;
            this.subscription = new rxjs.Subscription();
            this.isTicking = false;
            this.handleStateChange = function () {
                var monitor = _this.manager.getMonitor();
                _this.collector$.next(monitor);
            };
            this.handleOffsetChange = function () {
                var monitor = _this.manager.getMonitor();
                _this.collector$.next(monitor);
            };
            var monitor = this.manager.getMonitor();
            this.collector$ = new rxjs.BehaviorSubject(monitor);
            this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleOffsetChange);
            this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleStateChange);
            this.subscription.add(function () {
                _this.unsubscribeFromOffsetChange();
                _this.unsubscribeFromStateChange();
            });
            this.handleStateChange();
        }
        DragLayerConnectionClass.prototype.listen = function (mapFn) {
            return this.collector$.pipe(operators.map(mapFn), operators.distinctUntilChanged(areCollectsEqual), scheduleMicroTaskAfter(this.zone));
        };
        DragLayerConnectionClass.prototype.unsubscribe = function () {
            this.collector$.complete();
            this.subscription.unsubscribe();
        };
        DragLayerConnectionClass.prototype.add = function (teardown) {
            return this.subscription.add(teardown);
        };
        Object.defineProperty(DragLayerConnectionClass.prototype, "closed", {
            get: function () {
                return this.subscription.closed;
            },
            enumerable: false,
            configurable: true
        });
        return DragLayerConnectionClass;
    }());

    var isCallingCanDrag = false;
    var isCallingIsDragging = false;
    var DragSourceMonitorClass = /** @class */ (function () {
        function DragSourceMonitorClass(manager) {
            this.internalMonitor = manager.getMonitor();
        }
        DragSourceMonitorClass.prototype.receiveHandlerId = function (sourceId) {
            this.sourceId = sourceId;
        };
        DragSourceMonitorClass.prototype.canDrag = function () {
            invariant(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' +
                'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');
            try {
                isCallingCanDrag = true;
                return this.internalMonitor.canDragSource(this.sourceId);
            }
            finally {
                isCallingCanDrag = false;
            }
        };
        DragSourceMonitorClass.prototype.isDragging = function () {
            invariant(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' +
                'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');
            try {
                isCallingIsDragging = true;
                return this.internalMonitor.isDraggingSource(this.sourceId);
            }
            finally {
                isCallingIsDragging = false;
            }
        };
        DragSourceMonitorClass.prototype.getItemType = function () {
            return this.internalMonitor.getItemType();
        };
        DragSourceMonitorClass.prototype.getItem = function () {
            return this.internalMonitor.getItem();
        };
        DragSourceMonitorClass.prototype.getDropResult = function () {
            return this.internalMonitor.getDropResult();
        };
        DragSourceMonitorClass.prototype.didDrop = function () {
            return this.internalMonitor.didDrop();
        };
        DragSourceMonitorClass.prototype.getInitialClientOffset = function () {
            return this.internalMonitor.getInitialClientOffset();
        };
        DragSourceMonitorClass.prototype.getInitialSourceClientOffset = function () {
            return this.internalMonitor.getInitialSourceClientOffset();
        };
        DragSourceMonitorClass.prototype.getSourceClientOffset = function () {
            return this.internalMonitor.getSourceClientOffset();
        };
        DragSourceMonitorClass.prototype.getClientOffset = function () {
            return this.internalMonitor.getClientOffset();
        };
        DragSourceMonitorClass.prototype.getDifferenceFromInitialOffset = function () {
            return this.internalMonitor.getDifferenceFromInitialOffset();
        };
        return DragSourceMonitorClass;
    }());
    function createSourceMonitor(manager) {
        return new DragSourceMonitorClass(manager);
    }

    var Target = /** @class */ (function () {
        function Target(spec, zone, monitor) {
            this.spec = spec;
            this.zone = zone;
            this.monitor = monitor;
            this.monitor = monitor;
        }
        Target.prototype.withChangeDetection = function (fn) {
            var x = fn();
            this.zone.scheduleMicroTask('DropTarget', function () { });
            return x;
        };
        Target.prototype.receiveMonitor = function (monitor) {
            this.monitor = monitor;
        };
        Target.prototype.canDrop = function () {
            if (!this.spec.canDrop) {
                return true;
            }
            // don't run isDragging in the zone. Should be a pure function of `this`.
            return this.spec.canDrop(this.monitor);
        };
        Target.prototype.hover = function () {
            var _this = this;
            if (!this.spec.hover) {
                return;
            }
            this.withChangeDetection(function () {
                _this.spec.hover && _this.spec.hover(_this.monitor);
            });
        };
        Target.prototype.drop = function () {
            var _this = this;
            if (!this.spec.drop) {
                return undefined;
            }
            return this.withChangeDetection(function () {
                var dropResult = _this.spec.drop && _this.spec.drop(_this.monitor);
                return dropResult;
            });
        };
        return Target;
    }());
    function createTargetFactory(spec, zone) {
        return function createTarget(monitor) {
            return new Target(spec, zone, monitor);
        };
    }

    var isCallingCanDrop = false;
    var DropTargetMonitorClass = /** @class */ (function () {
        function DropTargetMonitorClass(manager) {
            this.internalMonitor = manager.getMonitor();
        }
        DropTargetMonitorClass.prototype.receiveHandlerId = function (targetId) {
            this.targetId = targetId;
        };
        DropTargetMonitorClass.prototype.canDrop = function () {
            invariant(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' +
                'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html');
            try {
                isCallingCanDrop = true;
                return this.internalMonitor.canDropOnTarget(this.targetId);
            }
            finally {
                isCallingCanDrop = false;
            }
        };
        DropTargetMonitorClass.prototype.isOver = function (options) {
            if (options === void 0) { options = { shallow: false }; }
            return this.internalMonitor.isOverTarget(this.targetId, options);
        };
        DropTargetMonitorClass.prototype.getItemType = function () {
            return this.internalMonitor.getItemType();
        };
        DropTargetMonitorClass.prototype.getItem = function () {
            return this.internalMonitor.getItem();
        };
        DropTargetMonitorClass.prototype.getDropResult = function () {
            return this.internalMonitor.getDropResult();
        };
        DropTargetMonitorClass.prototype.didDrop = function () {
            return this.internalMonitor.didDrop();
        };
        DropTargetMonitorClass.prototype.getInitialClientOffset = function () {
            return this.internalMonitor.getInitialClientOffset();
        };
        DropTargetMonitorClass.prototype.getInitialSourceClientOffset = function () {
            return this.internalMonitor.getInitialSourceClientOffset();
        };
        DropTargetMonitorClass.prototype.getSourceClientOffset = function () {
            return this.internalMonitor.getSourceClientOffset();
        };
        DropTargetMonitorClass.prototype.getClientOffset = function () {
            return this.internalMonitor.getClientOffset();
        };
        DropTargetMonitorClass.prototype.getDifferenceFromInitialOffset = function () {
            return this.internalMonitor.getDifferenceFromInitialOffset();
        };
        return DropTargetMonitorClass;
    }());
    function createTargetMonitor(manager) {
        return new DropTargetMonitorClass(manager);
    }

    var Source = /** @class */ (function () {
        function Source(spec, zone, monitor) {
            this.spec = spec;
            this.zone = zone;
            this.monitor = monitor;
        }
        Source.prototype.withChangeDetection = function (fn) {
            var x = fn();
            this.zone.scheduleMicroTask('DragSource', function () { });
            return x;
        };
        Source.prototype.canDrag = function () {
            var _this = this;
            if (!this.spec.canDrag) {
                return true;
            }
            return this.withChangeDetection(function () {
                return _this.spec.canDrag && _this.spec.canDrag(_this.monitor) || false;
            });
        };
        Source.prototype.isDragging = function (globalMonitor, sourceId) {
            if (!this.spec.isDragging) {
                return sourceId === globalMonitor.getSourceId();
            }
            return this.spec.isDragging(this.monitor);
        };
        Source.prototype.beginDrag = function () {
            var _this = this;
            return this.withChangeDetection(function () {
                return _this.spec.beginDrag(_this.monitor);
            });
        };
        Source.prototype.endDrag = function () {
            var _this = this;
            if (!this.spec.endDrag) {
                return;
            }
            return this.withChangeDetection(function () {
                if (_this.spec.endDrag) {
                    _this.spec.endDrag(_this.monitor);
                }
            });
        };
        return Source;
    }());
    function createSourceFactory(spec, zone) {
        return function createSource(monitor) {
            return new Source(spec, zone, monitor);
        };
    }

    /// <reference types="zone.js" />
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
    var SkyhookDndService = /** @class */ (function () {
        /** @ignore */
        function SkyhookDndService(manager, ngZone) {
            var _this = this;
            this.manager = manager;
            this.ngZone = ngZone;
            /** @ignore */
            this.skyhookZone = Zone.root.fork({
                name: 'skyhookZone',
                onHasTask: function (_parentZoneDelegate, _currentZone, _targetZone, state) {
                    // when we've | drained the microTask queue; or                    | ... run a change detection cycle.
                    //            | executed or cancelled a macroTask (eg a timer); or |
                    //            | handled an event                                   |
                    // note: we must use ngZone.run() instead of ApplicationRef.tick()
                    // this is because
                    // 1. this callback runs outside the angular zone
                    // 2. therefore if you use appRef.tick(), the event handlers set up during the tick() are
                    //    not in the angular zone, even though anything set up during tick() should be
                    // 3. therefore you get regular (click) handlers from templates running in skyhookZone
                    //    and not causing change detection
                    // Also, now we watch for macroTasks as well.
                    // This means if we set up timers in the skyhook zone, they will fire and cause change
                    // detection. Useful if doing .listen(...).delay(1000) and the resulting asynchronous
                    // subscribers.
                    // Appropriately, we run more setup handlers in skyhookZone now.
                    //
                    // Proper event handlers (set up by the backend) don't trigger any, because skyhookZone
                    // only cares about # of handlers changing => 0. But if we care about them, it will be
                    // through listen(), updates to which will schedule a microTask.
                    if (!state[state.change]) {
                        _this.ngZone.run(function () {
                            // noop, but causes change detection (i.e. onLeave)
                        });
                    }
                },
            });
        }
        /**
         * This drop target will only react to the items produced by the drag sources
         * of the specified type or types.
         *
         * If you want a dynamic type, pass `null` as the type; and call
         * {@link DropTarget#setTypes} in a lifecycle hook.
         */
        SkyhookDndService.prototype.dropTarget = function (types, spec, subscription) {
            var _this = this;
            // return this.ngZone.runOutsideAngular(() => {
            return this.skyhookZone.run(function () {
                var createTarget = createTargetFactory(spec, _this.skyhookZone);
                var conn = new TargetConnection({
                    createHandler: createTarget,
                    registerHandler: registerTarget,
                    createMonitor: createTargetMonitor,
                    createConnector: createTargetConnector,
                }, _this.manager, _this.skyhookZone, types || TYPE_DYNAMIC);
                if (subscription) {
                    subscription.add(conn);
                }
                return conn;
            });
        };
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
        SkyhookDndService.prototype.dragSource = function (type, spec, subscription) {
            var _this = this;
            // return this.ngZone.runOutsideAngular(() => {
            return this.skyhookZone.run(function () {
                var createSource = createSourceFactory(spec, _this.skyhookZone);
                var conn = new SourceConnection({
                    createHandler: createSource,
                    registerHandler: registerSource,
                    createMonitor: createSourceMonitor,
                    createConnector: createSourceConnector,
                }, _this.manager, _this.skyhookZone, type || TYPE_DYNAMIC);
                if (subscription) {
                    subscription.add(conn);
                }
                return conn;
            });
        };
        /**
         * This method creates a {@link DragLayer} object
         */
        SkyhookDndService.prototype.dragLayer = function (subscription) {
            var _this = this;
            // return this.ngZone.runOutsideAngular(() => {
            return this.skyhookZone.run(function () {
                var conn = new DragLayerConnectionClass(_this.manager, _this.skyhookZone);
                if (subscription) {
                    subscription.add(conn);
                }
                return conn;
            });
        };
        return SkyhookDndService;
    }());
    SkyhookDndService.ɵfac = function SkyhookDndService_Factory(t) { return new (t || SkyhookDndService)(i0.ɵɵinject(DRAG_DROP_MANAGER), i0.ɵɵinject(i0.NgZone)); };
    SkyhookDndService.ɵprov = i0.ɵɵdefineInjectable({ token: SkyhookDndService, factory: SkyhookDndService.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookDndService, [{
                type: i0.Injectable
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [DRAG_DROP_MANAGER]
                        }] }, { type: i0.NgZone }];
        }, null);
    })();

    /** @ignore */
    var explanation = 'You can only pass exactly one connection object to [dropTarget]. ' +
        'There is only one of each source/target/preview allowed per DOM element.';
    /**
     * @ignore
     */
    var DndDirective = /** @class */ (function () {
        /** @ignore */
        function DndDirective(elRef, zone) {
            this.elRef = elRef;
            this.zone = zone;
            this.deferredRequest = new rxjs.Subscription();
        }
        DndDirective.prototype.ngOnChanges = function () {
            var _this = this;
            invariant(typeof this.connection === 'object' && !Array.isArray(this.connection), explanation);
            this.zone.runOutsideAngular(function () {
                // discard an unresolved connection request
                // in the case where the previous one succeeded, deferredRequest is
                // already closed.
                _this.deferredRequest.unsubscribe();
                // replace it with a new one
                if (_this.connection) {
                    _this.deferredRequest = _this.callHooks(_this.connection);
                }
            });
        };
        DndDirective.prototype.ngOnDestroy = function () { this.deferredRequest.unsubscribe(); };
        // @ts-ignore
        DndDirective.prototype.callHooks = function (conn) {
            return new rxjs.Subscription();
        };
        return DndDirective;
    }());
    DndDirective.ɵfac = function DndDirective_Factory(t) { return new (t || DndDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
    DndDirective.ɵdir = i0.ɵɵdefineDirective({ type: DndDirective, selectors: [["", "abstractDndDirective", ""]], features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DndDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[abstractDndDirective]'
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, null);
    })();
    // Note: the T | undefined everywhere is from https://github.com/angular/angular-cli/issues/2034
    /**
     * Allows you to connect a {@link DropTarget} to an element in a component template.
     */
    var DropTargetDirective = /** @class */ (function (_super) {
        __extends(DropTargetDirective, _super);
        function DropTargetDirective() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(DropTargetDirective.prototype, "dropTargetType", {
            /** Reduce typo confusion by allowing non-plural version of dropTargetTypes */
            set: function (t) {
                this.dropTargetTypes = t;
            },
            enumerable: false,
            configurable: true
        });
        DropTargetDirective.prototype.ngOnChanges = function () {
            this.connection = this.dropTarget;
            if (this.connection && this.dropTargetTypes != null) {
                this.connection.setTypes(this.dropTargetTypes);
            }
            _super.prototype.ngOnChanges.call(this);
        };
        DropTargetDirective.prototype.callHooks = function (conn) {
            return conn.connectDropTarget(this.elRef.nativeElement);
        };
        return DropTargetDirective;
    }(DndDirective));
    DropTargetDirective.ɵfac = function DropTargetDirective_Factory(t) { return ɵDropTargetDirective_BaseFactory(t || DropTargetDirective); };
    DropTargetDirective.ɵdir = i0.ɵɵdefineDirective({ type: DropTargetDirective, selectors: [["", "dropTarget", ""]], inputs: { dropTarget: "dropTarget", dropTargetTypes: "dropTargetTypes", dropTargetType: "dropTargetType" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature] });
    var ɵDropTargetDirective_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(DropTargetDirective);
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DropTargetDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[dropTarget]'
                    }]
            }], null, { dropTarget: [{
                    type: i0.Input,
                    args: ['dropTarget']
                }], dropTargetTypes: [{
                    type: i0.Input,
                    args: ['dropTargetTypes']
                }], dropTargetType: [{
                    type: i0.Input,
                    args: ['dropTargetType']
                }] });
    })();
    /**
     * Allows you to connect a {@link DragSource} to an element in a component template.
     */
    var DragSourceDirective = /** @class */ (function (_super) {
        __extends(DragSourceDirective, _super);
        function DragSourceDirective() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            /** Do not render an HTML5 preview. Only applies when using the HTML5 backend.
             * It does not use { captureDraggingState: true } for IE11 support; that is broken.
             */
            _this.noHTML5Preview = false;
            return _this;
        }
        DragSourceDirective.prototype.ngOnChanges = function () {
            this.connection = this.dragSource;
            if (this.connection && this.dragSourceType != null) {
                this.connection.setType(this.dragSourceType);
            }
            _super.prototype.ngOnChanges.call(this);
        };
        DragSourceDirective.prototype.callHooks = function (conn) {
            var sub = new rxjs.Subscription();
            sub.add(conn.connectDragSource(this.elRef.nativeElement, this.dragSourceOptions));
            if (this.noHTML5Preview) {
                sub.add(conn.connectDragPreview(getEmptyImage()));
            }
            return sub;
        };
        return DragSourceDirective;
    }(DndDirective));
    DragSourceDirective.ɵfac = function DragSourceDirective_Factory(t) { return ɵDragSourceDirective_BaseFactory(t || DragSourceDirective); };
    DragSourceDirective.ɵdir = i0.ɵɵdefineDirective({ type: DragSourceDirective, selectors: [["", "dragSource", ""]], inputs: { dragSource: "dragSource", dragSourceType: "dragSourceType", dragSourceOptions: "dragSourceOptions", noHTML5Preview: "noHTML5Preview" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature] });
    var ɵDragSourceDirective_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(DragSourceDirective);
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DragSourceDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[dragSource]'
                    }]
            }], null, { dragSource: [{
                    type: i0.Input,
                    args: ['dragSource']
                }], dragSourceType: [{
                    type: i0.Input,
                    args: ['dragSourceType']
                }], dragSourceOptions: [{
                    type: i0.Input,
                    args: ['dragSourceOptions']
                }], noHTML5Preview: [{
                    type: i0.Input,
                    args: ['noHTML5Preview']
                }] });
    })();
    /**
     * Allows you to specify which element a {@link DragSource} should screenshot as an HTML5 drag preview.
     *
     * Only relevant when using the HTML5 backend.
     */
    var DragPreviewDirective = /** @class */ (function (_super) {
        __extends(DragPreviewDirective, _super);
        function DragPreviewDirective() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragPreviewDirective.prototype.ngOnChanges = function () {
            this.connection = this.dragPreview;
            _super.prototype.ngOnChanges.call(this);
        };
        DragPreviewDirective.prototype.callHooks = function (conn) {
            return conn.connectDragPreview(this.elRef.nativeElement, this.dragPreviewOptions);
        };
        return DragPreviewDirective;
    }(DndDirective));
    DragPreviewDirective.ɵfac = function DragPreviewDirective_Factory(t) { return ɵDragPreviewDirective_BaseFactory(t || DragPreviewDirective); };
    DragPreviewDirective.ɵdir = i0.ɵɵdefineDirective({ type: DragPreviewDirective, selectors: [["", "dragPreview", ""]], inputs: { dragPreview: "dragPreview", dragPreviewOptions: "dragPreviewOptions" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature] });
    var ɵDragPreviewDirective_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(DragPreviewDirective);
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DragPreviewDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[dragPreview]',
                        inputs: ['dragPreview', 'dragPreviewOptions']
                    }]
            }], null, { dragPreview: [{
                    type: i0.Input,
                    args: ['dragPreview']
                }], dragPreviewOptions: [{
                    type: i0.Input,
                    args: ['dragPreviewOptions']
                }] });
    })();
    // import { getEmptyImage } from 'react-dnd-html5-backend';
    // we don't want to depend on the backend, so here that is, copied
    /** @ignore */
    var emptyImage;
    /**
     * Returns a 0x0 empty GIF for use as a drag preview.
     * @ignore
     * */
    function getEmptyImage() {
        if (!emptyImage) {
            emptyImage = new Image();
            emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        }
        return emptyImage;
    }

    /** @ignore */
    function unpackBackendForEs5Users(backendOrModule) {
        // Auto-detect ES6 default export for people still using ES5
        var backend = backendOrModule;
        if (typeof backend === 'object' && typeof backend.default === 'function') {
            backend = backend.default;
        }
        invariant(typeof backend === 'function', 'Expected the backend to be a function or an ES6 module exporting a default function. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html');
        return backend;
    }
    // TODO allow injecting window
    /** @ignore */
    // @dynamic
    function managerFactory(backendFactory, zone, context, backendOptions, debugMode) {
        backendFactory = unpackBackendForEs5Users(backendFactory);
        return zone.runOutsideAngular(function () { return dndCore.createDragDropManager(backendFactory, context, backendOptions, debugMode); });
    }
    /** @ignore */
    function getGlobalContext() {
        return typeof global !== 'undefined' ? global : window;
    }
    /** @ignore */
    var EXPORTS = [
        DndDirective,
        DragSourceDirective,
        DropTargetDirective,
        DragPreviewDirective,
    ];
    // @dynamic
    var SkyhookDndModule = /** @class */ (function () {
        function SkyhookDndModule() {
        }
        SkyhookDndModule.forRoot = function (backendOrBackendFactory) {
            return {
                ngModule: SkyhookDndModule,
                providers: [
                    {
                        provide: DRAG_DROP_BACKEND,
                        // whichever one they have provided, the other will be undefined
                        useValue: backendOrBackendFactory.backend,
                        useFactory: backendOrBackendFactory
                            .backendFactory,
                    },
                    {
                        provide: DRAG_DROP_BACKEND_OPTIONS,
                        // whichever one they have provided, the other will be undefined
                        useValue: backendOrBackendFactory.options,
                    },
                    {
                        provide: DRAG_DROP_BACKEND_DEBUG_MODE,
                        // whichever one they have provided, the other will be undefined
                        useValue: backendOrBackendFactory.debug,
                    },
                    {
                        provide: DRAG_DROP_GLOBAL_CONTEXT,
                        useFactory: getGlobalContext,
                    },
                    {
                        provide: DRAG_DROP_MANAGER,
                        useFactory: managerFactory,
                        deps: [
                            DRAG_DROP_BACKEND,
                            i0.NgZone,
                            DRAG_DROP_GLOBAL_CONTEXT,
                            DRAG_DROP_BACKEND_OPTIONS,
                            DRAG_DROP_BACKEND_DEBUG_MODE,
                        ],
                    },
                    SkyhookDndService,
                ],
            };
        };
        return SkyhookDndModule;
    }());
    SkyhookDndModule.ɵmod = i0.ɵɵdefineNgModule({ type: SkyhookDndModule });
    SkyhookDndModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SkyhookDndModule_Factory(t) { return new (t || SkyhookDndModule)(); } });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SkyhookDndModule, { declarations: [DndDirective,
                DragSourceDirective,
                DropTargetDirective,
                DragPreviewDirective], exports: [DndDirective,
                DragSourceDirective,
                DropTargetDirective,
                DragPreviewDirective] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SkyhookDndModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: EXPORTS,
                        exports: EXPORTS,
                    }]
            }], null, null);
    })();

    // import no symbols to get typings but not execute the monkey-patching module loader

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DRAG_DROP_BACKEND = DRAG_DROP_BACKEND;
    exports.DRAG_DROP_MANAGER = DRAG_DROP_MANAGER;
    exports.DndDirective = DndDirective;
    exports.DragPreviewDirective = DragPreviewDirective;
    exports.DragSourceDirective = DragSourceDirective;
    exports.DropTargetDirective = DropTargetDirective;
    exports.SkyhookDndModule = SkyhookDndModule;
    exports.SkyhookDndService = SkyhookDndService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=rednax-core.umd.js.map
