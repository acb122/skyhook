import { __extends } from "tslib";
import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { invariant } from './internal/invariant';
import { Subscription } from 'rxjs';
/** @ignore */
var explanation = 'You can only pass exactly one connection object to [dropTarget]. ' +
    'There is only one of each source/target/preview allowed per DOM element.';
/**
 * @ignore
 */
var DndDirective = /** @class */ (function () {
    /** @ignore */
    function DndDirective(elRef, zone) {
        this.elRef = elRef;
        this.zone = zone;
        this.deferredRequest = new Subscription();
    }
    DndDirective.prototype.ngOnChanges = function () {
        var _this = this;
        invariant(typeof this.connection === 'object' && !Array.isArray(this.connection), explanation);
        this.zone.runOutsideAngular(function () {
            // discard an unresolved connection request
            // in the case where the previous one succeeded, deferredRequest is
            // already closed.
            _this.deferredRequest.unsubscribe();
            // replace it with a new one
            if (_this.connection) {
                _this.deferredRequest = _this.callHooks(_this.connection);
            }
        });
    };
    DndDirective.prototype.ngOnDestroy = function () { this.deferredRequest.unsubscribe(); };
    // @ts-ignore
    DndDirective.prototype.callHooks = function (conn) {
        return new Subscription();
    };
    DndDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    DndDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[abstractDndDirective]'
                },] }
    ];
    DndDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    return DndDirective;
}());
export { DndDirective };
// Note: the T | undefined everywhere is from https://github.com/angular/angular-cli/issues/2034
/**
 * Allows you to connect a {@link DropTarget} to an element in a component template.
 */
var DropTargetDirective = /** @class */ (function (_super) {
    __extends(DropTargetDirective, _super);
    function DropTargetDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DropTargetDirective.prototype, "dropTargetType", {
        /** Reduce typo confusion by allowing non-plural version of dropTargetTypes */
        set: function (t) {
            this.dropTargetTypes = t;
        },
        enumerable: false,
        configurable: true
    });
    DropTargetDirective.prototype.ngOnChanges = function () {
        this.connection = this.dropTarget;
        if (this.connection && this.dropTargetTypes != null) {
            this.connection.setTypes(this.dropTargetTypes);
        }
        _super.prototype.ngOnChanges.call(this);
    };
    DropTargetDirective.prototype.callHooks = function (conn) {
        return conn.connectDropTarget(this.elRef.nativeElement);
    };
    DropTargetDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dropTarget]'
                },] }
    ];
    DropTargetDirective.propDecorators = {
        dropTarget: [{ type: Input, args: ['dropTarget',] }],
        dropTargetTypes: [{ type: Input, args: ['dropTargetTypes',] }],
        dropTargetType: [{ type: Input, args: ['dropTargetType',] }]
    };
    return DropTargetDirective;
}(DndDirective));
export { DropTargetDirective };
/**
 * Allows you to connect a {@link DragSource} to an element in a component template.
 */
var DragSourceDirective = /** @class */ (function (_super) {
    __extends(DragSourceDirective, _super);
    function DragSourceDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Do not render an HTML5 preview. Only applies when using the HTML5 backend.
         * It does not use { captureDraggingState: true } for IE11 support; that is broken.
         */
        _this.noHTML5Preview = false;
        return _this;
    }
    DragSourceDirective.prototype.ngOnChanges = function () {
        this.connection = this.dragSource;
        if (this.connection && this.dragSourceType != null) {
            this.connection.setType(this.dragSourceType);
        }
        _super.prototype.ngOnChanges.call(this);
    };
    DragSourceDirective.prototype.callHooks = function (conn) {
        var sub = new Subscription();
        sub.add(conn.connectDragSource(this.elRef.nativeElement, this.dragSourceOptions));
        if (this.noHTML5Preview) {
            sub.add(conn.connectDragPreview(getEmptyImage()));
        }
        return sub;
    };
    DragSourceDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dragSource]'
                },] }
    ];
    DragSourceDirective.propDecorators = {
        dragSource: [{ type: Input, args: ['dragSource',] }],
        dragSourceType: [{ type: Input, args: ['dragSourceType',] }],
        dragSourceOptions: [{ type: Input, args: ['dragSourceOptions',] }],
        noHTML5Preview: [{ type: Input, args: ['noHTML5Preview',] }]
    };
    return DragSourceDirective;
}(DndDirective));
export { DragSourceDirective };
/**
 * Allows you to specify which element a {@link DragSource} should screenshot as an HTML5 drag preview.
 *
 * Only relevant when using the HTML5 backend.
 */
