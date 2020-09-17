import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { invariant } from './internal/invariant';
import { Subscription } from 'rxjs';
/** @ignore */
const explanation = 'You can only pass exactly one connection object to [dropTarget]. ' +
    'There is only one of each source/target/preview allowed per DOM element.';
/**
 * @ignore
 */
export class DndDirective {
    /** @ignore */
    constructor(elRef, zone) {
        this.elRef = elRef;
        this.zone = zone;
        this.deferredRequest = new Subscription();
    }
    ngOnChanges() {
        invariant(typeof this.connection === 'object' && !Array.isArray(this.connection), explanation);
        this.zone.runOutsideAngular(() => {
            // discard an unresolved connection request
            // in the case where the previous one succeeded, deferredRequest is
            // already closed.
            this.deferredRequest.unsubscribe();
            // replace it with a new one
            if (this.connection) {
                this.deferredRequest = this.callHooks(this.connection);
            }
        });
    }
    ngOnDestroy() { this.deferredRequest.unsubscribe(); }
    // @ts-ignore
    callHooks(conn) {
        return new Subscription();
    }
}
DndDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
DndDirective.decorators = [
    { type: Directive, args: [{
                selector: '[abstractDndDirective]'
            },] }
];
DndDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
// Note: the T | undefined everywhere is from https://github.com/angular/angular-cli/issues/2034
/**
 * Allows you to connect a {@link DropTarget} to an element in a component template.
 */
export class DropTargetDirective extends DndDirective {
    /** Reduce typo confusion by allowing non-plural version of dropTargetTypes */
    set dropTargetType(t) {
        this.dropTargetTypes = t;
    }
    ngOnChanges() {
        this.connection = this.dropTarget;
        if (this.connection && this.dropTargetTypes != null) {
            this.connection.setTypes(this.dropTargetTypes);
        }
        super.ngOnChanges();
    }
    callHooks(conn) {
        return conn.connectDropTarget(this.elRef.nativeElement);
    }
}
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
/**
 * Allows you to connect a {@link DragSource} to an element in a component template.
 */
export class DragSourceDirective extends DndDirective {
    constructor() {
        super(...arguments);
        /** Do not render an HTML5 preview. Only applies when using the HTML5 backend.
         * It does not use { captureDraggingState: true } for IE11 support; that is broken.
         */
        this.noHTML5Preview = false;
    }
    ngOnChanges() {
        this.connection = this.dragSource;
        if (this.connection && this.dragSourceType != null) {
            this.connection.setType(this.dragSourceType);
        }
        super.ngOnChanges();
    }
    callHooks(conn) {
        const sub = new Subscription();
        sub.add(conn.connectDragSource(this.elRef.nativeElement, this.dragSourceOptions));
        if (this.noHTML5Preview) {
            sub.add(conn.connectDragPreview(getEmptyImage()));
        }
        return sub;
    }
}
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
/**
 * Allows you to specify which element a {@link DragSource} should screenshot as an HTML5 drag preview.
 *
 * Only relevant when using the HTML5 backend.
 */
