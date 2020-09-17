import { Backend, Identifier } from 'dnd-core';
import { DropTargetConnector } from '../connectors';
import { Connector } from './createSourceConnector';
export declare class TargetConnector implements Connector<DropTargetConnector> {
    private backend;
    private currentHandlerId;
    private dropTarget;
    constructor(backend: Backend);
    receiveHandlerId(handlerId: Identifier | null): void;
    hooks: DropTargetConnector;
    reconnect(): void;
}
export default function createTargetConnector(backend: Backend): TargetConnector;
