var State;
(function (State_1) {
    class State {
        constructor(player) {
            this.player = player;
        }
    }
    class ReadyState extends State {
        clickPlay() {
            this.player.startPlayback();
            this.player.state = new PlayingState(this.player);
        }
        clickNext() {
            this.player.nextSong();
        }
        clickPrev() {
            this.player.prevSong();
        }
    }
    class PlayingState extends State {
        clickPlay() {
            this.player.stopPlayback();
            this.player.state = new ReadyState(this.player);
        }
        clickNext() {
            this.player.nextSong();
        }
        clickPrev() {
            this.player.prevSong();
        }
    }
    class Player {
        constructor(songs) {
            this._songs = [];
            this._state = new ReadyState(this);
            this._songs = songs;
            this._currentSongIndex = 0;
            this._isPlaying = false;
        }
        getInfo() {
            return (`Плеер ${this._isPlaying ? `играет` : `на паузе`}\n` +
                `Текущая песня: ${this._songs[this._currentSongIndex]}`);
        }
        set state(value) {
            this._state = value;
        }
        clickPlay() {
            this._state.clickPlay();
            console.log(this.getInfo());
        }
        clickNext() {
            this._state.clickNext();
            console.log(this.getInfo());
        }
        clickPrev() {
            this._state.clickPrev();
            console.log(this.getInfo());
        }
        startPlayback() {
            this._isPlaying = true;
        }
        stopPlayback() {
            this._isPlaying = false;
        }
        nextSong() {
            if (this._currentSongIndex < this._songs.length - 1) {
                this._currentSongIndex++;
            }
        }
        prevSong() {
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
})(State || (State = {}));
//# sourceMappingURL=state.js.map