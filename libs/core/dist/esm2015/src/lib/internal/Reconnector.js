import areOptionsEqual from '../utils/areOptionsEqual';
export class Reconnector {
    constructor(backendConnector) {
        this.backendConnector = backendConnector;
        this.reconnect = (parentHandlerId) => {
            if (this.disconnect) {
                this.disconnect();
                this.disconnect = null;
            }
            this.handlerId = parentHandlerId;
            if (this.handlerId && this.node) {
                this.disconnect = this.backendConnector(this.handlerId, this.node, this.options);
            }
        };
        this.hook = (nativeElement, options) => {
            if (nativeElement === this.node &&
                areOptionsEqual(options, this.options)) {
                return;
            }
            this.node = nativeElement;
            this.options = options;
            this.reconnect(this.handlerId);
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjb25uZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcmVkbmF4L2NvcmUvIiwic291cmNlcyI6WyJzcmMvbGliL2ludGVybmFsL1JlY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sZUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRXZELE1BQU0sT0FBTyxXQUFXO0lBS3BCLFlBQ1ksZ0JBQTBFO1FBQTFFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBMEQ7UUFFdEYsY0FBUyxHQUFHLENBQUMsZUFBa0MsRUFBRSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUMxQjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO1lBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BGO1FBQ0wsQ0FBQyxDQUFBO1FBQ0QsU0FBSSxHQUFHLENBQUMsYUFBbUIsRUFBRSxPQUFXLEVBQUUsRUFBRTtZQUN4QyxJQUFJLGFBQWEsS0FBSyxJQUFJLENBQUMsSUFBSTtnQkFDM0IsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBRXZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQTtJQXJCRSxDQUFDO0NBc0JQIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVW5zdWJzY3JpYmUsIElkZW50aWZpZXIgfSBmcm9tICdkbmQtY29yZSc7XG5pbXBvcnQgYXJlT3B0aW9uc0VxdWFsIGZyb20gJy4uL3V0aWxzL2FyZU9wdGlvbnNFcXVhbCc7XG5cbmV4cG9ydCBjbGFzcyBSZWNvbm5lY3RvcjxPID0gYW55PiB7XG4gICAgaGFuZGxlcklkOiBhbnk7XG4gICAgbm9kZT86IE5vZGU7XG4gICAgb3B0aW9ucz86IE87XG4gICAgZGlzY29ubmVjdD86IFVuc3Vic2NyaWJlIHwgbnVsbDtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBiYWNrZW5kQ29ubmVjdG9yOiAoaGFuZGxlcklkOiBhbnksIG5vZGU6IE5vZGUsIG9wdGlvbnM/OiBPKSA9PiBVbnN1YnNjcmliZVxuICAgICkge31cbiAgICByZWNvbm5lY3QgPSAocGFyZW50SGFuZGxlcklkOiBJZGVudGlmaWVyIHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5kaXNjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYW5kbGVySWQgPSBwYXJlbnRIYW5kbGVySWQ7XG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXJJZCAmJiB0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCA9IHRoaXMuYmFja2VuZENvbm5lY3Rvcih0aGlzLmhhbmRsZXJJZCwgdGhpcy5ub2RlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhvb2sgPSAobmF0aXZlRWxlbWVudDogTm9kZSwgb3B0aW9ucz86IE8pID0+IHtcbiAgICAgICAgaWYgKG5hdGl2ZUVsZW1lbnQgPT09IHRoaXMubm9kZSAmJlxuICAgICAgICAgICAgYXJlT3B0aW9uc0VxdWFsKG9wdGlvbnMsIHRoaXMub3B0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZSA9IG5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy5yZWNvbm5lY3QodGhpcy5oYW5kbGVySWQpO1xuICAgIH1cbn1cbiJdfQ==