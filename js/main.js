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

});



$("#fifthmenu").click(function() {
    $(".content").hide(100);
   renderDescribeTmpl("dessertmpl", "desserts")


});
$("#seventhmenu").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("dishtmpl", "dishes")


});


$("#dailyPay").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("dailyAndPay", "dishes")


});

$("#comment").click(function() {
    $(".content").hide(100);
    renderDescribeTmpl("commentTmpl", "dishes")


});





$("#fourthmenu").click(function() {
    $(".content").hide(100);

    

renderDescribeTmpl("capcakeTmpl","capcake")

    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });



});
$("#sixthmenu").click(function() {
    $(".content").hide(100);
renderDescribeTmpl("candybarTmpl","candybar")
    

 $(".lazy1").slick({
        lazyLoad: 'ondemand', // ondemand progressive anticipated
        infinite: true
    });


    
});

$("#thirdmenu").click(function() {
    $(".content").hide(100);
    
renderDescribeTmpl("giftTmpl","giftbox")

});



function renderTmpl(tmplid, conteinerid, data) {
    var tmpl = document.getElementById(tmplid).innerHTML.trim();
    tmpl = _.template(tmpl);


    document.getElementById(conteinerid).innerHTML = tmpl({
        list: data
    });
}





var producsInBasketId = [];


var totalPrice = 0;

function findByProductId(id,Array){

for(i=0; i<Array.length; i++){
if( Array[i].productIdBasket == id){

return   Object.assign({}, Array[i])
}
  
}
}

function findElement(dellId){
  for (var i = 0; i<producsInBasket.length; i++) {
    if (producsInBasket[i].productIdBasket==dellId ) {
      return i;
    }
  }
}


$('#history').on('click', ".dellItem", function() {
 var dellId= $(this).attr("delAttr")
    
var dellItem= findByProductId(dellId,producsInBasket)
console.log(dellItem)
producsInBasket.basketTotalPrice=producsInBasket.basketTotalPrice-dellItem.pricePerOne

var dellIndex = findElement(dellId);
console.log(dellIndex)

producsInBasket.splice(dellIndex,1 );
$(".length-basket").text(producsInBasket.basketTotalPrice+"грн")

renderTmpl("basketTmpl", "modal-body", producsInBasket)

});








var caketypeTmpl = [];
var caketypeId = [];

// function chosseCake(z, cakearr) {
//  console.log("asdasdasd");
//     var idCake = $(z).attr("cake-id");

//   var curentProduct = findByID(idCake,cakearr);

//     renderTmpl("cakeTasteTmpl", "history", curentProduct)
//     $(".regular").slick({
//         dots: true,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 3
//     });
    
    
// }

function findByID(id,Array){

for(i=0; i<Array.length; i++){
if( Array[i].id == id){

return   Object.assign({}, Array[i])
}
  
}
}


var curentProduct=[]
 $('#history').on('click', ".addToBasket", function() {
    
    var productId= $(this).attr("cake-id")
    
 curentProduct = findByID(productId,dataproducts)
 console.log(curentProduct)
 renderTmpl("cakeTasteTmpl", "history",[curentProduct])
       renderSlider()
       $("#informer1").popover()
       $("#informer2").popover()
       $("#informer3").popover()
       $("#informer4").popover()
       $("#informer5").popover()
});


function renderSlider(){
 $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });


}


 function getElementType(typeArr){
  var  tmplArr= [];
    for ( i = 0; i<dataproducts.length;  i++) {
        if (dataproducts[i].type==typeArr) {
            tmplArr.push(dataproducts[i])
           
        }
    } 
       return tmplArr;

}



function renderDescribeTmpl(tmpl,typeArr){
 
    $(".content").hide(100);

    var productsByType = getElementType(typeArr);
    renderTmpl(tmpl, "history", productsByType)



};

var TastePrice ;

var taste ="";
var base ="";
var baseTaste ="";
$('#history').on('click', ".slider-tastecake", function() {
  taste = $(this).attr("tasteAttr")
buyId= $(this).attr("buy-id")
tasteElement=findByID(buyId,dataproducts)
 TastePrice=tasteElement.price
console.log(TastePrice)
});

$('#history').on('click', ".baseTaste", function() {
baseTaste = $(this).attr("tasteAttrCap");
console.log(baseTaste)
});

$('#history').on('click', ".chossebase", function() {
base = $(this).attr("baseAttrCap")
console.log(base)
});



var sum=1;
var buyId;

$('#history').on('click', ".basketproduct", function  () {

 var massa =    $(this).closest(".Lastcake").find("#inputcake").val()
 var sum = $(this).prev().val()
 console.log(sum)
 buyId = $(this).attr("buy-id")
 // var number=$(this).closest(".basketproduct").prev()
 // var col= $(number).val()

 buyElement= findByID(buyId,dataproducts)
  buyElement.productIdBasket=Math.random();
 buyElement.taste=taste;

    buyElement.number=1;




   if (buyElement.globaltype=="cake") {
        buyElement.kg=+massa;
        buyElement.price=TastePrice
        console.log(buyElement.price)
   }else{
      buyElement.kg=+sum;
   }

  
 
 buyElement.base=base;
 buyElement.TasteCapcake=baseTaste
   if (buyElement.decorPrice==undefined) {
       buyElement.pricePerOne=buyElement.price*buyElement.kg
       }else{
        buyElement.pricePerOne=buyElement.kg*buyElement.price+buyElement.decorPrice
       }
if (buyElement.price==undefined) {
    console.log(buyElement.TastePrice)
sweetAlert("Oops...","Оберіть смак","error")
       } else {
            
 producsInBasket.push(buyElement);
 
basketTotalPrice()

swal("Товар успішно додано в кошик!", "", "success");
 $(".length-basket").text(producsInBasket.basketTotalPrice+"грн")
       }


});


