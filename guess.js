;
(function (global) {

  // global variables
  let min = 1
  let max = 10
  let guessTimeLeft = 3
  let winNum = getRandomNum(min, max)
  console.log(winNum)

  // UI variables
  // UI - SEARCH
  const srhForm = document.querySelector('#search-form')
  const srhBar = document.querySelector('#search-text')
  const srhBtn = document.querySelector('#search-btn')

  // UI - GUESS NUMBER GAME
  const minNum = document.querySelector('#min-num')
  const maxNum = document.querySelector('#max-num')
  const guessSection = document.querySelector('#guess-section')
  const guessNum = document.querySelector('#guess-num')
  const guessBtn = document.querySelector('#guess-btn')
  const guessMsg = document.querySelector('#guess-msg')
  const restartBtn = document.querySelector('#restart-btn')

  //==================SEARCH SECTION==================
  srhBtn.addEventListener('click', function () {
    if (srhBar.value === '') {
      alert('no search values')
    } else {
      window.open(`https://www.google.co.nz/search?query=${srhBar.value}`)
    }
  })

  //==================GUESS NUMBER GAME==================
  minNum.textContent = min
  maxNum.textContent = max

  restartBtn.style.display = 'none'

  // event listener on submit button
  guessBtn.addEventListener('click', guessNumber)

  function guessNumber(e){

    let guessNumber = parseInt(guessNum.value)

    //validate
    let isValidate = !(isNaN(guessNumber) || guessNumber < min || guessNumber > max)

    if (!isValidate) {
      setGuessMsg(`Please enter a number between ${min} and ${max}`, 'red')
    }

    //feedback
    else {

      if (guessNumber === winNum) {
        //if guess correct
        gameEnded(true, `${winNum} is correct! YOU WON~`)
      } else {
        guessTimeLeft -= 1
        //if no guess time
        if (guessTimeLeft === 0) {
          gameEnded(false, `YOU LOST~ ${winNum} is the number.`)
        } else {
          guessNum.value = ''
          setGuessMsg(`${guessNumber} is incorrect, ${guessTimeLeft} guess time left!`, 'red')
        }
      }

    }

    e.preventDefault();
    
  }

  // event listener on playagain button
  restartBtn.addEventListener('click', reset)

  // event listener on playagain button 2
  // event delegation (dynamic element:the button new classname is added after page was loaded)
  guessSection.addEventListener('mousedown', playAgain)

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function setGuessMsg(msg, color) {
    guessMsg.textContent = msg
    guessMsg.style.color = color
  }

  function gameEnded(isWon, msg) {
    let color = isWon ? 'green' : 'red'
    // guessBtn.disabled=true
    guessBtn.value = 'play again'
    guessBtn.className = 'playagain'
    guessBtn.style.color = 'white'
    guessBtn.style.backgroundColor = 'green'
    guessNum.disabled = true
    guessNum.style.borderColor = color
    setGuessMsg(msg, color)
    // restartBtn.style.display='block'
  }

  function reset() {
    window.location.reload(true)
    // guessTimeLeft=3
    // guessNum.value=''
    // guessNum.disabled=false
    // guessNum.style.borderColor='auto'
    // guessMsg.style.display='none'
    // restartBtn.style.display='none'
  }

  function playAgain(e) {
    if (e.target.classList.contains('playagain')) {
      window.location.reload()
    }
  }

  /* ===THIS SECTION IS RECODED IN BOOKES6.JS FILE
  // ==================BOOKLIST SECTION==================
  // global localstorage
  const localStorage=global.localStorage
  
  //CONSTRUCTORS
  // Book constructor
  function Book(title,author,isbn){
    this.title=title
    this.author=author
    this.isbn=isbn
  }

  // Storage Constructor
  function LocalStorage(){}
  
  // Storage Prototype method
  LocalStorage.prototype.addBook=function(book){
    let bookList
    if(localStorage.getItem('book-list')===null){
      bookList=[]
    } else{
      bookList=JSON.parse(localStorage.getItem('book-list'))
    }

    bookList.push(book)
    localStorage.setItem('book-list',JSON.stringify(bookList))
  }

  LocalStorage.prototype.removeBook=function(book){
    let bookList
    if(localStorage.getItem('book-list')===null){
      bookList=[]
    } else{
      bookList=JSON.parse(localStorage.getItem('book-list'))
    }
    bookList.forEach((bookItem,index) => {
      if(book.isbn===bookItem.isbn){
        bookList.splice(index,1)
      }
    });
    localStorage.setItem('book-list',JSON.stringify(bookList))
  }

  LocalStorage.prototype.clearBook=function(){
    //
    if(confirm('are you sure to clear all books?')){
      while(global.bookList.firstChild){
        global.bookList.removeChild(global.bookList.firstChild)
      }

      localStorage.removeItem('book-list')
    }
  }
  
  // UI element
  const bookSection=document.querySelector('#book-section')
  const bookFormSection=document.querySelector('#book-form-section')
  const bookForm=global.bookForm=document.querySelector('#book-form')
  
  const bookTitle=global.bookTitle=document.querySelector('#book-title')
  const bookAuthor=global.bookAuthor=document.querySelector('#book-author')
  const bookIsbn=global.bookIsbn=document.querySelector('#book-isbn')
  const addBook=global.addBook=document.querySelector('#addbook')
  const bookList=global.bookList=document.querySelector('#booklist')
  


  // UI constructor
  function UI(){}

  UI.prototype.addBook=function(book){
    // UI create tr
    const row=document.createElement('tr')
    row.innerHTML=`
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">Delete</a></td>
    `
    bookList.appendChild(row)
  }

  UI.prototype.removeBook=function(e){
    if(e.target.classList.contains('delete')){
      const bookToDelete=e.target.parentElement.parentElement
      bookToDelete.remove()
    }
    e.preventDefault()
  }

  UI.prototype.clearBook=function(e){
    e.preventDefault()
  }
  
  UI.prototype.clearForm=function(){
    //clear form
    bookTitle.value=''
    bookAuthor.value=''
    bookIsbn.value=''
  }

  UI.prototype.showAlert=function(message,className){
    //create div
    const div=document.createElement('div')
    //add classes
    div.className=`alert ${className}`
    //add text
    div.appendChild(document.createTextNode(message))
    //use insertBefore
    bookFormSection.insertBefore(div,bookForm)
    setTimeout(function(){
      document.querySelector('.alert').remove()
    },3000)
  }

  
  //load event listener
  loadAllEventListeners()
  
  function loadAllEventListeners(){
    document.addEventListener('DOMContentLoaded',getBookList)
    bookForm.addEventListener('submit',addBookToBookList)
    bookList.addEventListener('click',removeBookFromBookList)
  }
  
  function getBookList(){
    let bookList
    if(localStorage.getItem('book-list')===null){
      bookList=[]
    } else{
      bookList=JSON.parse(localStorage.getItem('book-list'))
    }

    bookList.forEach((book)=>{
      const ui=new UI()
      ui.addBook(book)
    })
  }
  
  //event handlers
  function addBookToBookList(e){
    //form val
    const title=bookTitle.value
    const author=bookAuthor.value
    const isbn=bookIsbn.value

    const isValid=(title!==''&&author!==''&&isbn!=='')
    
    //instantiate UI
    const ui=new UI()
    //instantiate book
    const book=new Book(title,author,isbn)
    //instantiate localStorage
    const localStorage=new LocalStorage()
    
    if(isValid){
      //add book to list
      ui.addBook(book)
  
      // Show success
      ui.showAlert('Book added.','success')
      //clear form
      ui.clearForm()
  
      //add book to localstorage
      localStorage.addBook(book)
    } else{
      // alert('all fields must have value')
      ui.showAlert('Please fill in all fields.','error')
    }

    e.preventDefault();
  }

  //REMOVE book
  function removeBookFromBookList(e){
    if(e.target.classList.contains('delete')){
      //get book attributes
      const bookTitle=e.target.parentElement.parentElement.firstElementChild
      const bookAuthor=bookTitle.nextElementSibling
      const bookIsbn=bookAuthor.nextElementSibling

      if(confirm(`are you sure to delete ${bookTitle.textContent}?`)){
        //instantiate UI
        const ui=new UI()
        //instantiate book
        const book=new Book(bookTitle.textContent,bookAuthor.textContent,bookIsbn.textContent)
        //instantiate localStorage
        const localStorage=new LocalStorage()
        
        ui.removeBook(e)
        localStorage.removeBook(book)
        ui.showAlert('Book removed','success')
      }
    }
    e.preventDefault()
  }
  */
})(window)