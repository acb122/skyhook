import { Component, TemplateRef, ContentChild, Input, Inject, ChangeDetectionStrategy, } from '@angular/core';
import { SkyhookDndService, DRAG_DROP_MANAGER } from '@rednax/core';
import * as i0 from "@angular/core";
import * as i1 from "@rednax/core";
import * as i2 from "@angular/common";
import * as i3 from "./preview-renderer.component";
function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c0 = function (a0, a1, a2) { return { $implicit: a0, type: a1, item: a2 }; };
function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r1 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r3.content)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c0, c_r1.itemType, c_r1.itemType, c_r1.item));
} }
function SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "skyhook-preview-renderer");
    i0.ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_ng_container_1_Template, 2, 6, "ng-container", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", c_r1.isDragging);
} }
function SkyhookPreviewComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, SkyhookPreviewComponent_ng_container_0_skyhook_preview_renderer_1_Template, 2, 1, "skyhook-preview-renderer", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r1 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", c_r1.previewEnabled);
} }
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
export class SkyhookPreviewComponent {
    /** @ignore */
    constructor(skyhook, manager) {
        this.skyhook = skyhook;
        this.manager = manager;
        /** Disables the check for whether the current MultiBackend wants the preview enabled */
        this.allBackends = false;
        /** @ignore */
        this.layer = this.skyhook.dragLayer();
        // we don't need all the fast-moving props here, so this optimises change detection
        // on the projected template's inputs (i.e. the context).
        // the fast-moving stuff is contained in the preview renderer.
        // also, we include this.isPreviewEnabled() because in this component with OnPush,
        // a plain getter isn't checked more than once, and this forces it to be called on each event.
        /** @ignore */
        this.collect$ = this.layer.listen((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            isDragging: monitor.isDragging(),
            previewEnabled: this.isPreviewEnabled(),
        }));
        /** @ignore */
        this.warned = false;
    }
    /** @ignore */
    ngOnDestroy() {
        this.layer.unsubscribe();
    }
    /** @ignore */
    warn(msg) {
        if (!this.warned) {
            console.warn(msg);
        }
        this.warned = true;
    }
    /** @ignore */
    isPreviewEnabled() {
        if (this.allBackends) {
            return true;
        }
        if (this.manager == null) {
            this.warn('no drag and drop manager defined, are you sure you imported SkyhookDndModule?');
            return false;
        }
        const backend = this.manager.getBackend();
        if (backend == null) {
            this.warn('no drag and drop backend defined, are you sure you imported SkyhookDndModule.forRoot(backend)?');
            return false;
        }
        // for when you are not using dnd-multi-backend
        if (backend.previewEnabled == null) {
            return true;
        }
        return backend.previewEnabled();
    }
}
SkyhookPreviewComponent.ɵfac = function SkyhookPreviewComponent_Factory(t) { return new (t || SkyhookPreviewComponent)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(DRAG_DROP_MANAGER)); };
SkyhookPreviewComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SkyhookPreviewComponent, selectors: [["skyhook-preview"]], contentQueries: function SkyhookPreviewComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.content = _t.first);
    } }, inputs: { allBackends: "allBackends" }, decls: 2, vars: 3, consts: [[4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function SkyhookPreviewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, SkyhookPreviewComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
        i0.ɵɵpipe(1, "async");
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.collect$));
    } }, directives: [i2.NgIf, i3.SkyhookPreviewRendererComponent, i2.NgTemplateOutlet], pipes: [i2.AsyncPipe], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SkyhookPreviewComponent, [{
        type: Component,
        args: [{
                selector: 'skyhook-preview',
                template: `
        <ng-container *ngIf="collect$ | async as c">
            <skyhook-preview-renderer *ngIf="c.previewEnabled">
                <ng-container *ngIf="c.isDragging">
                    <ng-container
                        *ngTemplateOutlet="
                            content;
                            context: {
                                $implicit: c.itemType,
                                type: c.itemType,
                                item: c.item
                            }
                        "
                    >
                    </ng-container>
                </ng-container>
            </skyhook-preview-renderer>
        </ng-container>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.SkyhookDndService }, { type: undefined, decorators: [{
                type: Inject,
                args: [DRAG_DROP_MANAGER]
            }] }]; }, { allBackends: [{
            type: Input
        }], content: [{
            type: ContentChild,
            args: [TemplateRef, { static: false }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL211bHRpLWJhY2tlbmQvc3JjL2xpYi9wcmV2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTix1QkFBdUIsR0FDMUIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7SUFrQ2hELHdCQVVlOzs7O0lBWG5CLDZCQUNJO0lBQUEsbUpBVUE7SUFDSiwwQkFBZTs7OztJQVZQLGVBT0M7SUFQRCxpREFPQyxnR0FBQTs7O0lBVmIsZ0RBQ0k7SUFBQSxvSUFDSTtJQVlSLGlCQUEyQjs7O0lBYlQsZUFBb0I7SUFBcEIsc0NBQW9COzs7SUFGMUMsNkJBQ0k7SUFBQSxpSUFDSTtJQWNSLDBCQUFlOzs7SUFmZSxlQUF3QjtJQUF4QiwwQ0FBd0I7O0FBcEI5RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUF3QkgsTUFBTSxPQUFPLHVCQUF1QjtJQTJCaEMsY0FBYztJQUNkLFlBQ1ksT0FBMEIsRUFDQyxPQUF3QjtRQURuRCxZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUNDLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBN0IvRCx3RkFBd0Y7UUFDL0UsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFNN0IsY0FBYztRQUNOLFVBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXpDLG1GQUFtRjtRQUNuRix5REFBeUQ7UUFDekQsOERBQThEO1FBQzlELGtGQUFrRjtRQUNsRiw4RkFBOEY7UUFDOUYsY0FBYztRQUNkLGFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN2QixRQUFRLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUMvQixVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUNoQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1NBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUosY0FBYztRQUNkLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFNWixDQUFDO0lBRUosY0FBYztJQUNkLFdBQVc7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxjQUFjO0lBQ2QsSUFBSSxDQUFDLEdBQVc7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsY0FBYztJQUNkLGdCQUFnQjtRQUNaLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUNMLCtFQUErRSxDQUNsRixDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBUyxDQUFDO1FBQ2pELElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUNMLGdHQUFnRyxDQUNuRyxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCwrQ0FBK0M7UUFDL0MsSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLElBQUksRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OEZBckVRLHVCQUF1QixtRUE4QnBCLGlCQUFpQjs0REE5QnBCLHVCQUF1QjtvQ0FLbEIsV0FBVzs7Ozs7UUF6QnJCLDBGQUNJOzs7UUFEVSx5REFBNkI7O2tEQW9CdEMsdUJBQXVCO2NBdkJuQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDbEQ7O3NCQStCUSxNQUFNO3VCQUFDLGlCQUFpQjt3QkE1QnBCLFdBQVc7a0JBQW5CLEtBQUs7WUFJTixPQUFPO2tCQUROLFlBQVk7bUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBJbmplY3QsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2t5aG9va0RuZFNlcnZpY2UsIERSQUdfRFJPUF9NQU5BR0VSIH0gZnJvbSAnQHJlZG5heC9jb3JlJztcbmltcG9ydCB7IERyYWdEcm9wTWFuYWdlciB9IGZyb20gJ2RuZC1jb3JlJztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBQcmV2aWV3VGVtcGxhdGVDb250ZXh0IHtcbiAgICAvKiogc2FtZSBhcyB0eXBlICovXG4gICAgJGltcGxpY2l0OiBzdHJpbmcgfCBzeW1ib2w7XG4gICAgdHlwZTogc3RyaW5nIHwgc3ltYm9sO1xuICAgIGl0ZW06IE9iamVjdCAmIGFueTtcbn1cblxuLyoqXG4gKiBJZiB5b3UgcGFzcyBhbiBgPG5nLXRlbXBsYXRlIGxldC10eXBlIGxldC1pdGVtPVwiaXRlbVwiPmAgdG8gYDxza3lob29rLXByZXZpZXc+YCBhcyBhIGNoaWxkLFxuICogdGhlbiB0aGF0IHRlbXBsYXRlIHdpbGwgYmUgcmVuZGVyZWQgc28gYXMgdG8gZm9sbG93IHRoZSBtb3VzZSBhcm91bmQgd2hpbGUgZHJhZ2dpbmcuXG4gKiBXaGF0IHlvdSBwdXQgaW4gdGhhdCB0ZW1wbGF0ZSBpcyB1cCB0byB5b3UsIGJ1dCBpbiBtb3N0IGNhc2VzIHRoaXMgd2lsbCBiZTpcbiAqXG5gYGBodG1sXG48c2t5aG9vay1wcmV2aWV3PlxuICA8bmctdGVtcGxhdGUgbGV0LXR5cGUgbGV0LWl0ZW09XCJpdGVtXCI+XG4gICAgPG5nLWNvbnRlbnQgW25nU3dpdGNoXT1cInR5cGVcIj5cbiAgICAgIDwhLS0gb25lIGtpbmQgb2YgcHJldmlldyBwZXIgdHlwZSwgdXNpbmcgKm5nU3dpdGNoQ2FzZT1cIidUWVBFJ1wiIC0tPlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ1RZUEUnXCI+e3sgaXRlbSB8IGpzb24gfX08L2Rpdj5cbiAgICA8L25nLWNvbnRlbnQ+XG4gIDwvbmctdGVtcGxhdGU+XG48L3NreWhvb2stcHJldmlldz5cbmBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3NreWhvb2stcHJldmlldycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbGxlY3QkIHwgYXN5bmMgYXMgY1wiPlxuICAgICAgICAgICAgPHNreWhvb2stcHJldmlldy1yZW5kZXJlciAqbmdJZj1cImMucHJldmlld0VuYWJsZWRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0RyYWdnaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbXBsaWNpdDogYy5pdGVtVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogYy5pdGVtVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTogYy5pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvc2t5aG9vay1wcmV2aWV3LXJlbmRlcmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTa3lob29rUHJldmlld0NvbXBvbmVudCB7XG4gICAgLyoqIERpc2FibGVzIHRoZSBjaGVjayBmb3Igd2hldGhlciB0aGUgY3VycmVudCBNdWx0aUJhY2tlbmQgd2FudHMgdGhlIHByZXZpZXcgZW5hYmxlZCAqL1xuICAgIEBJbnB1dCgpIGFsbEJhY2tlbmRzID0gZmFsc2U7XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiBmYWxzZSB9KVxuICAgIGNvbnRlbnQhOiBUZW1wbGF0ZVJlZjxQcmV2aWV3VGVtcGxhdGVDb250ZXh0PjtcblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgcHJpdmF0ZSBsYXllciA9IHRoaXMuc2t5aG9vay5kcmFnTGF5ZXIoKTtcblxuICAgIC8vIHdlIGRvbid0IG5lZWQgYWxsIHRoZSBmYXN0LW1vdmluZyBwcm9wcyBoZXJlLCBzbyB0aGlzIG9wdGltaXNlcyBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgLy8gb24gdGhlIHByb2plY3RlZCB0ZW1wbGF0ZSdzIGlucHV0cyAoaS5lLiB0aGUgY29udGV4dCkuXG4gICAgLy8gdGhlIGZhc3QtbW92aW5nIHN0dWZmIGlzIGNvbnRhaW5lZCBpbiB0aGUgcHJldmlldyByZW5kZXJlci5cbiAgICAvLyBhbHNvLCB3ZSBpbmNsdWRlIHRoaXMuaXNQcmV2aWV3RW5hYmxlZCgpIGJlY2F1c2UgaW4gdGhpcyBjb21wb25lbnQgd2l0aCBPblB1c2gsXG4gICAgLy8gYSBwbGFpbiBnZXR0ZXIgaXNuJ3QgY2hlY2tlZCBtb3JlIHRoYW4gb25jZSwgYW5kIHRoaXMgZm9yY2VzIGl0IHRvIGJlIGNhbGxlZCBvbiBlYWNoIGV2ZW50LlxuICAgIC8qKiBAaWdub3JlICovXG4gICAgY29sbGVjdCQgPSB0aGlzLmxheWVyLmxpc3RlbigobW9uaXRvcikgPT4gKHtcbiAgICAgICAgaXRlbTogbW9uaXRvci5nZXRJdGVtKCksXG4gICAgICAgIGl0ZW1UeXBlOiBtb25pdG9yLmdldEl0ZW1UeXBlKCksXG4gICAgICAgIGlzRHJhZ2dpbmc6IG1vbml0b3IuaXNEcmFnZ2luZygpLFxuICAgICAgICBwcmV2aWV3RW5hYmxlZDogdGhpcy5pc1ByZXZpZXdFbmFibGVkKCksXG4gICAgfSkpO1xuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICB3YXJuZWQgPSBmYWxzZTtcblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2t5aG9vazogU2t5aG9va0RuZFNlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoRFJBR19EUk9QX01BTkFHRVIpIHByaXZhdGUgbWFuYWdlcjogRHJhZ0Ryb3BNYW5hZ2VyXG4gICAgKSB7fVxuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5sYXllci51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgd2Fybihtc2c6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMud2FybmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndhcm5lZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBpc1ByZXZpZXdFbmFibGVkKCkge1xuICAgICAgICBpZiAodGhpcy5hbGxCYWNrZW5kcykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWFuYWdlciA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLndhcm4oXG4gICAgICAgICAgICAgICAgJ25vIGRyYWcgYW5kIGRyb3AgbWFuYWdlciBkZWZpbmVkLCBhcmUgeW91IHN1cmUgeW91IGltcG9ydGVkIFNreWhvb2tEbmRNb2R1bGU/J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiYWNrZW5kID0gdGhpcy5tYW5hZ2VyLmdldEJhY2tlbmQoKSBhcyBhbnk7XG4gICAgICAgIGlmIChiYWNrZW5kID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMud2FybihcbiAgICAgICAgICAgICAgICAnbm8gZHJhZyBhbmQgZHJvcCBiYWNrZW5kIGRlZmluZWQsIGFyZSB5b3Ugc3VyZSB5b3UgaW1wb3J0ZWQgU2t5aG9va0RuZE1vZHVsZS5mb3JSb290KGJhY2tlbmQpPydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yIHdoZW4geW91IGFyZSBub3QgdXNpbmcgZG5kLW11bHRpLWJhY2tlbmRcbiAgICAgICAgaWYgKGJhY2tlbmQucHJldmlld0VuYWJsZWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhY2tlbmQucHJldmlld0VuYWJsZWQoKTtcbiAgICB9XG59XG4iXX0=