
$(document).on('ready', function() {
  renderMainSlider()
  getProductsByLocalStorage()
    
});

var PRODUCTS_IN_BASKET = {
    products: [],
    basketTotalPrice: 0
  };
var mainContainer=$("#mainContainer");
var tokenIndex = 0;
var token = allTokens[tokenIndex].tokens;
var productsInBasketTmpl = [];
var tastePrice;
var taste = "";
var base = "";
var baseTaste = "";
var caketypeTmpl = [];
var caketypeId = [];


mainContainer.on('click', "#linkDessert", function() {
    $(".content").hide(100);
    renderDescribeTmpl("dessertmpl", "desserts");
  });

mainContainer.on('click', "#linkDish", function() {
    $(".content").hide(100);
    renderDescribeTmpl("dishtmpl", "dishes");
});
mainContainer.on('click', ".slider-tastecake", function() {
    taste = $(this).attr("tasteAttr");
    var buyId = $(this).attr("buy-id");
    tasteElement = findByID(buyId, dataproducts);
    tastePrice = tasteElement.price;
});

mainContainer.on('click', ".baseTaste", function() {
    baseTaste = $(this).attr("tasteAttrCap");
    $(".tasteText").text(baseTaste);
});

mainContainer.on('click', ".chossebase", function() {
    base = $(this).attr("baseAttrCap");
    $(".baseText").text(base);
});
mainContainer.on('click', ".chosseTypestraw", function() {
    var productId = $(this).attr("cake-id");
   var  curentProduct = findByID(productId, dataproducts);
    renderTmpl("strawTasteTmpl","mainContainer", [curentProduct]);
});

mainContainer.on('click', ".chosseTypeCapcake", function() {
   var productId = $(this).attr("cake-id");
  var  curentProduct = findByID(productId, dataproducts);
    renderTmpl("capTasteTmpl", "mainContainer", [curentProduct]);
});

mainContainer.on('click', "#caketype1", function() {
    renderDescribeTmpl("WeddingCake", "cake2");
});

mainContainer.on('click', ".chosseTypeGift", function() {
   var productId = $(this).attr("cake-id");
   var  curentProduct = findByID(productId, dataproducts);
    renderTmpl("strawTasteTmpl", "mainContainer", [curentProduct]);
    
});

mainContainer.on('click', "#caketype2", function() {
    renderDescribeTmpl("cakeTmpl", "cake2");
});

mainContainer.on('click', "#caketype3", function() {
    renderDescribeTmpl("cakeTmpl", "cake3");
});

mainContainer.on('click', "#type1", function() {
    renderDescribeTmpl("strawberrytypeTmpl", "strawberrybox");
});

mainContainer.on('click', "#type2", function() {
    renderDescribeTmpl("strawberrytypeTmpl", "strawberryflowerbox");
});

mainContainer.on('click', "#type3", function() {
    renderDescribeTmpl("strawberrytypeTmpl", "strawberryflower");
});

mainContainer.on('click', "#sendOrder", function(event) {
    var orderText=getOrderText()
    var total = PRODUCTS_IN_BASKET.basketTotalPrice;
    var subject = $("#sendName").val();
    var message = $("#sendCommit").val();
    var number = $("#sendTel").val();
     var data = {
        "access_token": token,
        "subject": subject,
        "text": "  номер:" + number + "\n" + orderText + "Коментар:  " + message + "\n  Итого:" + total + "грн ",
    };
    sendReadyOrder(data);

});

mainContainer.on('click', "#order", function() {
    $('#myModal').modal('hide');
    renderDescribeTmpl("SendTmpl", "PRODUCTS_IN_BASKET");
});

mainContainer.on('click', ".basketproduct", function() {
    var massa = $(this).closest(".Lastcake").find("#inputcake").val();
    var sum = $(this).prev().val();
    var buyId = $(this).attr("buy-id");
    buyElement = findByID(buyId, dataproducts);
    buyElement.productIdBasket = Math.random();
    buyElement.taste = taste;
     initInformByProduct(buyElement,massa,sum)
});

$(".cakeLink").click(function() {
    $(".content").hide(100);
   renderDescribeTmpl("strawberrytmpl","titlecake")
});
$(".strawberryLink").click(function() {
    $(".content").hide(100);
   renderDescribeTmpl("strawberrytmpl","titlestraw")
})
$(".giftLink").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("giftTmpl", "giftbox");
});

$(".capcakeLink").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("capcakeTmpl", "capcake");
    renderCakeTasteSlider()
});

$(".dessertLink").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("dessertmpl", "desserts");
});
$(".candybarLink").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("candybarTmpl", "candybar");
});

