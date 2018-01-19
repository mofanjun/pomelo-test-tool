var Table = function(opts){
    this.bottomFraction = opts.bottomFraction;
    this.game = opts.game;
    this.gameTimes = opts.gameTimes;
    this.playMethod = this.playMethod;
    this.playerApplyAnswerTimeSpan = opts.playerApplyAnswerTimeSpan;
    this.playerApplyDropTimeSpan = opts.playerApplyDropTimeSpan;
    this.playerCallTimeSpan = opts.playerCallTimeSpan;
    this.playerPlayTimeSpan = opts.playerPlayTimeSpan;
    this.tableNo = opts.tableNo;
    this.gameType = opts.gameType;
}

Table.prototype.getTableNo = function(){
    return this.tableNo
}

Table.prototype.getGameType = function(){
    return this.gameType;
}

Table.prototype.addPlayer = function(player){
    //TODO:check player is exist
    this.players.push(player);
}

module.exports = Table;