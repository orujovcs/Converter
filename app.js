let leftValue = "RUB";
let rightValue = "USD";
let ratioFromLeftToRight = 0.0;
let ratioFromRightToLeft = 0.0;
const amountInLeft = document.querySelector(".input-block-left");
const amountInRight = document.querySelector(".input-block-right");
let fixedAmountL = "";
let fixedAmountR = "";
const courseOfValuteLeft = document.querySelector(".valute-info-block-left");
const courseOfValuteRight = document.querySelector(".valute-info-block-right");
const allBtnsInLeftSide = document.querySelectorAll(".leftBtn");
const allBtnsInRightSide = document.querySelectorAll(".rightBtn");
const leftSideBtns = document.querySelector(".values-rightside-content");
coloring();
fetch(`https://api.exchangerate.host/latest?base=${leftValue}&symbols=${rightValue}`)
.then(response => {return response.json()})
.then(data => {
    ratioFromLeftToRight = data.rates[rightValue];
    ratioFromRightToLeft = 1 / ratioFromLeftToRight;
    courseOfValuteLeft.value = `1 ${leftValue} = ${parseFloat(ratioFromLeftToRight.toFixed(4))} ${rightValue}`;
    courseOfValuteRight.value = `1 ${rightValue} = ${parseFloat(ratioFromRightToLeft.toFixed(4))} ${leftValue}`;
});
function coloring(){
    allBtnsInLeftSide.forEach(item => {
        let id = item.id;
        if(item.innerHTML == leftValue){
            document.getElementById(id).style.backgroundColor = "#833AE0";
            document.getElementById(id).style.color = "white";
        }
        else {
            document.getElementById(id).style.backgroundColor = "white";
            document.getElementById(id).style.color = "gray";
        }      
    });
    allBtnsInRightSide.forEach(item => {
        let id = item.id;
        if(item.innerHTML == rightValue){
            document.getElementById(id).style.backgroundColor = "#833AE0";
            document.getElementById(id).style.color = "white";
        }
        else {
            document.getElementById(id).style.backgroundColor = "white";
            document.getElementById(id).style.color = "gray";
        }     
    });
}
document.addEventListener('click', (event) => {
    let res = "";
    if(event.target.className == "leftBtn"){
        leftValue = event.target.innerHTML;
    }
    else if(event.target.className == "rightBtn"){
        rightValue = event.target.innerHTML;
    }
    coloring();
    amountInLeft.addEventListener('click', () => {
        let punctir = true;
        let array = "";
        res = amountInLeft.value;
        console.log(res);
        res = res.split("");  //item.charCodeAt()
        res.forEach(item => {
            if((item.charCodeAt() >= 48 && item.charCodeAt() <= 57) || (item.charCodeAt() == 44 || item.charCodeAt() == 46)){
                if(item.charCodeAt() == 44 || item.charCodeAt() == 46){
                    if(punctir){
                        array += ".";
                        punctir = false;
                    }
                }
                else{
                    array += item;
                    console.log("true");
                    console.log(array);
                }
                fixedAmountL = parseFloat(array);
                amountInLeft.value = fixedAmountL;
                amountInRight.value = parseFloat((amountInLeft.value * ratioFromLeftToRight).toFixed(4));
            }
        });
    });
    amountInRight.addEventListener('click', () => {
        let punctir = true;
        let array = "";
        res = amountInRight.value;
        console.log(res);
        res = res.split("");  //item.charCodeAt()
        res.forEach(item => {
            if((item.charCodeAt() >= 48 && item.charCodeAt() <= 57) || (item.charCodeAt() == 44 || item.charCodeAt() == 46)){
                if(item.charCodeAt() == 44 || item.charCodeAt() == 46){
                    if(punctir){
                        array += ".";
                        punctir = false;
                    }
                }
                else{
                    array += item;
                    console.log("true");
                    console.log(array);
                }
                fixedAmountR = parseFloat(array);
                amountInRight.value = fixedAmountR;
                amountInLeft.value = parseFloat((amountInRight.value * ratioFromRightToLeft).toFixed(4));
            }
        });
    });
    fetch(`https://api.exchangerate.host/latest?base=${leftValue}&symbols=${rightValue}`)
    .then(response => {return response.json()})
    .then(data => {
        ratioFromLeftToRight = data.rates[rightValue];
        ratioFromRightToLeft = 1 / ratioFromLeftToRight;
        courseOfValuteLeft.value = `1 ${leftValue} = ${parseFloat(ratioFromLeftToRight.toFixed(4))} ${rightValue}`;
        courseOfValuteRight.value = `1 ${rightValue} = ${parseFloat(ratioFromRightToLeft.toFixed(4))} ${leftValue}`;
    });
});

///5,6,7,8,