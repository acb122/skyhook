var Target = /** @class */ (function () {
    function Target(spec, zone, monitor) {
        this.spec = spec;
        this.zone = zone;
        this.monitor = monitor;
        this.monitor = monitor;
    }
    Target.prototype.withChangeDetection = function (fn) {
        var x = fn();
        this.zone.scheduleMicroTask('DropTarget', function () { });
        return x;
    };
    Target.prototype.receiveMonitor = function (monitor) {
        this.monitor = monitor;
    };
    Target.prototype.canDrop = function () {
        if (!this.spec.canDrop) {
            return true;
        }
        // don't run isDragging in the zone. Should be a pure function of `this`.
        return this.spec.canDrop(this.monitor);
    };
    Target.prototype.hover = function () {
        var _this = this;
        if (!this.spec.hover) {
            return;
        }
        this.withChangeDetection(function () {
            _this.spec.hover && _this.spec.hover(_this.monitor);
        });
    };
    Target.prototype.drop = function () {
        var _this = this;
        if (!this.spec.drop) {
            return undefined;
        }
        return this.withChangeDetection(function () {
            var dropResult = _this.spec.drop && _this.spec.drop(_this.monitor);
            return dropResult;
        });
    };
    return Target;
}());
export { Target };
export function createTargetFactory(spec, zone) {
    return function createTarget(monitor) {
        return new Target(spec, zone, monitor);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlVGFyZ2V0RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0ByZWRuYXgvY29yZS8iLCJzb3VyY2VzIjpbInNyYy9saWIvaW50ZXJuYWwvY3JlYXRlVGFyZ2V0RmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtJQUVJLGdCQUNZLElBQW9CLEVBQ3BCLElBQVUsRUFDVixPQUEwQjtRQUYxQixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNwQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFFbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELG9DQUFtQixHQUFuQixVQUF1QixFQUFXO1FBQzlCLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsY0FBUSxDQUFDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCwrQkFBYyxHQUFkLFVBQWUsT0FBWTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQseUVBQXlFO1FBQ3pFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQ3JCLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxQkFBSSxHQUFKO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFFRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUM1QixJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEUsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsYUFBQztBQUFELENBQUMsQUFoREQsSUFnREM7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQW9CLEVBQUUsSUFBVTtJQUNoRSxPQUFPLFNBQVMsWUFBWSxDQUFDLE9BQVk7UUFDckMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcm9wVGFyZ2V0IH0gZnJvbSAnZG5kLWNvcmUnO1xuaW1wb3J0IHsgRHJvcFRhcmdldE1vbml0b3IgfSBmcm9tICcuLi90YXJnZXQtbW9uaXRvcic7XG5pbXBvcnQgeyBEcm9wVGFyZ2V0U3BlYyB9IGZyb20gJy4uL2Ryb3AtdGFyZ2V0LXNwZWNpZmljYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgVGFyZ2V0IGltcGxlbWVudHMgRHJvcFRhcmdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzcGVjOiBEcm9wVGFyZ2V0U3BlYyxcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBab25lLFxuICAgICAgICBwcml2YXRlIG1vbml0b3I6IERyb3BUYXJnZXRNb25pdG9yXG4gICAgKSB7XG4gICAgICAgIHRoaXMubW9uaXRvciA9IG1vbml0b3I7XG4gICAgfVxuXG4gICAgd2l0aENoYW5nZURldGVjdGlvbjxUPihmbjogKCkgPT4gVCk6IFQge1xuICAgICAgICBsZXQgeCA9IGZuKCk7XG4gICAgICAgIHRoaXMuem9uZS5zY2hlZHVsZU1pY3JvVGFzaygnRHJvcFRhcmdldCcsICgpID0+IHsgfSk7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cblxuICAgIHJlY2VpdmVNb25pdG9yKG1vbml0b3I6IGFueSkge1xuICAgICAgICB0aGlzLm1vbml0b3IgPSBtb25pdG9yO1xuICAgIH1cblxuICAgIGNhbkRyb3AoKSB7XG4gICAgICAgIGlmICghdGhpcy5zcGVjLmNhbkRyb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9uJ3QgcnVuIGlzRHJhZ2dpbmcgaW4gdGhlIHpvbmUuIFNob3VsZCBiZSBhIHB1cmUgZnVuY3Rpb24gb2YgYHRoaXNgLlxuICAgICAgICByZXR1cm4gdGhpcy5zcGVjLmNhbkRyb3AodGhpcy5tb25pdG9yKTtcbiAgICB9XG5cbiAgICBob3ZlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNwZWMuaG92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpdGhDaGFuZ2VEZXRlY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zcGVjLmhvdmVyICYmIHRoaXMuc3BlYy5ob3Zlcih0aGlzLm1vbml0b3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcm9wKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3BlYy5kcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2l0aENoYW5nZURldGVjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkcm9wUmVzdWx0ID0gdGhpcy5zcGVjLmRyb3AgJiYgdGhpcy5zcGVjLmRyb3AodGhpcy5tb25pdG9yKTtcbiAgICAgICAgICAgIHJldHVybiBkcm9wUmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYXJnZXRGYWN0b3J5KHNwZWM6IERyb3BUYXJnZXRTcGVjLCB6b25lOiBab25lKTogYW55IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlVGFyZ2V0KG1vbml0b3I6IGFueSk6IERyb3BUYXJnZXQge1xuICAgICAgICByZXR1cm4gbmV3IFRhcmdldChzcGVjLCB6b25lLCBtb25pdG9yKTtcbiAgICB9O1xufVxuIl19