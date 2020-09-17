import { Subscriber } from 'rxjs';
/**
 * @ignore
 * This is an RxJS operator to schedule a microtask just after all
 * the synchronous subscribers have been processed.
 * It's useful because we use `microTasks !== 0` to determine when we are finished
 * processing all the listeners and are ready for Angular to perform change detection.
 */
export function scheduleMicroTaskAfter(zone, uTask) {
    return (source) => {
        return source.lift(new RunInZoneOperator(zone, uTask));
    };
}
/**
 * @ignore
 */
export class ZoneSubscriber extends Subscriber {
    constructor(destination, zone, uTask = (() => { })) {
        super(destination);
        this.zone = zone;
        this.uTask = uTask;
    }
    _next(val) {
        this.destination.next && this.destination.next(val);
        this.zone.scheduleMicroTask('ZoneSubscriber', this.uTask);
    }
}
/**
 * @ignore
 */
export class RunInZoneOperator {
    constructor(zone, uTask) {
        this.zone = zone;
        this.uTask = uTask;
    }
    call(subscriber, source) {
        return source.subscribe(new ZoneSubscriber(subscriber, this.zone, this.uTask));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVNaWNyb1Rhc2tBZnRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0ByZWRuYXgvY29yZS8iLCJzb3VyY2VzIjpbInNyYy9saWIvaW50ZXJuYWwvc2NoZWR1bGVNaWNyb1Rhc2tBZnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTZCLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUV2RTs7Ozs7O0dBTUc7QUFFSCxNQUFNLFVBQVUsc0JBQXNCLENBQUksSUFBVSxFQUFFLEtBQWtCO0lBQ3BFLE9BQU8sQ0FBQyxNQUFxQixFQUFpQixFQUFFO1FBQzVDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxjQUFrQixTQUFRLFVBQWE7SUFDaEQsWUFBWSxXQUEwQixFQUFVLElBQVUsRUFBVSxRQUFvQixDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUM5RixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFEeUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQXlCO0lBRWxHLENBQUM7SUFDUyxLQUFLLENBQUMsR0FBTTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0o7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFDMUIsWUFBb0IsSUFBVSxFQUFVLEtBQWtCO1FBQXRDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFhO0lBQUksQ0FBQztJQUMvRCxJQUFJLENBQUMsVUFBeUIsRUFBRSxNQUFXO1FBQ3ZDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBUZWFyZG93bkxvZ2ljLCBTdWJzY3JpYmVyLCBPcGVyYXRvciB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqIFRoaXMgaXMgYW4gUnhKUyBvcGVyYXRvciB0byBzY2hlZHVsZSBhIG1pY3JvdGFzayBqdXN0IGFmdGVyIGFsbFxuICogdGhlIHN5bmNocm9ub3VzIHN1YnNjcmliZXJzIGhhdmUgYmVlbiBwcm9jZXNzZWQuXG4gKiBJdCdzIHVzZWZ1bCBiZWNhdXNlIHdlIHVzZSBgbWljcm9UYXNrcyAhPT0gMGAgdG8gZGV0ZXJtaW5lIHdoZW4gd2UgYXJlIGZpbmlzaGVkXG4gKiBwcm9jZXNzaW5nIGFsbCB0aGUgbGlzdGVuZXJzIGFuZCBhcmUgcmVhZHkgZm9yIEFuZ3VsYXIgdG8gcGVyZm9ybSBjaGFuZ2UgZGV0ZWN0aW9uLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU1pY3JvVGFza0FmdGVyPFQ+KHpvbmU6IFpvbmUsIHVUYXNrPzogKCkgPT4gdm9pZCkge1xuICAgIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxUPiA9PiB7XG4gICAgICAgIHJldHVybiBzb3VyY2UubGlmdChuZXcgUnVuSW5ab25lT3BlcmF0b3Ioem9uZSwgdVRhc2spKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFpvbmVTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gICAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sIHByaXZhdGUgem9uZTogWm9uZSwgcHJpdmF0ZSB1VGFzazogKCkgPT4gdm9pZCA9ICgoKSA9PiB7fSkpIHtcbiAgICAgICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgX25leHQodmFsOiBUKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCAmJiB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsKTtcbiAgICAgICAgdGhpcy56b25lLnNjaGVkdWxlTWljcm9UYXNrKCdab25lU3Vic2NyaWJlcicsIHRoaXMudVRhc2spO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBSdW5JblpvbmVPcGVyYXRvcjxULCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFI+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IFpvbmUsIHByaXZhdGUgdVRhc2s/OiAoKSA9PiB2b2lkKSB7IH1cbiAgICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBab25lU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnpvbmUsIHRoaXMudVRhc2spKTtcbiAgICB9XG59XG4iXX0=