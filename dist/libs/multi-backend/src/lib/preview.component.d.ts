import { TemplateRef } from '@angular/core';
import { SkyhookDndService } from '@rednax/core';
import { DragDropManager } from 'dnd-core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface PreviewTemplateContext {
    /** same as type */
    $implicit: string | symbol;
    type: string | symbol;
    item: Object & any;
}
/**
 * If you pass an `<ng-template let-type let-item="item">` to `<skyhook-preview>` as a child,
 * then that template will be rendered so as to follow the mouse around while dragging.
 * What you put in that template is up to you, but in most cases this will be:
 *
```html
<skyhook-preview>
  <ng-template let-type let-item="item">
    <ng-content [ngSwitch]="type">
      <!-- one kind of preview per type, using *ngSwitchCase="'TYPE'" -->
      <div *ngSwitchCase="'TYPE'">{{ item | json }}</div>
    </ng-content>
  </ng-template>
</skyhook-preview>
```
 */
export declare class SkyhookPreviewComponent {
    private skyhook;
    private manager;
    /** Disables the check for whether the current MultiBackend wants the preview enabled */
    allBackends: boolean;
    /** @ignore */
    content: TemplateRef<PreviewTemplateContext>;
    /** @ignore */
    private layer;
    /** @ignore */
    collect$: Observable<{
        item: any;
        itemType: string | symbol | null;
        isDragging: boolean;
        previewEnabled: any;
    }>;
    /** @ignore */
    warned: boolean;
    /** @ignore */
    constructor(skyhook: SkyhookDndService, manager: DragDropManager);
    /** @ignore */
    ngOnDestroy(): void;
    /** @ignore */
    warn(msg: string): void;
    /** @ignore */
    isPreviewEnabled(): any;
    static ɵfac: i0.ɵɵFactoryDef<SkyhookPreviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SkyhookPreviewComponent, "skyhook-preview", never, { "allBackends": "allBackends"; }, {}, ["content"], never>;
}
