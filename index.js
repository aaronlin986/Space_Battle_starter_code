let player = {
    id: 'left',
    health: 20,
    power: 5,
    accuracy: 0.7
};

let enemy = {
    id: 'right',
    health: 0,
    power: 0,
    accuracy: 0
};

let roundsCompleted = 0;
let enemies = 6;
let success = 0;
let attacks = 0;
let state = 0;

function updateStats(){
    document.getElementById('playerStats').textContent = `Hull : ${player.health}\n Firepower : ${player.power}\n Accuracy : ${player.accuracy}`;
    document.getElementById('enemyStats').textContent = `Hull : ${enemy.health}\n Firepower : ${enemy.power}\n Accuracy : ${enemy.accuracy}`;
}

function reinitialize(){
    enemy.health = Math.floor(Math.random() * 4) + 3;
    enemy.power = Math.floor(Math.random() * 3) + 2;
    enemy.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;

    updateStats();
}

function start(){
    reinitialize();
    let name = document.getElementById('name').value;
    document.getElementById('playerName').textContent = name == '' ? 'USS Schwarzenegger' : name;
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('startButton').style.bottom = '-150%';
    document.getElementById('name-container').style.opacity = 0;
    document.getElementById('command-head').style.opacity = 0;
    document.getElementById('command').style.display = 'none';
    setTimeout(() => {    
        document.getElementById('command-container').style.display = 'flex';
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('name-container').style.display = 'none';
        document.getElementById('left').style.left = '0';
    }, 1000);
    setTimeout(() => {    
        document.getElementById('right').style.right = '0';
        setTimeout(() => {
            initializeTurn();
        }, 1500);
    }, 2000);
}

