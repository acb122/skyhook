import { SkyhookDndService, DropTarget } from '@rednax/core';
import { DraggedItem } from './types';
export declare const SPILLED_LIST_ID: symbol;
export interface SpillConfiguration<Data> {
    drop?: (item: DraggedItem<Data>) => void;
    hover?: (item: DraggedItem<Data>) => void;
}
export declare function spillTarget<Data>(dnd: SkyhookDndService, types: string | symbol | Array<string | symbol> | null, config: SpillConfiguration<Data>): DropTarget<DraggedItem<Data>>;
