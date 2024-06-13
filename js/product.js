let trainCartCount = 3; // make it variable later
let cartCount = 0;
let products = [ // array of objects to generate cards
    {
        name: 'Trains',
        cost: 2 * trainCartCount - 0.01,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/train3.jpg',
        alt: 'The lead cart of a wooden toy train.',
        desc: 'Soar through imaginative skies with this classic wooden airplane. Handcrafted from sustainable Baltic birch wood with a safe, natural harvest finish and a spinning propeller. Measures 3.5"H x 7"L x 7"W.'
    },
    {
        name: 'Planes',
        cost: 2.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/plane1.jpg',
        alt: 'Wooden toy plane.',
        desc: ''
    },
    {
        name: 'Cars',
        cost: 2.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/car2.jpg',
        alt: 'Wooden old timey car.',
        desc: ''
    },
    {
        name: 'Boats',
        cost: 3.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/boat2.jpg',
        alt: 'Wooden toy boat.'
    },
    {
        name: 'General Block Set',
        cost: 6.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/block1.jpg',
        alt: 'A hodgepodge of generic wooden blocks.'
    }
];

function generateProducts(productObject, productID) { // will grab objects and put them in HTML
    const productContainer = document.getElementById(productID);

    productObject.forEach((product, productIndex) => {
      const card = document.createElement('div');
      card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'mb-3'); // responsive

      // generate HTMLs
      card.innerHTML = `
      <div style="background-color: #ff914d; width: 20rem;">
        <img class="card-img-top" src="${product.image}" alt="${product.alt}">
        <div class="card-block">
          <h4 class="card-title">${product.name}</h4>

        </div>
      </div>
      `
      productContainer.appendChild(card);
    });
};
generateProducts(products, 'products')

// OLD CART CODE
var shoppingCart = (function() {
    cart = []; // stores cart items
  
  
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    } // grabs data from data-name data-price and creates count
  
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
  
    // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) { // only load if there is data
      loadCart();
    }
  
    var obj = {}; // will hold methods to manage cart, generated below
  
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>"
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = "
        + "<td>" + cartArray[i].total + "</td>"
        + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();