let deck;
let myCards = [];
let player2Cards = [];
let publicCards = [];
let myCardsCount = 2;
let x;
const str2num={'J':11,'Q':12,'K':13,'A':14};
const num2str={14:'A',13:'K',12:'Q',11:'J',1:'A'};


window.onload=function(){
    startGame();
}

function startGame(){
    deck = createDeck();
    deck = shuffleDeck(deck);

    for(let i=0;i<myCardsCount;i++){
        let img = document.createElement('img');
        let card = deck.pop();
        myCards.push(card);
        img.src = './cards/'+card+'.png'
        document.getElementById('your-cards').append(img);
    }

    for(let i=0;i<2;i++){
        let img = document.createElement('img');
        let card = deck.pop();
        player2Cards.push(card);
        img.src = './cards/'+card+'.png'
        document.getElementById('player2-cards').append(img);
    }

    for(let i=0;i<5;i++){
        let img = document.createElement('img');
        let card = deck.pop();
        publicCards.push(card);
        img.src = './cards/'+card+'.png'
        document.getElementById('public-cards').append(img);
    }

    let allMyCards = myCards.concat(publicCards);
    x = findBest(allMyCards).cards;
    log(x);

    let allplayer2Cards = myCards.concat(publicCards);
    x = findBest(allplayer2Cards).cards;
    log(x);

}

function findBest(cards){
    if(findFourKind(cards).cards){
        return findFourKind(cards);
    }
    if(findFullHouse(cards).cards){
        return findFullHouse(cards);
    }
    if(findFlush(cards).cards){
        return findFlush(cards);
    }
    if(findThreeKind(cards).cards){
        return findThreeKind(cards);
    }
    if(findTwoPair(cards).cards){
        return findTwoPair(cards);
    }
    if(findOnePair(cards).cards){
        return findOnePair(cards);
    }
    return findHighCard(cards);

}

function findHighCard(cards){
    let values = [...new Set(cards.map(c=>rankValue(c.split('-')[0])))];

    let result = [];
    result = result.concat(values.sort((a,b)=>b-a).slice(0,5));
    return {isHighCard:true,cards:result}
}

function findOnePair(cards){
    let dic = {};
    for(let card of cards){
        let value = rankValue(card);
        if(!dic[value]){
            dic[value] = 0;
        }
        dic[value] ++ ;
    }

    let value1;
    for(let i=14;i>1;i--){
        if(dic[i]>=2){
            value1 = i;
            break
        }
    }

    if(!value1){
        return {isOnePair:false}

    }
    let values = [...new Set(cards.filter(e=>rankValue(e.split('-')[0])!=value1).map(c=>rankValue(c.split('-')[0])))];

    let result = [];
    for(let i=0;i<2;i++){
        result.push(value1)
    }
    result = result.concat(values.sort((a,b)=>b-a).slice(0,3));
    return {isOnePair:true,cards:result}
}

function findTwoPair(cards){
    let dic = {};
    for(let card of cards){
        let value = rankValue(card);
        if(!dic[value]){
            dic[value] = 0;
        }
        dic[value] ++ ;
    }

    let value1,value2;
    for(let i=14;i>1;i--){
        if(dic[i]>=2){
            value1 = i;
            break
        }
    }
    for(let i=14;i>1;i--){
        if(i!=value1 && dic[i]>=2){
            value2 = i;
            break
        }
    }

    if(!value1 || !value2){
        return {isTwoPair:false}

    }
    let values = [...new Set(cards.filter(e=>rankValue(e.split('-')[0])!=value1 && rankValue(e.split('-')[0])!=value2).map(c=>rankValue(c.split('-')[0])))];

    let result = [];
    for(let i=0;i<2;i++){
        result.push(value1)
    }
    for(let i=0;i<2;i++){
        result.push(value2)
    }
    result = result.concat(values.sort((a,b)=>b-a).slice(0,1));
    return {isTwoPair:true,cards:result}
}

function findThreeKind(cards){
    let dic = {};
    for(let card of cards){
        let value = rankValue(card);
        if(!dic[value]){
            dic[value] = 0;
        }
        dic[value] ++ ;
    }

    let value1;
    for(let i=14;i>1;i--){
        if(dic[i]>=3){
            value1 = i;
            break
        }
    }
    if(!value1){
        return {isThreeKind:false}

    }
    let values = [...new Set(cards.filter(e=>rankValue(e.split('-')[0])!=value1).map(c=>rankValue(c.split('-')[0])))];

    let result = [];
    for(let i=0;i<3;i++){
        result.push(value1)
    }
    result = result.concat(values.sort((a,b)=>b-a).slice(0,2));
    return {isThreeKind:true,cards:result}
}

