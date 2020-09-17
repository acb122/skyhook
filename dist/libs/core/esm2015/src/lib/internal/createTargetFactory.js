export class Target {
    constructor(spec, zone, monitor) {
        this.spec = spec;
        this.zone = zone;
        this.monitor = monitor;
        this.monitor = monitor;
    }
    withChangeDetection(fn) {
        let x = fn();
        this.zone.scheduleMicroTask('DropTarget', () => { });
        return x;
    }
    receiveMonitor(monitor) {
        this.monitor = monitor;
    }
    canDrop() {
        if (!this.spec.canDrop) {
            return true;
        }
        // don't run isDragging in the zone. Should be a pure function of `this`.
        return this.spec.canDrop(this.monitor);
    }
    hover() {
        if (!this.spec.hover) {
            return;
        }
        this.withChangeDetection(() => {
            this.spec.hover && this.spec.hover(this.monitor);
        });
    }
    drop() {
        if (!this.spec.drop) {
            return undefined;
        }
        return this.withChangeDetection(() => {
            const dropResult = this.spec.drop && this.spec.drop(this.monitor);
            return dropResult;
        });
    }
}
export function createTargetFactory(spec, zone) {
    return function createTarget(monitor) {
        return new Target(spec, zone, monitor);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlVGFyZ2V0RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvY29yZS9zcmMvbGliL2ludGVybmFsL2NyZWF0ZVRhcmdldEZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxPQUFPLE1BQU07SUFFZixZQUNZLElBQW9CLEVBQ3BCLElBQVUsRUFDVixPQUEwQjtRQUYxQixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNwQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFFbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELG1CQUFtQixDQUFJLEVBQVc7UUFDOUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxjQUFjLENBQUMsT0FBWTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQseUVBQXlFO1FBQ3pFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2xCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFFRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7WUFDakMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQW9CLEVBQUUsSUFBVTtJQUNoRSxPQUFPLFNBQVMsWUFBWSxDQUFDLE9BQVk7UUFDckMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcm9wVGFyZ2V0IH0gZnJvbSAnZG5kLWNvcmUnO1xuaW1wb3J0IHsgRHJvcFRhcmdldE1vbml0b3IgfSBmcm9tICcuLi90YXJnZXQtbW9uaXRvcic7XG5pbXBvcnQgeyBEcm9wVGFyZ2V0U3BlYyB9IGZyb20gJy4uL2Ryb3AtdGFyZ2V0LXNwZWNpZmljYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0IGltcGxlbWVudHMgRHJvcFRhcmdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzcGVjOiBEcm9wVGFyZ2V0U3BlYyxcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBab25lLFxuICAgICAgICBwcml2YXRlIG1vbml0b3I6IERyb3BUYXJnZXRNb25pdG9yXG4gICAgKSB7XG4gICAgICAgIHRoaXMubW9uaXRvciA9IG1vbml0b3I7XG4gICAgfVxuXG4gICAgd2l0aENoYW5nZURldGVjdGlvbjxUPihmbjogKCkgPT4gVCk6IFQge1xuICAgICAgICBsZXQgeCA9IGZuKCk7XG4gICAgICAgIHRoaXMuem9uZS5zY2hlZHVsZU1pY3JvVGFzaygnRHJvcFRhcmdldCcsICgpID0+IHsgfSk7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cblxuICAgIHJlY2VpdmVNb25pdG9yKG1vbml0b3I6IGFueSkge1xuICAgICAgICB0aGlzLm1vbml0b3IgPSBtb25pdG9yO1xuICAgIH1cblxuICAgIGNhbkRyb3AoKSB7XG4gICAgICAgIGlmICghdGhpcy5zcGVjLmNhbkRyb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9uJ3QgcnVuIGlzRHJhZ2dpbmcgaW4gdGhlIHpvbmUuIFNob3VsZCBiZSBhIHB1cmUgZnVuY3Rpb24gb2YgYHRoaXNgLlxuICAgICAgICByZXR1cm4gdGhpcy5zcGVjLmNhbkRyb3AodGhpcy5tb25pdG9yKTtcbiAgICB9XG5cbiAgICBob3ZlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNwZWMuaG92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpdGhDaGFuZ2VEZXRlY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zcGVjLmhvdmVyICYmIHRoaXMuc3BlYy5ob3Zlcih0aGlzLm1vbml0b3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcm9wKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3BlYy5kcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2l0aENoYW5nZURldGVjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkcm9wUmVzdWx0ID0gdGhpcy5zcGVjLmRyb3AgJiYgdGhpcy5zcGVjLmRyb3AodGhpcy5tb25pdG9yKTtcbiAgICAgICAgICAgIHJldHVybiBkcm9wUmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYXJnZXRGYWN0b3J5KHNwZWM6IERyb3BUYXJnZXRTcGVjLCB6b25lOiBab25lKTogYW55IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlVGFyZ2V0KG1vbml0b3I6IGFueSk6IERyb3BUYXJnZXQge1xuICAgICAgICByZXR1cm4gbmV3IFRhcmdldChzcGVjLCB6b25lLCBtb25pdG9yKTtcbiAgICB9O1xufVxuIl19