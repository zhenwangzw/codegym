console.log('have fun')

// Define UI variables
const form=document.querySelector('#todolist-form')
const todolist=document.querySelector('.collection')
const clearBtn=document.querySelector('.clear-list')
const filter=document.querySelector('#filter')
const todoiteminput=document.querySelector('#todoitem')

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
    
    // Confirmation before delete
    if(confirm(`Are you sure to remove: ${itemTitle}?`)){
      e.target.parentElement.parentElement.remove()

      removeToDoItemFromLocalStorage(itemTitle)
    }
  }
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
  // todolist.innerHTML='<h3>Bye Bye Bye!</h3>'

  // Faster clear performance 
  if(confirm('Are you sure to clear all?')){
    while(todolist.firstChild){
      todolist.removeChild(todolist.firstChild)
    }
    localStorage.clear()
  }
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
}