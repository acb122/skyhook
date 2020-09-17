import { Backend, Identifier } from 'dnd-core';
import { DragSourceConnector } from '../connectors';
export interface Connector<TConnector> {
    hooks: TConnector;
    receiveHandlerId(handlerId: Identifier | null): void;
    reconnect(): void;
}
export declare class SourceConnector implements Connector<DragSourceConnector> {
    private backend;
    private currentHandlerId;
    private dragSource;
    private dragPreview;
    constructor(backend: Backend);
    receiveHandlerId(handlerId: Identifier | null): void;
    hooks: DragSourceConnector;
    reconnect(): void;
}
export default function createSourceConnector(backend: Backend): SourceConnector;
