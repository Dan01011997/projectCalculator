const numbers=document.querySelectorAll(".numbers > div");
const numberContainer=document.querySelector(".numbers");
const operators=document.querySelectorAll(".operators > div");
const operatorContainer=document.querySelector(".operators");
const buttons=document.querySelectorAll("button")

const display=document.querySelector(".display");
let numberArray=Array.from(numbers);
let operatorArray=Array.from(operators);

//seting up lower keys
operatorArray.forEach((operator)=>{
    operator.style.width=`100%`;
    //`${parseFloat(computedWidth)/3}px`;
    operator.style.height=`23%`;
    //operator.style.border=`1px dotted black`;
    operator.style.borderRadius=`50%`;
    operator.setAttribute("id",`${operatorArray.indexOf(operator)}`);


})
numberArray.forEach((number)=>{
    number.setAttribute("id",`${numberArray.indexOf(number)}`);
    const computedWidth = window.getComputedStyle(numberContainer).width;
    const computedHeight = window.getComputedStyle(numberContainer).height;
    if(numberArray.indexOf(number)===0)
    {
        number.style.width=`64%`;
        number.style.height=`${parseFloat(computedHeight)/4}px`;
//number.style.border=`.4px dotted black`;
number.style.borderRadius=`20px`;
number.firstChild.style.borderRadius='20px'
    }
else{
    number.style.width=`32%`;
    //`${parseFloat(computedWidth)/3}px`;
    number.style.height=`23%`;
 //   number.style.border=`.4px dotted black`;
    number.style.borderRadius=`50%`;


    number.firstChild.textContent=`${numberArray.indexOf(number)-1}`;
    console.log(parseFloat(computedWidth));
}

})
//add event listener to all buttons
buttons.forEach((button)=>{
    button.parentNode.style.boxShadow=`1.5px 1.5px 2.5px 1.5px #dddddd`
    button.addEventListener("mousedown",buttonStyle)
    button.addEventListener("mouseup",(e)=>{
        console.log("hi");
        buttonReset(e);
    })

})
function buttonStyle(e){
    
        e.target.parentNode.style.scale='.95';
        if(e.target.parentNode.parentNode.className==="operators")
            e.target.style.backgroundColor=`rgb(230, 230, 230)`;

        e.target.style.backgroundColor=`rgb(238, 230, 230)`;
        console.log("hey");
}
let para=document.createElement('p');

display.appendChild(para);

function buttonReset(e){
    e.target.parentNode.style.scale='1';
    e.target.style.backgroundColor=`rgb(238, 238, 238)`;
    if(e.target.parentNode.parentNode.className==="numbers")
    {
        para.textContent+=e.target.textContent;
    }
    if(e.target.parentNode.parentNode.className==="operators")
        e.target.style.backgroundColor=`rgb(238, 230, 230)`;
        
}

