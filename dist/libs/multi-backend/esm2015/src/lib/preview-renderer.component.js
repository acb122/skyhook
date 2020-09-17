import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkyhookDndService } from '@rednax/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@rednax/core";
import * as i2 from "@angular/common";
const _c0 = ["*"];
/**
 * This is internal, you probably won't ever need to use it directly.
 *
 * For understanding's sake, it helps to know that this component
 * essentially just renders whatever is placed between its tags, but
 * in a `position: fixed` container that is translated according to
 * the drag in progress and how far it has travelled.
 *
 * It currently has a workaround for some Firefox versions where the
 * whole thing wouldn't re-render unless you animated the border.
 */
export class SkyhookPreviewRendererComponent {
    /** @ignore */
    constructor(skyhook) {
        this.skyhook = skyhook;
        /** @ignore */
        this.layer = this.skyhook.dragLayer();
        /** @ignore */
        this.collect$ = this.layer.listen((monitor) => ({
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
        }));
        /** @ignore */
        this.style$ = this.collect$.pipe(map((c) => {
            const { initialOffset, currentOffset } = c;
            if (!initialOffset || !currentOffset) {
                return {
                    display: 'none',
                };
            }
            let { x, y } = currentOffset;
            const transform = `translate(${x}px, ${y}px)`;
            return {
                transform,
                WebkitTransform: transform,
            };
        }));
    }
    /** @ignore */
    ngOnDestroy() {
        this.layer.unsubscribe();
    }
}
SkyhookPreviewRendererComponent.ɵfac = function SkyhookPreviewRendererComponent_Factory(t) { return new (t || SkyhookPreviewRendererComponent)(i0.ɵɵdirectiveInject(i1.SkyhookDndService)); };
SkyhookPreviewRendererComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SkyhookPreviewRendererComponent, selectors: [["skyhook-preview-renderer"]], ngContentSelectors: _c0, decls: 3, vars: 3, consts: [[1, "firefox-bug", 3, "ngStyle"]], template: function SkyhookPreviewRendererComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵpipe(1, "async");
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngStyle", i0.ɵɵpipeBind1(1, 1, ctx.style$));
    } }, directives: [i2.NgStyle], pipes: [i2.AsyncPipe], styles: ["[_nghost-%COMP%] {\n                display: block;\n                position: fixed;\n                pointer-events: none;\n                z-index: 100;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n            }\n            @keyframes animatedBorder {\n                from {\n                    border-color: rgba(0, 0, 0, 0);\n                }\n                to {\n                    border-color: rgba(0, 0, 0, 1);\n                }\n            }\n            .firefox-bug[_ngcontent-%COMP%] {\n                animation-name: animatedBorder;\n                animation-duration: 1s;\n                animation-iteration-count: infinite;\n                animation-timing-function: linear;\n            }"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SkyhookPreviewRendererComponent, [{
        type: Component,
        args: [{
                selector: 'skyhook-preview-renderer',
                template: `
        <div class="firefox-bug" [ngStyle]="style$ | async">
            <ng-content></ng-content>
        </div>
    `,
                styles: [
                    `
            :host {
                display: block;
                position: fixed;
                pointer-events: none;
                z-index: 100;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            @keyframes animatedBorder {
                from {
                    border-color: rgba(0, 0, 0, 0);
                }
                to {
                    border-color: rgba(0, 0, 0, 1);
                }
            }
            .firefox-bug {
                animation-name: animatedBorder;
                animation-duration: 1s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
        `,
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.SkyhookDndService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL211bHRpLWJhY2tlbmQvc3JjL2xpYi9wcmV2aWV3LXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSXJDOzs7Ozs7Ozs7O0dBVUc7QUFzQ0gsTUFBTSxPQUFPLCtCQUErQjtJQStCeEMsY0FBYztJQUNkLFlBQW9CLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBL0I5QyxjQUFjO1FBQ04sVUFBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFekMsY0FBYztRQUNkLGFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxhQUFhLEVBQUUsT0FBTyxDQUFDLDRCQUE0QixFQUFZO1lBQy9ELGFBQWEsRUFBRSxPQUFPLENBQUMscUJBQXFCLEVBQUU7U0FDakQsQ0FBQyxDQUFDLENBQUM7UUFFSixjQUFjO1FBQ2QsV0FBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN2QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNOLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xDLE9BQU87b0JBQ0gsT0FBTyxFQUFFLE1BQU07aUJBQ2xCLENBQUM7YUFDTDtZQUVELElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO1lBRTdCLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzlDLE9BQU87Z0JBQ0gsU0FBUztnQkFDVCxlQUFlLEVBQUUsU0FBUzthQUM3QixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUcrQyxDQUFDO0lBRWxELGNBQWM7SUFDZCxXQUFXO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs4R0FyQ1EsK0JBQStCO29FQUEvQiwrQkFBK0I7O1FBbENwQyw4QkFDSTs7UUFBQSxrQkFBWTtRQUNoQixpQkFBTTs7UUFGbUIsMERBQTBCOztrREFrQzlDLCtCQUErQjtjQXJDM0MsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRTs7OztLQUlUO2dCQUNELE1BQU0sRUFBRTtvQkFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXlCQztpQkFDSjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNreWhvb2tEbmRTZXJ2aWNlLCBPZmZzZXQgfSBmcm9tICdAcmVkbmF4L2NvcmUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFRoaXMgaXMgaW50ZXJuYWwsIHlvdSBwcm9iYWJseSB3b24ndCBldmVyIG5lZWQgdG8gdXNlIGl0IGRpcmVjdGx5LlxuICpcbiAqIEZvciB1bmRlcnN0YW5kaW5nJ3Mgc2FrZSwgaXQgaGVscHMgdG8ga25vdyB0aGF0IHRoaXMgY29tcG9uZW50XG4gKiBlc3NlbnRpYWxseSBqdXN0IHJlbmRlcnMgd2hhdGV2ZXIgaXMgcGxhY2VkIGJldHdlZW4gaXRzIHRhZ3MsIGJ1dFxuICogaW4gYSBgcG9zaXRpb246IGZpeGVkYCBjb250YWluZXIgdGhhdCBpcyB0cmFuc2xhdGVkIGFjY29yZGluZyB0b1xuICogdGhlIGRyYWcgaW4gcHJvZ3Jlc3MgYW5kIGhvdyBmYXIgaXQgaGFzIHRyYXZlbGxlZC5cbiAqXG4gKiBJdCBjdXJyZW50bHkgaGFzIGEgd29ya2Fyb3VuZCBmb3Igc29tZSBGaXJlZm94IHZlcnNpb25zIHdoZXJlIHRoZVxuICogd2hvbGUgdGhpbmcgd291bGRuJ3QgcmUtcmVuZGVyIHVubGVzcyB5b3UgYW5pbWF0ZWQgdGhlIGJvcmRlci5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdza3lob29rLXByZXZpZXctcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaXJlZm94LWJ1Z1wiIFtuZ1N0eWxlXT1cInN0eWxlJCB8IGFzeW5jXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICAgICAgICAgei1pbmRleDogMTAwO1xuICAgICAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEBrZXlmcmFtZXMgYW5pbWF0ZWRCb3JkZXIge1xuICAgICAgICAgICAgICAgIGZyb20ge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvIHtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5maXJlZm94LWJ1ZyB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGFuaW1hdGVkQm9yZGVyO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xuICAgICAgICAgICAgfVxuICAgICAgICBgLFxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNreWhvb2tQcmV2aWV3UmVuZGVyZXJDb21wb25lbnQge1xuICAgIC8qKiBAaWdub3JlICovXG4gICAgcHJpdmF0ZSBsYXllciA9IHRoaXMuc2t5aG9vay5kcmFnTGF5ZXIoKTtcblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgY29sbGVjdCQgPSB0aGlzLmxheWVyLmxpc3RlbigobW9uaXRvcikgPT4gKHtcbiAgICAgICAgaW5pdGlhbE9mZnNldDogbW9uaXRvci5nZXRJbml0aWFsU291cmNlQ2xpZW50T2Zmc2V0KCkgYXMgT2Zmc2V0LFxuICAgICAgICBjdXJyZW50T2Zmc2V0OiBtb25pdG9yLmdldFNvdXJjZUNsaWVudE9mZnNldCgpLFxuICAgIH0pKTtcblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgc3R5bGUkID0gdGhpcy5jb2xsZWN0JC5waXBlKFxuICAgICAgICBtYXAoKGMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW5pdGlhbE9mZnNldCwgY3VycmVudE9mZnNldCB9ID0gYztcblxuICAgICAgICAgICAgaWYgKCFpbml0aWFsT2Zmc2V0IHx8ICFjdXJyZW50T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB7IHgsIHkgfSA9IGN1cnJlbnRPZmZzZXQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLFxuICAgICAgICAgICAgICAgIFdlYmtpdFRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNreWhvb2s6IFNreWhvb2tEbmRTZXJ2aWNlKSB7fVxuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5sYXllci51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbiJdfQ==