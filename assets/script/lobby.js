var connector = require("./lib/connector");

cc.Class({
    extends: cc.Component,

    properties: {
        roomList:{
            type:[cc.Object],
            default:[]
        },
        roomPrefab:{
            type:cc.Prefab,
            default:null
        }
    },

    onLoad () {
        var self = this;
        connector.requestRoomList({gameType:"coinDDZ"},function(err,roomList){
            if(!! err){
                cc.log("lobby.requestRoomList---->with err",err.message);
                return;
            }
            self.roomList = roomList;
            self.initRoomUI(roomList);
        })
    },

    start () {

    },

    initRoomUI(roomList){
        cc.log('lobby.initRoomUI---->',roomList);
        var container = cc.find("Canvas/scrollview/view/content");
        var space = 10;//每个房间块的位置
        for(var i = 0; i < roomList.length; i++){
            var newRoomItem = cc.instantiate(this.roomPrefab);
            newRoomItem.getChildByName("name").string = roomList[i].name;
            newRoomItem.getChildByName("limit").string = roomList[i].minCoin;
            newRoomItem.getChildByName("max").string = roomList[i].maxPlayer;
            container.node.addChild(newRoomItem,i);
            newRoomItem.setPosition(cc.p(0,0));
        }
    }
});
