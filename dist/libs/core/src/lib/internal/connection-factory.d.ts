/// <reference types="zone.js" />
import { Backend, DragDropManager } from 'dnd-core';
import { TypeOrTypeArray } from '../type-ish';
import { Subscription, Observable, TeardownLogic } from 'rxjs';
import { DropTargetMonitor } from '../target-monitor';
import { DragSourceMonitor } from '../source-monitor';
import * as t from '../connection-types';
import { DropTargetConnector, DragSourceConnector, DragSourceOptions, DragPreviewOptions } from '../connectors';
import { Connector } from './createSourceConnector';
export interface FactoryArgs<TMonitor, TConnector> {
    createHandler: (handlerMonitor: any) => any;
    createMonitor: (manager: DragDropManager) => TMonitor;
    createConnector: (backend: Backend) => Connector<TConnector>;
    registerHandler: (type: any, handler: any, manager: DragDropManager) => {
        handlerId: any;
        unregister: Subscription | Function;
    };
}
export declare class Connection<TMonitor extends DragSourceMonitor | DropTargetMonitor, TConnector> {
    private factoryArgs;
    private manager;
    private skyhookZone;
    private readonly handlerMonitor;
    private readonly handlerConnector;
    private readonly handler;
    /** The stream of all change events from the internal subscription's handleChange */
    private readonly collector$;
    /** A subject basically used to kick off any observables waiting for a type to be set via setType/setTypes */
    private readonly resolvedType$;
    private currentType?;
    private handlerId;
    /**
     * This one is created and destroyed once per type or list of types.
     * Because each time we change the type, we unsubscribe from the global state storage and
     * re-subscribe with the new type.
     */
    private subscriptionTypeLifetime?;
    /**
     * This one lives exactly as long as the connection.
     * It is responsible for disposing of the handlerConnector, and any internal listen() subscriptions.
     */
    private subscriptionConnectionLifetime;
    constructor(factoryArgs: FactoryArgs<TMonitor, TConnector>, manager: DragDropManager, skyhookZone: Zone, initialType: TypeOrTypeArray | undefined);
    listen<P>(mapFn: (monitor: TMonitor) => P): Observable<P>;
    private onUpdate;
    connect(fn: (connector: TConnector) => void): Subscription;
    connectDropTarget(node: Node): Subscription;
    connectDragSource(node: Node, options: DragSourceOptions): Subscription;
    connectDragPreview(node: Node, options: DragPreviewOptions): Subscription;
    setTypes(type: TypeOrTypeArray): void;
    setType(type: string | symbol): void;
    getHandlerId(): any;
    receiveType(type: TypeOrTypeArray): void;
    private handleChange;
    unsubscribe(): void;
    add(teardown: TeardownLogic): Subscription;
    get closed(): boolean;
}
export interface SourceConstructor<Item = {}, DropResult = {}> {
    new (factoryArgs: FactoryArgs<DragSourceMonitor, DragSourceConnector>, manager: DragDropManager, skyhookZone: Zone, initialType: string | symbol | undefined): t.DragSource<Item, DropResult>;
}
export interface TargetConstructor {
    new (factoryArgs: FactoryArgs<DropTargetMonitor, DropTargetConnector>, manager: DragDropManager, skyhookZone: Zone, initialType: TypeOrTypeArray | undefined): t.DropTarget;
}
export declare const TargetConnection: TargetConstructor;
export declare const SourceConnection: SourceConstructor<{}, {}>;
