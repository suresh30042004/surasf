const btnCart=document.querySelector('#cart-icon');
const Cart=document.querySelector('.cart-index');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
    Cart.classList.add('cart-active');
});
btnClose.addEventListener('click',()=>{
    Cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadproduct);
function loadproduct(){
    loadContant();
}
function loadContant(){
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem)
    });

    let qtyElement=document.querySelectorAll('.cart-quantity');
    qtyElement.forEach((input)=>{
        input.addEventListener('change',changeQty)
    });

    let cartBtns=document.querySelectorAll('.add-to-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addcart);
    });
    
    updateTotal();

}



function removeItem(){

    let title=this.parentElement.querySelector('.cart-product-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContant();
}

function changeQty(){
    if(isNaN(this.value)|| this.value<1){
        this.value=1;
    }
    loadContant();
}

let itemList=[];

function addcart(){
    let product=this.parentElement;
    let title=product.querySelector('.product-title').innerHTML;
    let price=product.querySelector('.product-price').innerHTML;
    let imgSrc=product.querySelector('.product-img').src;
    // console.log(title,price,imgSrc);

    let newProduct={title,price,imgSrc}

    if(itemList.find((el)=>el.title==newProduct.title))
    {
        alert("Product Already Added In  Cart");
        return;
    }else{
        itemList.push(newProduct);
    }

    let newProductElement=createCartProduct(title,price,imgSrc);
    let element=document.createElement('div');
    element.innerHTML=newProductElement;
   
    let cartBasket=document.querySelector('.cart-contant');

    cartBasket.append(element);
    loadContant();
}

function createCartProduct(title,price,imgSrc){
 return `
      <div class="cart-box">
               <img src="${imgSrc}" class="">
               <div class="detail-box">
                   <div class="cart-product-title">${title}</div>
                   <div class="price-box">
                      <div class="cart-price">${price}</div>
                      <div class="cart-amt">${price}</div>
                   </div>
                   <input type="number" value="1" class="cart-quantity">
               </div>
               <ion-icon name="trash" class="cart-remove"></ion-icon>
            </div> 
 
 `;
}
function updateTotal(){
   const cartItem = document.querySelectorAll('.cart-box');
   const totalValue = document.querySelector('.total-price');

   let total=0;

   cartItem.forEach(product =>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("₹",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="₹"+price*qty;

   });

   totalValue.innerHTML="₹"+total;
  
//    ===== adding in cartitems====== //
    
  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;




}

