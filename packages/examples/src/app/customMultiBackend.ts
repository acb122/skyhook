import { MouseTransition, MultiBackend } from '@rednax-skyhook/multi-backend';
import { BackendTransition, TouchTransition } from 'dnd-multi-backend';
import { BackendFactory } from 'dnd-core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { TouchBackendOptions } from 'react-dnd-touch-backend/lib/interfaces';

const backendTransitions: BackendTransition[] = [
    {
        backend: HTML5Backend,
        transition: MouseTransition,
    },
    {
        backend: (manager, context) =>
            TouchBackend(manager, context, {
                enableMouseEvents: false,
                ignoreContextMenu: true,
                delayTouchStart: 200, // milliseconds
            } as TouchBackendOptions),
        // backend: TouchBackend,
        transition: TouchTransition,
        preview: true,
    },
];

export function customMultiBackend(): BackendFactory {
    return MultiBackend({ backends: backendTransitions });
}