var DragPreviewDirective = /** @class */ (function (_super) {
    __extends(DragPreviewDirective, _super);
    function DragPreviewDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragPreviewDirective.prototype.ngOnChanges = function () {
        this.connection = this.dragPreview;
        _super.prototype.ngOnChanges.call(this);
    };
    DragPreviewDirective.prototype.callHooks = function (conn) {
        return conn.connectDragPreview(this.elRef.nativeElement, this.dragPreviewOptions);
    };
    DragPreviewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dragPreview]',
                    inputs: ['dragPreview', 'dragPreviewOptions']
                },] }
    ];
    DragPreviewDirective.propDecorators = {
        dragPreview: [{ type: Input, args: ['dragPreview',] }],
        dragPreviewOptions: [{ type: Input, args: ['dragPreviewOptions',] }]
    };
    return DragPreviewDirective;
}(DndDirective));
export { DragPreviewDirective };
// import { getEmptyImage } from 'react-dnd-html5-backend';
// we don't want to depend on the backend, so here that is, copied
/** @ignore */
var emptyImage;
/**
 * Returns a 0x0 empty GIF for use as a drag preview.
 * @ignore
 * */
function getEmptyImage() {
    if (!emptyImage) {
        emptyImage = new Image();
        emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }
    return emptyImage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0ByZWRuYXgvY29yZS8iLCJzb3VyY2VzIjpbInNyYy9saWIvZG5kLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdwQyxjQUFjO0FBQ2QsSUFBTSxXQUFXLEdBQ2YsbUVBQW1FO0lBQ25FLDBFQUEwRSxDQUN6RTtBQUVIOztHQUVHO0FBQ0g7SUFNRSxjQUFjO0lBQ2Qsc0JBQXNCLEtBQWlCLEVBQVUsSUFBWTtRQUF2QyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUZyRCxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFb0IsQ0FBQztJQUN4RCxrQ0FBVyxHQUFyQjtRQUFBLGlCQWVDO1FBZEMsU0FBUyxDQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDdEUsV0FBVyxDQUNaLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQzFCLDJDQUEyQztZQUMzQyxtRUFBbUU7WUFDbkUsa0JBQWtCO1lBQ2xCLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkMsNEJBQTRCO1lBQzVCLElBQUksS0FBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN4RDtRQUNILENBQUMsQ0FBQyxD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R0FnQ3BEO1NBaENZLG1CQUFtQjtBQWtDaEM7Ozs7R0FJRztBQUNIO0lBSTBDLHdDQUFZO0lBSnREOztJQW1CQSxDQUFDO0lBUlcsMENBQVcsR0FBckI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkMsaUJBQU0sV0FBVyxXQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVTLHdDQUFTLEdBQW5CLFVBQW9CLElBQXFCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7O2dCQWxCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQztpQkFDOUM7Ozs4QkFJRSxLQUFLLFNBQUMsYUFBYTtxQ0FFbkIsS0FBSyxTQUFDLG9CQUFvQjs7SUFVN0IsMkJBQUM7Q0FBQSxBQW5CRCxDQUkwQyxZQUFZLEdBZXJEO1NBZlksb0JBQW9CO0FBaUJqQywyREFBMkQ7QUFDM0Qsa0VBQWtFO0FBQ2xFLGNBQWM7QUFDZCxJQUFJLFVBQTRCLENBQUM7QUFDakM7OztLQUdLO0FBQ0wsU0FBUyxhQUFhO0lBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsR0FBRyxHQUFHLDRFQUE0RSxDQUFDO0tBQy9GO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaW52YXJpYW50IH0gZnJvbSAnLi9pbnRlcm5hbC9pbnZhcmlhbnQnO1xuXG5pbXBvcnQgeyBEcm9wVGFyZ2V0LCBEcmFnU291cmNlIH0gZnJvbSAnLi9jb25uZWN0aW9uLXR5cGVzJztcbmltcG9ydCB7IERyYWdTb3VyY2VPcHRpb25zLCBEcmFnUHJldmlld09wdGlvbnMgfSBmcm9tICcuL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUeXBlT3JUeXBlQXJyYXkgfSBmcm9tICcuL3R5cGUtaXNoJztcblxuLyoqIEBpZ25vcmUgKi9cbmNvbnN0IGV4cGxhbmF0aW9uID1cbiAgJ1lvdSBjYW4gb25seSBwYXNzIGV4YWN0bHkgb25lIGNvbm5lY3Rpb24gb2JqZWN0IHRvIFtkcm9wVGFyZ2V0XS4gJyArXG4gICdUaGVyZSBpcyBvbmx5IG9uZSBvZiBlYWNoIHNvdXJjZS90YXJnZXQvcHJldmlldyBhbGxvd2VkIHBlciBET00gZWxlbWVudC4nXG4gIDtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Fic3RyYWN0RG5kRGlyZWN0aXZlXSdcbn0pXG5leHBvcnQgY2xhc3MgRG5kRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIGNvbm5lY3Rpb246IGFueTtcbiAgcHJpdmF0ZSBkZWZlcnJlZFJlcXVlc3QgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIC8qKiBAaWdub3JlICovXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHsgfVxuICBwcm90ZWN0ZWQgbmdPbkNoYW5nZXMoKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgdHlwZW9mIHRoaXMuY29ubmVjdGlvbiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodGhpcy5jb25uZWN0aW9uKSxcbiAgICAgIGV4cGxhbmF0aW9uXG4gICAgKTtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgLy8gZGlzY2FyZCBhbiB1bnJlc29sdmVkIGNvbm5lY3Rpb24gcmVxdWVzdFxuICAgICAgLy8gaW4gdGhlIGNhc2Ugd2hlcmUgdGhlIHByZXZpb3VzIG9uZSBzdWNjZWVkZWQsIGRlZmVycmVkUmVxdWVzdCBpc1xuICAgICAgLy8gYWxyZWFkeSBjbG9zZWQuXG4gICAgICB0aGlzLmRlZmVycmVkUmVxdWVzdC51bnN1YnNjcmliZSgpO1xuICAgICAgLy8gcmVwbGFjZSBpdCB3aXRoIGEgbmV3IG9uZVxuICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICB0aGlzLmRlZmVycmVkUmVxdWVzdCA9IHRoaXMuY2FsbEhvb2tzKHRoaXMuY29ubmVjdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcHJvdGVjdGVkIG5nT25EZXN0cm95KCkgeyB0aGlzLmRlZmVycmVkUmVxdWVzdC51bnN1YnNjcmliZSgpOyB9XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJvdGVjdGVkIGNhbGxIb29rcyhjb25uOiBhbnkpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIH1cbn1cblxuLy8gTm90ZTogdGhlIFQgfCB1bmRlZmluZWQgZXZlcnl3aGVyZSBpcyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2lzc3Vlcy8yMDM0XG5cbi8qKlxuICogQWxsb3dzIHlvdSB0byBjb25uZWN0IGEge0BsaW5rIERyb3BUYXJnZXR9IHRvIGFuIGVsZW1lbnQgaW4gYSBjb21wb25lbnQgdGVtcGxhdGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkcm9wVGFyZ2V0XSdcbn0pXG5leHBvcnQgY2xhc3MgRHJvcFRhcmdldERpcmVjdGl2ZSBleHRlbmRzIERuZERpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBjb25uZWN0aW9uOiBEcm9wVGFyZ2V0IHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBXaGljaCB0YXJnZXQgdG8gY29ubmVjdCB0aGUgRE9NIHRvICovXG4gIEBJbnB1dCgnZHJvcFRhcmdldCcpIHB1YmxpYyBkcm9wVGFyZ2V0ITogRHJvcFRhcmdldDtcbiAgLyoqIFNob3J0Y3V0IGZvciBzZXR0aW5nIGEgdHlwZSBvbiB0aGUgY29ubmVjdGlvbi5cbiAgICogIExldHMgeW91IHVzZSBBbmd1bGFyIGJpbmRpbmcgdG8gZG8gaXQuIFJ1bnMge0BsaW5rIERyb3BUYXJnZXQjc2V0VHlwZXN9LiAqL1xuICBASW5wdXQoJ2Ryb3BUYXJnZXRUeXBlcycpIGRyb3BUYXJnZXRUeXBlcz86IFR5cGVPclR5cGVBcnJheTtcbiAgLyoqIFJlZHVjZSB0eXBvIGNvbmZ1c2lvbiBieSBhbGxvd2luZyBub24tcGx1cmFsIHZlcnNpb24gb2YgZHJvcFRhcmdldFR5cGVzICovXG4gIEBJbnB1dCgnZHJvcFRhcmdldFR5cGUnKSBzZXQgZHJvcFRhcmdldFR5cGUodDogVHlwZU9yVHlwZUFycmF5KSB7XG4gICAgdGhpcy5kcm9wVGFyZ2V0VHlwZXMgPSB0O1xuICB9XG5cbiAgcHJvdGVjdGVkIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuY29ubmVjdGlvbiA9IHRoaXMuZHJvcFRhcmdldDtcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uICYmIHRoaXMuZHJvcFRhcmdldFR5cGVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbi5zZXRUeXBlcyh0aGlzLmRyb3BUYXJnZXRUeXBlcyk7XG4gICAgfVxuICAgIHN1cGVyLm5nT25DaGFuZ2VzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FsbEhvb2tzKGNvbm46IERyb3BUYXJnZXQpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiBjb25uLmNvbm5lY3REcm9wVGFyZ2V0KHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGNvbm5lY3QgYSB7QGxpbmsgRHJhZ1NvdXJjZX0gdG8gYW4gZWxlbWVudCBpbiBhIGNvbXBvbmVudCB0ZW1wbGF0ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RyYWdTb3VyY2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcmFnU291cmNlRGlyZWN0aXZlIGV4dGVuZHMgRG5kRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIGNvbm5lY3Rpb246IERyYWdTb3VyY2U8YW55PiB8IHVuZGVmaW5lZDtcblxuICAvKiogV2hpY2ggc291cmNlIHRvIGNvbm5lY3QgdGhlIERPTSB0byAqL1xuICBASW5wdXQoJ2RyYWdTb3VyY2UnKSBkcmFnU291cmNlITogRHJhZ1NvdXJjZTxhbnk+O1xuICAvKiogU2hvcnRjdXQgZm9yIHNldHRpbmcgYSB0eXBlIG9uIHRoZSBjb25uZWN0aW9uLlxuICAgKiAgTGV0cyB5b3UgdXNlIEFuZ3VsYXIgYmluZGluZyB0byBkbyBpdC4gUnVucyB7QGxpbmsgRHJhZ1NvdXJjZSNzZXRUeXBlfS4gKi9cbiAgQElucHV0KCdkcmFnU291cmNlVHlwZScpIGRyYWdTb3VyY2VUeXBlPzogc3RyaW5nIHwgc3ltYm9sO1xuICAvKiogUGFzcyBhbiBvcHRpb25zIG9iamVjdCBhcyB5b3Ugd291bGQgdG8ge0BsaW5rIERyYWdTb3VyY2UjY29ubmVjdERyYWdTb3VyY2V9LiAqL1xuICBASW5wdXQoJ2RyYWdTb3VyY2VPcHRpb25zJykgZHJhZ1NvdXJjZU9wdGlvbnM/OiBEcmFnU291cmNlT3B0aW9ucztcbiAgLyoqIERvIG5vdCByZW5kZXIgYW4gSFRNTDUgcHJldmlldy4gT25seSBhcHBsaWVzIHdoZW4gdXNpbmcgdGhlIEhUTUw1IGJhY2tlbmQuXG4gICAqIEl0IGRvZXMgbm90IHVzZSB7IGNhcHR1cmVEcmFnZ2luZ1N0YXRlOiB0cnVlIH0gZm9yIElFMTEgc3VwcG9ydDsgdGhhdCBpcyBicm9rZW4uXG4gICAqL1xuICBASW5wdXQoJ25vSFRNTDVQcmV2aWV3Jykgbm9IVE1MNVByZXZpZXcgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uID0gdGhpcy5kcmFnU291cmNlO1xuICAgIGlmICh0aGlzLmNvbm5lY3Rpb24gJiYgdGhpcy5kcmFnU291cmNlVHlwZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24uc2V0VHlwZSh0aGlzLmRyYWdTb3VyY2VUeXBlKTtcbiAgICB9XG4gICAgc3VwZXIubmdPbkNoYW5nZXMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxsSG9va3MoY29ubjogRHJhZ1NvdXJjZTxhbnk+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgc3ViLmFkZChjb25uLmNvbm5lY3REcmFnU291cmNlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5kcmFnU291cmNlT3B0aW9ucykpO1xuICAgIGlmICh0aGlzLm5vSFRNTDVQcmV2aWV3KSB7XG4gICAgICBzdWIuYWRkKGNvbm4uY29ubmVjdERyYWdQcmV2aWV3KGdldEVtcHR5SW1hZ2UoKSkpO1xuICAgIH1cbiAgICByZXR1cm4gc3ViO1xuICB9XG5cbn1cblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIHNwZWNpZnkgd2hpY2ggZWxlbWVudCBhIHtAbGluayBEcmFnU291cmNlfSBzaG91bGQgc2NyZWVuc2hvdCBhcyBhbiBIVE1MNSBkcmFnIHByZXZpZXcuXG4gKlxuICogT25seSByZWxldmFudCB3aGVuIHVzaW5nIHRoZSBIVE1MNSBiYWNrZW5kLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZHJhZ1ByZXZpZXddJyxcbiAgaW5wdXRzOiBbJ2RyYWdQcmV2aWV3JywgJ2RyYWdQcmV2aWV3T3B0aW9ucyddXG59KVxuZXhwb3J0IGNsYXNzIERyYWdQcmV2aWV3RGlyZWN0aXZlIGV4dGVuZHMgRG5kRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIGNvbm5lY3Rpb246IERyYWdTb3VyY2U8YW55PiB8IHVuZGVmaW5lZDtcbiAgLyoqIFRoZSBkcmFnIHNvdXJjZSBmb3Igd2hpY2ggdGhpcyBlbGVtZW50IHdpbGwgYmUgdGhlIHByZXZpZXcuICovXG4gIEBJbnB1dCgnZHJhZ1ByZXZpZXcnKSBwdWJsaWMgZHJhZ1ByZXZpZXchOiBEcmFnU291cmNlPGFueT47XG4gIC8qKiBQYXNzIGFuIG9wdGlvbnMgb2JqZWN0IGFzIHlvdSB3b3VsZCB0byB7QGxpbmsgRHJhZ1NvdXJjZSNjb25uZWN0RHJhZ1ByZXZpZXd9LiAqL1xuICBASW5wdXQoJ2RyYWdQcmV2aWV3T3B0aW9ucycpIGRyYWdQcmV2aWV3T3B0aW9ucz86IERyYWdQcmV2aWV3T3B0aW9ucztcblxuICBwcm90ZWN0ZWQgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uID0gdGhpcy5kcmFnUHJldmlldztcbiAgICBzdXBlci5uZ09uQ2hhbmdlcygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhbGxIb29rcyhjb25uOiBEcmFnU291cmNlPGFueT4pIHtcbiAgICByZXR1cm4gY29ubi5jb25uZWN0RHJhZ1ByZXZpZXcodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRyYWdQcmV2aWV3T3B0aW9ucyk7XG4gIH1cbn1cblxuLy8gaW1wb3J0IHsgZ2V0RW1wdHlJbWFnZSB9IGZyb20gJ3JlYWN0LWRuZC1odG1sNS1iYWNrZW5kJztcbi8vIHdlIGRvbid0IHdhbnQgdG8gZGVwZW5kIG9uIHRoZSBiYWNrZW5kLCBzbyBoZXJlIHRoYXQgaXMsIGNvcGllZFxuLyoqIEBpZ25vcmUgKi9cbmxldCBlbXB0eUltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuLyoqXG4gKiBSZXR1cm5zIGEgMHgwIGVtcHR5IEdJRiBmb3IgdXNlIGFzIGEgZHJhZyBwcmV2aWV3LlxuICogQGlnbm9yZVxuICogKi9cbmZ1bmN0aW9uIGdldEVtcHR5SW1hZ2UoKSB7XG4gIGlmICghZW1wdHlJbWFnZSkge1xuICAgIGVtcHR5SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBlbXB0eUltYWdlLnNyYyA9ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUFBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PSc7XG4gIH1cbiAgcmV0dXJuIGVtcHR5SW1hZ2U7XG59XG5cbiJdfQ==