cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:
    initWithFrame(spriteFrame){
        var sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
    },
});
