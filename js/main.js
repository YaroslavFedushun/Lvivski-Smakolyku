
$(document).on('ready', function() {
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
    productsInLocal = JSON.parse(localStorage.getItem("productsInLocal"));
    try {
        if (productsInLocal.length !== 0) {
            productsInBasket = productsInLocal;
        }
        $(".length-basket").text(productsInBasket.basketTotalPrice + "грн");
    } catch (err) {
      console.log(1)
    }
});

var productsInBasket = {
    products: [],
    basketTotalPrice: 0
  };
var productsInLocal = [];
var mainContainer=$("#mainContainer");
var tokenIndex = 0;
var token = allTokens[tokenIndex].tokens;
var readyOrder = ' ';
var HowMany = productsInBasket.length;
var productsInBasketTmpl = [];
var TastePrice;
var sum = 1;
var buyId;
var taste = "";
var base = "";
var baseTaste = "";
var caketypeTmpl = [];
var caketypeId = [];
var curentProduct = [];

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
    buyId = $(this).attr("buy-id");
    tasteElement = findByID(buyId, dataproducts);
    TastePrice = tasteElement.price;
});

mainContainer.on('click', ".baseTaste", function() {
    baseTaste = $(this).attr("tasteAttrCap");
});

mainContainer.on('click', ".chossebase", function() {
    base = $(this).attr("baseAttrCap");
});

mainContainer.on('click', ".chosseTypestraw", function() {
    var productId = $(this).attr("cake-id");
    curentProduct = findByID(productId, dataproducts);
    renderTmpl("strawTasteTmpl","mainContainer", [curentProduct]);
    renderSlider();
});

mainContainer.on('click', ".chosseTypeCapcake", function() {
    var productId = $(this).attr("cake-id");
    curentProduct = findByID(productId, dataproducts);
    renderTmpl("capTasteTmpl", "mainContainer", [curentProduct]);
    renderSlider();
});

mainContainer.on('click', "#caketype1", function() {
    renderDescribeTmpl("WeddingCake", "cake2");
});

mainContainer.on('click', ".chosseTypeGift", function() {
    var productId = $(this).attr("cake-id");
    curentProduct = findByID(productId, dataproducts);
    renderTmpl("strawTasteTmpl", "mainContainer", [curentProduct]);
    renderSlider();
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
    setOrderText();
    var total = productsInBasket.basketTotalPrice;
    var subject = $("#sendName").val();
    var message = $("#sendCommit").val();
    var number = $("#sendTel").val();
     var data = {
        "access_token": token,
        "subject": subject,
        "text": "  номер:" + number + "\n" + readyOrder + "Коментар:  " + message + "\n  Итого:" + total + "грн ",
    };
    sendReadyOrder(data);

});

mainContainer.on('click', "#order", function() {
    $('#myModal').modal('hide');
    renderDescribeTmpl("SendTmpl", "productsInBasket");
});

mainContainer.on('click', ".basketproduct", function() {
    var massa = $(this).closest(".Lastcake").find("#inputcake").val();
    var sum = $(this).prev().val();
    buyId = $(this).attr("buy-id");
    buyElement = findByID(buyId, dataproducts);
    buyElement.productIdBasket = Math.random();
    buyElement.taste = taste;

     if (buyElement.globaltype == "cake") {
        buyElement.kg = +massa;
        buyElement.price = TastePrice;
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
        productsInBasket.products.push(buyElement);
        basketTotalPriceTotal();
        localStorage.setItem("productsInLocal", JSON.stringify(productsInBasket));
        swal("Товар успішно додано в кошик!", "", "success");
        $(".length-basket").text(productsInBasket.basketTotalPrice + "грн");
    }
});

$("#thirdmenu").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("giftTmpl", "giftbox");
});

$("#fourthmenu").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("capcakeTmpl", "capcake");
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
});

$("#fifthmenu").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("dessertmpl", "desserts");
});
$("#sixthmenu").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("candybarTmpl", "candybar");
    $(".lazy1").slick({
        lazyLoad: 'ondemand', // ondemand progressive anticipated
        infinite: true
    });
});

$("#seventhmenu").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("dishtmpl", "dishes");
});

$("#dailyPay").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("dailyAndPay", "dishes");
});

$("#comment").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("commentTmpl", "dishes");
});

