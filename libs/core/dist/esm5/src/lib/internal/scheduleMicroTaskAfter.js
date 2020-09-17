import { __extends } from "tslib";
import { Subscriber } from 'rxjs';
/**
 * @ignore
 * This is an RxJS operator to schedule a microtask just after all
 * the synchronous subscribers have been processed.
 * It's useful because we use `microTasks !== 0` to determine when we are finished
 * processing all the listeners and are ready for Angular to perform change detection.
 */
export function scheduleMicroTaskAfter(zone, uTask) {
    return function (source) {
        return source.lift(new RunInZoneOperator(zone, uTask));
    };
}
/**
 * @ignore
 */
var ZoneSubscriber = /** @class */ (function (_super) {
    __extends(ZoneSubscriber, _super);
    function ZoneSubscriber(destination, zone, uTask) {
        if (uTask === void 0) { uTask = (function () { }); }
        var _this = _super.call(this, destination) || this;
        _this.zone = zone;
        _this.uTask = uTask;
        return _this;
    }
    ZoneSubscriber.prototype._next = function (val) {
        this.destination.next && this.destination.next(val);
        this.zone.scheduleMicroTask('ZoneSubscriber', this.uTask);
    };
    return ZoneSubscriber;
}(Subscriber));
export { ZoneSubscriber };
/**
 * @ignore
 */
var RunInZoneOperator = /** @class */ (function () {
    function RunInZoneOperator(zone, uTask) {
        this.zone = zone;
        this.uTask = uTask;
    }
    RunInZoneOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ZoneSubscriber(subscriber, this.zone, this.uTask));
    };
    return RunInZoneOperator;
}());
export { RunInZoneOperator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVNaWNyb1Rhc2tBZnRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0ByZWRuYXgvY29yZS8iLCJzb3VyY2VzIjpbInNyYy9saWIvaW50ZXJuYWwvc2NoZWR1bGVNaWNyb1Rhc2tBZnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUE2QixVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFdkU7Ozs7OztHQU1HO0FBRUgsTUFBTSxVQUFVLHNCQUFzQixDQUFJLElBQVUsRUFBRSxLQUFrQjtJQUNwRSxPQUFPLFVBQUMsTUFBcUI7UUFDekIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVEOztHQUVHO0FBQ0g7SUFBdUMsa0NBQWE7SUFDaEQsd0JBQVksV0FBMEIsRUFBVSxJQUFVLEVBQVUsS0FBOEI7UUFBOUIsc0JBQUEsRUFBQSxTQUFxQixjQUFPLENBQUMsQ0FBQztRQUFsRyxZQUNJLGtCQUFNLFdBQVcsQ0FBQyxTQUNyQjtRQUYrQyxVQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBSyxHQUFMLEtBQUssQ0FBeUI7O0lBRWxHLENBQUM7SUFDUyw4QkFBSyxHQUFmLFVBQWdCLEdBQU07UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQVJELENBQXVDLFVBQVUsR0FRaEQ7O0FBRUQ7O0dBRUc7QUFDSDtJQUNJLDJCQUFvQixJQUFVLEVBQVUsS0FBa0I7UUFBdEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWE7SUFBSSxDQUFDO0lBQy9ELGdDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDdkMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFMRCxJQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgVGVhcmRvd25Mb2dpYywgU3Vic2NyaWJlciwgT3BlcmF0b3IgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBAaWdub3JlXG4gKiBUaGlzIGlzIGFuIFJ4SlMgb3BlcmF0b3IgdG8gc2NoZWR1bGUgYSBtaWNyb3Rhc2sganVzdCBhZnRlciBhbGxcbiAqIHRoZSBzeW5jaHJvbm91cyBzdWJzY3JpYmVycyBoYXZlIGJlZW4gcHJvY2Vzc2VkLlxuICogSXQncyB1c2VmdWwgYmVjYXVzZSB3ZSB1c2UgYG1pY3JvVGFza3MgIT09IDBgIHRvIGRldGVybWluZSB3aGVuIHdlIGFyZSBmaW5pc2hlZFxuICogcHJvY2Vzc2luZyBhbGwgdGhlIGxpc3RlbmVycyBhbmQgYXJlIHJlYWR5IGZvciBBbmd1bGFyIHRvIHBlcmZvcm0gY2hhbmdlIGRldGVjdGlvbi5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVNaWNyb1Rhc2tBZnRlcjxUPih6b25lOiBab25lLCB1VGFzaz86ICgpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VD4gPT4ge1xuICAgICAgICByZXR1cm4gc291cmNlLmxpZnQobmV3IFJ1bkluWm9uZU9wZXJhdG9yKHpvbmUsIHVUYXNrKSk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBab25lU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LCBwcml2YXRlIHpvbmU6IFpvbmUsIHByaXZhdGUgdVRhc2s6ICgpID0+IHZvaWQgPSAoKCkgPT4ge30pKSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIF9uZXh0KHZhbDogVCkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQgJiYgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbCk7XG4gICAgICAgIHRoaXMuem9uZS5zY2hlZHVsZU1pY3JvVGFzaygnWm9uZVN1YnNjcmliZXInLCB0aGlzLnVUYXNrKTtcbiAgICB9XG59XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY2xhc3MgUnVuSW5ab25lT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBab25lLCBwcml2YXRlIHVUYXNrPzogKCkgPT4gdm9pZCkgeyB9XG4gICAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFI+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgWm9uZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy56b25lLCB0aGlzLnVUYXNrKSk7XG4gICAgfVxufVxuIl19