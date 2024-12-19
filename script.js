    //initialisations
    
    let numberArray=Array.from(document.querySelectorAll(".numbers > div"));   //number button divs
    const numberContainer=document.querySelector(".numbers");//class of all of number button divs
    let operatorArray=Array.from(document.querySelectorAll(".operators > div"));     //operator button divs
    const operatorContainer=document.querySelector(".operators");//class of all operator button divs
    let buttonArray=Array.from(document.querySelectorAll("button"));
    const container=document.querySelector(".container");   //project main container
           //seting up lower keys
           //operator keys css
        operatorArray.forEach((operator)=>{
            operator.style.width=`100%`;
            operator.style.height=`23%`;
            operator.style.borderRadius=`50%`;
            operator.setAttribute("id",`op${operatorArray.indexOf(operator)}`);
        })
        //setting up number keys
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
    let elementPressed;
    let keyPressed; //handles state of key pressed
    let buttonPressed;    //handles state of buton pressed
    let flagOperator=0;
    let operatorPressed;  // handles state of operator pressed
    let firstOperator; //first operator for operation
    let i=0; //flag to verify consecutive operator clicked or oher operators when operaor pressed state is active

    //key state


    const display=document.querySelector(".display");  //handles display
    let para=document.createElement('p');  //holds the displays textcontent
    para.textContent=`0`;
    display.appendChild(para);

    //calculation vars
    let exponentialPow;
   
    
//calling functions
//attaching key event listener to container
    addKeyListener();

    //add event listener to all buttons
    buttonArray.forEach((button)=>{
        button.parentNode.style.boxShadow=`1.5px 1.5px 2.5px 1.5px #dddddd`;
        button.setAttribute("class",`${buttonArray.indexOf(button)}`);

        button.addEventListener("mousedown",buttonStyle)
        container.addEventListener("mouseup",buttonReset)
    })
    function addKeyListener(){
        container.focus();
        document.addEventListener("keydown",buttonStyle);
        document.addEventListener("keyup",buttonReset);
    }





    //function to style buton upon mousedown for all the buttons exept operators
        function buttonStyle(e){
            console.log(`${ e.key} hi `);

            elementPressed=checkElementPressed(e);
                elementPressed.parentNode.style.scale='.96';
                if(elementPressed.parentNode.parentNode.className==="operators")
                    elementPressed.style.backgroundColor=`rgb(230, 230, 230)`;

                elementPressed.style.backgroundColor=`rgb(238, 230, 230)`;
                //console.log("hey");
                
                
        }
        function checkElementPressed(e)
        {
            if(e.key)
                return checkKey(e.key)
            else 
            return e.target;
        
        }

        function checkKey(node){
            if(node==='Backspace')
                node='<';
            if(node==='Enter')
                node='=';
            if(node==='Escape')
                node='AC'
            return buttonArray.find((button)=>{
                return button.textContent===node});
            
        }

                //upon mouseup, how different button types behave
                //button types:operators, numbers, result(=), clear(AC) and backspace
                function buttonReset(e){
                    if(elementPressed)
                    {  

                        //styling  
                            elementPressed.style.backgroundColor=`rgb(238, 238, 238)`;
                            elementPressed.parentNode.style.scale='1';
                            console.log(elementPressed.textContent);
                            if(elementPressed.textContent==='AC'|| elementPressed.textContent==='='){
                                elementPressed.style.backgroundColor= 'rgb(233, 233, 253)';
                                }


                        //button type:operator
                            if(elementPressed.parentNode.parentNode.className==="operators")
                            {

                                    operatorButtonState(elementPressed);
                                    console.log(operatorPressed)
                                    
                            }
                
                        //button type: number
                            if(elementPressed.parentNode.parentNode.className==="numbers" && para.textContent.length<=11)
                                {
                                    console.log(flagOperator)
                                        //checks if operator pressed state has been just active
                                        if(flagOperator===1 && i===1)
                                        {
                                            
                                         para.textContent='0';
                                        } 
                                     
                                        //number type:decimal(duplicacy checked)                                    
                                        if(checkDecimal(elementPressed))
                                            {
                                            return;//do nothing -> 1.
                                        }


                                        //if operator state has just been active or calculator has been reset, checks for both and starts display from 0
                                        if(para.textContent===`0`){
                                            
                                            if(elementPressed.textContent==='.')
                                                para.textContent+=elementPressed.textContent;
                                            else       {
                                                para.textContent=elementPressed.textContent;
                                                i=0;
                                            }
                                                
                                            } 
                                       //concatenate the numbers to para's text
                                        else
                                        {
                                            console.log("gaunik")
                                            para.textContent+=elementPressed.textContent;

                                        }
                                }


                        //button type:result    
                            // do the operation and reset the pressed operator
                            if(flagOperator===1 && elementPressed.textContent==='=')//only operate if operator pressed is active
                                {
                                    checkOperator(operatorPressed);
                                    operatorReset(operatorPressed);
                                }



                        //button type: clear and backspace
                            
                            if(para.textContent && elementPressed.parentNode.parentNode.className==="clear")
                                {
                                    //backspace
                                    if(elementPressed.textContent==='<'){
                                            //if backspacing on empty display
                                            if(para.textContent.length===1){
                                            para.textContent=`0`;
                                            }
                                            else{
                                            let arr=para.textContent.split('');
                                            arr.pop();
                                            para.textContent=arr.join('');
                                            }
                                    }
                                    //clear, set para to 0 and reset pressed operator
                                    if(elementPressed.textContent==='AC')
                                    {
                                        para.textContent=0;
                                        operatorReset(operatorPressed);

                                    }
                                    
                                }

                elementPressed=null; //button pressed state:inactive
        
            }
            return;
                
        }


                            //function declerations for state verification
                                    // to check decimal duplicacy
                                    function checkDecimal(node)
                                    {
                                        if(node.textContent==='.'){
                                            return para.textContent.split('').includes('.');
                                    
                                    }
                                        return false;
                                }
                           
                                    
    //operator state
        function operatorButtonState(operator)
        {
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
            changeOperatorBg(operatorPressed);

            return;
        }
                ////changes operator style is operator state is active
                function changeOperatorBg(operator)
                {
                    operator.style.backgroundColor=`rgb(233, 233, 253)`;
                    operator.parentNode.style.scale='.9';

                }
                 //to reset the operator's state
                function operatorReset(node)
                {
                        flagOperator=0;
                        operatorPressed=null; 
                        node.style.backgroundColor=`rgb(243, 217, 217)`;
                        node.parentNode.style.scale='1';
                }


