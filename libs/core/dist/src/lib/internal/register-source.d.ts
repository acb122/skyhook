import { DragDropManager, DragSource } from 'dnd-core';
export default function registerSource(type: any, source: DragSource, manager: DragDropManager): {
    handlerId: string | symbol;
    unregister: () => void;
};
