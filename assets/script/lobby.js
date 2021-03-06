var connector = require("./lib/connector");
var Table = require("./model/table");
var Player = require("./model/player");


cc.Class({
    extends: cc.Component,

    properties: {
        gameType:"gameDDZ",
        nickname:{
            type:cc.Label,
            default:null
        },
        gold:{
            type:cc.Label,
            default:null
        },
        enterRoomPanel:{
            type:cc.Node,
            default:null
        },
        roomCode:{
            type:[cc.Integer],
            default:[]
        }
    },

    onLoad () {
        var audioMng = cc.find("lobby/AudioMng").getComponent("AudioMng");
        audioMng.playMusic();
        this.initLobbyUI();
    },

    initLobbyUI(){
        var nickname = global.hero.nickName;
        var gold = global.hero.coin;
        this.nickname.string = nickname;
        this.gold.string  = gold;
    },

    onBtnCreateRoomClick(){
        var self = this;
        var uid = global.hero.uid;
        connector.createDesk({gameType:this.gameType,uid:uid},function(err,res){
            if(!! err){
                cc.log("create desk err",err.message);
                return;
            }
            var gameType = res.gameType;
            var deskName = res.deskName;
            connector.requestEnterDesk({gameType:gameType,deskName:deskName},function(err,data){
                if(!! err){
                    cc.log("enter desk error",err.message);
                    return;
                }
                self.initTable();
                self.gotoGameScene();
            })
        })
    },

    onBtnEnterRoomClick(){
        this.enterRoomPanel.active = true;
        this.enterRoomPanel.runAction(cc.scaleTo(0.1,1));
    },

    onNumberClick(event,customData){
        if(this.roomCode.length < 6){
            this.roomCode.push(Number(customData));
            this.renderCode(this.roomCode);
        }

        if(this.roomCode.length == 6){
            
        }
    },

    onDelCode(event){
        this.roomCode.pop();
        this.renderCode(this.roomCode);
    },

    onResetCode(event){
        this.roomCode = [];
        this.renderCode(this.roomCode);
    },

    onbtnCloseClick(event){
        this.enterRoomPanel.active = false;
        this.enterRoomPanel.setScale(1,1);
    },

    //TODO:UI 逻辑
    renderCode(code){
        var panel = cc.find("Canvas/enterRoomPanel/desk_code_panel");
        var prefix = "code";
        for(var i = 0; i < 6; i++){
            var item = panel.getChildByName(prefix + (i + 1));
            if(! code[i]){
                item.getComponent(cc.Label).string = "";
                return;
            }
            item.getComponent(cc.Label).string = code[i];
        }
    },

    gotoGameScene(){
        cc.director.loadScene("game");
    },

    initTable(data){
        var players = data.players;
        delete data.players;
        data.gameType = this.gameType;
        var table = new Table(data);
        for(var i = 0; i < players.length; i++){
            var player = new Player(players[i]);
            table.addPlayer(player);
        }
    }
});