mainContainer.on('click', ".dellItem", function() {
    var dellId = $(this).attr("delAttr");
    var dellItem = findByProductId(dellId, productsInBasket.products);
    productsInBasket.basketTotalPrice = productsInBasket.basketTotalPrice - dellItem.pricePerOne;
    var dellIndex = findElement(dellId);
    var delHide = "#" + dellId + " ";
    $(this).closest(".col-md-4").parent().hide();
    productsInBasketTmpl.splice(dellIndex, 1);         
    localStorage.setItem("productsInLocal", JSON.stringify(productsInBasket));
    $(".length-basket").text(productsInBasket.basketTotalPrice + "грн");
    $(".basketTotalPrice").text(productsInBasket.basketTotalPrice + "грн");
    if (!productsInBasketTmpl.length) {
        renderDescribeTmpl("strawberrytmpl", "titlecake");
    }
});

mainContainer.on('click', ".addToBasket", function() {
    var productId = $(this).attr("cake-id");
    curentProduct = findByID(productId, dataproducts);
    renderTmpl("cakeTasteTmpl", "mainContainer", [curentProduct]);
    renderSlider();
    $("#informer1").popover();
    $("#informer2").popover();
    $("#informer3").popover();
    $("#informer4").popover();
    $("#informer5").popover();
});

function renderSlider() {
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

function findElement(dellId) {
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

function getElementType(typeArr) {
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
     var productsByType = getElementType(typeArr);
     renderTmpl(tmpl, "mainContainer", productsByType);
};

function basketTotalPriceTotal() {
    productsInBasket.basketTotalPrice = 0;
    for (var i = 0; i < productsInBasket.products.length; i++) {
        if (productsInBasket.products[i].globaltype == "cake") {
            productsInBasket.basketTotalPrice = productsInBasket.products[i].pricePerOne + productsInBasket.basketTotalPrice;
        } else {
            productsInBasket.basketTotalPrice = productsInBasket.products[i].pricePerOne + productsInBasket.basketTotalPrice;
        }
    }
}

function Tmplbasket() {
    if (productsInBasket.products.length == 0) {
        sweetAlert("Oops...", "Корзина пуста", "error");
    } else {
        productsInBasketTmpl = productsInBasket.products;
        productsInBasketTmpl.basketTotalPrice = productsInBasket.basketTotalPrice;
        renderTmpl("basketTmpl", "mainContainer", productsInBasketTmpl);
    }
};

$('#myModal2').on('click', "#callBack", function() {
    var total = productsInBasket.basketTotalPrice;
    var subject = $("#backName").val();
    var number = $("#backTel").val();
     var data = {
        "access_token": "v3aot4ajvbw2htkqvyr94knv",
        "subject": subject,
        "text":"Перезвоніть мені будь-ласка мій номер " + number + " моэ імя " + subject,
    };
    sendFeedBack(data);
});

mainContainer.on('click', "#order", function() {
    $('#myModal').modal('hide');
    renderDescribeTmpl("SendTmpl", "productsInBasket");
});
function onSuccessFeedBack(){
  renderDescribeTmpl("strawberrytmpl", "titlecake");
            $("#myModal2").hide();
            alert("Ми вам зателефонуем");
}

function sendFeedBack(data) {
        $("#callBack").val('Sending…');
        $("#callBack").prop('disabled', true);
       $.post('https://postmail.invotes.com/send',
            data,
            onSuccessFeedBack()
            ).fail();
         return false;
    }

function onSuccess() {
    productsInBasketTmpl.length = 0
    $(".length-basket").text("0 грн")
    renderDescribeTmpl("strawberrytmpl", "titlecake")
}

function sendReadyOrder(data) {
    $("#sendOrder").val('Sending…');
    $("#sendOrder").prop('disabled', true);
    $.post('https://postmail.invotes.com/send',
            data,
            localStorage.clear(),
            onSuccess()
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
}

function setOrderText() {
         for (var i = 0; i < productsInBasket.products.length; i++) {
          if (productsInBasket.products[i].globaltype == "cake") {
            readyOrder = readyOrder + productsInBasket.products[i].description + " " + productsInBasket.products[i].pricePerOne + " грн " + productsInBasket.products[i].taste + " " + productsInBasket.products[i].kg + "кг; \n"
        } else if (productsInBasket.products[i].type == "capcake") {
            readyOrder = readyOrder + "Номер капкейків " + productsInBasket.products[i].id + " " + productsInBasket.products[i].pricePerOne + " грн  " +
                productsInBasket.products[i].kg + " шт на основі " + productsInBasket.products[i].base + "  з начинкою " + productsInBasket.products[i].TasteCapcake + " \n"
        } else {
            readyOrder = readyOrder + productsInBasket.products[i].description + " " + productsInBasket.products[i].pricePerOne + " грн  " + productsInBasket.products[i].kg + "шт \n"
        }
    }
}

