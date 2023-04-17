import { menuArray , starsArr } from './data.js'

const listItem = document.getElementById ('list-item')
const order = document.getElementById ('order')
const loginForm = document.getElementById ('login-form')
const stars = document.getElementById ('stars')
const starsRate = document.getElementById ('stars-rate')
const closeBtn = document.getElementById ('close-btn')
const kudosEl = document.getElementById ('kudos')
const toggler = document.getElementById('toggler')

let orderArr = []


document.addEventListener('click',function(event){
    if(event.target.dataset.addBtn){
        handleAddBtnClick(event.target.dataset.addBtn)
        
    }else if(event.target.dataset.removeBtn){
        handleRemoveBtnClick(event.target.dataset.removeBtn)
    }else if(event.target.dataset.orderBtn){
        handleOrderBtnClick(event.target.dataset.orderBtn)
    }else if(event.target.dataset.star){
       
        handleStarClick(event.target.dataset.star)
    }
})
loginForm.addEventListener('submit',function(event){
    event.preventDefault()
    const loginFormData = new FormData(loginForm)
    const name = loginFormData.get('userName')
    orderArr = []
    order.innerHTML = `<h1 class='thank'>Thanks, ${name} ! Your order is on its way!</h1>`
    loginForm.style.display = 'none'
    setTimeout(function(){
        starsRate.style.display = 'flex'
    },1500)
   

})
closeBtn.addEventListener('click',function(){
    starsRate.style.display = 'none'
})

toggler.addEventListener('click',function(event){
    if(event.target.checked){
        document.body.classList.toggle('dark')
    }else{
        document.body.classList.toggle('dark')
    }
})
function handleAddBtnClick(id){
  
    menuArray.forEach( el =>{
        if(el.id === Number(id)){
            orderArr.push(el)
        }
    })
    render()
   
    
}
function getTotalPrice(){
    let sum = 0
    orderArr.forEach( el =>{
        sum +=el.price
    })
    return sum
}

function handleRemoveBtnClick(index){
    let newArr = []
   for(let i = 0; i < orderArr.length; i++){
        if( i != index){
            newArr.push(orderArr[i])
        }
   }
   orderArr = newArr
  
   render()

}

function handleOrderBtnClick(id){
   
    loginForm.style.display = 'flex'
}

function handleStarClick(id){
   starsArr.forEach(star=>{
        if(star.id === Number(id)){
            star.class = `solid`
            star.isChecked = true
        }
   })
   sayThanYou()
   render()
}

function sayThanYou(){
    let newArr = starsArr.filter(el=> el.isChecked)
    if(newArr.length === 5){
        kudosEl.innerText = `Thank You! Have a nice day! ❤️`
    }
}

function getOrderHtml(){
    let listOrderHtml = ''
    let orderHtml = ''
    let purchaseBtn = orderArr.length ?  `<button class='complete-order' data-order-btn ='order'>Complete an order</button>` : ''
    orderArr.forEach(item =>{
        listOrderHtml += `
        <div class="ordered-item">
            <div class="item-with-btn">
                <h3>${item.name}</h3>
                <button class="remove-btn" id="remove-btn" data-remove-btn = ${orderArr.indexOf(item)}>remove</button>
            </div>
        
            <h3>${item.price} $</h3>
        </div>
        ` 
  
    })
    return orderHtml = orderArr.length ?
    `<h2 class='order-title'>Your order</h2>
    ${listOrderHtml}
    <div class="total-price" id="total-price">
        <h3>Totla price:</h3>
        <h3>${getTotalPrice()} $</h3>
    </div>
    ${purchaseBtn}` : ''

     
}
function getStarsHtml(){
    let starsHtml = ''
    starsArr.forEach(star =>{
        starsHtml +=`
        <i class="fa-${star.class} fa-star " id='star-${star.id}'data-star = ${star.id}></i>
        `
    })
    return starsHtml
}
function getListItemHtml(){
    let listHtml = ''
    menuArray.forEach(item=>{
        listHtml += `
        
        <div class="item">
            <img class="item-img" src='${item.image}'/>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.ingredients}</p>
                <p class="price">${item.price} $</p>
            </div>
            <button class="add-btn" data-add-btn = '${item.id}'>+</button>
        </div>
        `
    })
    return listHtml
}
function render(){
    listItem.innerHTML = getListItemHtml()
 
    order.innerHTML =  getOrderHtml() 
    stars.innerHTML = getStarsHtml()

    
      
    
}
render()