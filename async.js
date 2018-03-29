;(function(global){

  const asyncDiv=global.asyncDiv=document.querySelector('#async')
  const getDataBtn=global.getDataBtn=document.querySelector('#getDataBtn')
  getDataBtn.addEventListener('click',loadData)

  function loadData(){
    // instantiate xhr object
    const xhr=new XMLHttpRequest()
    
    // open
    xhr.open('GET','data.txt',true)

    // onload property
    xhr.onload=function(){
      if(xhr.status===200){
        showData(this.responseText)
      }
    }

    // send
    xhr.send()
  }

  function showData(data){
    const dataMsg=document.createElement('p')
    dataMsg.id='data'
    if(!document.querySelector('#data')){
      dataMsg.appendChild(document.createTextNode(data))
      asyncDiv.appendChild(dataMsg)
    }
  }

})(window)