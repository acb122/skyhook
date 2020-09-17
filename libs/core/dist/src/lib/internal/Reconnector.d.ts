import { Unsubscribe, Identifier } from 'dnd-core';
export declare class Reconnector<O = any> {
    private backendConnector;
    handlerId: any;
    node?: Node;
    options?: O;
    disconnect?: Unsubscribe | null;
    constructor(backendConnector: (handlerId: any, node: Node, options?: O) => Unsubscribe);
    reconnect: (parentHandlerId: Identifier | null) => void;
    hook: (nativeElement: Node, options?: O | undefined) => void;
}
