namespace State {
    abstract class State {
        protected player: Player;

        constructor(player: Player) {
            this.player = player;
        }

        public abstract clickPlay(): void;
        public abstract clickNext(): void;
        public abstract clickPrev(): void;
    }

    class ReadyState extends State {
        public clickPlay() {
            this.player.startPlayback();
            this.player.state = new PlayingState(this.player);
        }

        public clickNext(): void {
            this.player.nextSong();
        }

        public clickPrev(): void {
            this.player.prevSong();
        }
    }

    class PlayingState extends State {
        public clickPlay(): void {
            this.player.stopPlayback();
            this.player.state = new ReadyState(this.player);
        }

        public clickNext(): void {
            this.player.nextSong();
        }

        public clickPrev(): void {
            this.player.prevSong();
        }
    }

    class Player {
        private _state: State;

        private _songs: string[] = [];
        private _currentSongIndex: number;
        private _isPlaying: boolean;

        public constructor(songs: string[]) {
            this._state = new ReadyState(this);
            this._songs = songs;
            this._currentSongIndex = 0;
            this._isPlaying = false;
        }

        public getInfo() {
            return (
                `Плеер ${this._isPlaying ? `играет` : `на паузе`}\n` +
                `Текущая песня: ${this._songs[this._currentSongIndex]}`
            );
        }

        public set state(value: State) {
            this._state = value;
        }

        public clickPlay() {
            this._state.clickPlay();
            console.log(this.getInfo());
        }

        public clickNext() {
            this._state.clickNext();
            console.log(this.getInfo());
        }

        public clickPrev() {
            this._state.clickPrev();
            console.log(this.getInfo());
        }

        public startPlayback() {
            this._isPlaying = true;
        }

        public stopPlayback() {
            this._isPlaying = false;
        }

        public nextSong() {
            if (this._currentSongIndex < this._songs.length - 1) {
                this._currentSongIndex++;
            }
        }

        public prevSong() {
            if (this._currentSongIndex > 0) {
                this._currentSongIndex--;
            }
        }
    }

    const songs = [
        `Ебанько - я ебу собак`,
        `Филип Киркоров - какая-то фигня`,
        `Классик - классический`
    ];

    const player = new Player(songs);
    player.clickPlay();
    player.clickNext();
    player.clickPlay();
    player.clickPrev();
}