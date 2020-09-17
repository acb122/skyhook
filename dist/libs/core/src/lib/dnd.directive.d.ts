import { ElementRef, NgZone } from '@angular/core';
import { DropTarget, DragSource } from './connection-types';
import { DragSourceOptions, DragPreviewOptions } from './connectors';
import { Subscription } from 'rxjs';
import { TypeOrTypeArray } from './type-ish';
import * as i0 from "@angular/core";
/**
 * @ignore
 */
export declare class DndDirective {
    protected elRef: ElementRef;
    private zone;
    protected connection: any;
    private deferredRequest;
    /** @ignore */
    constructor(elRef: ElementRef, zone: NgZone);
    protected ngOnChanges(): void;
    protected ngOnDestroy(): void;
    protected callHooks(conn: any): Subscription;
    static ɵfac: i0.ɵɵFactoryDef<DndDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DndDirective, "[abstractDndDirective]", never, {}, {}, never>;
}
/**
 * Allows you to connect a {@link DropTarget} to an element in a component template.
 */
export declare class DropTargetDirective extends DndDirective {
    protected connection: DropTarget | undefined;
    /** Which target to connect the DOM to */
    dropTarget: DropTarget;
    /** Shortcut for setting a type on the connection.
     *  Lets you use Angular binding to do it. Runs {@link DropTarget#setTypes}. */
    dropTargetTypes?: TypeOrTypeArray;
    /** Reduce typo confusion by allowing non-plural version of dropTargetTypes */
    set dropTargetType(t: TypeOrTypeArray);
    protected ngOnChanges(): void;
    protected callHooks(conn: DropTarget): Subscription;
    static ɵfac: i0.ɵɵFactoryDef<DropTargetDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DropTargetDirective, "[dropTarget]", never, { "dropTarget": "dropTarget"; "dropTargetTypes": "dropTargetTypes"; "dropTargetType": "dropTargetType"; }, {}, never>;
}
/**
 * Allows you to connect a {@link DragSource} to an element in a component template.
 */
export declare class DragSourceDirective extends DndDirective {
    protected connection: DragSource<any> | undefined;
    /** Which source to connect the DOM to */
    dragSource: DragSource<any>;
    /** Shortcut for setting a type on the connection.
     *  Lets you use Angular binding to do it. Runs {@link DragSource#setType}. */
    dragSourceType?: string | symbol;
    /** Pass an options object as you would to {@link DragSource#connectDragSource}. */
    dragSourceOptions?: DragSourceOptions;
    /** Do not render an HTML5 preview. Only applies when using the HTML5 backend.
     * It does not use { captureDraggingState: true } for IE11 support; that is broken.
     */
    noHTML5Preview: boolean;
    protected ngOnChanges(): void;
    protected callHooks(conn: DragSource<any>): Subscription;
    static ɵfac: i0.ɵɵFactoryDef<DragSourceDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DragSourceDirective, "[dragSource]", never, { "dragSource": "dragSource"; "dragSourceType": "dragSourceType"; "dragSourceOptions": "dragSourceOptions"; "noHTML5Preview": "noHTML5Preview"; }, {}, never>;
}
/**
 * Allows you to specify which element a {@link DragSource} should screenshot as an HTML5 drag preview.
 *
 * Only relevant when using the HTML5 backend.
 */
export declare class DragPreviewDirective extends DndDirective {
    protected connection: DragSource<any> | undefined;
    /** The drag source for which this element will be the preview. */
    dragPreview: DragSource<any>;
    /** Pass an options object as you would to {@link DragSource#connectDragPreview}. */
    dragPreviewOptions?: DragPreviewOptions;
    protected ngOnChanges(): void;
    protected callHooks(conn: DragSource<any>): Subscription;
    static ɵfac: i0.ɵɵFactoryDef<DragPreviewDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DragPreviewDirective, "[dragPreview]", never, { "dragPreview": "dragPreview"; "dragPreviewOptions": "dragPreviewOptions"; }, {}, never>;
}
