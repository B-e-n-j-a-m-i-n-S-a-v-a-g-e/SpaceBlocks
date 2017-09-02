var Sound = (function () {
    function Sound(src, elementName) {
        this.myAudio = document.createElement(elementName);
        this.myAudio.src = src;
    }
    Sound.prototype.play = function () {
        this.myAudio.play();
    };
    return Sound;
})();
//# sourceMappingURL=Sound.js.map