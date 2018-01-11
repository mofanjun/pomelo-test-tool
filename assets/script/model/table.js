var Table = function(tableNo){
    this.tableNo = tableNo;
    this.players = [];
}

Table.prototype.getTableNo = function(){
    return this.tableNo
}

Table.prototype.addPlayer = function(player){
    //check is exist
    this.players.push(player);
}

Table.prototype.getPlayers = function(){
    return this.players;
}

module.exports = Table;