var connector = require('./lib/connector');
var Hero = require("./model/hero");

cc.Class({
    extends: cc.Component,

    properties: {
        editbox:{
            type:cc.EditBox,
            default:null
        }
    },

    onbtnLoginClick:function(e){
        var userInput = this.editbox.string;

        if(userInput.length == 0){
            return;
        }
        var self = this;
        connector.queryEntry(function(err,data){
            var host = data.host;
            var port = data.port;
            var account = userInput;
            connector.entry(host,port,{account:account,platformId:1},function(err,res){
                if(!! err){
                    cc.log('login occur error',err.message);
                    return;
                }
                self.initHero(res.user);
                self.gotoLobbyScene();
            })
        })
    },

    initHero:function(opts){
        global.hero = new Hero(opts);
    },

    gotoLobbyScene:function(){
        cc.director.loadScene("lobby");
    }
});
