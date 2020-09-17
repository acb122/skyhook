// import no symbols to get typings but not execute the monkey-patching module loader
/// <reference path="src/lib/ambient.d.ts" />

export {
  SkyhookDndModule,
  BackendInput,
  BackendFactoryInput,
} from './src/lib/dnd.module';

export { DragSourceMonitor } from './src/lib/source-monitor';
export { DropTargetMonitor } from './src/lib/target-monitor';
export { DragLayerMonitor } from './src/lib/layer-monitor';

// the source, target and preview types
export { DropTarget, DragSource, DragLayer } from './src/lib/connection-types';

export { DragSourceOptions, DragPreviewOptions } from './src/lib/connectors';

export { DRAG_DROP_BACKEND, DRAG_DROP_MANAGER } from './src/lib/tokens';

// direct API
export {
  SkyhookDndService,
  AddSubscription,
} from './src/lib/connector.service';
export { DropTargetSpec } from './src/lib/drop-target-specification';
export { DragSourceSpec } from './src/lib/drag-source-specification';

export {
  DndDirective,
  DragSourceDirective,
  DropTargetDirective,
  DragPreviewDirective,
} from './src/lib/dnd.directive';

export { Offset } from './src/lib/type-ish';
