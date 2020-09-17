import { SkyhookDndService, Offset } from '@rednax/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * This is internal, you probably won't ever need to use it directly.
 *
 * For understanding's sake, it helps to know that this component
 * essentially just renders whatever is placed between its tags, but
 * in a `position: fixed` container that is translated according to
 * the drag in progress and how far it has travelled.
 *
 * It currently has a workaround for some Firefox versions where the
 * whole thing wouldn't re-render unless you animated the border.
 */
export declare class SkyhookPreviewRendererComponent {
    private skyhook;
    /** @ignore */
    private layer;
    /** @ignore */
    collect$: Observable<{
        initialOffset: Offset;
        currentOffset: Offset | null;
    }>;
    /** @ignore */
    style$: Observable<{
        display: string;
        transform?: undefined;
        WebkitTransform?: undefined;
    } | {
        transform: string;
        WebkitTransform: string;
        display?: undefined;
    }>;
    /** @ignore */
    constructor(skyhook: SkyhookDndService);
    /** @ignore */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<SkyhookPreviewRendererComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<SkyhookPreviewRendererComponent, "skyhook-preview-renderer", never, {}, {}, never, ["*"]>;
}