function findFourKind(cards){
    let dic = {};
    for(let card of cards){
        let value = rankValue(card);
        if(!dic[value]){
            dic[value] = 0;
        }
        dic[value] ++ ;
    }


    let value1,value2;
    for(let i=14;i>1;i--){
        if(dic[i]>=4){
            value1 = i;
            break
        }
    }
    if(!value1){
        return {isFourKind:false}

    }
    for(let i=14;i>1;i--){
        if(i!=value1 && dic[i]>=1){
            value2 = i;
            break
        }
    }
    if(!value2){
        return {isFourKind:false}

    }

    let result = [];
    for(let i=0;i<4;i++){
        result.push(value1);
    }
    for(let i=0;i<1;i++){
        result.push(value2);
    }

    return {isFourKind:true,cards:result}
}

function findFullHouse(cards){
    let dic = {};
    for(let card of cards){
        let value = rankValue(card);
        if(!dic[value]){
            dic[value] = 0;
        }
        dic[value] ++ ;
    }

    let value1,value2;
    for(let i=14;i>1;i--){
        if(dic[i]>=3){
            value1 = i;
            break
        }
    }
    if(!value1){
        return {isFullHouse:false}

    }
    for(let i=14;i>1;i--){
        if(i!=value1 && dic[i]>=2){
            value2 = i;
            break
        }
    }
    if(!value2){
        return {isFullHouse:false}

    }

    let result = [];
    for(let i=0;i<3;i++){
        result.push(value1);
    }
    for(let i=0;i<2;i++){
        result.push(value2);
    }

    return {isFullHouse:true,cards:result}
}

function findStraight(cards){
    let sortedCards = sortCards(cards);
    let uniqueValues = [...new Set(sortedCards.map(c=>rankValue(c)))];
    if(uniqueValues.includes(14)){
        uniqueValues.push(1);
    }

    maxLength = 1;
    curLength = 1;
    bestStartIndex = 0;
    for(let i=0;i<uniqueValues.length;i++){
        if(uniqueValues[i]==uniqueValues[i+1]+1){
            curLength++;
            if(curLength>maxLength){
                maxLength = curLength;
                bestStartIndex = i+2-maxLength;
            }
        }else{
            curLength=1;
        }
    }
    if(maxLength>=5){
        return {
            isStraight:true,
            straightCards:uniqueValues.slice(bestStartIndex,bestStartIndex+5).reverse().map(i=>num2str[i]?num2str[i]:String(i))
        }
    }else{
        return{
            isStraight:false
        }
    }

}


function findFlush(cards){
    let suits = {'H':[],'S':[],'C':[],'D':[]};
    cards.forEach(card=>{
        let suit = card.split('-')[1];
        suits[suit].push(card);
    });

    for(let suit in suits){
        if(suits[suit].length>=5){
            return {
                isFlash:true,
                flushCards:sortCards(suits[suit]).slice(0,5),
                suit:suit
            }
        }
    }


    return {isFlash:false};
}

function sortCards(cards){
    return cards.sort((a,b)=>rankValue(b)-rankValue(a));
}

function rankValue(card){
    let rank = card.split('-')[0];
    return rank=='A'?14:(rank=='K'?13:(rank=='Q'?12:(rank=='J'?11:parseInt(rank))));
}

function log(x){
    document.getElementById('log').innerHTML = x;
}

function log2(x){
    document.getElementById('log2').innerHTML = x;
}

function createDeck(){
    let deck = [];
    let values = 'JQKA23456789'.split('');
    values.push('10');
    let types = 'CDHS'.split('');
    for(let v of values){
        for(let t of types){
            deck.push(v+'-'+t);
        }
    }
    return deck;
}

function shuffleDeck(deck){
    for(let i=0;i<deck.length;i++){
        let j = Math.floor(Math.random()*deck.length);
        let tmp = deck[j];
        deck[j] = deck[i];
        deck[i] = tmp;
    }
    return deck
}