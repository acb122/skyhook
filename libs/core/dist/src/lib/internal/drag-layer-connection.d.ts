/// <reference types="zone.js" />
import { Subscription, Observable, TeardownLogic } from 'rxjs';
import { DragDropManager, Unsubscribe } from 'dnd-core';
import { DragLayer } from '../connection-types';
import { DragLayerMonitor } from '../layer-monitor';
export declare class DragLayerConnectionClass implements DragLayer {
    private manager;
    private zone;
    unsubscribeFromOffsetChange: Unsubscribe;
    unsubscribeFromStateChange: Unsubscribe;
    private readonly collector$;
    private subscription;
    constructor(manager: DragDropManager, zone: Zone);
    isTicking: boolean;
    private handleStateChange;
    private handleOffsetChange;
    listen<P>(mapFn: (monitor: DragLayerMonitor) => P): Observable<P>;
    unsubscribe(): void;
    add(teardown: TeardownLogic): Subscription;
    get closed(): boolean;
}
