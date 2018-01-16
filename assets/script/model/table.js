var Table = function(gameType,tableName){
    this.gameType = gameType;
    this.tableName = tableName;
    this.players = [];
}

Table.prototype.getTableName = function(){
    return this.tableNo
}

Table.prototype.getGameType = function(){
    return this.gameType;
}

Table.prototype.addPlayer = function(player){
    //check is exist
    this.players.push(player);
}

Table.prototype.getPlayers = function(){
    return this.players;
}

module.exports = Table;