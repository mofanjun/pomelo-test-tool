/**
 * @description:麻将树节点
 * 
*/
var MaJiangNode = function(parent,hold,remain){
    this.hold = hold;
    this.remain = remain;
    this.children = [];
    this.parent = parent;
}

MaJiangNode.prototype.addChild = function(node){
    this.children.push(node);
}

MaJiangNode.prototype.compare = function(node){
    if(this.hold.length > node.hold.length){
        return 1;
    }

    if(this.hold.length < node.hold.length){
        return -1;
    }

    for(var i = 0; i < this.hold.length; i++){
        if(this.hold[i] > node.hold[i]){
            return 1;
        }

        if(this.hold[i] < node.hold[i]){
            return -1;
        }
    }

    return 0;
}

//Function#leaf
MaJiangNode.prototype.getProfile = function(){
    if(this.children.length != 0){
        console.log("genProfile not leaf node,illegal opreation");
        return;
    }
    var travelNode = [];
    var description = "";
    var remain = this.remain;
    remain.sort(function(r1,r2){
        return r1 - r2;
    })

    var current = this;
    while(current.parent != null){
        travelNode.push(current);
        current = current.parent;
    }

    travelNode.sort(function(n1,n2){
        return n1.compare(n2);
    })

    for(var i = 0; i < travelNode.length; i++){
        var node = travelNode[i];
        for(var j = 0; j < node.hold.length; j++){
            description += node.hold[j];
        }
    }

    return description;
}

MaJiangNode.prototype.filterThree = function(caishenCnt){
    if(this.remain.length > caishenCnt * 2 + 2){
        return false;
    }

    return true;
}

MaJiangNode.prototype.filterTwo = function(caishenCnt){
    var needCaishenCnt = 0;

    var current = this;
    while(current.parent){
        if(current.hold.length == 2){
            needCaishenCnt++;
        }
        current = current.parent;
    }
    //此时废牌需要搭配两张财神才能成型
    needCaishenCnt += this.remain.length * 2 - 1;
    return caishenCnt >= needCaishenCnt;
}

/**
 * @description:麻将树 可以把麻将牌按需拆分
 * 
*/

var MaJiangTree = function(){
    this.root = null;
    this.cards = [];
    this.caishenCards = [];
    this.legalNodes = [];
}

//Function#Generate
MaJiangTree.prototype.init = function(opts){
    var cards = opts.cards;
    var caishenSet = opts.caishenSet;
    //sort
    cards.sort(function(c1,c2){
        return c1 - c2;
    })
    //split
    for(var i in cards){
        var card = cards[i];
        if(!! caishenSet[card]){
            this.caishenCards.push(card);
        }else{
            this.cards.push(card);
        }
    }
    //gen root
    this.genRoot(this.cards);
    //
    var legalThree = [];
    this.genThree(this.root);
    this.travelLegalNodes(this.root,MaJiangNode.prototype.filterThree,legalThree,[]);
    for(var i = 0; i < legalThree.length; i++){
        var current = legalThree[i];
        this.genTwo(current);
        this.travelLegalNodes(current,MaJiangNode.prototype.filterTwo,this.legalNodes,[]);
    }
}

MaJiangTree.prototype.genRoot = function(cards){
    cards.sort(function(c1,c2){
        return c1 - c2;
    })

    var node = new MaJiangNode(null,[],cards);
    this.root = node;
}

MaJiangTree.prototype.genThree = function(node){

    if(! node instanceof MaJiangNode){
        console.log("genThree arguments is not Node instance");
        return;
    }

    for(var i = 0; i < node.remain.length; i++){
        var three = this.findThree(node.remain,i);
        if(three.length == 0) continue;
        var remain = this.calcRemain(node.remain,three);
        node.addChild(new MaJiangNode(node,three,remain));
    }

    for(var i in node.children){
        this.genThree(node.children[i]);
    }
}

MaJiangTree.prototype.findThree = function(cards,start){
    var kezi = this.findKezi(cards,start);
    if(kezi.length != 0){
        return kezi;
    }

    return this.findShunzi(cards,start);
}

