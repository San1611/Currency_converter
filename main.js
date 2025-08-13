const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies/";


const dropdowns= document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr=document.querySelector(".From select");
const toCurr=document.querySelector(".To select");
const msg= document.querySelector(".msg");
// for (code in countryList){
//     console.log(code, countryList[code]);
// }


for( let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="From" && currCode==="USD")
        {
           newOption.selected="selected"; 
        }
        if(select.name==="To" && currCode==="INR")
        {
           newOption.selected="selected"; 
        }
        select.append(newOption);
    }   
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    })
}

const updateFlag =(element) =>{
    let currCode=element.value;
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

window.addEventListener("load", ()=>{
    updateExchangeRate();
})

btn.addEventListener("click", async (e)=>{
    e.preventDefault();
    updateExchangeRate();
    
})



const updateExchangeRate= async() =>
{
    let amt= document.querySelector(".amount input");
    let amtVal=amt.value;
    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amt.value="1";
    }

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data= await response.json();
    let toData=data[fromCurr.value.toLowerCase()];
    let rate=toData[toCurr.value.toLowerCase()];

    let finalAmt=rate*amtVal;

    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;


    // console.log(finalAmt);
}