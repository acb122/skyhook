import { Component, Input, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, QueryList, ContentChildren, } from '@angular/core';
import { SkyhookDndService } from '@rednax/core';
import { SkyhookSortableTemplate } from './template.directive';
import { SkyhookSortable } from './sortable.directive';
import * as i0 from "@angular/core";
import * as i1 from "@rednax/core";
import * as i2 from "@angular/common";
function SkyhookSortableList_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c0 = function (a0) { return { $implicit: a0 }; };
function SkyhookSortableList_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, SkyhookSortableList_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const card_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx_r0.contextFor(card_r1, i_r2)));
} }
export class SkyhookSortableList extends SkyhookSortable {
    /** @ignore */
    constructor(dnd, el, cdr) {
        super(dnd, el, cdr);
        /** @ignore */
        this.trackById = (_, data) => {
            return this.spec && this.spec.trackBy(data);
        };
    }
    /** @ignore */
    set ssRenderTemplates(ql) {
        if (ql.length > 0) {
            this.template = ql.first;
        }
    }
    /** @ignore */
    ngAfterContentInit() {
        if (!this.template) {
            throw new Error('You must provide a <ng-template cardTemplate> as a content child, or with [template]="myTemplateRef"');
        }
    }
    // forwarding lifecycle events is required until Ivy renderer
    /** @ignore */
    ngOnInit() {
        super.ngOnInit();
    }
    /** @ignore */
    ngAfterViewInit() {
        super.ngAfterViewInit();
    }
    /** @ignore */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
    }
    /** @ignore */
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
SkyhookSortableList.ɵfac = function SkyhookSortableList_Factory(t) { return new (t || SkyhookSortableList)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
SkyhookSortableList.ɵcmp = i0.ɵɵdefineComponent({ type: SkyhookSortableList, selectors: [["skyhook-sortable-list"]], contentQueries: function SkyhookSortableList_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, SkyhookSortableTemplate, false, TemplateRef);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.ssRenderTemplates = _t);
    } }, inputs: { template: ["ssTemplate", "template"] }, features: [i0.ɵɵProvidersFeature([
            {
                provide: SkyhookSortable,
                useExisting: SkyhookSortableList,
            },
        ]), i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 1, vars: 2, consts: [[4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function SkyhookSortableList_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, SkyhookSortableList_ng_container_0_Template, 2, 4, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.children)("ngForTrackBy", ctx.trackById);
    } }, directives: [i2.NgForOf, i2.NgTemplateOutlet], styles: ["[_nghost-%COMP%] {\n                display: block;\n            }"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SkyhookSortableList, [{
        type: Component,
        args: [{
                selector: 'skyhook-sortable-list',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
        <ng-container
            *ngFor="let card of children; let i = index; trackBy: trackById"
        >
            <ng-container
                *ngTemplateOutlet="
                    template;
                    context: {
                        $implicit: contextFor(card, i)
                    }
                "
            >
            </ng-container>
        </ng-container>
    `,
                styles: [
                    `
            :host {
                display: block;
            }
        `,
                ],
                // allow injecting the directive and getting the component
                providers: [
                    {
                        provide: SkyhookSortable,
                        useExisting: SkyhookSortableList,
                    },
                ],
            }]
    }], function () { return [{ type: i1.SkyhookDndService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { template: [{
            type: Input,
            args: ['ssTemplate']
        }], ssRenderTemplates: [{
            type: ContentChildren,
            args: [SkyhookSortableTemplate, {
                    read: TemplateRef,
                }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvcnRhYmxlL3NyYy9saWIvZGlyZWN0aXZlcy9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUtqQixVQUFVLEVBQ1YsU0FBUyxFQUVULGVBQWUsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBR2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBbUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0lBUzNDLHdCQVFlOzs7O0lBWG5CLDZCQUdJO0lBQUEscUdBUUE7SUFDSiwwQkFBZTs7Ozs7SUFSUCxlQUtDO0lBTEQsa0RBS0MseUZBQUE7O0FBb0JqQixNQUFNLE9BQU8sbUJBQTBCLFNBQVEsZUFBcUI7SUFjaEUsY0FBYztJQUNkLFlBQ0ksR0FBc0IsRUFDdEIsRUFBMkIsRUFDM0IsR0FBc0I7UUFFdEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFHeEIsY0FBYztRQUNkLGNBQVMsR0FBRyxDQUFDLENBQVMsRUFBRSxJQUFVLEVBQUUsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDO0lBTEYsQ0FBQztJQWpCRCxjQUFjO0lBQ2QsSUFHSSxpQkFBaUIsQ0FBQyxFQUFpRDtRQUNuRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQWdCRCxjQUFjO0lBQ2Qsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxzR0FBc0csQ0FDekcsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELDZEQUE2RDtJQUU3RCxjQUFjO0lBQ2QsUUFBUTtRQUNKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsY0FBYztJQUNkLGVBQWU7UUFDWCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGNBQWM7SUFDZCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsY0FBYztJQUNkLFdBQVc7UUFDUCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7c0ZBekRRLG1CQUFtQjt3REFBbkIsbUJBQW1CO29DQUtYLHVCQUF1QixTQUM5QixXQUFXOzs7OzRGQWJWO1lBQ1A7Z0JBQ0ksT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLFdBQVcsRUFBRSxtQkFBbUI7YUFDbkM7U0FDSjtRQTNCRyxzRkFHSTs7UUFGQSxzQ0FBZ0UsK0JBQUE7O2tEQTRCL0QsbUJBQW1CO2NBakMvQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7S0FjVDtnQkFDRCxNQUFNLEVBQUU7b0JBQ0o7Ozs7U0FJQztpQkFDSjtnQkFDRCwwREFBMEQ7Z0JBQzFELFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsV0FBVyxFQUFFLG1CQUFtQjtxQkFDbkM7aUJBQ0o7YUFDSjs2SEFHd0IsUUFBUTtrQkFBNUIsS0FBSzttQkFBQyxZQUFZO1lBTWYsaUJBQWlCO2tCQUhwQixlQUFlO21CQUFDLHVCQUF1QixFQUFFO29CQUN0QyxJQUFJLEVBQUUsV0FBVztpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25DaGFuZ2VzLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBFbGVtZW50UmVmLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTa3lob29rRG5kU2VydmljZSB9IGZyb20gJ0ByZWRuYXgvY29yZSc7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNreWhvb2tTb3J0YWJsZVRlbXBsYXRlLCBUZW1wbGF0ZUNvbnRleHQgfSBmcm9tICcuL3RlbXBsYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTa3lob29rU29ydGFibGUgfSBmcm9tICcuL3NvcnRhYmxlLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc2t5aG9vay1zb3J0YWJsZS1saXN0JyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgY2FyZCBvZiBjaGlsZHJlbjsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tCeUlkXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IGNvbnRleHRGb3IoY2FyZCwgaSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgfVxuICAgICAgICBgLFxuICAgIF0sXG4gICAgLy8gYWxsb3cgaW5qZWN0aW5nIHRoZSBkaXJlY3RpdmUgYW5kIGdldHRpbmcgdGhlIGNvbXBvbmVudFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBTa3lob29rU29ydGFibGUsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogU2t5aG9va1NvcnRhYmxlTGlzdCxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTa3lob29rU29ydGFibGVMaXN0PERhdGE+IGV4dGVuZHMgU2t5aG9va1NvcnRhYmxlPERhdGE+XG4gICAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KCdzc1RlbXBsYXRlJykgdGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxUZW1wbGF0ZUNvbnRleHQ8RGF0YT4+O1xuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKFNreWhvb2tTb3J0YWJsZVRlbXBsYXRlLCB7XG4gICAgICAgIHJlYWQ6IFRlbXBsYXRlUmVmLFxuICAgIH0pXG4gICAgc2V0IHNzUmVuZGVyVGVtcGxhdGVzKHFsOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8VGVtcGxhdGVDb250ZXh0PERhdGE+Pj4pIHtcbiAgICAgICAgaWYgKHFsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGUgPSBxbC5maXJzdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGRuZDogU2t5aG9va0RuZFNlcnZpY2UsXG4gICAgICAgIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBzdXBlcihkbmQsIGVsLCBjZHIpO1xuICAgIH1cblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgdHJhY2tCeUlkID0gKF86IG51bWJlciwgZGF0YTogRGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjICYmIHRoaXMuc3BlYy50cmFja0J5KGRhdGEpO1xuICAgIH07XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgJ1lvdSBtdXN0IHByb3ZpZGUgYSA8bmctdGVtcGxhdGUgY2FyZFRlbXBsYXRlPiBhcyBhIGNvbnRlbnQgY2hpbGQsIG9yIHdpdGggW3RlbXBsYXRlXT1cIm15VGVtcGxhdGVSZWZcIidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3J3YXJkaW5nIGxpZmVjeWNsZSBldmVudHMgaXMgcmVxdWlyZWQgdW50aWwgSXZ5IHJlbmRlcmVyXG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICB9XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gICAgfVxuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=