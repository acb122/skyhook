/// <reference types="zone.js" />
import { DropTarget } from 'dnd-core';
import { DropTargetMonitor } from '../target-monitor';
import { DropTargetSpec } from '../drop-target-specification';
export declare class Target implements DropTarget {
    private spec;
    private zone;
    private monitor;
    constructor(spec: DropTargetSpec, zone: Zone, monitor: DropTargetMonitor);
    withChangeDetection<T>(fn: () => T): T;
    receiveMonitor(monitor: any): void;
    canDrop(): boolean;
    hover(): void;
    drop(): void | {};
}
export declare function createTargetFactory(spec: DropTargetSpec, zone: Zone): any;
