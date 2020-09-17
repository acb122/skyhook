import { invariant } from './invariant';
var isCallingCanDrag = false;
var isCallingIsDragging = false;
var DragSourceMonitorClass = /** @class */ (function () {
    function DragSourceMonitorClass(manager) {
        this.internalMonitor = manager.getMonitor();
    }
    DragSourceMonitorClass.prototype.receiveHandlerId = function (sourceId) {
        this.sourceId = sourceId;
    };
    DragSourceMonitorClass.prototype.canDrag = function () {
        invariant(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');
        try {
            isCallingCanDrag = true;
            return this.internalMonitor.canDragSource(this.sourceId);
        }
        finally {
            isCallingCanDrag = false;
        }
    };
    DragSourceMonitorClass.prototype.isDragging = function () {
        invariant(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');
        try {
            isCallingIsDragging = true;
            return this.internalMonitor.isDraggingSource(this.sourceId);
        }
        finally {
            isCallingIsDragging = false;
        }
    };
    DragSourceMonitorClass.prototype.getItemType = function () {
        return this.internalMonitor.getItemType();
    };
    DragSourceMonitorClass.prototype.getItem = function () {
        return this.internalMonitor.getItem();
    };
    DragSourceMonitorClass.prototype.getDropResult = function () {
        return this.internalMonitor.getDropResult();
    };
    DragSourceMonitorClass.prototype.didDrop = function () {
        return this.internalMonitor.didDrop();
    };
    DragSourceMonitorClass.prototype.getInitialClientOffset = function () {
        return this.internalMonitor.getInitialClientOffset();
    };
    DragSourceMonitorClass.prototype.getInitialSourceClientOffset = function () {
        return this.internalMonitor.getInitialSourceClientOffset();
    };
    DragSourceMonitorClass.prototype.getSourceClientOffset = function () {
        return this.internalMonitor.getSourceClientOffset();
    };
    DragSourceMonitorClass.prototype.getClientOffset = function () {
        return this.internalMonitor.getClientOffset();
    };
    DragSourceMonitorClass.prototype.getDifferenceFromInitialOffset = function () {
        return this.internalMonitor.getDifferenceFromInitialOffset();
    };
    return DragSourceMonitorClass;
}());
export function createSourceMonitor(manager) {
    return new DragSourceMonitorClass(manager);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlU291cmNlTW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0ByZWRuYXgvY29yZS8iLCJzb3VyY2VzIjpbInNyYy9saWIvaW50ZXJuYWwvY3JlYXRlU291cmNlTW9uaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBQzdCLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0FBR2hDO0lBSUksZ0NBQVksT0FBWTtRQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsaURBQWdCLEdBQWhCLFVBQWlCLFFBQWdDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRCx3Q0FBTyxHQUFQO1FBQ0ksU0FBUyxDQUNMLENBQUMsZ0JBQWdCLEVBQ2pCLDJFQUEyRTtZQUMzRSwrRUFBK0UsQ0FDbEYsQ0FBQztRQUVGLElBQUk7WUFDQSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUQ7Z0JBQVM7WUFDTixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsMkNBQVUsR0FBVjtRQUNJLFNBQVMsQ0FDTCxDQUFDLG1CQUFtQixFQUNwQixpRkFBaUY7WUFDakYsK0VBQStFLENBQ2xGLENBQUM7UUFFRixJQUFJO1lBQ0EsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0Q7Z0JBQVM7WUFDTixtQkFBbUIsR0FBRyxLQUFLLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsd0NBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsOENBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsd0NBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsdURBQXNCLEdBQXRCO1FBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVELDZEQUE0QixHQUE1QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCxzREFBcUIsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsZ0RBQWUsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsK0RBQThCLEdBQTlCO1FBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLDhCQUE4QixFQUFFLENBQUM7SUFDakUsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQTdFRCxJQTZFQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxPQUFZO0lBQzVDLE9BQU8sSUFBSSxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhZ0Ryb3BNb25pdG9yLCBJZGVudGlmaWVyIH0gZnJvbSAnZG5kLWNvcmUnO1xuaW1wb3J0IHsgRHJhZ1NvdXJjZU1vbml0b3IgfSBmcm9tICcuLi9zb3VyY2UtbW9uaXRvcic7XG5pbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tICcuL2ludmFyaWFudCc7XG5cbmxldCBpc0NhbGxpbmdDYW5EcmFnID0gZmFsc2U7XG5sZXQgaXNDYWxsaW5nSXNEcmFnZ2luZyA9IGZhbHNlO1xuXG5cbmNsYXNzIERyYWdTb3VyY2VNb25pdG9yQ2xhc3MgaW1wbGVtZW50cyBEcmFnU291cmNlTW9uaXRvciB7XG4gICAgaW50ZXJuYWxNb25pdG9yOiBEcmFnRHJvcE1vbml0b3I7XG4gICAgc291cmNlSWQ6IElkZW50aWZpZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihtYW5hZ2VyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pbnRlcm5hbE1vbml0b3IgPSBtYW5hZ2VyLmdldE1vbml0b3IoKTtcbiAgICB9XG5cbiAgICByZWNlaXZlSGFuZGxlcklkKHNvdXJjZUlkOiBJZGVudGlmaWVyIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc291cmNlSWQgPSBzb3VyY2VJZDtcbiAgICB9XG5cbiAgICBjYW5EcmFnKCkge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICAhaXNDYWxsaW5nQ2FuRHJhZyxcbiAgICAgICAgICAgICdZb3UgbWF5IG5vdCBjYWxsIG1vbml0b3IuY2FuRHJhZygpIGluc2lkZSB5b3VyIGNhbkRyYWcoKSBpbXBsZW1lbnRhdGlvbi4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlOiBodHRwOi8vcmVhY3QtZG5kLmdpdGh1Yi5pby9yZWFjdC1kbmQvZG9jcy1kcmFnLXNvdXJjZS1tb25pdG9yLmh0bWwnLFxuICAgICAgICApO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpc0NhbGxpbmdDYW5EcmFnID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmludGVybmFsTW9uaXRvci5jYW5EcmFnU291cmNlKHRoaXMuc291cmNlSWQpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaXNDYWxsaW5nQ2FuRHJhZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNEcmFnZ2luZygpIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgIWlzQ2FsbGluZ0lzRHJhZ2dpbmcsXG4gICAgICAgICAgICAnWW91IG1heSBub3QgY2FsbCBtb25pdG9yLmlzRHJhZ2dpbmcoKSBpbnNpZGUgeW91ciBpc0RyYWdnaW5nKCkgaW1wbGVtZW50YXRpb24uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZTogaHR0cDovL3JlYWN0LWRuZC5naXRodWIuaW8vcmVhY3QtZG5kL2RvY3MtZHJhZy1zb3VyY2UtbW9uaXRvci5odG1sJyxcbiAgICAgICAgKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaXNDYWxsaW5nSXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbE1vbml0b3IuaXNEcmFnZ2luZ1NvdXJjZSh0aGlzLnNvdXJjZUlkKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlzQ2FsbGluZ0lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEl0ZW1UeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbE1vbml0b3IuZ2V0SXRlbVR5cGUoKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtKCk6IHt9ICYgYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmdldEl0ZW0oKTtcbiAgICB9XG5cbiAgICBnZXREcm9wUmVzdWx0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbE1vbml0b3IuZ2V0RHJvcFJlc3VsdCgpO1xuICAgIH1cblxuICAgIGRpZERyb3AoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsTW9uaXRvci5kaWREcm9wKCk7XG4gICAgfVxuXG4gICAgZ2V0SW5pdGlhbENsaWVudE9mZnNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmdldEluaXRpYWxDbGllbnRPZmZzZXQoKTtcbiAgICB9XG5cbiAgICBnZXRJbml0aWFsU291cmNlQ2xpZW50T2Zmc2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbE1vbml0b3IuZ2V0SW5pdGlhbFNvdXJjZUNsaWVudE9mZnNldCgpO1xuICAgIH1cblxuICAgIGdldFNvdXJjZUNsaWVudE9mZnNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmdldFNvdXJjZUNsaWVudE9mZnNldCgpO1xuICAgIH1cblxuICAgIGdldENsaWVudE9mZnNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmdldENsaWVudE9mZnNldCgpO1xuICAgIH1cblxuICAgIGdldERpZmZlcmVuY2VGcm9tSW5pdGlhbE9mZnNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmdldERpZmZlcmVuY2VGcm9tSW5pdGlhbE9mZnNldCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNvdXJjZU1vbml0b3IobWFuYWdlcjogYW55KTogRHJhZ1NvdXJjZU1vbml0b3Ige1xuICAgIHJldHVybiBuZXcgRHJhZ1NvdXJjZU1vbml0b3JDbGFzcyhtYW5hZ2VyKTtcbn1cbiJdfQ==