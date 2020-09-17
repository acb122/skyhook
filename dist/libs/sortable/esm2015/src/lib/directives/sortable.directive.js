import { Input, Directive, ElementRef, ChangeDetectorRef, } from '@angular/core';
// @ts-ignore
import { Subscription, BehaviorSubject } from 'rxjs';
import { SkyhookDndService } from '@rednax/core';
import { HoverTrigger, } from '../types';
import { isEmpty } from '../isEmpty';
import * as i0 from "@angular/core";
import * as i1 from "@rednax/core";
export class SkyhookSortable {
    /** @ignore */
    constructor(dnd, el, cdr) {
        this.dnd = dnd;
        this.el = el;
        this.cdr = cdr;
        this.listId = Math.random().toString();
        this.horizontal = false;
        /** Possible values:
         *
         * - 'halfway' (default): triggers a reorder when you drag halfway over a neighbour
         * - 'fixed': triggers as soon as you move over a neighbouring element. Does not work with variable size elements. */
        this.hoverTrigger = HoverTrigger.halfway;
        /** @ignore */
        this.childrenSubject$ = new BehaviorSubject([]);
        /**
         * A handy way to subscribe to spec.getList().
         */
        this.children$ = this.childrenSubject$;
        /** @ignore */
        this.subs = new Subscription();
        /** @ignore */
        this.listSubs = new Subscription();
        this.target = this.dnd.dropTarget(null, {
            canDrop: (monitor) => {
                if (!this.acceptsType(monitor.getItemType())) {
                    return false;
                }
                const item = monitor.getItem();
                if (!item) {
                    return false;
                }
                return this.getCanDrop(item, monitor);
            },
            drop: (monitor) => {
                const item = monitor.getItem();
                if (item && this.getCanDrop(item, monitor)) {
                    this.spec &&
                        this.spec.drop &&
                        this.spec.drop(item, monitor);
                }
                return {};
            },
            hover: (monitor) => {
                const item = monitor.getItem();
                if (this.children && isEmpty(this.children) && item) {
                    const canDrop = this.getCanDrop(item, monitor);
                    if (canDrop && monitor.isOver({ shallow: true })) {
                        this.callHover(item, monitor, {
                            listId: this.listId,
                            index: 0,
                        });
                    }
                }
            },
        }, this.subs);
    }
    /** @ignore */
    updateSubscription() {
        const anyListId = typeof this.listId !== 'undefined' && this.listId !== null;
        if (anyListId && this.spec) {
            if (this.listSubs) {
                this.subs.remove(this.listSubs);
                this.listSubs.unsubscribe();
            }
            if (this.spec.getList) {
                const cs$ = this.spec.getList(this.listId);
                this.listSubs =
                    cs$ &&
                        cs$.subscribe((l) => {
                            if (l) {
                                this.childrenSubject$.next(l);
                                this.children = l;
                                this.cdr.markForCheck();
                            }
                        });
                this.subs.add(this.listSubs);
            }
        }
    }
    contextFor(data, index) {
        return {
            data,
            index,
            listId: this.listId,
            spec: this.spec,
            horizontal: this.horizontal,
            hoverTrigger: this.hoverTrigger,
        };
    }
    /** @ignore */
    getCanDrop(item, monitor, _default = true) {
        if (this.spec && this.spec.canDrop) {
            return this.spec.canDrop(item, monitor);
        }
        return _default;
    }
    /** @ignore */
    callHover(item, monitor, newHover) {
        if (newHover) {
            // mutate the object
            item.hover = newHover;
            // but also shallow clone so distinct from previous,
            // useful if you rely on that for ngrx
            item = Object.assign({}, item);
        }
        this.spec && this.spec.hover && this.spec.hover(item, monitor);
    }
    /** @ignore */
    ngOnInit() {
        this.updateSubscription();
        this.target.setTypes(this.getTargetType());
    }
    getTargetType() {
        if (Array.isArray(this.spec.accepts)) {
            return this.spec.accepts;
        }
        else {
            return this.spec.accepts || this.spec.type;
        }
    }
    acceptsType(ty) {
        if (ty == null)
            return false;
        if (Array.isArray(this.spec.accepts)) {
            const arr = this.spec.accepts;
            return arr.indexOf(ty) !== -1;
        }
        else {
            let acc = this.getTargetType();
            return ty == acc;
        }
    }
    /** @ignore */
    ngOnChanges({ spec, listId }) {
        if (listId) {
            this.updateSubscription();
        }
        if (spec) {
            this.updateSubscription();
        }
        this.target.setTypes(this.getTargetType());
    }
    /** @ignore */
    ngAfterViewInit() {
        if (this.el) {
            this.target.connectDropTarget(this.el.nativeElement);
        }
        else {
            throw new Error('ssSortable directive must have ElementRef');
        }
    }
    /** @ignore */
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
SkyhookSortable.ɵfac = function SkyhookSortable_Factory(t) { return new (t || SkyhookSortable)(i0.ɵɵdirectiveInject(i1.SkyhookDndService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
SkyhookSortable.ɵdir = i0.ɵɵdefineDirective({ type: SkyhookSortable, selectors: [["", "ssSortable", ""]], inputs: { listId: ["ssSortableListId", "listId"], horizontal: ["ssSortableHorizontal", "horizontal"], spec: ["ssSortableSpec", "spec"], children: ["ssSortableChildren", "children"], hoverTrigger: ["ssSortableTrigger", "hoverTrigger"] }, exportAs: ["ssSortable"], features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SkyhookSortable, [{
        type: Directive,
        args: [{
                selector: '[ssSortable]',
                exportAs: 'ssSortable',
            }]
    }], function () { return [{ type: i1.SkyhookDndService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, { listId: [{
            type: Input,
            args: ['ssSortableListId']
        }], horizontal: [{
            type: Input,
            args: ['ssSortableHorizontal']
        }], spec: [{
            type: Input,
            args: ['ssSortableSpec']
        }], children: [{
            type: Input,
            args: ['ssSortableChildren']
        }], hoverTrigger: [{
            type: Input,
            args: ['ssSortableTrigger']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb3J0YWJsZS9zcmMvbGliL2RpcmVjdGl2ZXMvc29ydGFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxLQUFLLEVBQ0wsU0FBUyxFQUtULFVBQVUsRUFFVixpQkFBaUIsR0FDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsYUFBYTtBQUNiLE9BQU8sRUFBRSxZQUFZLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBYyxpQkFBaUIsRUFBcUIsTUFBTSxjQUFjLENBQUM7QUFDaEYsT0FBTyxFQUlILFlBQVksR0FDZixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7QUFNckMsTUFBTSxPQUFPLGVBQWU7SUE4QnhCLGNBQWM7SUFDZCxZQUNjLEdBQXNCLEVBQ3RCLEVBQTJCLEVBQzNCLEdBQXNCO1FBRnRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLE9BQUUsR0FBRixFQUFFLENBQXlCO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBaENULFdBQU0sR0FBUSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUdsRDs7OzZIQUdxSDtRQUN6RixpQkFBWSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFFaEUsY0FBYztRQUNOLHFCQUFnQixHQUFHLElBQUksZUFBZSxDQUFpQixFQUFFLENBQUMsQ0FBQztRQUNuRTs7V0FFRztRQUNJLGNBQVMsR0FBK0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBRXJFLGNBQWM7UUFDZCxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxQixjQUFjO1FBQ2QsYUFBUSxH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SUFFRCxjQUFjO0lBQ2QsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVELGNBQWM7SUFDZCxXQUFXO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs4RUE3TFEsZUFBZTtvREFBZixlQUFlO2tEQUFmLGVBQWU7Y0FKM0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsWUFBWTthQUN6Qjs2SEFHOEIsTUFBTTtrQkFBaEMsS0FBSzttQkFBQyxrQkFBa0I7WUFDTSxVQUFVO2tCQUF4QyxLQUFLO21CQUFDLHNCQUFzQjtZQUNNLElBQUk7a0JBQXRDLEtBQUs7bUJBQUMsZ0JBQWdCO1lBQ00sUUFBUTtrQkFBcEMsS0FBSzttQkFBQyxvQkFBb0I7WUFLQyxZQUFZO2tCQUF2QyxLQUFLO21CQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIE9uSW5pdCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEcm9wVGFyZ2V0LCBTa3lob29rRG5kU2VydmljZSwgRHJvcFRhcmdldE1vbml0b3IgfSBmcm9tICdAcmVkbmF4L2NvcmUnO1xuaW1wb3J0IHtcbiAgICBTb3J0YWJsZVNwZWMsXG4gICAgRHJhZ2dlZEl0ZW0sXG4gICAgUmVuZGVyQ29udGV4dCxcbiAgICBIb3ZlclRyaWdnZXIsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICcuLi9pc0VtcHR5JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbc3NTb3J0YWJsZV0nLFxuICAgIGV4cG9ydEFzOiAnc3NTb3J0YWJsZScsXG59KVxuZXhwb3J0IGNsYXNzIFNreWhvb2tTb3J0YWJsZTxEYXRhPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KCdzc1NvcnRhYmxlTGlzdElkJykgbGlzdElkOiBhbnkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCk7XG4gICAgQElucHV0KCdzc1NvcnRhYmxlSG9yaXpvbnRhbCcpIGhvcml6b250YWwgPSBmYWxzZTtcbiAgICBASW5wdXQoJ3NzU29ydGFibGVTcGVjJykgcHJvdGVjdGVkIHNwZWMhOiBTb3J0YWJsZVNwZWM8RGF0YT47XG4gICAgQElucHV0KCdzc1NvcnRhYmxlQ2hpbGRyZW4nKSBjaGlsZHJlbj86IEl0ZXJhYmxlPERhdGE+O1xuICAgIC8qKiBQb3NzaWJsZSB2YWx1ZXM6XG4gICAgICpcbiAgICAgKiAtICdoYWxmd2F5JyAoZGVmYXVsdCk6IHRyaWdnZXJzIGEgcmVvcmRlciB3aGVuIHlvdSBkcmFnIGhhbGZ3YXkgb3ZlciBhIG5laWdoYm91clxuICAgICAqIC0gJ2ZpeGVkJzogdHJpZ2dlcnMgYXMgc29vbiBhcyB5b3UgbW92ZSBvdmVyIGEgbmVpZ2hib3VyaW5nIGVsZW1lbnQuIERvZXMgbm90IHdvcmsgd2l0aCB2YXJpYWJsZSBzaXplIGVsZW1lbnRzLiAqL1xuICAgIEBJbnB1dCgnc3NTb3J0YWJsZVRyaWdnZXInKSBob3ZlclRyaWdnZXIgPSBIb3ZlclRyaWdnZXIuaGFsZndheTtcblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgcHJpdmF0ZSBjaGlsZHJlblN1YmplY3QkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxJdGVyYWJsZTxEYXRhPj4oW10pO1xuICAgIC8qKlxuICAgICAqIEEgaGFuZHkgd2F5IHRvIHN1YnNjcmliZSB0byBzcGVjLmdldExpc3QoKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2hpbGRyZW4kOiBPYnNlcnZhYmxlPEl0ZXJhYmxlPERhdGE+PiA9IHRoaXMuY2hpbGRyZW5TdWJqZWN0JDtcblxuICAgIC8qKiBAaWdub3JlICovXG4gICAgc3VicyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIGxpc3RTdWJzID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgLyoqIFRoaXMgRHJvcFRhcmdldCBpcyBhdHRhY2hlZCB0byB0aGUgd2hvbGUgbGlzdC5cbiAgICAgKlxuICAgICAqIFlvdSBtYXkgbW9uaXRvciBpdCBmb3IgaW5mb3JtYXRpb24gbGlrZSAnaXMgYW4gaXRlbSBob3ZlcmluZyBvdmVyIHRoaXMgZW50aXJlIGxpc3Qgc29tZXdoZXJlPydcbiAgICAgKi9cbiAgICB0YXJnZXQ6IERyb3BUYXJnZXQ8RHJhZ2dlZEl0ZW08RGF0YT4+O1xuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGRuZDogU2t5aG9va0RuZFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5kbmQuZHJvcFRhcmdldDxEcmFnZ2VkSXRlbTxEYXRhPj4oXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhbkRyb3A6IChtb25pdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hY2NlcHRzVHlwZShtb25pdG9yLmdldEl0ZW1UeXBlKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IG1vbml0b3IuZ2V0SXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDYW5Ecm9wKGl0ZW0sIG1vbml0b3IpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZHJvcDogKG1vbml0b3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IG1vbml0b3IuZ2V0SXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiB0aGlzLmdldENhbkRyb3AoaXRlbSwgbW9uaXRvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlYyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlYy5kcm9wICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVjLmRyb3AoaXRlbSwgbW9uaXRvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaG92ZXI6IChtb25pdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBtb25pdG9yLmdldEl0ZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4gJiYgaXNFbXB0eSh0aGlzLmNoaWxkcmVuKSAmJiBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYW5Ecm9wID0gdGhpcy5nZXRDYW5Ecm9wKGl0ZW0sIG1vbml0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbkRyb3AgJiYgbW9uaXRvci5pc092ZXIoeyBzaGFsbG93OiB0cnVlIH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsSG92ZXIoaXRlbSwgbW9uaXRvciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0SWQ6IHRoaXMubGlzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhpcy5zdWJzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBwcml2YXRlIHVwZGF0ZVN1YnNjcmlwdGlvbigpIHtcbiAgICAgICAgY29uc3QgYW55TGlzdElkID1cbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmxpc3RJZCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5saXN0SWQgIT09IG51bGw7XG4gICAgICAgIGlmIChhbnlMaXN0SWQgJiYgdGhpcy5zcGVjKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0U3Vicykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vicy5yZW1vdmUodGhpcy5saXN0U3Vicyk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0U3Vicy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zcGVjLmdldExpc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjcyQgPSB0aGlzLnNwZWMuZ2V0TGlzdCh0aGlzLmxpc3RJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0U3VicyA9XG4gICAgICAgICAgICAgICAgICAgIGNzJCAmJlxuICAgICAgICAgICAgICAgICAgICBjcyQuc3Vic2NyaWJlKChsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5TdWJqZWN0JC5uZXh0KGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc3Vicy5hZGQodGhpcy5saXN0U3Vicyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY29udGV4dEZvcihkYXRhOiBEYXRhLCBpbmRleDogbnVtYmVyKTogUmVuZGVyQ29udGV4dDxEYXRhPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBsaXN0SWQ6IHRoaXMubGlzdElkLFxuICAgICAgICAgICAgc3BlYzogdGhpcy5zcGVjLFxuICAgICAgICAgICAgaG9yaXpvbnRhbDogdGhpcy5ob3Jpem9udGFsLFxuICAgICAgICAgICAgaG92ZXJUcmlnZ2VyOiB0aGlzLmhvdmVyVHJpZ2dlcixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIHByaXZhdGUgZ2V0Q2FuRHJvcChcbiAgICAgICAgaXRlbTogRHJhZ2dlZEl0ZW08RGF0YT4sXG4gICAgICAgIG1vbml0b3I6IERyb3BUYXJnZXRNb25pdG9yPERyYWdnZWRJdGVtPERhdGE+PixcbiAgICAgICAgX2RlZmF1bHQgPSB0cnVlXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLnNwZWMgJiYgdGhpcy5zcGVjLmNhbkRyb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNwZWMuY2FuRHJvcChpdGVtLCBtb25pdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XG4gICAgfVxuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBwcml2YXRlIGNhbGxIb3ZlcihcbiAgICAgICAgaXRlbTogRHJhZ2dlZEl0ZW08RGF0YT4sXG4gICAgICAgIG1vbml0b3I6IERyb3BUYXJnZXRNb25pdG9yPERyYWdnZWRJdGVtPERhdGE+PixcbiAgICAgICAgbmV3SG92ZXI/OiB7IGxpc3RJZDogYW55OyBpbmRleDogbnVtYmVyIH1cbiAgICApIHtcbiAgICAgICAgaWYgKG5ld0hvdmVyKSB7XG4gICAgICAgICAgICAvLyBtdXRhdGUgdGhlIG9iamVjdFxuICAgICAgICAgICAgaXRlbS5ob3ZlciA9IG5ld0hvdmVyO1xuICAgICAgICAgICAgLy8gYnV0IGFsc28gc2hhbGxvdyBjbG9uZSBzbyBkaXN0aW5jdCBmcm9tIHByZXZpb3VzLFxuICAgICAgICAgICAgLy8gdXNlZnVsIGlmIHlvdSByZWx5IG9uIHRoYXQgZm9yIG5ncnhcbiAgICAgICAgICAgIGl0ZW0gPSB7IC4uLml0ZW0gfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwZWMgJiYgdGhpcy5zcGVjLmhvdmVyICYmIHRoaXMuc3BlYy5ob3ZlcihpdGVtLCBtb25pdG9yKTtcbiAgICB9XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbigpO1xuICAgICAgICB0aGlzLnRhcmdldC5zZXRUeXBlcyh0aGlzLmdldFRhcmdldFR5cGUoKSk7XG4gICAgfVxuXG4gICAgZ2V0VGFyZ2V0VHlwZSgpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zcGVjLmFjY2VwdHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcGVjLmFjY2VwdHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcGVjLmFjY2VwdHMgfHwgdGhpcy5zcGVjLnR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhY2NlcHRzVHlwZSh0eTogc3RyaW5nIHwgc3ltYm9sIHwgbnVsbCkge1xuICAgICAgICBpZiAodHkgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnNwZWMuYWNjZXB0cykpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IHRoaXMuc3BlYy5hY2NlcHRzIGFzIEFycmF5PHN0cmluZyB8IHN5bWJvbD47XG4gICAgICAgICAgICByZXR1cm4gYXJyLmluZGV4T2YodHkpICE9PSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBhY2MgPSB0aGlzLmdldFRhcmdldFR5cGUoKTtcbiAgICAgICAgICAgIHJldHVybiB0eSA9PSBhY2M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGlnbm9yZSAqL1xuICAgIG5nT25DaGFuZ2VzKHsgc3BlYywgbGlzdElkIH06IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGxpc3RJZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BlYykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhcmdldC5zZXRUeXBlcyh0aGlzLmdldFRhcmdldFR5cGUoKSk7XG4gICAgfVxuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5jb25uZWN0RHJvcFRhcmdldCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzc1NvcnRhYmxlIGRpcmVjdGl2ZSBtdXN0IGhhdmUgRWxlbWVudFJlZicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuIl19