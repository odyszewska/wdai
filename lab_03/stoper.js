const time = document.querySelector("#time");
const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");

let startTime = 0;
let elapsedTime = 0;
let stoped = true;
let min = 0;
let sec = 0;

start.addEventListener("click", () => {
    if(stoped){
        stoped = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
    }
});
stop.addEventListener("click", () => {
    if(!stoped){
        stoped = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
reset.addEventListener("click", () => {
    stoped = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    min = 0;
    sec = 0;
    time.textContent = "0s";
});

function updateTime(){
    elapsedTime = Date.now() - startTime;

    sec = Math.floor((elapsedTime / 1000) % 60);
    min = Math.floor((elapsedTime / (1000 * 60)) % 60);

    if (min >= 1){
        time.textContent = `${min}m ${sec}s`;
    }
    else{
        time.textContent = `${sec}s`;
    }
    
}
