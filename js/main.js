

window.addEventListener('popstate', function(e) {
renderContentByUrl();
});


   (function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
            
        }
        // whatever else you want to do
        // maybe call onhashchange e.handler

   setTimeout(renderContentByUrl, 12)

   
        return pushState.apply(history, arguments);
    }
})(window.history); 


$(document).on('ready', function() {
   getProductsByLocalStorage();
   renderContentByUrl();

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
var instagramPhotos=[];

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
  
    if (subject=="") {
    sweetAlert("Oops...", "Ведіть ваше імя", "error");
    }else if(number==""){
 sweetAlert("Oops...", "Ведіть ваш номер", "error");
    }else{
    sendReadyOrder(data);
}
});

mainContainer.on('click', "#order", function() {
    $('#myModal').modal('hide');
    renderDescribeTmpl("SendTmpl", "PRODUCTS_IN_BASKET");
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

mainContainer.on('click', ".basketproduct", function() {
    var massa = $(this).closest(".Lastcake").find(".inputcake").val();
    var sum = $(this).prev().val();
    var buyId = $(this).attr("buy-id");
    buyElement = findByID(buyId, dataproducts);
    buyElement.productIdBasket = Math.random();
    buyElement.taste = taste;
     initInformByProduct(buyElement,massa,sum)
});




mainContainer.on('click', ".dellItem", function() {
    var dellId = $(this).attr("delAttr");
   dellProductInBasket(dellId)
    $(this).closest(".col-md-4").parent().hide();
  
    
});




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

function tmplbasket() {
    if (PRODUCTS_IN_BASKET.products.length == 0) {
        sweetAlert("Oops...", "Корзина пуста", "error");
    } else {
        productsInBasketTmpl = PRODUCTS_IN_BASKET.products;
        productsInBasketTmpl.basketTotalPrice = PRODUCTS_IN_BASKET.basketTotalPrice;
        renderTmpl("basketTmpl", "mainContainer", productsInBasketTmpl);
    }
};

$('#myModal2').on('click', "#callBack", function() {
    sendFeedBack();
});

mainContainer.on('click', "#order", function() {
    $('#myModal').modal('hide');
    renderDescribeTmpl("SendTmpl", "PRODUCTS_IN_BASKET");
});



function onSuccessFeedBack(){
  renderDescribeTmpl("strawberrytmpl", "titlecake");
            $("#myModal2").hide();
            alert("Ми вам зателефонуем");
};

function sendFeedBack() {
        var subject = $("#backName").val();
        var number = $("#backTel").val();
        var data = {
        "access_token": "v3aot4ajvbw2htkqvyr94knv",
        "subject": subject,
        "text":"Перезвоніть мені будь-ласка мій номер " + number + " моэ імя " + subject,
    }
    if (subject=="") {
    sweetAlert("Oops...", "Ведіть ваше імя", "error");
    }else if (number=="") {
        sweetAlert("Oops...","Ведіть номер","error")
    }else{
         $.post('https://postmail.invotes.com/send',
            data,
            onSuccessFeedBack()
            ).fail();
         return false;
    }
      
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


function renderContentByUrl() {
var url = getUrl();
console.log(url);
router(url);

} 
function setUrl(){
 var url=$(this).attr("type");
console.log(url);
}

function updateUrl(url) {
 history.pushState(null, null, '/'+url);
 return
}

function getUrl(){
 return window.location.pathname;
  }

$("body").on('click', ".links", function() {
var type = $(this).attr("type");
console.log(type)
updateUrl(type);

});


function getUrlProductId(){
 return + window.location.search.replace('?', '');


}



function routerTmpl(productId){
	// var productId= getUrlProductId();
    var curentProduct = findByID(productId, dataproducts);
    renderTmpl("tasteTmpl", "mainContainer", [curentProduct]);
    renderCakeTasteSlider();
}






var  getInstagramPhotos=$.ajax({
	url: 'https://api.instagram.com/v1/users/2948360510/media/recent',
	dataType: 'jsonp',
	type: 'GET',
	data: {access_token: '2948360510.6ff386b.98860a84c74e4ed49f75ed3b45e8659f', count: 8},
    beforeSend: function(  ) {
	    $(".lds-ripple").show();
    },
	success: function(result){
    instagramPhotos=result.data;
        $(".lds-ripple").hide();
	},
	error: function(result){
		console.log(result); // пишем в консоль об ошибках
	}

});