import { ModuleWithProviders, NgZone } from '@angular/core';
import { BackendFactory, DragDropManager } from 'dnd-core';
import * as i0 from "@angular/core";
import * as i1 from "./dnd.directive";
/** @ignore */
export declare function unpackBackendForEs5Users(backendOrModule: any): any;
/** @ignore */
export declare function managerFactory(backendFactory: BackendFactory, zone: NgZone, context: any, backendOptions?: any, debugMode?: boolean): DragDropManager;
/** @ignore */
export declare function getGlobalContext(): any;
/** Use this for providing plain backends to {@link SkyhookDndModule#forRoot}. */
export interface BackendInput {
    /** A plain backend, for example the HTML5Backend. */
    backend: BackendFactory;
    options?: any;
    debug?: boolean;
}
/**
 * Use this for providing backends that need configuring before use to {@link SkyhookDndModule#forRoot}.
 *
 * For use with the MultiBackend:
 *
 * ```typescript
 * import { createDefaultMultiBackend } from '@rednax/multi-backend';
 * // ...
 * SkyhookDndModule.forRoot({ backendFactory: createDefaultMultiBackend })
 * ```
 *
 * or with the TouchBackend by itself:
 *
 * ```typescript
 * export function createTouchBackend() {
 *     return TouchBackend({ enableMouseEvents: false });
 * }
 * // ...
 * SkyhookDndModule.forRoot({ backendFactory: createTouchBackend })
 * ```
 *
 * You have to do this to retain AOT compatibility.
 */
export interface BackendFactoryInput {
    /** See above. */
    backendFactory: () => BackendFactory;
    debug?: boolean;
}
export declare class SkyhookDndModule {
    static forRoot(backendOrBackendFactory: BackendInput | BackendFactoryInput): ModuleWithProviders<any>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<SkyhookDndModule, [typeof i1.DndDirective, typeof i1.DragSourceDirective, typeof i1.DropTargetDirective, typeof i1.DragPreviewDirective], never, [typeof i1.DndDirective, typeof i1.DragSourceDirective, typeof i1.DropTargetDirective, typeof i1.DragPreviewDirective]>;
    static ɵinj: i0.ɵɵInjectorDef<SkyhookDndModule>;
}
