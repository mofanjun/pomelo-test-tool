var connector = require("./lib/connector");
var Table = require("./model/table");
var Player = require("./model/player");

cc.Class({
    extends: cc.Component,

    properties: {
        roomPrefab:{
            type:cc.Prefab,
            default:null
        },
        tableList:{
            type:[Table],
            default:[]
        },
        gameType:{
            type:cc.String,
            default:"coinDDZ"
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

        connector.on("ddz_onTableSitDown",this.onSitDown);
        connector.on("onUserSitDown",this.onUserSitDown);
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
            newRoomItem.on("mousedown",this.onRoomClick,this);
        }
    },
    /*
    *@brief:node.on(type, callback, target)
    */
    onRoomClick(event){
        var param = {
            roomIndex:event.currentTarget.getTag(),
            gameType:"coinDDZ"
        }
        var self = this;
        connector.requestCoinDeskList(param,function(err,tableNos){
            if(!! err){
                console.log("onRoomClick with error message--->",err.message);
                return;
            }
            connector.requestCoinDeskInfo({deskNames:tableNos,gameType:self.gameType},function(err,tableInfos){
                if (!! err){
                    console.log("requestCoinDeskInfo with error message--->",err.message);
                    return;
                }
                self.renderTables(tableNos,tableInfos);
            })            
        })
    },
    
    renderTables(tableNos,tableInfos){
        for(var i = 0; i < tableNos.length; i++){
            var table = new Table(tableNos[i]);
            this.tableList.push(table);
        }

        for(var i = 0; i < tableInfos.length; i++){
            var playerList = tableInfos[i];
            for(var j = 0; j < playerList.length; j++){
                var player = new Player(playerList[j]);
                this.tableList[i].addPlayer(player);
            }
        }
        cc.log("------>table list",this.tableList);
        //show table
        var table = cc.find("Canvas/table");
        table.active = true;
        //
        var table1 = this.tableList[5];
        var playerList = table1.getPlayers();
        for(var i = 0; i < playerList.length; i++){
            var player = playerList[i];
            var path = "player_" + player.chairNo + "/nickname_" + player.chairNo;
            cc.find(path,table).getComponent(cc.Label).string = player.nickName;
        }
    },

    onChairClick(event,customerData){
        connector.requestEnterDesk({
            gameType:this.gameType,
            deskName:this.tableList[5].getTableNo(),
            pos:Number(customerData)
        },function(err,res){
            if(!! err){
                cc.log("enter desk error----->",err.message);
                return;
            }
            cc.log('table data',res.table);
        })
    },

    onSitDown(event){
        cc.log("onSitDown---->event.detail",event.detail);
    },

    onUserSitDown(event){
        cc.log("onUserSitDown---->event.detail",event.detail);
    }
});
