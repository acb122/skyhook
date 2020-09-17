import { Directive, Input, ElementRef, } from '@angular/core';
import { SkyhookDndService } from '@rednax/core';
import { Size } from '../types';
import * as i0 from "@angular/core";
import * as i1 from "@rednax/core";
export const EXTERNAL_LIST_ID = Symbol('EXTERNAL_LIST_ID');
export class SkyhookSortableExternal {
    /** @ignore */
    constructor(dnd, el) {
        this.dnd = dnd;
        this.el = el;
        this.source = this.dnd.dragSource(null, {
            canDrag: (monitor) => {
                if (this.spec && this.spec.canDrag) {
                    // beginDrag has not been called yet, so there is no data, and this is not part of a list.
                    // you should be able to decide canDrag without these anyway.
                    return this.spec.canDrag(undefined, undefined, monitor);
                }
                return true;
            },
            beginDrag: () => {
                if (typeof this.spec.createData !== 'function') {
                    throw new Error('spec.createData must be a function');
                }
                return {
                    type: this.spec.type,
                    data: this.spec.createData(),
                    hover: { index: -1, listId: EXTERNAL_LIST_ID },
                    isInternal: false,
                    index: -1,
                    listId: EXTERNAL_LIST_ID,
                    size: this.size(),
                };
            },
            endDrag: (monitor) => {
                const item = monitor.getItem();
                if (item) {
                    this.spec &&
                        this.spec.endDrag &&
                        this.spec.endDrag(item, monitor);
                }
            },
        });
    }
    /** @ignore */
    size() {
        const rect = this.el.nativeElement.getBoundingClientRect();
        return new Size(rect.width || rect.right - rect.left, rect.height || rect.bottom - rect.top);
    }
    /** @ignore */
    ngOnChanges() {
        this.source.setType(this.spec.type);
    }
    /** @ignore */
    ngOnDestroy() {
        this.source.unsubscribe();
    }
}
SkyhookSortableExternal.ɵfac = function SkyhookSortableExternal_Factory(t) { return new (t || SkyhookSortableExternal)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
SkyhookSortableExternal.ɵdir = i0.ɵɵdefineDirective({ type: SkyhookSortableExternal, selectors: [["", "ssExternal", ""]], inputs: { spec: ["ssExternal", "spec"] }, exportAs: ["ssExternal"], features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SkyhookSortableExternal, [{
        type: Directive,
        args: [{
                selector: '[ssExternal]',
                exportAs: 'ssExternal',
            }]
    }], function () { return [{ type: i1.SkyhookDndService }, { type: i0.ElementRef }]; }, { spec: [{
            type: Input,
            args: ['ssExternal']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb3J0YWJsZS9zcmMvbGliL2RpcmVjdGl2ZXMvZXh0ZXJuYWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsR0FHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQWMsTUFBTSxjQUFjLENBQUM7QUFDN0QsT0FBTyxFQUE2QixJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQUkzRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBVyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQU1uRSxNQUFNLE9BQU8sdUJBQXVCO0lBU2hDLGNBQWM7SUFDZCxZQUNZLEdBQXNCLEVBQ3RCLEVBQXVCO1FBRHZCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLE9BQUUsR0FBRixFQUFFLENBQXFCO1FBRS9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQW9CLElBQUksRUFBRTtZQUN2RCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNoQywwRkFBMEY7b0JBQzFGLDZEQUE2RDtvQkFDN0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDcEIsU0FBZ0IsRUFDaEIsU0FBUyxFQUNULE9BQU8sQ0FDVixDQUFDO2lCQUNMO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFDRCxTQUFTLEVBQUUsR0FBRyxFQUFFO2dCQUNaLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7b0JBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztpQkFDekQ7Z0JBQ0QsT0FBTztvQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO29CQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQzVCLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUU7b0JBQzlDLFVBQVUsRUFBRSxLQUFLO29CQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUNULE1BQU0sRUFBRSxnQkFBZ0I7b0JBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO2lCQUNwQixDQUFDO1lBQ04sQ0FBQztZQUNELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNqQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9CLElBQUksSUFBSSxFQUFFO29CQUNOLElBQUksQ0FBQyxJQUFJO3dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzt3QkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUN4QztZQUNMLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsY0FBYztJQUNOLElBQUk7UUFDUixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzNELE9BQU8sSUFBSSxJQUFJLENBQ1gsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQ3BDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUN4QyxDQUFDO0lBQ04sQ0FBQztJQUVELGNBQWM7SUFDZCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsY0FBYztJQUNkLFdBQVc7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7OzhGQXBFUSx1QkFBdUI7NERBQXZCLHVCQUF1QjtrREFBdkIsdUJBQXVCO2NBSm5DLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLFlBQVk7YUFDekI7NkZBRXdCLElBQUk7a0JBQXhCLEtBQUs7bUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTa3lob29rRG5kU2VydmljZSwgRHJhZ1NvdXJjZSB9IGZyb20gJ0ByZWRuYXgvY29yZSc7XG5pbXBvcnQgeyBEcmFnZ2VkSXRlbSwgU29ydGFibGVTcGVjLCBTaXplIH0gZnJvbSAnLi4vdHlwZXMnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjb25zdCBFWFRFUk5BTF9MSVNUX0lEOiBzeW1ib2wgPSBTeW1ib2woJ0VYVEVSTkFMX0xJU1RfSUQnKTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbc3NFeHRlcm5hbF0nLFxuICAgIGV4cG9ydEFzOiAnc3NFeHRlcm5hbCcsXG59KVxuZXhwb3J0IGNsYXNzIFNreWhvb2tTb3J0YWJsZUV4dGVybmFsPERhdGE+IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgnc3NFeHRlcm5hbCcpIHNwZWMhOiBTb3J0YWJsZVNwZWM8RGF0YT47XG5cbiAgICAvKiogVGhpcyBzb3VyY2UgaGFzIGJlZ2luRHJhZyBhbmQgZW5kRHJhZyBpbXBsZW1lbnRlZCBpbiBsaW5lIHdpdGggd2hhdCBzc1JlbmRlciBkb2VzLlxuICAgICAqXG4gICAgICogWW91IG11c3QsIGxpa2Ugc3NSZW5kZXIsIGF0dGFjaCBpdCB3aXRoIFtkcmFnU291cmNlXSBzb21ld2hlcmUuXG4gICAgICovXG4gICAgcHVibGljIHNvdXJjZTogRHJhZ1NvdXJjZTxEcmFnZ2VkSXRlbTxEYXRhPj47XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRuZDogU2t5aG9va0RuZFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY8RWxlbWVudD5cbiAgICApIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmRuZC5kcmFnU291cmNlPERyYWdnZWRJdGVtPERhdGE+PihudWxsLCB7XG4gICAgICAgICAgICBjYW5EcmFnOiAobW9uaXRvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWMgJiYgdGhpcy5zcGVjLmNhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVnaW5EcmFnIGhhcyBub3QgYmVlbiBjYWxsZWQgeWV0LCBzbyB0aGVyZSBpcyBubyBkYXRhLCBhbmQgdGhpcyBpcyBub3QgcGFydCBvZiBhIGxpc3QuXG4gICAgICAgICAgICAgICAgICAgIC8vIHlvdSBzaG91bGQgYmUgYWJsZSB0byBkZWNpZGUgY2FuRHJhZyB3aXRob3V0IHRoZXNlIGFueXdheS5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BlYy5jYW5EcmFnKFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkIGFzIGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbml0b3JcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVnaW5EcmFnOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNwZWMuY3JlYXRlRGF0YSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NwZWMuY3JlYXRlRGF0YSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5zcGVjLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3BlYy5jcmVhdGVEYXRhKCksXG4gICAgICAgICAgICAgICAgICAgIGhvdmVyOiB7IGluZGV4OiAtMSwgbGlzdElkOiBFWFRFUk5BTF9MSVNUX0lEIH0sXG4gICAgICAgICAgICAgICAgICAgIGlzSW50ZXJuYWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogLTEsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJZDogRVhURVJOQUxfTElTVF9JRCxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogdGhpcy5zaXplKCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmREcmFnOiAobW9uaXRvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBtb25pdG9yLmdldEl0ZW0oKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlYy5lbmREcmFnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWMuZW5kRHJhZyhpdGVtLCBtb25pdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIHByaXZhdGUgc2l6ZSgpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplKFxuICAgICAgICAgICAgcmVjdC53aWR0aCB8fCByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgcmVjdC5oZWlnaHQgfHwgcmVjdC5ib3R0b20gLSByZWN0LnRvcFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuc291cmNlLnNldFR5cGUodGhpcy5zcGVjLnR5cGUpO1xuICAgIH1cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnNvdXJjZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbiJdfQ==