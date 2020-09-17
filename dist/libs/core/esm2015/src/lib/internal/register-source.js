export default function registerSource(type, source, manager) {
    const registry = manager.getRegistry();
    const sourceId = registry.addSource(type, source);
    function unregisterSource() {
        registry.removeSource(sourceId);
    }
    return {
        handlerId: sourceId,
        unregister: unregisterSource,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9jb3JlL3NyYy9saWIvaW50ZXJuYWwvcmVnaXN0ZXItc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUFDLElBQVMsRUFBRSxNQUFrQixFQUFFLE9BQXdCO0lBQzVGLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVsRCxTQUFTLGdCQUFnQjtRQUN2QixRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxPQUFPO1FBQ0wsU0FBUyxFQUFFLFFBQVE7UUFDbkIsVUFBVSxFQUFFLGdCQUFnQjtLQUM3QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdEcm9wTWFuYWdlciwgRHJhZ1NvdXJjZSB9IGZyb20gJ2RuZC1jb3JlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaXN0ZXJTb3VyY2UodHlwZTogYW55LCBzb3VyY2U6IERyYWdTb3VyY2UsIG1hbmFnZXI6IERyYWdEcm9wTWFuYWdlcikge1xuICBjb25zdCByZWdpc3RyeSA9IG1hbmFnZXIuZ2V0UmVnaXN0cnkoKTtcbiAgY29uc3Qgc291cmNlSWQgPSByZWdpc3RyeS5hZGRTb3VyY2UodHlwZSwgc291cmNlKTtcblxuICBmdW5jdGlvbiB1bnJlZ2lzdGVyU291cmNlKCkge1xuICAgIHJlZ2lzdHJ5LnJlbW92ZVNvdXJjZShzb3VyY2VJZCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhhbmRsZXJJZDogc291cmNlSWQsXG4gICAgdW5yZWdpc3RlcjogdW5yZWdpc3RlclNvdXJjZSxcbiAgfTtcbn1cbiJdfQ==