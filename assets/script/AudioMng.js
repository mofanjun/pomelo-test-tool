cc.Class({
    extends: cc.Component,

    properties: {//RAW Assets --- url make diff
        bgm:{
            url:cc.AudioClip,
            default:null
        },
        buttonAudio:{
            url:cc.AudioClip,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:
    //bgm
    playMusic() {
        cc.audioEngine.play(this.bgm,true);
    },

    pasueMusic() {
        cc.audioEngine.pause(this.bgm);
    },

    resumeMusic() {
        cc.audioEngine.resume(this.bgm);
    },

    _playSFX(clip) {
        cc.audioEngine.play(clip);
    },

    playButton() {
        this._playSFX(this.buttonAudio);
    }
});
