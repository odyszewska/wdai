const timer = document.getElementById('time');
const start = document.querySelector("#start")
const stop = document.querySelector("#stop")
const reset = document.querySelector("#reset")
let time = 0;
let paused = true;


start.addEventListener("click",() => {
    if(paused){
        paused = false;
        intervalId = setInterval(updateTime, 1000);
    }
});
stop.addEventListener("click",() => {
    if(!paused){
        paused = true;
        clearInterval(intervalId)
    }
});
reset.addEventListener("click",() => {
    paused = true;
    clearInterval(intervalId)
    time = 0;
    seconds = 0;
    minutes = 0;
    timer.innerHTML = `0s`;
});


function updateTime(){
    const minutes = Math.floor(time/60);
    let seconds = time % 60
    if (minutes>0){
        timer.innerHTML = `${minutes}m ${seconds}s`;
    }
    else{
        timer.innerHTML = `${seconds}s`;
    }
    time++;
}