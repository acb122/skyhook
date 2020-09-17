var Source = /** @class */ (function () {
    function Source(spec, zone, monitor) {
        this.spec = spec;
        this.zone = zone;
        this.monitor = monitor;
    }
    Source.prototype.withChangeDetection = function (fn) {
        var x = fn();
        this.zone.scheduleMicroTask('DragSource', function () { });
        return x;
    };
    Source.prototype.canDrag = function () {
        var _this = this;
        if (!this.spec.canDrag) {
            return true;
        }
        return this.withChangeDetection(function () {
            return _this.spec.canDrag && _this.spec.canDrag(_this.monitor) || false;
        });
    };
    Source.prototype.isDragging = function (globalMonitor, sourceId) {
        if (!this.spec.isDragging) {
            return sourceId === globalMonitor.getSourceId();
        }
        return this.spec.isDragging(this.monitor);
    };
    Source.prototype.beginDrag = function () {
        var _this = this;
        return this.withChangeDetection(function () {
            return _this.spec.beginDrag(_this.monitor);
        });
    };
    Source.prototype.endDrag = function () {
        var _this = this;
        if (!this.spec.endDrag) {
            return;
        }
        return this.withChangeDetection(function () {
            if (_this.spec.endDrag) {
                _this.spec.endDrag(_this.monitor);
            }
        });
    };
    return Source;
}());
export { Source };
export function createSourceFactory(spec, zone) {
    return function createSource(monitor) {
        return new Source(spec, zone, monitor);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlU291cmNlRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0ByZWRuYXgvY29yZS8iLCJzb3VyY2VzIjpbInNyYy9saWIvaW50ZXJuYWwvY3JlYXRlU291cmNlRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTtJQUNJLGdCQUNZLElBQXlCLEVBQ3pCLElBQVUsRUFDVixPQUFvQztRQUZwQyxTQUFJLEdBQUosSUFBSSxDQUFxQjtRQUN6QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBNkI7SUFFaEQsQ0FBQztJQUVELG9DQUFtQixHQUFuQixVQUF1QixFQUFXO1FBQzlCLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsY0FBUSxDQUFDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCx3QkFBTyxHQUFQO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQzVCLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQkFBVSxHQUFWLFVBQVcsYUFBa0IsRUFBRSxRQUFhO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2QixPQUFPLFFBQVEsS0FBSyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkQ7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUFBLGlCQUlDO1FBSEcsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFDNUIsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQzVCLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBakRELElBaURDOztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUF5QixFQUFFLElBQVU7SUFDckUsT0FBTyxTQUFTLFlBQVksQ0FBQyxPQUEwQjtRQUNuRCxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdTb3VyY2UgfSBmcm9tICdkbmQtY29yZSc7XG5pbXBvcnQgeyBEcmFnU291cmNlU3BlYyB9IGZyb20gJy4uL2RyYWctc291cmNlLXNwZWNpZmljYXRpb24nO1xuaW1wb3J0IHsgRHJhZ1NvdXJjZU1vbml0b3IgfSBmcm9tICcuLi9zb3VyY2UtbW9uaXRvcic7XG5cbmV4cG9ydCBjbGFzcyBTb3VyY2UgaW1wbGVtZW50cyBEcmFnU291cmNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzcGVjOiBEcmFnU291cmNlU3BlYzxhbnk+LFxuICAgICAgICBwcml2YXRlIHpvbmU6IFpvbmUsXG4gICAgICAgIHByaXZhdGUgbW9uaXRvcjogRHJhZ1NvdXJjZU1vbml0b3I8YW55LCBhbnk+LFxuICAgICkge1xuICAgIH1cblxuICAgIHdpdGhDaGFuZ2VEZXRlY3Rpb248VD4oZm46ICgpID0+IFQpOiBUIHtcbiAgICAgICAgbGV0IHggPSBmbigpXG4gICAgICAgIHRoaXMuem9uZS5zY2hlZHVsZU1pY3JvVGFzaygnRHJhZ1NvdXJjZScsICgpID0+IHsgfSk7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cblxuICAgIGNhbkRyYWcoKSB7XG4gICAgICAgIGlmICghdGhpcy5zcGVjLmNhbkRyYWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2l0aENoYW5nZURldGVjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcGVjLmNhbkRyYWcgJiYgdGhpcy5zcGVjLmNhbkRyYWcodGhpcy5tb25pdG9yKSB8fCBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNEcmFnZ2luZyhnbG9iYWxNb25pdG9yOiBhbnksIHNvdXJjZUlkOiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNwZWMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZUlkID09PSBnbG9iYWxNb25pdG9yLmdldFNvdXJjZUlkKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zcGVjLmlzRHJhZ2dpbmcodGhpcy5tb25pdG9yKTtcbiAgICB9XG5cbiAgICBiZWdpbkRyYWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpdGhDaGFuZ2VEZXRlY3Rpb24oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BlYy5iZWdpbkRyYWcodGhpcy5tb25pdG9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5kRHJhZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNwZWMuZW5kRHJhZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud2l0aENoYW5nZURldGVjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zcGVjLmVuZERyYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWMuZW5kRHJhZyh0aGlzLm1vbml0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb3VyY2VGYWN0b3J5KHNwZWM6IERyYWdTb3VyY2VTcGVjPGFueT4sIHpvbmU6IFpvbmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlU291cmNlKG1vbml0b3I6IERyYWdTb3VyY2VNb25pdG9yKTogRHJhZ1NvdXJjZSB7XG4gICAgICAgIHJldHVybiBuZXcgU291cmNlKHNwZWMsIHpvbmUsIG1vbml0b3IpO1xuICAgIH1cbn1cbiJdfQ==