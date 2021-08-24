function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator,a,b){
    var result;
    switch(operator){
        case "+":
            result=add(a,b);
            break;
        case "-":
            result=subtract(a,b);
            break;
        case "*":
            result=multiply(a,b);
            break;
        case "/":
            result=divide(a,b);
            break;
        default:
            console.log("no operator");
    }   
    return result;
    
}
var display=document.querySelector(".screen");

var storeNum="";

var firstNum;

var operator="";

dec=12;

function convertToNum(arr){
    var total=0;
    var pow=0;
    var powneg=-1;

    if(arr.includes(".")==true){
        
        var number=arr.split(".");
        var decimal=number[1];
        var integer=number[0];
        for(var i=0;i<decimal.length;i++){
            total=total+decimal[i]*(Math.pow(10,powneg));
            powneg--;
        }
        for(var i=integer.length-1;i>=0;i--){
            total=total+integer[i]*(Math.pow(10,pow))
            pow+=1;
        }
    }
    else{
        for(var i=arr.length-1;i>=0;i--){
            total=total+arr[i]*(Math.pow(10,pow))
            pow+=1;
        }
    }
  
    
    return total;
}

function storeFirstNum(arr){
    firstNum=convertToNum(arr);
}


function displayNum(num){
    
    storeNum=storeNum.concat(num);

    
    //display.textContent=convertToNum(storeNum);
    display.textContent=storeNum;
}

function clear(){
    storeNum="";
    firstNum=undefined;
    operator="";
    display.textContent="";
    enableDecimal();
}

function roundNumber(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

function percent(){
    storeNum=String(storeNum/100);
    display.textContent=storeNum;
}
function neg(){
    storeNum=String(storeNum*-1);
    display.textContent=storeNum;
}

function disableDecimal(){
    document.getElementById(".").disabled=true;
}
function enableDecimal(){
    document.getElementById(".").disabled=false;
}
function addDecimal(){
    storeNum=storeNum.concat(".");
    disableDecimal();
    display.textContent=storeNum;
}

function backspace(){
    if(storeNum!=""){
        storeNum=storeNum.substring(0,storeNum.length-1);
        display.textContent=storeNum;
    }
}

var buttonList=document.querySelectorAll("button");

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});
buttonList.forEach(function(button){
    button.addEventListener("click", function(e){
        
        if(this.className=="number"){
            displayNum(this.id);
        }
        else if(this.className=="operator"){
            if(firstNum==undefined){
                storeFirstNum(storeNum);
                storeNum="";
                operator=this.id;
                enableDecimal();
            }
            else if(storeNum!=""){
                
                firstNum=operate(operator,firstNum,convertToNum(storeNum));
                firstNum=roundNumber(firstNum,dec);
                display.textContent=firstNum;
                storeNum="";
                enableDecimal();
                operator=this.id;
            }
            else{
                operator=this.id;
                storeNum="";
                enableDecimal();
            }
            
        }
        else if (this.id=="back"){
            backspace();
        }
        else if(this.id=="neg"){
            neg();
        }
        else if(this.id=="clear"){
            clear();
        }
        else if (this.id=="."){
            addDecimal();
        }
        else if (this.id=="%"){
            percent();
        }
        else if(this.id=="="){
            if(firstNum!=undefined){
                //console.log(opeate);
                // if(checkDivideZero()==true){
                //     display.textContent="no pls";
                // }
                
                    // firstNum=operate(operator,firstNum,convertToNum(storeNum));
                    // firstNum=roundNumber(firstNum,dec);
                    // display.textContent=firstNum;
                    // storeNum="";
                    var test=operate(operator,firstNum,convertToNum(storeNum));
                    test =roundNumber(test,dec);
                    display.textContent=test;
                    firstNum=undefined;
                    storeNum=String(test);
                    
              
                //console.log(operate(operator,firstNum,convertToNum(storeNum)));
            }
        }
        
    })
})


