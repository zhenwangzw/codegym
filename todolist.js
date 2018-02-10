console.log('have fun')

$(document).ready(function(){
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      // alert("Ready");
      console.log('modal open:',modal);
      console.log('trigger open:',trigger);
    },
    complete: function(modal) { 
      // alert('Closed'); // Callback for Modal close
      console.log('modal close:',modal)
    } 
  });
})




// Define UI variables
const form=document.querySelector('#todolist-form')
const todolist=document.querySelector('.collection')
const clearBtn=document.querySelector('.clear-list')
const filter=document.querySelector('#filter')
const todoiteminput=document.querySelector('#todoitem')
const myBtn=document.querySelector('#myBtn')


// Modal variables
const confirmModal=document.querySelector('.modal')
const confirmTitle=document.querySelector('#confirmTitle')
const confirmMsg=document.querySelector('#confirmMsg')
const noBtn=document.querySelector('#modal-btn-no')
const yesBtn=document.querySelector('#modal-btn-yes')


// Create DOM UI for item
function createToDoItemUIElement(item){
  const li=document.createElement('li')
  li.className='collection-item'
  li.appendChild(document.createTextNode(item))

  const link=document.createElement('a')
  link.className='delete-item secondary-content'
  link.innerHTML='<i class="fa fa-remove"></i>'
  
  li.appendChild(link)

  todolist.appendChild(li)
}

// Load to do list from localStorage and show them in UI
function getToDoList(){
  let toDoList
  if(localStorage.getItem('to-do-list')===null){
    toDoList=[]
  } 
  else{
    toDoList=JSON.parse(localStorage.getItem('to-do-list'))
  }

  toDoList.forEach(function(item){
    createToDoItemUIElement(item)
  })
}

// Load all event listeners
loadEventListeners()

function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getToDoList)

  // Add to do item 
  form.addEventListener('submit',addToDoItem)
  
  // Remove to do item
  todolist.addEventListener('click',removeToDoItem)

  // Clear to do list
  clearBtn.addEventListener('click',clearToDoList)

  // Filter to do list
  filter.addEventListener('keyup', filterToDoList)
}



// Add to do item
function addToDoItem(e){
  let item=todoiteminput.value
  if(item===''){
    alert('nothing to add')
  }
  else{
    createToDoItemUIElement(item)

    // Store in localStorage
    storeToDoItemInLocalStorage(item)

    // Clear/reset to do item input
    todoiteminput.value=''
  }
  e.preventDefault();
}

// Store to localStorage
function storeToDoItemInLocalStorage(item){
  let todoitems
  if(localStorage.getItem('to-do-list')===null){
    todoitems=[]
  }
  else{
    todoitems=JSON.parse(localStorage.getItem('to-do-list'))
  }
  
  todoitems.push(item)
  localStorage.setItem('to-do-list',JSON.stringify(todoitems))
}


// Remove to do item
function removeToDoItem(e){

  // Event delegation
  if(e.target.parentElement.classList.contains('delete-item')){

    // Get to do item content
    let itemTitle=e.target.parentElement.parentElement.textContent
    confirmTitle.innerHTML=`Are you sure to remove: ${itemTitle}?`
    
    // Confirmation before delete
    if(confirm(`Are you sure to remove: ${itemTitle}?`)){
      e.target.parentElement.parentElement.remove()

      removeToDoItemFromLocalStorage(itemTitle)
    }
  }

  e.preventDefault();
}

// Remove item from localStorage
function removeToDoItemFromLocalStorage(item){
  let todoitems
  if(localStorage.getItem('to-do-list')===null){
    todoitems=[]
  }
  else{
    todoitems=JSON.parse(localStorage.getItem('to-do-list'))
  }
  todoitems.forEach(function(todoitem, index){
    if(item===todoitem){
      todoitems.splice(index,1)
    }
  })

  localStorage.setItem('to-do-list',JSON.stringify(todoitems))
}

// Clear to do list
function clearToDoList(e){
  
  confirmTitle.innerHTML='Are you sure to clear all?'

  yesBtn.classList.add('clear-btn')

  // Faster clear performance from UI
  if(confirm('Are you sure to clear all?')){
    while(todolist.firstChild){
      todolist.removeChild(todolist.firstChild)
    }

    // Clear localStorage
    localStorage.clear()
  }

  e.preventDefault();  
}

// Filter to do list
function filterToDoList(e){
  const text=e.target.value.toLowerCase()
  document.querySelectorAll('.collection-item').forEach(function(item){
    const itemText=item.firstChild.textContent.toLowerCase()
    if(itemText.indexOf(text)!=-1){
      item.style.display='block'
    }
    else{
      item.style.display='none'
    }
  })

  e.preventDefault();  
}