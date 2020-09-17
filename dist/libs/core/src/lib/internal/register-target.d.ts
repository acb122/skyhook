import { DragDropManager, DropTarget } from 'dnd-core';
export default function registerTarget(type: any, target: DropTarget, manager: DragDropManager): {
    handlerId: string | symbol;
    unregister: () => void;
};
