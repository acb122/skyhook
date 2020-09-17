/// <reference types="zone.js" />
import { Observable, TeardownLogic, Subscriber, Operator } from 'rxjs';
/**
 * @ignore
 * This is an RxJS operator to schedule a microtask just after all
 * the synchronous subscribers have been processed.
 * It's useful because we use `microTasks !== 0` to determine when we are finished
 * processing all the listeners and are ready for Angular to perform change detection.
 */
export declare function scheduleMicroTaskAfter<T>(zone: Zone, uTask?: () => void): (source: Observable<T>) => Observable<T>;
/**
 * @ignore
 */
export declare class ZoneSubscriber<T> extends Subscriber<T> {
    private zone;
    private uTask;
    constructor(destination: Subscriber<T>, zone: Zone, uTask?: () => void);
    protected _next(val: T): void;
}
/**
 * @ignore
 */
export declare class RunInZoneOperator<T, R> implements Operator<T, R> {
    private zone;
    private uTask?;
    constructor(zone: Zone, uTask?: (() => void) | undefined);
    call(subscriber: Subscriber<R>, source: any): TeardownLogic;
}
