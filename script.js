    const numbers=document.querySelectorAll(".numbers > div");
    const numberContainer=document.querySelector(".numbers");
    const operators=document.querySelectorAll(".operators > div");
    const operatorContainer=document.querySelector(".operators");
    const buttons=document.querySelectorAll("button");
    const container=document.querySelector(".container");

    const display=document.querySelector(".display");
    let numberArray=Array.from(numbers);
    let operatorArray=Array.from(operators);

    let flagOperator=0;

    //seting up lower keys
    operatorArray.forEach((operator)=>{
        operator.style.width=`100%`;
        //`${parseFloat(computedWidth)/3}px`;
        operator.style.height=`23%`;
        //operator.style.border=`1px dotted black`;
        operator.style.borderRadius=`50%`;
        operator.setAttribute("id",`op${operatorArray.indexOf(operator)}`);


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
    ;

    let buttonPressed;
    let buttonArray=Array.from(buttons);
    //add event listener to all buttons
    buttonArray.forEach((button)=>{
        button.parentNode.style.boxShadow=`1.5px 1.5px 2.5px 1.5px #dddddd`
        button.setAttribute("class",`${buttonArray.indexOf(button)}`);

        button.addEventListener("mousedown",buttonStyle)
        container.addEventListener("mouseup",(e)=>{
        //   console.log("hi");
            buttonReset(e);
        
        })

    })
    function buttonStyle(e){
        
            e.target.parentNode.style.scale='.96';
            if(e.target.parentNode.parentNode.className==="operators")
                e.target.style.backgroundColor=`rgb(230, 230, 230)`;

            e.target.style.backgroundColor=`rgb(238, 230, 230)`;
            //console.log("hey");
            
            buttonPressed=e.target;
    }
    let para=document.createElement('p');
    para.textContent=`0`;
    display.appendChild(para);


    function buttonReset(e){
            if(buttonPressed){  
            //styling  
                buttonPressed.style.backgroundColor=`rgb(238, 238, 238)`;
                buttonPressed.parentNode.style.scale='1';

                if(buttonPressed.parentNode.parentNode.className==="operators"){

                        operatorButtonState(buttonPressed);
                        console.log(operatorPressed)
                        
                    }
                    if(flagOperator===1)
                    console.log(operatorPressed.textContent);


                    if(buttonPressed.textContent==='AC'|| buttonPressed.textContent==='='){
                        buttonPressed.style.backgroundColor= 'rgb(233, 233, 253)';
                        }

                    
                    //
                //number addition 
                    if(buttonPressed.parentNode.parentNode.className==="numbers" && para.textContent.length<=11)
                {
                    if(checkDecimal(buttonPressed)){
                    // console.log("yo")
                        return;}
                        if(flagOperator===1 && i===1)
                            para.textContent='0';
                        
                    if(para.textContent===`0`){
                        if(buttonPressed.textContent==='.')
                            para.textContent+=buttonPressed.textContent;
                        else       {
                            para.textContent=buttonPressed.textContent;
                            i=0;
                        }
                            
                        } 
                    else
                    para.textContent+=buttonPressed.textContent;
                }
        if(flagOperator===1 && buttonPressed.textContent==='='){
            checkOperator(operatorPressed);
            operatorReset(operatorPressed);
        }
            //number removal->backspace

                    if(para.textContent && buttonPressed.parentNode.parentNode.className==="clear")
                        {
                            if(buttonPressed.textContent==='<'){
                                if(para.textContent.length===1){
                                    para.textContent=`0`;
                                }
                                else{
                                    let arr=para.textContent.split('');
                                    arr.pop();
                                    para.textContent=arr.join('');
                                }
                        
                            //  para.textContent=para.textContent.split('').splice(-1,1).join("");
                            }
                            if(buttonPressed.textContent==='AC')
                            {
                                para.textContent=0;
                                operatorReset(operatorPressed);

                            }
                            
                        }
    buttonPressed=null;}
    return;
    
    }
    function checkDecimal(node){
        if(node.textContent==='.'){
            return para.textContent.split('').includes('.');
        
        }
    return false;
    }

    function operatorReset(node){
        flagOperator=0;
            operatorPressed=null;
        node.style.backgroundColor=`rgb(243, 217, 217)`;
        node.parentNode.style.scale='1';


    }
    let firstOperator;
    let operatorPressed;
    let i=0;
    //operator state
    function operatorButtonState(operator){
        if(flagOperator===0)
            i=1;
        else if(flagOperator===1 && i===0)
        {
            checkOperator(operatorPressed);
            i=1;
        }
    firstOperator=para.textContent;
    if(operatorPressed)
        operatorReset(operatorPressed);
    flagOperator=1;

    operatorPressed=operator;
    console.log(`${operatorPressed.textContent} ${i}`)
changeOperatorBg(operatorPressed);
    return;
    }
function changeOperatorBg(operator){
    operator.style.backgroundColor=`rgb(233, 233, 253)`;
    operator.parentNode.style.scale='.9';

}



    function checkOperator(operator){
        let newArr
        let firstOne=parseFloat(firstOperator);
        let secondOne=parseFloat(para.textContent)
    if(operator.textContent==='/')
        para.textContent=divide(firstOne,secondOne);
    else if(operator.textContent==='X')
        para.textContent=multiply(firstOne,secondOne)
    else if(operator.textContent==='+')
        para.textContent=sum(firstOne,secondOne);
    else
        para.textContent=subtract(firstOne,secondOne);
    if(para.textContent.length>=11 && para.textContent.includes('.')){         
        newArr=para.textContent.split('');
        newArr.splice(11);
    para.textContent=newArr.join('')
    }
    return;
    }
    //operations

    function divide(a,b){
        return `${a/b}`;
    }
    function multiply(a,b){
        return `${a*b}`;
    }
    function sum(a,b){
        return `${a+b}`;
    }

        function subtract(a,b){
            return `${a-b}`;
        }