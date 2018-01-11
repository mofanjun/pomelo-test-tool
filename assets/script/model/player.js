var Player = function(opts){
    this.answerStatus = opts.answerStatus;
    this.callFraction = opts.callFraction;
    this.callTimes = opts.callTimes;
    this.chairNo = opts.chairNo;
    this.disconnected = opts.disconnected;
    this.faceId = opts.faceId;
    this.gameId = opts.gameId;
    this.ip = opts.ip;
    this.isAllowOperate = opts.isAllowOperate;
    this.isApplier = opts.isApplier;
    this.isGaming = opts.isGaming;
    this.isReady = opts.isReady;
    this.nickName = opts.nickName;
    this.pass = opts.pass;
    this.passCall = opts.passCall;
    this.score = opts.score;
    this.totalScore = opts.totalScore;
    this.uid = opts.uid;
}

module.exports = Player