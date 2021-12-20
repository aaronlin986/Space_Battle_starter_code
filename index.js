let myHealth = 20;
let myPower = 5;
let myAccuracy = 0.7;
let enemyHealth;
let enemyPower;
let enemyAccuracy;
let enemies = 6;

function start(){
    document.getElementById('startButton').style.bottom = '-150%';
    document.getElementById('name-container').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('name-container').style.display = 'none';
        document.getElementById('left').style.left = '0';
    }, 1000);
    setTimeout(() => {    
        document.getElementById('right').style.right = '0';
        setTimeout(() => round(), 2000);
    }, 2000);
}

function endGame(){
    document.getElementById('result-container').style.display = 'block';
    setTimeout(() => document.getElementById('left').style.left = '-100%', 500);
    setTimeout(() => {
        document.getElementById('right').style.right = '-100%';
    }, 1250);
    setTimeout(() => {
        document.getElementById('result').textContent = 'V I C T O R Y';
        document.getElementById('result').style.opacity = 1;
        document.getElementById('result').style.color = '#00f400';
        document.getElementById('result').style.textShadow = '3px 3px 12px #00f400';
    }, 2000);
    setTimeout(() => {
        document.getElementById('enemiesDefeated').textContent = `Enemies Defeated : ${5}`;
        document.getElementById('enemiesDefeated').style.opacity = 1;
    }, 3000);
    setTimeout(() => {
        document.getElementById('enemiesRemain').textContent = `Remaining Enemies : ${1}`;
        document.getElementById('enemiesRemain').style.opacity = 1;
    }, 3250);
    setTimeout(() => {
        document.getElementById('successHits').textContent = `Successful Hits : ${15}`;
        document.getElementById('successHits').style.opacity = 1;
    }, 3500);
    setTimeout(() => {
        document.getElementById('hits').textContent = `Total Attacks : ${20}`;
        document.getElementById('hits').style.opacity = 1;
    }, 3750);
    setTimeout(() => {
        document.getElementById('startButton').textContent = 'PLAY AGAIN';
        document.getElementById('startButton').style.bottom = 0;
    }, 5000)
}

function round(){
    enemyHealth = Math.floor(Math.random() * 4) + 3;
    enemyPower = Math.floor(Math.random() * 3) + 2;
    enemyAccuracy = Math.floor(Math.random() * 3) + 6;
    while(1){
        enemyHealth = myTurn(enemyHealth, myPower, myAccuracy);
        healthCheck(myHealth, enemyHealth);
        myHealth = enemyTurn(myHealth, enemyPower, enemyAccuracy);
        healthCheck(myHealth, enemyHealth);
    }
}

function myTurn(enHealth, power, acc){  
    let action = prompt(`[Your Health: ${myHealth}] [Enemy Health: ${enemyHealth}] [Enemies Remaining: ${enemies}]\nDo you want to 'attack' or 'retreat'?`);
    if(action != null){
        action = action.toLowerCase();
        if(action == 'attack'){
            let result = attack(enHealth, power, acc);
            result == enHealth ? alert('Attack missed!') : alert('Attack successful!');
            return result;
        }
        else if(action == 'retreat'){
            if(confirm("Are you sure you want to retreat?")){
                //End game function
                endGame();
            }
            return myTurn(enHeath, power, acc);
        }
        else{
            alert('Invalid action.');
            return myTurn(enHealth, power, acc);;
        }
    }
    if(confirm("Are you sure you want to end the game?")){
        //End game function
        endGame();
    }
    return myTurn(enHealth, power, acc);
}

function enemyTurn(health, enPower, enAcc){
    let result = attack(health, enPower, enAcc);
    result == health ? alert('Enemy attack missed!') : alert('Enemy attack successful!');
    return result;
}

function attack(enHealth, power, acc){
    if(Math.random() < acc){
        return enHealth - power;
    }
    else{
        return enHealth;
    }
}

function healthCheck(health, enHealth){
    if(health <= 0){
        return -1; //trigger loss function
    }
    else if(enHealth <= 0){
        return 1;   //trigger win function
    }
    else{
        return 0; //continue
    }
}