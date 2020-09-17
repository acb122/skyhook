import areOptionsEqual from '../utils/areOptionsEqual';
var Reconnector = /** @class */ (function () {
    function Reconnector(backendConnector) {
        var _this = this;
        this.backendConnector = backendConnector;
        this.reconnect = function (parentHandlerId) {
            if (_this.disconnect) {
                _this.disconnect();
                _this.disconnect = null;
            }
            _this.handlerId = parentHandlerId;
            if (_this.handlerId && _this.node) {
                _this.disconnect = _this.backendConnector(_this.handlerId, _this.node, _this.options);
            }
        };
        this.hook = function (nativeElement, options) {
            if (nativeElement === _this.node &&
                areOptionsEqual(options, _this.options)) {
                return;
            }
            _this.node = nativeElement;
            _this.options = options;
            _this.reconnect(_this.handlerId);
        };
    }
    return Reconnector;
}());
export { Reconnector };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjb25uZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcmVkbmF4L2NvcmUvIiwic291cmNlcyI6WyJzcmMvbGliL2ludGVybmFsL1JlY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sZUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRXZEO0lBS0kscUJBQ1ksZ0JBQTBFO1FBRHRGLGlCQUVJO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwRDtRQUV0RixjQUFTLEdBQUcsVUFBQyxlQUFrQztZQUMzQyxJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDMUI7WUFDRCxLQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztZQUNqQyxJQUFJLEtBQUksQ0FBQyxTQUFTLElBQUksS0FBSSxDQUFDLElBQUksRUFBRTtnQkFDN0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwRjtRQUNMLENBQUMsQ0FBQTtRQUNELFNBQUksR0FBRyxVQUFDLGFBQW1CLEVBQUUsT0FBVztZQUNwQyxJQUFJLGFBQWEsS0FBSyxLQUFJLENBQUMsSUFBSTtnQkFDM0IsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU87YUFDVjtZQUVELEtBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBRXZCLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQTtJQXJCRSxDQUFDO0lBc0JSLGtCQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVuc3Vic2NyaWJlLCBJZGVudGlmaWVyIH0gZnJvbSAnZG5kLWNvcmUnO1xuaW1wb3J0IGFyZU9wdGlvbnNFcXVhbCBmcm9tICcuLi91dGlscy9hcmVPcHRpb25zRXF1YWwnO1xuXG5leHBvcnQgY2xhc3MgUmVjb25uZWN0b3I8TyA9IGFueT4ge1xuICAgIGhhbmRsZXJJZDogYW55O1xuICAgIG5vZGU/OiBOb2RlO1xuICAgIG9wdGlvbnM/OiBPO1xuICAgIGRpc2Nvbm5lY3Q/OiBVbnN1YnNjcmliZSB8IG51bGw7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYmFja2VuZENvbm5lY3RvcjogKGhhbmRsZXJJZDogYW55LCBub2RlOiBOb2RlLCBvcHRpb25zPzogTykgPT4gVW5zdWJzY3JpYmVcbiAgICApIHt9XG4gICAgcmVjb25uZWN0ID0gKHBhcmVudEhhbmRsZXJJZDogSWRlbnRpZmllciB8IG51bGwpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZGlzY29ubmVjdCkge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlcklkID0gcGFyZW50SGFuZGxlcklkO1xuICAgICAgICBpZiAodGhpcy5oYW5kbGVySWQgJiYgdGhpcy5ub2RlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QgPSB0aGlzLmJhY2tlbmRDb25uZWN0b3IodGhpcy5oYW5kbGVySWQsIHRoaXMubm9kZSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBob29rID0gKG5hdGl2ZUVsZW1lbnQ6IE5vZGUsIG9wdGlvbnM/OiBPKSA9PiB7XG4gICAgICAgIGlmIChuYXRpdmVFbGVtZW50ID09PSB0aGlzLm5vZGUgJiZcbiAgICAgICAgICAgIGFyZU9wdGlvbnNFcXVhbChvcHRpb25zLCB0aGlzLm9wdGlvbnMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vZGUgPSBuYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgICAgIHRoaXMucmVjb25uZWN0KHRoaXMuaGFuZGxlcklkKTtcbiAgICB9XG59XG4iXX0=