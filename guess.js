;(function(global){

  // global variables
  let min=1
  let max=10
  let guessTimeLeft=3
  let winNum=getRandomNum(min,max)
  console.log(winNum)

  // UI variables
  // UI - SEARCH
  const srhForm=document.querySelector('#search-form')
  const srhBar=document.querySelector('#search-text')
  const srhBtn=document.querySelector('#search-btn')
  
  // UI - GUESS NUMBER GAME
  const minNum=document.querySelector('#min-num')
  const maxNum=document.querySelector('#max-num')
  const guessSection=document.querySelector('#guess-section')
  const guessNum=document.querySelector('#guess-num')
  const guessBtn=document.querySelector('#guess-btn')
  const guessMsg=document.querySelector('#guess-msg')
  const restartBtn=document.querySelector('#restart-btn')

  // SEARCH SECTION
  srhBtn.addEventListener('click',function(){
    if (srhBar.value===''){
      alert('no search values')
    } else {
      window.open(`https://www.google.co.nz/search?query=${srhBar.value}`)
    }
  })

  // GUESS NUMBER GAME
  minNum.textContent=min
  maxNum.textContent=max
  
  restartBtn.style.display='none'
  
  // event listener on submit button
  guessBtn.addEventListener('click',function(){
    
    let guessNumber=parseInt(guessNum.value)
    
    //validate
    let isValidate=!(isNaN(guessNumber)||guessNumber<min||guessNumber>max)
    
    if(!isValidate){
      setGuessMsg(`Please enter a number between ${min} and ${max}`,'red')
    } 
    
    //feedback
    else{

      if(guessNumber===winNum){
        //if guess correct
        gameEnded(true,`${winNum} is correct! YOU WON~`)
      } else{
        guessTimeLeft -= 1
        //if no guess time
        if(guessTimeLeft===0){
          gameEnded(false,`YOU LOST~ ${winNum} is the number.`)
        } else{
          guessNum.value=''
          setGuessMsg(`${guessNumber} is incorrect, ${guessTimeLeft} guess time left!`,'red')
        }
      }
      
    }
  })
  
  // event listener on playagain button
  restartBtn.addEventListener('click',reset)
  
  // event listener on playagain button 2
  // event delegation (dynamic element:the button new classname is added after page was loaded)
  guessSection.addEventListener('mousedown',playAgain)

  function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
  }

  function setGuessMsg(msg,color){
    guessMsg.textContent=msg
    guessMsg.style.color=color
  }
  
  function gameEnded(isWon,msg){
    let color=isWon?'green':'red'
    // guessBtn.disabled=true
    guessBtn.value='play again'
    guessBtn.className='playagain'
    guessBtn.style.color='white'
    guessBtn.style.backgroundColor='green'
    guessNum.disabled=true
    guessNum.style.borderColor=color
    setGuessMsg(msg,color)
    // restartBtn.style.display='block'
  }

  function reset(){
    window.location.reload(true)
    // guessTimeLeft=3
    // guessNum.value=''
    // guessNum.disabled=false
    // guessNum.style.borderColor='auto'
    // guessMsg.style.display='none'
    // restartBtn.style.display='none'
  }

  function playAgain(e){
    if(e.target.classList.contains('playagain')){
      window.location.reload()
    }
  }



})(window)