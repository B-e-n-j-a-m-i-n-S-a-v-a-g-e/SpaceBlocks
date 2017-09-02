class Sound {

    private src: string;
    private myAudio: any;

    constructor(src: string, elementName: string) {

        this.myAudio = document.createElement(elementName);
        this.myAudio.src = src;
    }

    play() {
        this.myAudio.play();
    }
}