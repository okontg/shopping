let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem('product')) || [];

const generateShoppingCart = ()=>{
  if(basket.length !== 0){
    return shoppingCart.innerHTML = basket.map((x)=>{
      let {id, item} = x;
      let search = product.find((y)=> y.id === id);
      const {image, name, price}= search;
      
      return `
          <div class="cart-item js-cart-item-${id} js-clear-shopping-cart">
            <img src=${image} alt="item-image" width=80>
            <div class="cart-product-details">
              <div class="details">
                <h3>${name}</h3>
                <span class="price">$${price}</span>
                <button onclick="deleteItem(${id})" class="delete">×</button>
              </div>
              <div class="button">
                <button onclick="decrementFun(${id})" class="decrement">-</button>
                <span id=${id} class="quantity">${item}</span>
                <button onclick="incrementFun(${id})" class="increment">+</button>
              </div>
              <div class="total-price">
                <h2>Total $${price * item}</h2>
              </div>
            </div>
          </div>
        `;
    }).join('')
  }
  else{
   label.innerHTML = `<h2>The Cart is Empty</h2>`;
   shoppingCart.innerHTML = `
     <a href="main.html">
       <button class=homeBtn>Back to Home</button>
     </a>
   `;
  }
}

generateShoppingCart();

const totalBill = ()=>{
  let amount = 0; 
  basket.map((sumUp)=>{
    let {id,item} = sumUp;
    const sumProduct = product.find((matcheId)=> matcheId.id === id);
    amount += item * sumProduct.price;
  })
  document.querySelector('.js-total-bill h2').innerHTML =`Total Bill: $${amount}`;
}

totalBill();

const incrementFun = (id)=>{
  const selectedItem = id;
  const search = basket.find((x)=> x.id === selectedItem.id);
  
  if(search){
    search.item +=1;
  }
  else{
    console.log('not matched');
  }
  updateItem(search.id);
}

const decrementFun =(id)=>{
  const selectedItem = id;
  const reduceItem = basket.find((x)=>x.id === selectedItem.id);
  if(reduceItem){
    reduceItem.item -= 1;
  }

  updateItem(selectedItem.id);

  if(reduceItem.item === 0){
    const removeItem = document.querySelector(`.js-cart-item-${reduceItem.id}`);
    removeItem.remove();
  }
  
  basket = basket.filter((x) => x.item !== 0);
  storage();
}

const updateItem = (id)=>{
  const updateValue = basket.find((x)=> x.id === id);
  if(updateValue){
    const values = updateValue.item;
    document.getElementById(id).innerHTML = values;
  }
  else{
    console.log('not value');
  }
  storage();
}

const calculateItems = ()=>{
  const addItem = basket.map((x)=> x.item).reduce((x,y)=> x + y,0);
  document.querySelector('.js-quantity').innerHTML = addItem;
  if(basket.length <= 0){
    label.innerHTML = `<h2>The Cart is Empty</h2>`;
    shoppingCart.innerHTML = `
     <a href="main.html">
       <button class=homeBtn>Back to Home</button>
     </a>
    `;
    document.querySelector('.js-total-bill').style.display = 'none';
  }
}
calculateItems();
 
const deleteItem = (id)=>{
  const deleteItem =  id;
  const removeItem = document.querySelector(`.js-cart-item-${deleteItem.id}`);
  removeItem.remove();

  basket = basket.filter((x)=> x.id !== deleteItem.id);
  storage();
}

const clearBasket =()=>{
  document.querySelector('.js-clear-cart').addEventListener('click',()=>{
    const confirmMessage = confirm('Are you sure you want to clear your item?');
    if(confirmMessage){
      /* if(basket.length >= 1){
        basket = basket.filter(()=> false);
        storage(); 
      }  */
     basket = [];
     storage(); 
    }  
  })
}
clearBasket();

const storage =()=>{
  localStorage.setItem('product', JSON.stringify(basket));
  calculateItems();
  generateShoppingCart();
  totalBill();
}