var Sound = (function () {
    function Sound(src) {
        this.myAudio = document.createElement("audio");
        this.myAudio.src = src;
    }
    Sound.prototype.play = function () {
        this.myAudio.play();
    };
    return Sound;
})();
