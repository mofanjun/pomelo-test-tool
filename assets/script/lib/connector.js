var config = require("../config/config");

var Code = {
    OK:200,
    Fail:500
}

var connector = Object.create(new cc.EventTarget());//inherits cc.EventTarget() instance

connector.queryEntry = function(callback){
    pomelo.init({host:config.GATE_HOST,port:config.GATE_PORT},function(){
        pomelo.request("gate.gateHandler.queryEntry",{},function(data){
            pomelo.disconnect();
            if(data.code != 200){
                return callback(true,null);
            }
            callback(null,{host:data.host,port:data.port});
        })
    })

}
connector.entry = function(host,port,opts,callback){
    var self = this;
    pomelo.init({host:host,port:port},function(){
        pomelo.request("connector.entryHandler.login",opts,function(data){
            if(!! data.err){
                return callback(new Error(data.msg),null);
            }
            var uid = data.uid;
            var token = data.token;
            pomelo.request("connector.entryHandler.enter",{uid:uid,token:token},function(data){
                if(!! data.err){
                    return callback(new Error(data.msg),null);
                }
                self.afterLogin();
                callback(null,{user:data.user})
            })
        })
    })
}

connector.requestRoomList = function(params,callback){
    pomelo.request("lobbysvr.lobbyHandler.queryCoinRoomList",params,function(data){
        if(data instanceof Error){
            return callback(data,null);
        }
        callback(null,data);
    })
}

connector.requestCoinDeskList = function(params,callback){
    pomelo.request("lobbysvr.lobbyHandler.queryCoinDeskList",params,function(data){
        if(data instanceof Error){
            return callback(data,null);
        }
        callback(null,data);
    })
}

connector.requestCoinDeskInfo = function(params,callback){
    pomelo.request("lobbysvr.lobbyHandler.queryCoinDeskInfo",params,function(data){
        if(data instanceof Error){
            return callback(data,null);
        }
        callback(null,data);
    })
}

connector.requestEnterDesk = function(params,callback){
    pomelo.request("coinDDZ.gameHandler.enterDesk",params,function(data){
        if(data.code == Code.Fail){
            return callback(new Error(data.msg),null);
        }
        callback(null,data);
    })
}

connector.afterLogin = function(){
    this.initEventListener();
}

connector.initEventListener = function(){
    pomelo.on("ddz_onTableSitDown",function(data){
        connector.emit("ddz_onTableSitDown",data);
    })
    
    pomelo.on("OnUserSitDown",function(data){
        connector.emit("OnUserSitDown",data);
    })
}


module.exports = connector;