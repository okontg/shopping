const shopProduct = document.getElementById('product');

let basket = JSON.parse(localStorage.getItem('product')) || [];


const generateShop = ()=>{
  return (shopProduct.innerHTML = product.map((x)=>{
    const {id, image, name, description, price } = x;
    const search = basket.find((x)=>x.id === id) || [];
    return `
      <div id=product-id-${id} class="content-wrapper">
        <div class="image">
            <img src=${image} alt="product image" width="80">
        </div>
        <div class="product-details">
          <h3>${name}</h3>
          <p>${description}</p>
          <div class="info">
            <h2>$ ${price}</h2>
            <div class="button">
              <button onclick="decrementFun(${id})" class="decrement">-</button>
              <span id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</span>
              <button onclick="incrementFun(${id})" class="increment">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join(''));
}
generateShop();

const incrementFun = (id) => {
  const selectedItem = id;
  const search = basket.find((x)=> x.id === selectedItem.id);

  if(search === undefined){
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  }
  else{
    search.item +=1;
  }
  
  updateFun(selectedItem.id);
  localStorage.setItem('product',JSON.stringify(basket));
} 

const decrementFun = (id) =>{
  const selectedItem = id;
  const search = basket.find((x)=> x.id === selectedItem.id);

  if(!search)return;
  else if(search.item === 0)return;
  else{
    search.item -=1;
  }

  updateFun(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  
  localStorage.setItem('product',JSON.stringify(basket));
}

const updateFun = (id)=>{
  const search = basket.find((x)=>x.id === id)
  const value = search.item;

  document.getElementById(id).innerHTML = value;

  sumItems();
}

const sumItems = ()=>{
  const addUp = basket.map((x)=>x.item).reduce((x,y) => x+y,0);
  document.querySelector('.absolute').innerText = addUp;
}

sumItems();

