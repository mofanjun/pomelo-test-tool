cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale:1,
        transDuration:0
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        var self = this;
        var audioMng = cc.find("lobby/AudioMng") || cc.find("game/AudioMng");
        if(!! audioMng){
            audioMng = audioMng.getComponent("AudioMng");
        }

        this.initScale = this.node.scale;
        this.scaleDownAction = cc.scaleTo(this.transDuration,this.pressedScale);
        this.scaleUpAction = cc.scaleTo(this.transDuration,this.initScale);
        var onTouchDown = function(){
            this.stopAllActions();
            if(audioMng) audioMng.playButton();
            this.runAction(self.scaleDownAction);
        };

        var onTouchUp = function(){
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        };

        this.node.on(cc.Node.EventType.TOUCH_START,onTouchDown);
        this.node.on(cc.Node.EventType.TOUCH_END,onTouchUp);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,onTouchUp);
    }
});
