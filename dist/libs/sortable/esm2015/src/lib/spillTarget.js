import { Subject } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
export const SPILLED_LIST_ID = Symbol('SPILLED_LIST_ID');
export function spillTarget(dnd, types, config) {
    const mutate = (item) => {
        if (!item)
            return null;
        item.hover = { listId: SPILLED_LIST_ID, index: -1 };
        return Object.assign({}, item);
    };
    const hover$ = new Subject();
    const target = dnd.dropTarget(types, {
        hover: (monitor) => {
            if (monitor.canDrop() && monitor.isOver({ shallow: true })) {
                const item = mutate(monitor.getItem());
                hover$.next(item);
            }
            else {
                hover$.next(null);
            }
        },
        drop: (config.drop &&
            ((monitor) => {
                const item = mutate(monitor.getItem());
                if (!monitor.didDrop()) {
                    config.drop && item && config.drop(item);
                }
            })) ||
            undefined,
    });
    const spilled$ = hover$.pipe(distinctUntilChanged(), filter((a) => !!a));
    const subs = spilled$.subscribe((item) => {
        config.hover && item && config.hover(item);
    });
    target.add(subs);
    return target;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpbGxUYXJnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvcnRhYmxlL3NyYy9saWIvc3BpbGxUYXJnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFXLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBT2pFLE1BQU0sVUFBVSxXQUFXLENBQ3ZCLEdBQXNCLEVBQ3RCLEtBQXNELEVBQ3RELE1BQWdDO0lBRWhDLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBOEIsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDcEQseUJBQVksSUFBSSxFQUFHO0lBQ3ZCLENBQUMsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxFQUE0QixDQUFDO0lBRXZELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQW9CLEtBQUssRUFBRTtRQUNwRCxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNmLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtnQkFDeEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JCO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7UUFDTCxDQUFDO1FBQ0QsSUFBSSxFQUNBLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDUixDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNwQixNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsU0FBUztLQUNoQixDQUFDLENBQUM7SUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUN4QixvQkFBb0IsRUFBRSxFQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDckIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2t5aG9va0RuZFNlcnZpY2UsIERyb3BUYXJnZXQgfSBmcm9tICdAcmVkbmF4L2NvcmUnO1xuaW1wb3J0IHsgRHJhZ2dlZEl0ZW0gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBTUElMTEVEX0xJU1RfSUQ6IHN5bWJvbCA9IFN5bWJvbCgnU1BJTExFRF9MSVNUX0lEJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BpbGxDb25maWd1cmF0aW9uPERhdGE+IHtcbiAgICBkcm9wPzogKGl0ZW06IERyYWdnZWRJdGVtPERhdGE+KSA9PiB2b2lkO1xuICAgIGhvdmVyPzogKGl0ZW06IERyYWdnZWRJdGVtPERhdGE+KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BpbGxUYXJnZXQ8RGF0YT4oXG4gICAgZG5kOiBTa3lob29rRG5kU2VydmljZSxcbiAgICB0eXBlczogc3RyaW5nIHwgc3ltYm9sIHwgQXJyYXk8c3RyaW5nIHwgc3ltYm9sPiB8IG51bGwsXG4gICAgY29uZmlnOiBTcGlsbENvbmZpZ3VyYXRpb248RGF0YT5cbik6IERyb3BUYXJnZXQ8RHJhZ2dlZEl0ZW08RGF0YT4+IHtcbiAgICBjb25zdCBtdXRhdGUgPSAoaXRlbTogRHJhZ2dlZEl0ZW08RGF0YT4gfCBudWxsKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGl0ZW0uaG92ZXIgPSB7IGxpc3RJZDogU1BJTExFRF9MSVNUX0lELCBpbmRleDogLTEgfTtcbiAgICAgICAgcmV0dXJuIHsgLi4uaXRlbSB9O1xuICAgIH07XG5cbiAgICBjb25zdCBob3ZlciQgPSBuZXcgU3ViamVjdDxEcmFnZ2VkSXRlbTxEYXRhPiB8IG51bGw+KCk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkbmQuZHJvcFRhcmdldDxEcmFnZ2VkSXRlbTxEYXRhPj4odHlwZXMsIHtcbiAgICAgICAgaG92ZXI6IChtb25pdG9yKSA9PiB7XG4gICAgICAgICAgICBpZiAobW9uaXRvci5jYW5Ecm9wKCkgJiYgbW9uaXRvci5pc092ZXIoeyBzaGFsbG93OiB0cnVlIH0pKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IG11dGF0ZShtb25pdG9yLmdldEl0ZW0oKSk7XG4gICAgICAgICAgICAgICAgaG92ZXIkLm5leHQoaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvdmVyJC5uZXh0KG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkcm9wOlxuICAgICAgICAgICAgKGNvbmZpZy5kcm9wICYmXG4gICAgICAgICAgICAgICAgKChtb25pdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBtdXRhdGUobW9uaXRvci5nZXRJdGVtKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbml0b3IuZGlkRHJvcCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuZHJvcCAmJiBpdGVtICYmIGNvbmZpZy5kcm9wKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpIHx8XG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzcGlsbGVkJCA9IGhvdmVyJC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBmaWx0ZXIoKGEpID0+ICEhYSlcbiAgICApO1xuXG4gICAgY29uc3Qgc3VicyA9IHNwaWxsZWQkLnN1YnNjcmliZSgoaXRlbSkgPT4ge1xuICAgICAgICBjb25maWcuaG92ZXIgJiYgaXRlbSAmJiBjb25maWcuaG92ZXIoaXRlbSk7XG4gICAgfSk7XG5cbiAgICB0YXJnZXQuYWRkKHN1YnMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG59XG4iXX0=