$(".dishLink").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("dishtmpl", "dishes");
});

$(".dailyPayLink").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("dailyAndPay", "dishes");
});

$(".comment").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("commentTmpl", "dishes");
});

mainContainer.on('click', ".dellItem", function() {
    var dellId = $(this).attr("delAttr");
   dellProductInBasket(dellId)
    $(this).closest(".col-md-4").parent().hide();
  
    
});

mainContainer.on('click', ".addToBasket", function() {
   var productId = $(this).attr("cake-id");
   var curentProduct = findByID(productId, dataproducts);
    renderTmpl("cakeTasteTmpl", "mainContainer", [curentProduct]);
    renderCakeTasteSlider();
initPopover()
});

function renderMainSlider() {
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
    $(".lazy").slick({
        lazyLoad: 'ondemand', // ondemand progressive anticipated
        infinite: true
    });
}

function renderCakeTasteSlider() {
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
  }

function renderTmpl(tmplid, conteinerid, data) {
    var tmpl = document.getElementById(tmplid).innerHTML.trim();
    tmpl = _.template(tmpl);
     document.getElementById(conteinerid).innerHTML = tmpl({
        list: data
    });
}

function findByProductId(id, array) {
      for (i = 0; i < array.length; i++) {
        if (array[i].productIdBasket == id) {
         return Object.assign({}, array[i]);
        }
    }
}

function findElementById(dellId) {
    for (var i = 0; i < productsInBasketTmpl.length; i++) {
        if (productsInBasketTmpl[i].productIdBasket == dellId) {
            return i;
        }
    }
}

function findByID(id, array) {
    for (i = 0; i < array.length; i++) {
        if (array[i].id == id){
         return Object.assign({}, array[i]);
        }
     }
}

function getElementByType(typeArr) {
    var tmplArr = [];
    for (i = 0; i < dataproducts.length; i++) {
        if (dataproducts[i].type == typeArr) {
            tmplArr.push(dataproducts[i]);
        }
    }
    return tmplArr;
}

function renderDescribeTmpl(tmpl, typeArr) {
     $(".content").hide(100);
     var productsByType = getElementByType(typeArr);
     renderTmpl(tmpl, "mainContainer", productsByType);
};

function  basketTotalPrice() {
    PRODUCTS_IN_BASKET.basketTotalPrice = 0;
    for (var i = 0; i < PRODUCTS_IN_BASKET.products.length; i++) {
        if (PRODUCTS_IN_BASKET.products[i].globaltype == "cake") {
            PRODUCTS_IN_BASKET.basketTotalPrice = PRODUCTS_IN_BASKET.products[i].pricePerOne + PRODUCTS_IN_BASKET.basketTotalPrice;
        } else {
            PRODUCTS_IN_BASKET.basketTotalPrice = PRODUCTS_IN_BASKET.products[i].pricePerOne + PRODUCTS_IN_BASKET.basketTotalPrice;
        }
    }
};

function initPopover(){
    $("#informer1").popover();
    $("#informer2").popover();
    $("#informer3").popover();
    $("#informer4").popover();
    $("#informer5").popover();
};

function Tmplbasket() {
    if (PRODUCTS_IN_BASKET.products.length == 0) {
        sweetAlert("Oops...", "Корзина пуста", "error");
    } else {
        productsInBasketTmpl = PRODUCTS_IN_BASKET.products;
        productsInBasketTmpl.basketTotalPrice = PRODUCTS_IN_BASKET.basketTotalPrice;
        renderTmpl("basketTmpl", "mainContainer", productsInBasketTmpl);
    }
};

$('#myModal2').on('click', "#callBack", function() {
     data=getValueInput()
    sendFeedBack(data);
});

mainContainer.on('click', "#order", function() {
    $('#myModal').modal('hide');
    renderDescribeTmpl("SendTmpl", "PRODUCTS_IN_BASKET");
});

function getValueInput(){
   var total = PRODUCTS_IN_BASKET.basketTotalPrice;
    var subject = $("#backName").val();
    var number = $("#backTel").val();
     var data = {
        "access_token": "v3aot4ajvbw2htkqvyr94knv",
        "subject": subject,
        "text":"Перезвоніть мені будь-ласка мій номер " + number + " моэ імя " + subject,
    };
    return data
};

function onSuccessFeedBack(){
  renderDescribeTmpl("strawberrytmpl", "titlecake");
            $("#myModal2").hide();
            alert("Ми вам зателефонуем");
};

