const btnStart = document.querySelector("button[data-start");
const btnClose = document.querySelector("button[data-stop]");
const bodyEl = document.querySelector("body");

btnStart.addEventListener("click", onBtnStart);
btnClose.addEventListener("click", onBtnClose);



function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


let timerId= null;
function onBtnStart(evt){
     timerId = setInterval(()=>{
        const color = getRandomHexColor();
        bodyEl.style.backgroundColor = color;
    }, 1000);
    
    btnStart.setAttribute("disabled", true);
btnClose.removeAttribute("disabled")
    }

function onBtnClose(evt){
clearInterval(timerId)
btnStart.removeAttribute("disabled");
btnClose.setAttribute("disabled", true);
btnStart.removeEventListener("click", onBtnClose);

}
