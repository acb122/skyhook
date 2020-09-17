/// <reference types="zone.js" />
import { DragSource } from 'dnd-core';
import { DragSourceSpec } from '../drag-source-specification';
import { DragSourceMonitor } from '../source-monitor';
export declare class Source implements DragSource {
    private spec;
    private zone;
    private monitor;
    constructor(spec: DragSourceSpec<any>, zone: Zone, monitor: DragSourceMonitor<any, any>);
    withChangeDetection<T>(fn: () => T): T;
    canDrag(): boolean;
    isDragging(globalMonitor: any, sourceId: any): boolean;
    beginDrag(): any;
    endDrag(): void;
}
export declare function createSourceFactory(spec: DragSourceSpec<any>, zone: Zone): (monitor: DragSourceMonitor) => DragSource;