function endGame(val){
    let status = val > 0 ? 'V I C T O R Y' : 'D E F E A T';
    let color = val > 0 ? '#00f400' : '#f40000';
    document.getElementById('command-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('startButton').style.display = 'flex';
    setTimeout(() => document.getElementById('left').style.left = '-100%', 500);
    setTimeout(() => {
        document.getElementById('right').style.right = '-100%';
    }, 1250);
    setTimeout(() => {
        let result = document.getElementById('result');
        result.textContent = status;
        result.style.opacity = 1;
        result.style.color = color;
        result.style.textShadow = `3px 3px 12px ${color}`;
    }, 2000);
    setTimeout(() => {
        let enemiesDefeated = document.getElementById('enemiesDefeated');
        enemiesDefeated.textContent = `Enemies Defeated : ${roundsCompleted}`;
        enemiesDefeated.style.opacity = 1;
        enemiesDefeated.style.color = color;
    }, 3000);
    setTimeout(() => {
        let enemiesRemain = document.getElementById('enemiesRemain');
        enemiesRemain.textContent = `Remaining Enemies : ${enemies - roundsCompleted}`;
        enemiesRemain.style.opacity = 1;
        enemiesRemain.style.color = color;
    }, 3250);
    setTimeout(() => {
        let successHits = document.getElementById('successHits');
        successHits.textContent = `Successful Hits : ${success}`;
        successHits.style.opacity = 1;
        successHits.style.color = color;
    }, 3500);
    setTimeout(() => {
        let hits = document.getElementById('hits')
        hits.textContent = `Total Attacks : ${attacks}`;
        hits.style.opacity = 1;
        hits.style.color = color;
    }, 3750);
    setTimeout(() => {
        attacks = attacks == 0 ? 1 : attacks;
        let percent = document.getElementById('percent');
        percent.textContent = `${Math.floor(success/attacks * 100)}%`;
        percent.style.opacity = 1;
        percent.style.color = color;
    }, 4000);
    setTimeout(() => {
        let startButton = document.getElementById('startButton');
        startButton.textContent = 'PLAY AGAIN';
        startButton.style.bottom = 0;
        startButton.onclick = (() => window.location.reload());
    }, 5250);
}

function initializeTurn(){
    let commandHeader = document.getElementById('command-head');
    commandHeader.style.visibility = 'visible';
    commandHeader.style.color = 'white';
    commandHeader.textContent = 'Attack or Retreat?';
    commandHeader.style.opacity = 1;
    setTimeout(() => {
        let command = document.getElementById('command');
        command.placeholder = '';
        command.style.backgroundColor = 'black'; 
        command.style.display = 'block';
        command.disabled = false;     
        command.value = '';
    }, 1500);
}

function myTurn(input){  
    let commandHeader = document.getElementById('command-head');
    let command = document.getElementById('command');
    input = input.toLowerCase();
    if(input == 'attack'){
        if(attack(enemy, player) == 1){
            commandHeader.textContent = 'Attack Successful!';
            commandHeader.style.color = '#00f400';
            success++;
        }
        else{
            commandHeader.textContent = 'Attack Missed!';
            commandHeader.style.color = 'white';
        }
        attacks++;
        command.disabled = true;
        command.style.backgroundColor = 'rgba(255,255,255,0.15)';
        state = -1;
    }
    else if(input == 'retreat'){
        commandHeader.textContent = 'Are you sure you want to retreat?';
        command.placeholder = 'Yes/No';
        command.value = '';
        state = 1;
    }
    else if(input == 'yes' && state == 1){
        player.health = 0;
        commandHeader.textContent = '';
        command.style.display = 'none';
        state = -1;
    }
    else if(input == 'no' && state == 1){
        commandHeader.textContent = 'Attack or Retreat?';
        command.placeholder = '';
        command.value = '';
        state = 0;
    }
    else{
        command.style.animationName = "shake";
        setTimeout(() => command.style.animationName = "", 500);
        state = state == -1 ? 0 : state;
    }
}

function enemyTurn(){
    let commandHeader = document.getElementById('command-head');
    if(attack(player, enemy) == 1){
        commandHeader.textContent = 'Enemy Attack Successful!';
    }
    else{
        commandHeader.textContent = 'Enemy Attack Missed!';
        commandHeader.style.color = 'white';
    }
}

function newRound(){
    let en = document.getElementById('right');
    let commandHeader = document.getElementById('command-head');
    commandHeader.style.visibility = 'hidden';
    commandHeader.style.opacity = 0;
    en.style.right = '-100%';
    setTimeout(() => {
        en.style.opacity = 1;
        en.style.right = 0;
        reinitialize();
        setTimeout(() => {
            initializeTurn();
        }, 2000);
    }, 2000);
}

function attack(player1, player2){
    if(Math.random() < player2.accuracy){
        player1.health -= player2.power;
        document.querySelectorAll(`#${player1.id} div`).forEach((e) => e.style.boxShadow = "0px 0px 20px 10px red");
        document.getElementById(player1.id).style.animationName = 'shakeMore';
        setTimeout(() => {
            document.querySelectorAll(`#${player1.id} div`).forEach((e) => e.style.boxShadow = "0px 0px 20px 10px white");
            document.getElementById(player1.id).style.animationName = "";
        }, 500);
        updateStats();
        return 1;
    }
    else{
        return 0;
    }
}

function healthCheck(){
    let commandHeader = document.getElementById('command-head');
    let command = document.getElementById('command');
    if(player.health <= 0){
        setTimeout(() => {
            let plyr = document.getElementById('left');
            plyr.style.animationName = 'death';
            plyr.style.opacity = 0;
            command.style.display = 'none';
            commandHeader.textContent = "You've Been Defeated!";
            setTimeout(() => {
                commandHeader.style.visibility = 'hidden';
                commandHeader.style.opacity = 0;
                setTimeout(() => endGame(0), 500);
            }, 2000);
            return 0;
        }, 1500);
    }
    else if(enemy.health <= 0){
        setTimeout(() => {
            let en = document.getElementById('right');
            en.style.animationName = 'death';
            en.style.opacity = 0;
            command.style.display = 'none';
            commandHeader.textContent = 'Enemy Defeated!';
            if(++roundsCompleted == enemies){
                setTimeout(() => {
                    commandHeader.style.visibility = 'hidden';
                    commandHeader.style.opacity = 0;
                    setTimeout(() => endGame(1), 1000);
                }, 2000);
            }
            else{
                setTimeout(() => newRound(), 2000);
            }
            return 1; 
        }, 2000); 
    }
    else{
        return -1;
    }
}

document.getElementById('command').onkeyup = (e) => {
    if(e.key === 'Enter'){
        myTurn(document.getElementById('command').value);
        if(state < 0 && healthCheck() < 0){
            setTimeout(() => {
                let commandHeader = document.getElementById('command-head');
                commandHeader.style.color = '#f40000';
                commandHeader.textContent = 'Enemy Turn';
                document.getElementById('command').style.display = 'none';
                setTimeout(() => {
                    enemyTurn();
                    if(healthCheck() < 0){
                        setTimeout(() => initializeTurn(), 2000);
                    }
                }, 2000);
            }, 2000);
        }
    }
}