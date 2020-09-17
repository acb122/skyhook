/**
 * @module Misc
 */
/** */
import { DragDropManager, Backend } from 'dnd-core';
import { InjectionToken } from '@angular/core';
/** The injection token for the dnd-core compatible backend currently in use. */
export declare const DRAG_DROP_BACKEND: InjectionToken<Backend>;
/** The injection token for the dnd-core compatible backend's options. */
export declare const DRAG_DROP_BACKEND_OPTIONS: InjectionToken<any>;
/** The injection token for the dnd-core compatible backend currently in use. */
export declare const DRAG_DROP_BACKEND_DEBUG_MODE: InjectionToken<any>;
/** The injection token for the dnd-core DragDropManager */
export declare const DRAG_DROP_MANAGER: InjectionToken<DragDropManager>;
/** The injection token for the dnd-core compatible backend currently in use. */
export declare const DRAG_DROP_GLOBAL_CONTEXT: InjectionToken<any>;
/** The type a source or target is given as a marker for 'you supplied null as a type',
 *  so that library consumers can be reminded to use setType/setTypes manually.
 *  See {@link DragSource#setType}, {@link DropTarget#setTypes}.
 */
export declare const TYPE_DYNAMIC: symbol;
