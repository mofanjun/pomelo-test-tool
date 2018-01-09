var connector = require("./lib/connector");

cc.Class({
    extends: cc.Component,

    properties: {
        roomPrefab:{
            type:cc.Prefab,
            default:null
        },
        tableUI:{
            type:cc.Layout,
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
            global.roomList = roomList;
            self.initRoomUI(roomList);
        })
    },

    initRoomUI(roomList){
        var container = cc.find("Canvas/scrollview/view/content");
        var space = 10;//每个房间块的位置
        for(var i = 0; i < roomList.length; i++){
            var newRoomItem = cc.instantiate(this.roomPrefab);
            newRoomItem.getChildByName("name").getComponent(cc.Label).string = roomList[i].name;
            newRoomItem.getChildByName("limit").getComponent(cc.Label).string = roomList[i].minCoin;
            newRoomItem.getChildByName("max").getComponent(cc.Label).string = roomList[i].maxPlayer;
            container.addChild(newRoomItem);
            newRoomItem.setPosition(0,- i * (newRoomItem.height + space));
            newRoomItem.setTag(roomList[i].roomIndex);
            newRoomItem.on("mousedown",this.onRoomClick);
        }
    },

    onRoomClick(event){//notice:this is ref to click UI
        // var table = cc.find("Canvas/table");
        // table.active = true;
        var param = {
            roomIndex:this.getTag(),
            gameType:"coinDDZ"
        }
        connector.requestCoinDeskList(param,function(err,res){
            if(!! err){
                console.log("onRoomClick--->",err.message);
                return;
            }
            cc.log('requestCoinDeskList----->',res);
        })
    }
});
