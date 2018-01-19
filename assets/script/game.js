var connector = require("./lib/connector")
cc.Class({
    extends: cc.Component,

    properties: {
        cardTextures:{
            type:[cc.SpriteFrame],
            default:[]
        },
        cardPrefab:{
            type:cc.Prefab,
            default:null
        },
        cardSpace:0,
    },
    // LIFE-CYCLE CALLBACKS
    onLoad () {
        var self = this;
        cc.loader.loadResDir("game",cc.SpriteFrame,function(err,assets){
            if(!! err){
                cc.log("game scene load err",err,message);
                return;
            }
            self.cardTextures = assets;
            self.initDeckUI();
        })
    },

    initGameUI(){

    },

    initDeckUI(){
        var container = cc.find("Canvas/deck");
        var anchorX = container.getChildByName("anchor").getPositionX();
        for(var i = 0; i < 54; i++){
            var card = cc.instantiate(this.cardPrefab).getComponent("Card");
            container.addChild(card.node);
            card.node.setPosition(anchorX + i * this.cardSpace,0);
        }
    },

    onBtnExit() {
        var table = global.table;
        var tableName = table.getTableName()
        connector.requestExitRoom({deskName:tableName},function(err,data){
            if(!! err){
                console.log("exit table----->",err.message);
                return;
            }
            cc.director.loadScene("lobby");
        })
    },

    onbtnDealCardClick(){
        
    }
});
