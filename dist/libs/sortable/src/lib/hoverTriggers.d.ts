import { HoverTrigger } from './types';
import { Offset } from '@rednax/core';
import { RenderContext, DraggedItem } from './types';
export declare function suggestHalfway<Data>(ctx: RenderContext<Data>, item: DraggedItem<Data>, rect: DOMRect | ClientRect, clientOffset: Offset): number;
export declare function suggestFixed<Data>(ctx: RenderContext<Data>): number;
export declare function getSuggester(trigger: HoverTrigger): typeof suggestHalfway;
