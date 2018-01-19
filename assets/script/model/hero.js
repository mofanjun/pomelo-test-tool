var Hero = function(opts){
    this.uid = opts.uid;
    this.gameId = opts.gameId;
    this.account = opts.account;
    this.nickName = opts.nickName;
    this.bankCoin = opts.bankCoin;
    this.coin = opts.coin;
    this.faceId = opts.faceId;
    this.sex = opts.sex;
    
    // this.ip = opts.ip;
    // this.level = opts.level;
    // this.likePoint = opts.likePoint;
    // this.ownGoods = opts.ownGoods;
    // this.roomCard = opts.roomCard;
    // this.sign = opts.sign;
    // this.sumMoney = opts.sumMoney;
    // this.vipLevel = opts.vipLevel;
    // this.yinlevel = opts.yinlevel;
}

Hero.prototype.getUid = function(){
    return this.uid;
}

module.exports = Hero;
