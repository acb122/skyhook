import { NgModule } from '@angular/core';
import { SkyhookSortable } from './directives/sortable.directive';
import { SkyhookSortableList } from './directives/list.component';
import { SkyhookSortableTemplate } from './directives/template.directive';
import { SkyhookSortableRenderer } from './directives/render.directive';
import { SkyhookSortableExternal } from './directives/external.directive';
import { CommonModule } from '@angular/common';
import { SkyhookDndModule } from '@rednax/core';
import * as i0 from "@angular/core";
/** @ignore */
const EXPORTS = [
    SkyhookSortable,
    SkyhookSortableList,
    SkyhookSortableTemplate,
    SkyhookSortableRenderer,
    SkyhookSortableExternal,
];
export class SkyhookSortableModule {
}
SkyhookSortableModule.ɵmod = i0.ɵɵdefineNgModule({ type: SkyhookSortableModule });
SkyhookSortableModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SkyhookSortableModule_Factory(t) { return new (t || SkyhookSortableModule)(); }, imports: [[CommonModule, SkyhookDndModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SkyhookSortableModule, { declarations: [SkyhookSortable,
        SkyhookSortableList,
        SkyhookSortableTemplate,
        SkyhookSortableRenderer,
        SkyhookSortableExternal], imports: [CommonModule, SkyhookDndModule], exports: [SkyhookSortable,
        SkyhookSortableList,
        SkyhookSortableTemplate,
        SkyhookSortableRenderer,
        SkyhookSortableExternal] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SkyhookSortableModule, [{
        type: NgModule,
        args: [{
                declarations: EXPORTS,
                exports: EXPORTS,
                imports: [CommonModule, SkyhookDndModule],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb3J0YWJsZS9zcmMvbGliL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUVoRCxjQUFjO0FBQ2QsTUFBTSxPQUFPLEdBQUc7SUFDWixlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsdUJBQXVCO0NBQzFCLENBQUM7QUFPRixNQUFNLE9BQU8scUJBQXFCOzt5REFBckIscUJBQXFCO3lIQUFyQixxQkFBcUIsa0JBRnJCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO3dGQUVoQyxxQkFBcUIsbUJBWjlCLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix1QkFBdUIsYUFNYixZQUFZLEVBQUUsZ0JBQWdCLGFBVnhDLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix1QkFBdUI7a0RBUWQscUJBQXFCO2NBTGpDLFFBQVE7ZUFBQztnQkFDTixZQUFZLEVBQUUsT0FBTztnQkFDckIsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQzthQUM1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTa3lob29rU29ydGFibGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc29ydGFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNreWhvb2tTb3J0YWJsZUxpc3QgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2t5aG9va1NvcnRhYmxlVGVtcGxhdGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNreWhvb2tTb3J0YWJsZVJlbmRlcmVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlbmRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2t5aG9va1NvcnRhYmxlRXh0ZXJuYWwgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZXh0ZXJuYWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTa3lob29rRG5kTW9kdWxlIH0gZnJvbSAnQHJlZG5heC9jb3JlJztcblxuLyoqIEBpZ25vcmUgKi9cbmNvbnN0IEVYUE9SVFMgPSBbXG4gICAgU2t5aG9va1NvcnRhYmxlLFxuICAgIFNreWhvb2tTb3J0YWJsZUxpc3QsXG4gICAgU2t5aG9va1NvcnRhYmxlVGVtcGxhdGUsXG4gICAgU2t5aG9va1NvcnRhYmxlUmVuZGVyZXIsXG4gICAgU2t5aG9va1NvcnRhYmxlRXh0ZXJuYWwsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogRVhQT1JUUyxcbiAgICBleHBvcnRzOiBFWFBPUlRTLFxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNreWhvb2tEbmRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBTa3lob29rU29ydGFibGVNb2R1bGUge31cbiJdfQ==