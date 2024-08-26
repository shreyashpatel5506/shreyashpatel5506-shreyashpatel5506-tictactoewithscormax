let boxes=document.querySelectorAll(".box")
let reset= document.querySelector("#reset-btn")
let newgame=document.querySelector("#new-btn")
let msg=document.querySelector("#msg")
let msgContainer = document.querySelector(".msg-container");
let winnero=document.querySelector("#wino")
let winnerx=document.querySelector("#winx")
let  name1=document.querySelector('#name1')
let name2=document.querySelector('#name2')
let  inputname1=document.querySelector('#name1i')
let inputname2=document.querySelector('#name2i')
let maxscore=document.querySelector('#maximum')
let turnO=true
let count=0
let winO=0;
let winX=0;

function submit() {
    // Assuming name1 and name2 are IDs
    document.getElementById("name1").innerText = "Winning score of " + inputname1.value;
    document.getElementById("name2").innerText = "Winning score of " + inputname2.value;

    // Add class to the main element
    document.querySelector(".container").classList.add("main2");

    // Add class to all elements with class 'scoredisplay'
    const scoreDisplays = document.getElementsByClassName("scoredisplay");
    for (let i = 0; i < scoreDisplays.length; i++) {
        scoreDisplays[i].classList.add("score");
       
    }
    let scrolled500px = false;

window.addEventListener('scroll', function() {
    if (window.scrollY >= 500) {
        scrolled500px = true;
    }
});
}


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];
  
boxes.forEach((box)=>{
    box.addEventListener("click",()=>
    {
        if(turnO){
            box.innerText='O'
            turnO=false;
        }
        else{
            box.innerText='X'
            turnO=true;
        }
        box.disabled=true;
        count++;
        let isWinner = checkwinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
    })
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    for(let box of boxes){
        box.disabled=true;
       
    }
  };

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    for(let box of boxes){
        box.disabled=true;
    }
  };

const checkwinner= ()=>{
    for(let pattern of winPatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!=="" && pos2!=="" &pos3!==""){
            if(pos1==pos2 && pos2==pos3){
                if(pos1=='O'){
                    winO +=2
                    winX -= 1
                    winnero.innerText=winO
                    winnerx.innerText=winX
                    if (winO >= maxscore.value || winX >= maxscore.value) {
                        document.querySelector(".container1").style.display="block";
                        document.querySelector(".maincontainer").style.display="none";
                        if(winX>=maxscore){
                            document.querySelector("#finalwinner").innerText=inputname2.value+"  is final winner"
                        }
                        else{
                            document.querySelector("#finalwinner").innerText=inputname1.value+"  is final winner"
                        }
                    }
                    
                }
                else{
                    winX+=2;
                    winO -=1
                    winnerx.innerText=winX
                    winnero.innerText=winO
                    if (winO >= maxscore.value || winX >= maxscore.value) {
                        document.querySelector(".container1").style.display="block";
                        document.querySelector(".maincontainer").style.display="none";
                        if(winX>=maxscore){
                            document.querySelector("#finalwinner").innerText=inputname2.value+"  is final winner"
                        }
                        else{
                            document.querySelector("#finalwinner").innerText=inputname1.value+"  is final winner"
                        }
                    }
                    
                }
                showWinner(pos1)
            console.log(pos1 +"is winner"+winO
                +winX
            )
            return true
            }
        }
    }
};
reset.addEventListener("click",()=>{
    turnO=true;
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""
    }
    count=0;
    msgContainer.classList.add("hide");
})
newgame.addEventListener("click", ()=>{
    turnO=true;
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""
    }
    document.querySelector(".container1").style.display="none";
    document.querySelector(".maincontainer").style.display="block"
    msgContainer.classList.add("hide");
    count=0;
    winO=0;
    winX=0;
    winnero.innerText="0"
    winnerx.innerText="0"
    inputname1.value=""
    inputname2.value=""
    maxscore.value=""
});
