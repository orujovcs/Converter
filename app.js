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
const menuIcon = document.querySelector(".menu-icon");
const menuItems = document.querySelector(".menuForMobile");
const titleText = document.querySelector(".title")
let openMenu = false;
menuIcon.addEventListener('click', () => {
    if(!openMenu){menuItems.style.display = "block"; menuItems.style.marginTop = "1vw"; openMenu = true; titleText.style.marginTop = "20vw"}
    else{menuItems.style.display = "none"; openMenu = false; titleText.style.marginTop = "10vw"}    
});
coloring();

fetch(`https://api.exchangerate.host/latest?base=${leftValue}&symbols=${rightValue}`)
.then(response => {return response.json()})
.then(data => {
    ratioFromLeftToRight = data.rates[rightValue];
    ratioFromRightToLeft = 1 / ratioFromLeftToRight;
    courseOfValuteLeft.value = `1 ${leftValue} = ${parseFloat(ratioFromLeftToRight.toFixed(4))} ${rightValue}`;
    courseOfValuteRight.value = `1 ${rightValue} = ${parseFloat(ratioFromRightToLeft.toFixed(4))} ${leftValue}`;
})
.catch(error => {
    alert("Ошибка: " + error + "\nВозникли ошибки пожалуста повторите попытку через 5 минут.")
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
    fetch(`https://api.exchangerate.host/latest?base=${leftValue}&symbols=${rightValue}`)
    .then(response => {return response.json()})
    .then(data => {
        ratioFromLeftToRight = data.rates[rightValue];
        ratioFromRightToLeft = 1 / ratioFromLeftToRight;
        courseOfValuteLeft.value = `1 ${leftValue} = ${parseFloat(ratioFromLeftToRight.toFixed(4))} ${rightValue}`;
        courseOfValuteRight.value = `1 ${rightValue} = ${parseFloat(ratioFromRightToLeft.toFixed(4))} ${leftValue}`;
        if(event.target.className == "leftBtn"){
            console.log(event.target.className);
            console.log(fixedAmountL);
            if(amountInLeft.value.length == 0){amountInRight.value = "";}
            else{amountInRight.value = numberWithSpaces(parseFloat((fixedAmountL * ratioFromLeftToRight).toFixed(4)));}
        }
        else if(event.target.className == "rightBtn"){
            console.log(event.target.className);
            console.log(fixedAmountR);
            if(amountInRight.value.length == 0){amountInLeft.value = "";}
            else{amountInLeft.value = numberWithSpaces(parseFloat((fixedAmountR * ratioFromRightToLeft).toFixed(4)));}
        }
    })
    .catch(error => {
        alert("Ошибка: " + error + "\nВозникли ошибки пожалуста повторите попытку через 5 минут.")
    });
});
amountInLeft.addEventListener('keyup', (event) => {
    if(event.key.charCodeAt() != 65){
    if(amountInLeft.value.length == 0){amountInRight.value = "";}
    let pointExist = false;
    let array = "";
    res = amountInLeft.value;
    res = res.split("");
    res.forEach(item => {
        if((item.charCodeAt() >= 48 && item.charCodeAt() <= 57) || (item.charCodeAt() == 44 || item.charCodeAt() == 46)){
            if(item.charCodeAt() == 44 || item.charCodeAt() == 46){
                if(!pointExist){
                    if(amountInLeft.value.length == 1){amountInLeft.value = "";}
                    array += ".";
                    pointExist = true;
                }
            }
            else{
                array += item;
            }
            fixedAmountL = parseFloat(array);
            amountInLeft.value = numberWithSpaces(array);
            amountInRight.value = numberWithSpaces(parseFloat((fixedAmountL * ratioFromLeftToRight).toFixed(4)));
            if(amountInLeft.value[0] == 0 && amountInLeft.value.split(".")[0].length == 2){amountInLeft.value = amountInLeft.value.split("").pop().toString()}
        }
        else if(res.length == 1){amountInLeft.value = "";}
    });
   }
    
});
amountInRight.addEventListener('keyup', (event) => {
    if(event.key.charCodeAt() != 65){
        if(amountInRight.value.length == 0){amountInLeft.value = "";}
        let pointExist = false;
        let array = "";
        res = amountInRight.value;
        res = res.split("");
        res.forEach(item => {
            if((item.charCodeAt() >= 48 && item.charCodeAt() <= 57) || (item.charCodeAt() == 44 || item.charCodeAt() == 46)){
                if(item.charCodeAt() == 44 || item.charCodeAt() == 46){
                    if(!pointExist){
                        if(amountInRight.value.length == 0){amountInLeft.value = "";}
                        array += ".";
                        pointExist = true;
                    }
                }
                else{
                    array += item;
                }
                fixedAmountR = parseFloat(array);
                amountInRight.value = numberWithSpaces(array);
                amountInLeft.value = numberWithSpaces(parseFloat((fixedAmountR * ratioFromRightToLeft).toFixed(4)));
                if(amountInRight.value[0] == 0 && amountInRight.value.split(".")[0].length == 2){amountInRight.value = amountInRight.value.split("").pop().toString()}
        }
        else if(amountInRight.value.length == 1){amountInRight.value = "";}
    });
}
});
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}