function basketTotalPrice(){
    producsInBasket.basketTotalPrice=0;
        for (var i=0; i<producsInBasket.length; i++ ) {
            if (producsInBasket[i].globaltype=="cake") {
producsInBasket.basketTotalPrice=producsInBasket[i].pricePerOne+producsInBasket.basketTotalPrice
            }else{
                producsInBasket.basketTotalPrice=producsInBasket[i].pricePerOne+producsInBasket.basketTotalPrice
            }
          
       //    if (producsInBasket[i].decorPrice==undefined) {

       // }else{
       //  producsInBasket.basketTotalPrice=producsInBasket.basketTotalPrice+producsInBasket[i].decorPrice
       // }
       } 
}

var producsInBasket = [];


 function Tmplbasket() {
    if ( producsInBasket.length==0) {
        sweetAlert("Oops...","Корзина пуста","error")
    }else{
        renderTmpl("basketTmpl", "modal-body", producsInBasket)
    }
    


};

$('#history').on('click', ".chosseTypestraw", function() {
    var productId= $(this).attr("cake-id")
    
 curentProduct = findByID(productId,dataproducts)
 console.log(curentProduct)

 renderTmpl("strawTasteTmpl", "history",[curentProduct])
       renderSlider()


});
$('#history').on('click', ".chosseTypeCapcake", function() {
    var productId= $(this).attr("cake-id")
    
 curentProduct = findByID(productId,dataproducts)
 console.log(curentProduct)

 renderTmpl("capTasteTmpl", "history",[curentProduct])
       renderSlider()


});

$('#history').on('click', "#caketype1", function() {
    renderDescribeTmpl("WeddingCake","cake2")

});
 $('#history').on('click', ".chosseTypeGift", function() {
    
    var productId= $(this).attr("cake-id")
    
 curentProduct = findByID(productId,dataproducts)
 console.log(curentProduct)
 renderTmpl("strawTasteTmpl", "history",[curentProduct])
       renderSlider()
});


$('#history').on('click', "#caketype2", function() {
    renderDescribeTmpl("cakeTmpl","cake2")

});


$('#history').on('click', "#caketype3", function() {
    renderDescribeTmpl("cakeTmpl","cake3")

});
$('#history').on('click', "#type1", function() {
    renderDescribeTmpl("strawberrytypeTmpl","strawberrybox")

});
$('#history').on('click', "#type2", function() {
    renderDescribeTmpl("strawberrytypeTmpl","strawberryflowerbox")

});

$('#history').on('click', "#type3", function() {
    renderDescribeTmpl("strawberrytypeTmpl","strawberryflower")

});




$('#history').on('click', "#order", function() {
    $('#myModal').modal('hide')

    renderDescribeTmpl("SendTmpl","producsInBasket")
    console.log(producsInBasket)
sendRender()

});


var readyOrder=' ';
var HowMany=producsInBasket.length
function sendRender(){

    for (var i=0 ; i<producsInBasket.length; i++) {
    console.log(readyOrder);
       if (producsInBasket[i].globaltype=="cake") {
        readyOrder= readyOrder + producsInBasket[i].description+" "+producsInBasket[i].pricePerOne+" грн "+producsInBasket[i].taste+" "+producsInBasket[i].kg+"кг; \n"
       } else if(producsInBasket[i].type=="capcake"){
         readyOrder= readyOrder + "Номер капкейків "+ producsInBasket[i].id+" "+producsInBasket[i].pricePerOne+" грн  "+producsInBasket[i].kg+" шт на основі "+producsInBasket[i].base +"  з начинкою "+producsInBasket[i].TasteCapcake+ " \n"
       } else{
         readyOrder= readyOrder + producsInBasket[i].description+" "+producsInBasket[i].pricePerOne+" грн  "+producsInBasket[i].kg+"шт \n"
        console.log(readyOrder);
       }
       

}

  

    //update this with your $form selector
    var form_id = "jquery_form";

    var data = {
        "access_token": "v3aot4ajvbw2htkqvyr94knv"
    };

    function onSuccess() {
        // remove this to avoid redirect
        window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
         
    }

    function onError(error) {
        // remove this to avoid redirect
        window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
    }

    var sendButton = $("#" + form_id + " [name='send']");

    function send() {
        sendButton.val('Sending…');
        sendButton.prop('disabled',true);
        var total= producsInBasket.basketTotalPrice;
        var subject = $("[name='subject']").val();
        var message = $(" [name='field3']").val();
        var number = $("[name='field2']").val();
        data['subject'] = subject;
        data['text'] =  number+ "  номер \n"  +readyOrder +"Коментар:  "+message + "\n  Итого:" + total+ "грн ";
        
        $.post('https://postmail.invotes.com/send',
            data,
            onSuccess
        ).fail(onError);

        return false;
    }

    sendButton.on('click', send);

    var $form = $("#" + form_id);
    $form.submit(function( event ) {
        event.preventDefault();
    });
   



    }