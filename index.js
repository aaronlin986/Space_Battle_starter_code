function start(){
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('left').style.left = '0';
    setTimeout(() => {
        document.getElementById('right').style.right = '0';
        setTimeout(() => round(), 1000);
    }, 750);
}

function round(){
    let currentHealth;
    alert(`[Your Health: ${2}] [Enemy Health: ${2}] [Enemies Remaining: ${2}]\nDo you want to 'attack' or 'retreat'?`);
}