var Bridge;
(function (Bridge) {
    class Radio {
        isEnabled() {
            return this._isEnabled;
        }
        enable() {
            this._isEnabled = true;
        }
        disable() {
            this._isEnabled = false;
        }
        getVolume() {
            return this._volume;
        }
        setVolume(percent) {
            this._volume = percent;
        }
        getChannel() {
            return this._channel;
        }
        setChannel(channel) {
            this._channel = channel;
        }
    }
    class TV {
        isEnabled() {
            return this._isEnabled;
        }
        enable() {
            this._isEnabled = true;
        }
        disable() {
            this._isEnabled = false;
        }
        getVolume() {
            return this._volume;
        }
        setVolume(percent) {
            this._volume = percent;
        }
        getChannel() {
            return this._channel;
        }
        setChannel(channel) {
            this._channel = channel;
        }
    }
    class Remote {
        constructor(device) {
            this._device = device;
        }
        togglePower() {
            if (this._device.isEnabled()) {
                this._device.disable();
            }
            else {
                this._device.enable();
            }
        }
        volumeDown() {
            this._device.setVolume(this._device.getVolume() - 10);
        }
        volumeUp() {
            this._device.setVolume(this._device.getVolume() + 10);
        }
        channelDown() {
            this._device.setChannel(this._device.getChannel() - 1);
        }
        channelUp() {
            this._device.setChannel(this._device.getChannel() + 1);
        }
    }
    class AdvancedRemote extends Remote {
        mute() {
            this._device.setVolume(0);
        }
    }
    const tv = new TV();
    const remote = new Remote(tv);
    remote.togglePower();
    console.log(tv.isEnabled());
})(Bridge || (Bridge = {}));
//# sourceMappingURL=bridge.js.map