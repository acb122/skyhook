import { invariant } from './invariant';
let isCallingCanDrop = false;
class DropTargetMonitorClass {
    constructor(manager) {
        this.internalMonitor = manager.getMonitor();
    }
    receiveHandlerId(targetId) {
        this.targetId = targetId;
    }
    canDrop() {
        invariant(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' +
            'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html');
        try {
            isCallingCanDrop = true;
            return this.internalMonitor.canDropOnTarget(this.targetId);
        }
        finally {
            isCallingCanDrop = false;
        }
    }
    isOver(options = { shallow: false }) {
        return this.internalMonitor.isOverTarget(this.targetId, options);
    }
    getItemType() {
        return this.internalMonitor.getItemType();
    }
    getItem() {
        return this.internalMonitor.getItem();
    }
    getDropResult() {
        return this.internalMonitor.getDropResult();
    }
    didDrop() {
        return this.internalMonitor.didDrop();
    }
    getInitialClientOffset() {
        return this.internalMonitor.getInitialClientOffset();
    }
    getInitialSourceClientOffset() {
        return this.internalMonitor.getInitialSourceClientOffset();
    }
    getSourceClientOffset() {
        return this.internalMonitor.getSourceClientOffset();
    }
    getClientOffset() {
        return this.internalMonitor.getClientOffset();
    }
    getDifferenceFromInitialOffset() {
        return this.internalMonitor.getDifferenceFromInitialOffset();
    }
}
export function createTargetMonitor(manager) {
    return new DropTargetMonitorClass(manager);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlVGFyZ2V0TW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0ByZWRuYXgvY29yZS8iLCJzb3VyY2VzIjpbInNyYy9saWIvaW50ZXJuYWwvY3JlYXRlVGFyZ2V0TW9uaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSXhDLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBRTdCLE1BQU0sc0JBQXNCO0lBSXhCLFlBQVksT0FBWTtRQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBZ0M7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELE9BQU87UUFDSCxTQUFTLENBQ0wsQ0FBQyxnQkFBZ0IsRUFDakIsMkVBQTJFO1lBQzNFLCtFQUErRSxDQUNsRixDQUFDO1FBRUYsSUFBSTtZQUNBLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5RDtnQkFBUztZQUNOLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELHNCQUFzQjtRQUNsQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0lBRUQsNEJBQTRCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELGVBQWU7UUFDWCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELDhCQUE4QjtRQUMxQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsOEJBQThCLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsT0FBWTtJQUM1QyxPQUFPLElBQUksc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGludmFyaWFudCB9IGZyb20gJy4vaW52YXJpYW50JztcbmltcG9ydCB7IERyYWdEcm9wTW9uaXRvciwgSWRlbnRpZmllciB9IGZyb20gJ2RuZC1jb3JlJztcbmltcG9ydCB7IERyb3BUYXJnZXRNb25pdG9yIH0gZnJvbSAnLi4vdGFyZ2V0LW1vbml0b3InO1xuXG5sZXQgaXNDYWxsaW5nQ2FuRHJvcCA9IGZhbHNlO1xuXG5jbGFzcyBEcm9wVGFyZ2V0TW9uaXRvckNsYXNzIGltcGxlbWVudHMgRHJvcFRhcmdldE1vbml0b3Ige1xuICAgIGludGVybmFsTW9uaXRvcjogRHJhZ0Ryb3BNb25pdG9yO1xuICAgIHRhcmdldElkOiBJZGVudGlmaWVyIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IobWFuYWdlcjogYW55KSB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxNb25pdG9yID0gbWFuYWdlci5nZXRNb25pdG9yKCk7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUhhbmRsZXJJZCh0YXJnZXRJZDogSWRlbnRpZmllciB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnRhcmdldElkID0gdGFyZ2V0SWQ7XG4gICAgfVxuXG4gICAgY2FuRHJvcCgpOiBib29sZWFuIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgIWlzQ2FsbGluZ0NhbkRyb3AsXG4gICAgICAgICAgICAnWW91IG1heSBub3QgY2FsbCBtb25pdG9yLmNhbkRyb3AoKSBpbnNpZGUgeW91ciBjYW5Ecm9wKCkgaW1wbGVtZW50YXRpb24uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZTogaHR0cDovL3JlYWN0LWRuZC5naXRodWIuaW8vcmVhY3QtZG5kL2RvY3MtZHJvcC10YXJnZXQtbW9uaXRvci5odG1sJyxcbiAgICAgICAgKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaXNDYWxsaW5nQ2FuRHJvcCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbE1vbml0b3IuY2FuRHJvcE9uVGFyZ2V0KHRoaXMudGFyZ2V0SWQpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaXNDYWxsaW5nQ2FuRHJvcCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNPdmVyKG9wdGlvbnMgPSB7IHNoYWxsb3c6IGZhbHNlIH0pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmlzT3ZlclRhcmdldCh0aGlzLnRhcmdldElkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmdldEl0ZW1UeXBlKCk7XG4gICAgfVxuXG4gICAgZ2V0SXRlbSgpOiB7fSAmIGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsTW9uaXRvci5nZXRJdGVtKCk7XG4gICAgfVxuXG4gICAgZ2V0RHJvcFJlc3VsdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmdldERyb3BSZXN1bHQoKTtcbiAgICB9XG5cbiAgICBkaWREcm9wKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbE1vbml0b3IuZGlkRHJvcCgpO1xuICAgIH1cblxuICAgIGdldEluaXRpYWxDbGllbnRPZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsTW9uaXRvci5nZXRJbml0aWFsQ2xpZW50T2Zmc2V0KCk7XG4gICAgfVxuXG4gICAgZ2V0SW5pdGlhbFNvdXJjZUNsaWVudE9mZnNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxNb25pdG9yLmdldEluaXRpYWxTb3VyY2VDbGllbnRPZmZzZXQoKTtcbiAgICB9XG5cbiAgICBnZXRTb3VyY2VDbGllbnRPZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsTW9uaXRvci5nZXRTb3VyY2VDbGllbnRPZmZzZXQoKTtcbiAgICB9XG5cbiAgICBnZXRDbGllbnRPZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsTW9uaXRvci5nZXRDbGllbnRPZmZzZXQoKTtcbiAgICB9XG5cbiAgICBnZXREaWZmZXJlbmNlRnJvbUluaXRpYWxPZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsTW9uaXRvci5nZXREaWZmZXJlbmNlRnJvbUluaXRpYWxPZmZzZXQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYXJnZXRNb25pdG9yKG1hbmFnZXI6IGFueSk6IERyb3BUYXJnZXRNb25pdG9yIHtcbiAgICByZXR1cm4gbmV3IERyb3BUYXJnZXRNb25pdG9yQ2xhc3MobWFuYWdlcik7XG59XG4iXX0=