function sendFeedBack(data) {
        $("#callBack").val('Sending…');
        $("#callBack").prop('disabled', true);
       $.post('https://postmail.invotes.com/send',
            data,
            onSuccessFeedBack()
            ).fail();
         return false;
    };

function onSuccessOrder() {
    productsInBasketTmpl.length = 0
    $(".length-basket").text("0 грн")
    renderDescribeTmpl("strawberrytmpl", "titlecake")
};

function sendReadyOrder(data) {
    $("#sendOrder").val('Sending…');
    $("#sendOrder").prop('disabled', true);
    $.post('https://postmail.invotes.com/send',
            data,
            localStorage.clear(),
            onSuccessOrder()
        )
        .fail(function() {
            tokenIndex++;
            if (tokenIndex > allTokens.length) {
                console.log(11);
            } else {
                data.access_token = allTokens[tokenIndex].tokens;
                sendReadyOrder(data);
              }
            });
};

function getOrderText() {
        var readyOrder=" ";
         for (var i = 0; i < PRODUCTS_IN_BASKET.products.length; i++) {
          if (PRODUCTS_IN_BASKET.products[i].globaltype == "cake") {
            readyOrder = readyOrder + PRODUCTS_IN_BASKET.products[i].description + " " + PRODUCTS_IN_BASKET.products[i].pricePerOne + " грн " + PRODUCTS_IN_BASKET.products[i].taste + " " + PRODUCTS_IN_BASKET.products[i].kg + "кг; \n"
        } else if (PRODUCTS_IN_BASKET.products[i].type == "capcake") {
            readyOrder = readyOrder + "Номер капкейків " + PRODUCTS_IN_BASKET.products[i].id + " " + PRODUCTS_IN_BASKET.products[i].pricePerOne + " грн  " +
                PRODUCTS_IN_BASKET.products[i].kg + " шт на основі " + PRODUCTS_IN_BASKET.products[i].base + "  з начинкою " + PRODUCTS_IN_BASKET.products[i].TasteCapcake + " \n"
        } else {
            readyOrder = readyOrder + PRODUCTS_IN_BASKET.products[i].description + " " + PRODUCTS_IN_BASKET.products[i].pricePerOne + " грн  " + PRODUCTS_IN_BASKET.products[i].kg + "шт \n"
        }
    }return readyOrder;
};

function getProductsByLocalStorage(){
  try {
        if (localStorage.getItem("productsInLocal") !== null) {
            PRODUCTS_IN_BASKET =JSON.parse(localStorage.getItem("productsInLocal"));
            $(".length-basket").text(PRODUCTS_IN_BASKET.basketTotalPrice + "грн");
        }
    } catch (err) {
      console.log(1);
    }
}

function initInformByProduct(buyElement,massa,sum){
  if (buyElement.globaltype == "cake") {
        buyElement.kg = +massa;
        buyElement.price = tastePrice;
    } else {
        buyElement.kg = +sum;
    }
    buyElement.base = base;
    buyElement.TasteCapcake = baseTaste;
    if (buyElement.decorPrice == undefined) {
        buyElement.pricePerOne = buyElement.price * buyElement.kg;
    } else {
        buyElement.pricePerOne = buyElement.kg * buyElement.price + buyElement.decorPrice;
    }
    if (buyElement.price == undefined) {
        sweetAlert("Oops...", "Оберіть смак", "error");
    } else {
        PRODUCTS_IN_BASKET.products.push(buyElement);
        basketTotalPrice();
        localStorage.setItem("productsInLocal", JSON.stringify(PRODUCTS_IN_BASKET));
        swal("Товар успішно додано в кошик!", "", "success");
        $(".length-basket").text(PRODUCTS_IN_BASKET.basketTotalPrice + "грн");
    }
  };

function dellProductInBasket(dellId){
 var dellItem = findByProductId(dellId, PRODUCTS_IN_BASKET.products);
    PRODUCTS_IN_BASKET.basketTotalPrice = PRODUCTS_IN_BASKET.basketTotalPrice - dellItem.pricePerOne;
    var dellIndex = findElementById(dellId);
    var delHide = "#" + dellId + " ";
      productsInBasketTmpl.splice(dellIndex, 1);         
    localStorage.setItem("productsInLocal", JSON.stringify(PRODUCTS_IN_BASKET));
    $(".length-basket").text(PRODUCTS_IN_BASKET.basketTotalPrice + "грн");
    $(".basketTotalPrice").text(PRODUCTS_IN_BASKET.basketTotalPrice + "грн");
    if (!productsInBasketTmpl.length) {
        renderDescribeTmpl("strawberrytmpl", "titlecake");
}
};