//calculaitons
    function checkOperator(operator){

        let newArr
        let firstOne=parseFloat(firstOperator);
        let secondOne=parseFloat(para.textContent);
        if(firstOperator.includes('e'))
        {
            let firstArray=firstOperator.split('');
            let arrayReformed=firstArray.splice(0,5);
            
            firstArray.splice(0,1);
            
            let expNum=Math.pow(10,parseInt(firstArray.join('')));
            firstOne=parseFloat(arrayReformed.join(''))*expNum;
            console.log(firstOne)
            
        }
    if(operator.textContent==='/')
        para.textContent=divide(firstOne,secondOne);
    else if(operator.textContent==='X')
        para.textContent=multiply(firstOne,secondOne)
    else if(operator.textContent==='+')
        para.textContent=sum(firstOne,secondOne);
    else
        para.textContent=subtract(firstOne,secondOne);
    console.log(para.textContent);
    //check for extreme numbers
if(para.textContent.includes('e'))
    {
        newArr=para.textContent.split('');
        let arrPush;
    let splitArr=newArr.splice(0,5);
    arrPush=newArr.splice(newArr.indexOf('e'));
   
    splitArr.push(`${arrPush.join('')}`);
        console.log(splitArr)
para.textContent=splitArr.join('');
    }
    //
    else if(para.textContent.length>=11 && para.textContent.includes('.')){         
        newArr=para.textContent.split('');
        newArr.splice(8);
        if(newArr[newArr.length-1]==='.')
            newArr.pop();
    para.textContent=newArr.join('')
    }
    //
    else if(para.textContent.length>11 && !para.textContent.includes('.')){         
        newArr=para.textContent.split('');
            let ArrLength=newArr.length-5;
        let splitArr=newArr.splice(0,5)
        splitArr.push(`e+${ArrLength}`);

    para.textContent=splitArr.join('');
    
    }
    return;
    }
    function checkExtremeNum(arr){
            if(arr.includes('+'))
            return '+';
            if(arr.includes('-'))
                return '-';
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