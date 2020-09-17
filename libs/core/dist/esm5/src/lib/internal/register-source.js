export default function registerSource(type, source, manager) {
    var registry = manager.getRegistry();
    var sourceId = registry.addSource(type, source);
    function unregisterSource() {
        registry.removeSource(sourceId);
    }
    return {
        handlerId: sourceId,
        unregister: unregisterSource,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJlZG5heC9jb3JlLyIsInNvdXJjZXMiOlsic3JjL2xpYi9pbnRlcm5hbC9yZWdpc3Rlci1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsSUFBUyxFQUFFLE1BQWtCLEVBQUUsT0FBd0I7SUFDNUYsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRWxELFNBQVMsZ0JBQWdCO1FBQ3ZCLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELE9BQU87UUFDTCxTQUFTLEVBQUUsUUFBUTtRQUNuQixVQUFVLEVBQUUsZ0JBQWdCO0tBQzdCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhZ0Ryb3BNYW5hZ2VyLCBEcmFnU291cmNlIH0gZnJvbSAnZG5kLWNvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlclNvdXJjZSh0eXBlOiBhbnksIHNvdXJjZTogRHJhZ1NvdXJjZSwgbWFuYWdlcjogRHJhZ0Ryb3BNYW5hZ2VyKSB7XG4gIGNvbnN0IHJlZ2lzdHJ5ID0gbWFuYWdlci5nZXRSZWdpc3RyeSgpO1xuICBjb25zdCBzb3VyY2VJZCA9IHJlZ2lzdHJ5LmFkZFNvdXJjZSh0eXBlLCBzb3VyY2UpO1xuXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJTb3VyY2UoKSB7XG4gICAgcmVnaXN0cnkucmVtb3ZlU291cmNlKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlcklkOiBzb3VyY2VJZCxcbiAgICB1bnJlZ2lzdGVyOiB1bnJlZ2lzdGVyU291cmNlLFxuICB9O1xufVxuIl19