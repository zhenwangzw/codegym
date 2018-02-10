;(function(global){

  const wrapper=document.querySelector('.wrapper')
  const left=document.querySelector('.left')
  const mid=document.querySelector('.mid')
  const right=document.querySelector('.right')

  left.addEventListener('mouseenter',()=>{
    wrapper.classList.add('hover-left')
  })
  mid.addEventListener('mouseenter',()=>{
    wrapper.classList.add('hover-mid')
  })
  right.addEventListener('mouseenter',()=>{
    wrapper.classList.add('hover-right')
  })

  left.addEventListener('mouseleave',()=>{
    wrapper.classList.remove('hover-left')
  })
  mid.addEventListener('mouseleave',()=>{
    wrapper.classList.remove('hover-mid')
  })
  right.addEventListener('mouseleave',()=>{
    wrapper.classList.remove('hover-right')
  })

})(window)