MaJiangTree.prototype.findKezi = function(cards,start){
    var kezi = [];
    if(cards[start] == cards[start+1] && cards[start+1] == cards[start+2]){
        kezi.push(cards[start]);
        kezi.push(cards[start+1]);
        kezi.push(cards[start+2]);
    }
    return kezi;
}

MaJiangTree.prototype.findShunzi = function(cards,start){
    var shunzi = [];
    var card = cards[start];
    var secondIndex = -1;
    var threeIndex = -1;

    if(cards[start] > 0x0300){//风字不成顺
        return shunzi;
    }

    for(var i = start + 1; i < cards.length; i++){
        if(cards[i] == card + 1 && secondIndex < 0){
            secondIndex = i;
        }

        if(cards[i] == card + 2 && threeIndex < 0){
            threeIndex = i;
        }

        if(secondIndex > 0 && threeIndex > 0){//找到就结束
            break;
        }
    }

    if(secondIndex > 0 && threeIndex > 0){
        shunzi.push(card);
        shunzi.push(cards[secondIndex]);
        shunzi.push(cards[threeIndex]);
    }

    return shunzi;
}

MaJiangTree.prototype.genTwo = function(node){
    if(! node instanceof MaJiangNode){
        console.log("genTwo arguments is not Node instance");
        return;
    }

    for(var i = 0; i < node.remain.length; i++){
        var two = this.findTwo(node.remain,i);
        if(two.length == 0) continue;
        var remain = this.calcRemain(node.remain,two);
        node.addChild(new MaJiangNode(node,two,remain));
    }

    for(var i in node.children){
        this.genTwo(node.children[i]);
    }
}

MaJiangTree.prototype.findTwo = function(cards,start){
    var kezi = this.findTwoShunzi(cards,start);
    if(kezi.length != 0){
        return kezi;
    }

    return this.findTwoKezi(cards,start);
}

MaJiangTree.prototype.findTwoKezi = function(cards,start){
    var kezi = [];
    if(cards[start] == cards[start+1]){
        kezi.push(cards[start]);
        kezi.push(cards[start+1]);
    }
    return kezi;
}

MaJiangTree.prototype.findTwoShunzi = function(cards,start){
    var shunzi = [];
    for(var i = start; i < cards.length; i++){
        if(shunzi[start]+1 == cards[i] || shunzi[start]+2 == cards[i]){//连的或者跳的
            shunzi.push(shunzi[start]);
            shunzi.push(shunzi[i]);
            break;
        }
    }
    return shunzi;
}

MaJiangTree.prototype.calcRemain = function(allSet,rSet){
    var fSet = [];
    var rcSet = rSet.concat([]);
    for(var i in allSet){
        var tIndex = rcSet.indexOf(allSet[i]);
        if(~ tIndex){
            rcSet.splice(tIndex,1);
            continue;
        }
        fSet.push(allSet[i]);
    }
    return fSet;
}

//Function#Travel
MaJiangTree.prototype.travelLegalNodes = function(node,filterFunc,legalNodes,container){
    for(var i = 0; i < node.children.length; i++){
        var current = node.children[i];
        if(current.children.length != 0){
            this.travelLegalNodes(current,filterFunc,legalNodes,container);
        }else{
            var profile = current.getProfile();
            if(container.indexOf(profile) == -1 && filterFunc.call(current,this.caishenCards.length)){
                legalNodes.push(current);
                container.push(profile);
            }
        }
    }
}

MaJiangTree.prototype.genBranches = function(){
    var branches = []
    for(var i in this.legalNodes){
        var current = this.legalNodes[i];
        var rObj = {
            waste:current.remain,
            plan:[current.hold]
        }
        while(current.parent){
            current = current.parent;
            if(current.hold.length != 0 ){
                rObj.plan.push(current.hold);
            }   
        }
        branches.push(rObj);
    }

    return branches;
}

window.MaJiangTree = MaJiangTree;
