var Player = function(opts){
    this.uid = opts.uid;
    this.answerStatus = opts.answerStatus;
    this.callFraction = opts.callFraction;
    this.callTimes = opts.callTimes;
    this.chairNo = opts.chairNo;
    this.disconnected = opts.disconnected;
    this.faceId = opts.faceId;
    this.gameId = opts.gameId;
    this.handCards = opts.handCards;
    this.ip = opts.ip;
    this.isAllowOperate = opts.isAllowOperate;
    this.isApplier = opts.isApplier;
    this.isGaming = opts.isGaming;
    this.isReady = opts.isReady;
    this.nickName = opts.nickName;
    this.outCards = opts.outCards;
    this.pass = opts.pass;
    this.passCal = opts.passCal;
    this.score = opts.score;
}

module.exports = Player