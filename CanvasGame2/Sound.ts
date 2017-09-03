class Sound {

    private src: string;
    private myAudio: any;

    constructor(src: string) {

        this.myAudio = document.createElement("audio");
        this.myAudio.src = src;
    }
    play() {
        this.myAudio.play();
    }
}