export class DragPreviewDirective extends DndDirective {
    ngOnChanges() {
        this.connection = this.dragPreview;
        super.ngOnChanges();
    }
    callHooks(conn) {
        return conn.connectDragPreview(this.elRef.nativeElement, this.dragPreviewOptions);
    }
}
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
// import { getEmptyImage } from 'react-dnd-html5-backend';
// we don't want to depend on the backend, so here that is, copied
/** @ignore */
let emptyImage;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0ByZWRuYXgvY29yZS8iLCJzb3VyY2VzIjpbInNyYy9saWIvZG5kLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3BDLGNBQWM7QUFDZCxNQUFNLFdBQVcsR0FDZixtRUFBbUU7SUFDbkUsMEVBQTBFLENBQ3pFO0FBRUg7O0dBRUc7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQUd2QixjQUFjO0lBQ2QsWUFBc0IsS0FBaUIsRUFBVSxJQUFZO1FBQXZDLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBRnJELG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVvQixDQUFDO0lBQ3hELFdBQVc7UUFDbkIsU0FBUyxDQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDdEUsV0FBVyxDQUNaLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMvQiwyQ0FBMkM7WUFDM0MsbUVBQW1FO1lBQ25FLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLDRCQUE0QjtZQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEQ7UUFDSCxDQUFD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LENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEYsQ0FBQzs7O1lBbEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsTUFBTSxFQUFFLENBQUMsYUFBYSxFQUFFLG9CQUFvQixDQUFDO2FBQzlDOzs7MEJBSUUsS0FBSyxTQUFDLGFBQWE7aUNBRW5CLEtBQUssU0FBQyxvQkFBb0I7O0FBWTdCLDJEQUEyRDtBQUMzRCxrRUFBa0U7QUFDbEUsY0FBYztBQUNkLElBQUksVUFBNEIsQ0FBQztBQUNqQzs7O0tBR0s7QUFDTCxTQUFTLGFBQWE7SUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsNEVBQTRFLENBQUM7S0FDL0Y7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tICcuL2ludGVybmFsL2ludmFyaWFudCc7XG5cbmltcG9ydCB7IERyb3BUYXJnZXQsIERyYWdTb3VyY2UgfSBmcm9tICcuL2Nvbm5lY3Rpb24tdHlwZXMnO1xuaW1wb3J0IHsgRHJhZ1NvdXJjZU9wdGlvbnMsIERyYWdQcmV2aWV3T3B0aW9ucyB9IGZyb20gJy4vY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFR5cGVPclR5cGVBcnJheSB9IGZyb20gJy4vdHlwZS1pc2gnO1xuXG4vKiogQGlnbm9yZSAqL1xuY29uc3QgZXhwbGFuYXRpb24gPVxuICAnWW91IGNhbiBvbmx5IHBhc3MgZXhhY3RseSBvbmUgY29ubmVjdGlvbiBvYmplY3QgdG8gW2Ryb3BUYXJnZXRdLiAnICtcbiAgJ1RoZXJlIGlzIG9ubHkgb25lIG9mIGVhY2ggc291cmNlL3RhcmdldC9wcmV2aWV3IGFsbG93ZWQgcGVyIERPTSBlbGVtZW50LidcbiAgO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbYWJzdHJhY3REbmREaXJlY3RpdmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEbmREaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgY29ubmVjdGlvbjogYW55O1xuICBwcml2YXRlIGRlZmVycmVkUmVxdWVzdCA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgLyoqIEBpZ25vcmUgKi9cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkgeyB9XG4gIHByb3RlY3RlZCBuZ09uQ2hhbmdlcygpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICB0eXBlb2YgdGhpcy5jb25uZWN0aW9uID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh0aGlzLmNvbm5lY3Rpb24pLFxuICAgICAgZXhwbGFuYXRpb25cbiAgICApO1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBkaXNjYXJkIGFuIHVucmVzb2x2ZWQgY29ubmVjdGlvbiByZXF1ZXN0XG4gICAgICAvLyBpbiB0aGUgY2FzZSB3aGVyZSB0aGUgcHJldmlvdXMgb25lIHN1Y2NlZWRlZCwgZGVmZXJyZWRSZXF1ZXN0IGlzXG4gICAgICAvLyBhbHJlYWR5IGNsb3NlZC5cbiAgICAgIHRoaXMuZGVmZXJyZWRSZXF1ZXN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAvLyByZXBsYWNlIGl0IHdpdGggYSBuZXcgb25lXG4gICAgICBpZiAodGhpcy5jb25uZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZGVmZXJyZWRSZXF1ZXN0ID0gdGhpcy5jYWxsSG9va3ModGhpcy5jb25uZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBwcm90ZWN0ZWQgbmdPbkRlc3Ryb3koKSB7IHRoaXMuZGVmZXJyZWRSZXF1ZXN0LnVuc3Vic2NyaWJlKCk7IH1cbiAgLy8gQHRzLWlnbm9yZVxuICBwcm90ZWN0ZWQgY2FsbEhvb2tzKGNvbm46IGFueSk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgfVxufVxuXG4vLyBOb3RlOiB0aGUgVCB8IHVuZGVmaW5lZCBldmVyeXdoZXJlIGlzIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvaXNzdWVzLzIwMzRcblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGNvbm5lY3QgYSB7QGxpbmsgRHJvcFRhcmdldH0gdG8gYW4gZWxlbWVudCBpbiBhIGNvbXBvbmVudCB0ZW1wbGF0ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Ryb3BUYXJnZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcm9wVGFyZ2V0RGlyZWN0aXZlIGV4dGVuZHMgRG5kRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIGNvbm5lY3Rpb246IERyb3BUYXJnZXQgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFdoaWNoIHRhcmdldCB0byBjb25uZWN0IHRoZSBET00gdG8gKi9cbiAgQElucHV0KCdkcm9wVGFyZ2V0JykgcHVibGljIGRyb3BUYXJnZXQhOiBEcm9wVGFyZ2V0O1xuICAvKiogU2hvcnRjdXQgZm9yIHNldHRpbmcgYSB0eXBlIG9uIHRoZSBjb25uZWN0aW9uLlxuICAgKiAgTGV0cyB5b3UgdXNlIEFuZ3VsYXIgYmluZGluZyB0byBkbyBpdC4gUnVucyB7QGxpbmsgRHJvcFRhcmdldCNzZXRUeXBlc30uICovXG4gIEBJbnB1dCgnZHJvcFRhcmdldFR5cGVzJykgZHJvcFRhcmdldFR5cGVzPzogVHlwZU9yVHlwZUFycmF5O1xuICAvKiogUmVkdWNlIHR5cG8gY29uZnVzaW9uIGJ5IGFsbG93aW5nIG5vbi1wbHVyYWwgdmVyc2lvbiBvZiBkcm9wVGFyZ2V0VHlwZXMgKi9cbiAgQElucHV0KCdkcm9wVGFyZ2V0VHlwZScpIHNldCBkcm9wVGFyZ2V0VHlwZSh0OiBUeXBlT3JUeXBlQXJyYXkpIHtcbiAgICB0aGlzLmRyb3BUYXJnZXRUeXBlcyA9IHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uID0gdGhpcy5kcm9wVGFyZ2V0O1xuICAgIGlmICh0aGlzLmNvbm5lY3Rpb24gJiYgdGhpcy5kcm9wVGFyZ2V0VHlwZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uLnNldFR5cGVzKHRoaXMuZHJvcFRhcmdldFR5cGVzKTtcbiAgICB9XG4gICAgc3VwZXIubmdPbkNoYW5nZXMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxsSG9va3MoY29ubjogRHJvcFRhcmdldCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIGNvbm4uY29ubmVjdERyb3BUYXJnZXQodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxufVxuXG4vKipcbiAqIEFsbG93cyB5b3UgdG8gY29ubmVjdCBhIHtAbGluayBEcmFnU291cmNlfSB0byBhbiBlbGVtZW50IGluIGEgY29tcG9uZW50IHRlbXBsYXRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZHJhZ1NvdXJjZV0nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdTb3VyY2VEaXJlY3RpdmUgZXh0ZW5kcyBEbmREaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgY29ubmVjdGlvbjogRHJhZ1NvdXJjZTxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gIC8qKiBXaGljaCBzb3VyY2UgdG8gY29ubmVjdCB0aGUgRE9NIHRvICovXG4gIEBJbnB1dCgnZHJhZ1NvdXJjZScpIGRyYWdTb3VyY2UhOiBEcmFnU291cmNlPGFueT47XG4gIC8qKiBTaG9ydGN1dCBmb3Igc2V0dGluZyBhIHR5cGUgb24gdGhlIGNvbm5lY3Rpb24uXG4gICAqICBMZXRzIHlvdSB1c2UgQW5ndWxhciBiaW5kaW5nIHRvIGRvIGl0LiBSdW5zIHtAbGluayBEcmFnU291cmNlI3NldFR5cGV9LiAqL1xuICBASW5wdXQoJ2RyYWdTb3VyY2VUeXBlJykgZHJhZ1NvdXJjZVR5cGU/OiBzdHJpbmcgfCBzeW1ib2w7XG4gIC8qKiBQYXNzIGFuIG9wdGlvbnMgb2JqZWN0IGFzIHlvdSB3b3VsZCB0byB7QGxpbmsgRHJhZ1NvdXJjZSNjb25uZWN0RHJhZ1NvdXJjZX0uICovXG4gIEBJbnB1dCgnZHJhZ1NvdXJjZU9wdGlvbnMnKSBkcmFnU291cmNlT3B0aW9ucz86IERyYWdTb3VyY2VPcHRpb25zO1xuICAvKiogRG8gbm90IHJlbmRlciBhbiBIVE1MNSBwcmV2aWV3LiBPbmx5IGFwcGxpZXMgd2hlbiB1c2luZyB0aGUgSFRNTDUgYmFja2VuZC5cbiAgICogSXQgZG9lcyBub3QgdXNlIHsgY2FwdHVyZURyYWdnaW5nU3RhdGU6IHRydWUgfSBmb3IgSUUxMSBzdXBwb3J0OyB0aGF0IGlzIGJyb2tlbi5cbiAgICovXG4gIEBJbnB1dCgnbm9IVE1MNVByZXZpZXcnKSBub0hUTUw1UHJldmlldyA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24gPSB0aGlzLmRyYWdTb3VyY2U7XG4gICAgaWYgKHRoaXMuY29ubmVjdGlvbiAmJiB0aGlzLmRyYWdTb3VyY2VUeXBlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbi5zZXRUeXBlKHRoaXMuZHJhZ1NvdXJjZVR5cGUpO1xuICAgIH1cbiAgICBzdXBlci5uZ09uQ2hhbmdlcygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhbGxIb29rcyhjb25uOiBEcmFnU291cmNlPGFueT4pOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICBzdWIuYWRkKGNvbm4uY29ubmVjdERyYWdTb3VyY2UodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRyYWdTb3VyY2VPcHRpb25zKSk7XG4gICAgaWYgKHRoaXMubm9IVE1MNVByZXZpZXcpIHtcbiAgICAgIHN1Yi5hZGQoY29ubi5jb25uZWN0RHJhZ1ByZXZpZXcoZ2V0RW1wdHlJbWFnZSgpKSk7XG4gICAgfVxuICAgIHJldHVybiBzdWI7XG4gIH1cblxufVxuXG4vKipcbiAqIEFsbG93cyB5b3UgdG8gc3BlY2lmeSB3aGljaCBlbGVtZW50IGEge0BsaW5rIERyYWdTb3VyY2V9IHNob3VsZCBzY3JlZW5zaG90IGFzIGFuIEhUTUw1IGRyYWcgcHJldmlldy5cbiAqXG4gKiBPbmx5IHJlbGV2YW50IHdoZW4gdXNpbmcgdGhlIEhUTUw1IGJhY2tlbmQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkcmFnUHJldmlld10nLFxuICBpbnB1dHM6IFsnZHJhZ1ByZXZpZXcnLCAnZHJhZ1ByZXZpZXdPcHRpb25zJ11cbn0pXG5leHBvcnQgY2xhc3MgRHJhZ1ByZXZpZXdEaXJlY3RpdmUgZXh0ZW5kcyBEbmREaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgY29ubmVjdGlvbjogRHJhZ1NvdXJjZTxhbnk+IHwgdW5kZWZpbmVkO1xuICAvKiogVGhlIGRyYWcgc291cmNlIGZvciB3aGljaCB0aGlzIGVsZW1lbnQgd2lsbCBiZSB0aGUgcHJldmlldy4gKi9cbiAgQElucHV0KCdkcmFnUHJldmlldycpIHB1YmxpYyBkcmFnUHJldmlldyE6IERyYWdTb3VyY2U8YW55PjtcbiAgLyoqIFBhc3MgYW4gb3B0aW9ucyBvYmplY3QgYXMgeW91IHdvdWxkIHRvIHtAbGluayBEcmFnU291cmNlI2Nvbm5lY3REcmFnUHJldmlld30uICovXG4gIEBJbnB1dCgnZHJhZ1ByZXZpZXdPcHRpb25zJykgZHJhZ1ByZXZpZXdPcHRpb25zPzogRHJhZ1ByZXZpZXdPcHRpb25zO1xuXG4gIHByb3RlY3RlZCBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24gPSB0aGlzLmRyYWdQcmV2aWV3O1xuICAgIHN1cGVyLm5nT25DaGFuZ2VzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FsbEhvb2tzKGNvbm46IERyYWdTb3VyY2U8YW55Pikge1xuICAgIHJldHVybiBjb25uLmNvbm5lY3REcmFnUHJldmlldyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZHJhZ1ByZXZpZXdPcHRpb25zKTtcbiAgfVxufVxuXG4vLyBpbXBvcnQgeyBnZXRFbXB0eUltYWdlIH0gZnJvbSAncmVhY3QtZG5kLWh0bWw1LWJhY2tlbmQnO1xuLy8gd2UgZG9uJ3Qgd2FudCB0byBkZXBlbmQgb24gdGhlIGJhY2tlbmQsIHNvIGhlcmUgdGhhdCBpcywgY29waWVkXG4vKiogQGlnbm9yZSAqL1xubGV0IGVtcHR5SW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4vKipcbiAqIFJldHVybnMgYSAweDAgZW1wdHkgR0lGIGZvciB1c2UgYXMgYSBkcmFnIHByZXZpZXcuXG4gKiBAaWdub3JlXG4gKiAqL1xuZnVuY3Rpb24gZ2V0RW1wdHlJbWFnZSgpIHtcbiAgaWYgKCFlbXB0eUltYWdlKSB7XG4gICAgZW1wdHlJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGVtcHR5SW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBQUFBQUNINUJBRUtBQUVBTEFBQUFBQUJBQUVBQUFJQ1RBRUFPdz09JztcbiAgfVxuICByZXR1cm4gZW1wdHlJbWFnZTtcbn1cblxuIl19