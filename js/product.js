let cartCount = 0;
let products = [ // array of objects to generate cards
    {
        name: 'Trains',
        cost: 1.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/train3.jpg',
        alt: 'The lead cart of a wooden toy train.',
        desc: 'Embark on a charming journey with this beautiful handcrafted wooden train set. Engine and three interchangeable cars boast intricate details made from real beech wood. Large size (84cm L x 11cm H x 13cm W) with moving wheels and a fully ecological design.'
    },
    {
        name: 'Planes',
        cost: 2.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/plane1.jpg',
        alt: 'Wooden toy plane.',
        desc: 'Soar through imaginative skies with this classic wooden airplane. Handcrafted from sustainable Baltic birch wood with a safe, natural harvest finish and a spinning propeller. Measures 3.5"H x 7"L x 7"W.'
    },
    {
        name: 'Cars',
        cost: 2.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/car2.jpg',
        alt: 'Wooden old timey car.',
        desc: 'This heirloom-quality wooden car is a timeless treasure. Handcrafted from domestic and exotic hardwoods with a clear lacquer finish, this unique car will inspire generations of imaginative play. Please note potential choking hazards for small children.'
    },
    {
        name: 'Boats',
        cost: 3.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/boat2.jpg',
        alt: 'Wooden toy boat.',
        desc: 'Set sail for bathtub adventures with this adorable wooden boat. Made from solid Maine white pine, this handcrafted toy floats and features rounded edges for safety. Includes two peg "lobster people." Size: 10.5"W x 3.5"H.'
    },
    {
        name: 'General Block Set',
        cost: 6.99,
        description: 'lorem ipsum dolor',
        image: 'imgs/products/block1.jpg',
        alt: 'A hodgepodge of generic wooden blocks.',
        desc: 'Build creativity and imagination with this high-quality, 72-piece block set. Made from naturally finished and smooth-sanded hardwood blocks, this set comes in a convenient wooden storage crate (13” L x 12” W x 2” H).'
    }
];


function generateProducts(productObject, productID) { // will grab objects and put them in HTML
    const productContainer = document.getElementById(productID);

    productObject.forEach((product, productIndex) => {
      const card = document.createElement('div');
      switch (productIndex) { // makes top three and bottom two centered
        case 0:
        case 1:
        case 2:
          card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'mb-3', 'mx-auto', 'overflow-scroll');
          break;
        case 3:
        case 4:
          card.classList.add('col-12', 'col-sm-6', 'mb-3', 'mx-auto', 'overflow-scroll');
      }
      // generate HTMLs
      card.innerHTML = `
      <div class="card" style="background-color: #ff914d; width: 20rem;">
        <img class="card-img-top" src="${product.image}" alt="${product.alt}">
        <div class="card-block">
          <h4 class="card-title">${product.name}</h4>
          <p class="card-text">${product.desc}</p>
            <p class="card-text">Price: $${product.cost}</p>
            <a href="#" data-name="${product.name}" data-price="${product.cost}" class="add-to-cart btn btn-theme2">Add to cart</a>
        </div>
      </div>
      `
      productContainer.appendChild(card);
    });
};
generateProducts(products, 'products');

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
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-theme' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-theme input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
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