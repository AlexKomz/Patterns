namespace Bridge {
    interface IDevice {
        isEnabled(): boolean;
        enable(): void;
        disable(): void;
        getVolume(): number;
        setVolume(percent: number): void;
        getChannel(): number;
        setChannel(channel: number): void;
    }

    class Radio implements IDevice {
        private _isEnabled: boolean;
        private _volume: number;
        private _channel: number;

        public isEnabled(): boolean {
            return this._isEnabled;
        }

        public enable(): void {
            this._isEnabled = true;
        }

        public disable(): void {
            this._isEnabled = false;
        }

        public getVolume(): number {
            return this._volume;
        }

        public setVolume(percent: number): void {
            this._volume = percent;
        }

        public getChannel(): number {
            return this._channel;
        }

        public setChannel(channel: number): void {
            this._channel = channel;
        }
    }

    class TV implements IDevice {
        private _isEnabled: boolean;
        private _volume: number;
        private _channel: number;

        public isEnabled(): boolean {
            return this._isEnabled;
        }

        public enable(): void {
            this._isEnabled = true;
        }

        public disable(): void {
            this._isEnabled = false;
        }

        public getVolume(): number {
            return this._volume;
        }

        public setVolume(percent: number): void {
            this._volume = percent;
        }

        public getChannel(): number {
            return this._channel;
        }

        public setChannel(channel: number): void {
            this._channel = channel;
        }
    }

    class Remote {
        protected _device: IDevice;

        public constructor(device: IDevice) {
            this._device = device;
        }

        public togglePower() {
            if (this._device.isEnabled()) {
                this._device.disable();
            } else {
                this._device.enable();
            }
        }

        public volumeDown() {
            this._device.setVolume(this._device.getVolume() - 10);
        }

        public volumeUp() {
            this._device.setVolume(this._device.getVolume() + 10);
        }

        public channelDown() {
            this._device.setChannel(this._device.getChannel() - 1);
        }

        public channelUp() {
            this._device.setChannel(this._device.getChannel() + 1);
        }
    }

    class AdvancedRemote extends Remote {
        public mute() {
            this._device.setVolume(0);
        }
    }

    const tv = new TV();
    const remote = new Remote(tv);
    remote.togglePower();

    console.log(tv.isEnabled());
}