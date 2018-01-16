var connector = require("./lib/connector")
cc.Class({
    extends: cc.Component,

    properties: {

    },
    // LIFE-CYCLE CALLBACKS
    onLoad () {
        var table = global.table;
        var gameType = table.getGameType();
        var tableName = table.getTableName();
        cc.log("gameType:",gameType,"deskName",tableName);
        connector.requestPlayerInfo({gameType:gameType,deskName:tableName},function(err,data){
            if(!! err){
                console.log("player info----->",err.message);
                return;
            }
            var playerInfo = data.player;
            cc.log("playerInfo------>",playerInfo);
        })
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
    }
});
