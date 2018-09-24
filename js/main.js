var producsInBasket = {
  producs:[],
  basketTotalPrice:0
};
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
    producsInLocal= JSON.parse(localStorage.getItem("producsInLocal"))
    try {
   if (producsInLocal.length!==0) {
producsInBasket=producsInLocal;
   }
    $(".length-basket").text(producsInBasket.basketTotalPrice+"грн")

} catch (err) {

console.log(1)

}
   
  



});

var producsInLocal=[];
$('#history').on('click', "#linkDessert", function() {
    $(".content").hide(100);
   renderDescribeTmpl("dessertmpl", "desserts")


});
$('#history').on('click', "#linkDish", function() {
    $(".content").hide(100);
    renderDescribeTmpl("dishtmpl", "dishes")


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








var totalPrice = 0;

function findByProductId(id,Array){

for(i=0; i<Array.length; i++){
if( Array[i].productIdBasket == id){

return   Object.assign({}, Array[i])
}
  
}
}

function findDeleteElement(dellId){
  for (var i = 0; i<producsInBasket.length; i++) {
    if (producsInBasket[i].productIdBasket==dellId ) {
      return i;
    }
  }
}


$('#history').on('click', ".dellItem", function() {
var dellId= $(this).attr("delAttr")
console.log(dellId)
var dellItem= findByProductId(dellId,producsInBasket.producs)
console.log(dellItem)
producsInBasket.basketTotalPrice=producsInBasket.basketTotalPrice-dellItem.pricePerOne

var dellIndex = findDeleteElement(dellId);
console.log(dellIndex)
var delHide= "#"+dellId+" "
console.log(delHide)
$(this).closest(".col-md-4").parent().hide()
producsInBasket.producs.splice(dellIndex,1); ////НЕ ТАК ВИДАЛЯЭ!!!!


localStorage.setItem("producsInLocal", JSON.stringify(producsInBasket))
$(".length-basket").text(producsInBasket.basketTotalPrice+"грн")
$(".basketTotalPrice").text(producsInBasket.basketTotalPrice+"грн")
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
        
           producsInBasket.producs.push(buyElement)
          

 console.log(producsInBasket)
 
basketTotalPriceTotal()
// var basketTotalPrice= producsInBasket.basketTotalPrice

localStorage.setItem("producsInLocal", JSON.stringify(producsInBasket))
     


swal("Товар успішно додано в кошик!", "", "success");
 $(".length-basket").text(producsInBasket.basketTotalPrice+"грн")
       }

});


function basketTotalPriceTotal(){
    producsInBasket.basketTotalPrice=0;
        for (var i=0; i<producsInBasket.producs.length; i++ ) {
            if (producsInBasket.producs[i].globaltype=="cake") {
producsInBasket.basketTotalPrice=producsInBasket.producs[i].pricePerOne+producsInBasket.basketTotalPrice
console.log(producsInBasket.basketTotalPrice)
            }else{
                producsInBasket.basketTotalPrice=producsInBasket.producs[i].pricePerOne+producsInBasket.basketTotalPrice
            }
       } 
}



var producsInBasketTmpl=[]
 function Tmplbasket() {
    if ( producsInBasket.producs.length==0) {
        sweetAlert("Oops...","Корзина пуста","error")
    }else{
       producsInBasketTmpl=producsInBasket.producs;
        producsInBasketTmpl.basketTotalPrice=producsInBasket.basketTotalPrice
        renderTmpl("basketTmpl", "history", producsInBasketTmpl)
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
   


});

$('#myModal2').on('click', "#callBack", function(){
callBackModal("v3aot4ajvbw2htkqvyr94knv")
});
    
function callBackModal(token){
      var form_id = "jquery_form2";

    var data = {
        "access_token":token
    };



    function onError(error) {
        // remove this to avoid redirect
        window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
        
    }

    var sendButton = $("#callBack");

    function send() {
        sendButton.val('Sending…');
        sendButton.prop('disabled',true);
      
        var subject = $("[name='subject1']").val();
       
        var number = $("[name='field22']").val();
        data['subject'] = subject;
        data['text'] = "Перезвоніть мені будь-ласка мій номер "+ number+" моэ імя "+ subject   ;
        
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





var readyOrder=' ';
var HowMany=producsInBasket.length

  function onSuccess() {
     
     renderDescribeTmpl("strawberrytmpl","titlecake")
    }
function sendReadyOrder(data) {
    
      
        
        $("#sendOrder").val('Sending…');
        $("#sendOrder").prop('disabled',true);
        $.post('https://postmail.invotes.com/send',
            data,
            localStorage.clear(),
            onSuccess()
            
           )
        .fail( function(){
          // getValidToken(data)
        tokenIndex++;
        if(tokenIndex>allTokens.length){
          console.log(11)
        }else{
         data.access_token=allTokens[tokenIndex].tokens
         sendReadyOrder(data);
         
        }
     
        });
        
       

    }
  




function setOrderText(){  

    for (var i=0 ; i<producsInBasket.producs.length; i++) {
   
       if (producsInBasket.producs[i].globaltype=="cake") {
        readyOrder= readyOrder + producsInBasket.producs[i].description+" "+producsInBasket.producs[i].pricePerOne+" грн "+producsInBasket.producs[i].taste+" "+producsInBasket.producs[i].kg+"кг; \n"
       } else if(producsInBasket.producs[i].type=="capcake"){
         readyOrder= readyOrder + "Номер капкейків "+ producsInBasket.producs[i].id+" "+producsInBasket.producs[i].pricePerOne+" грн  "
         +producsInBasket.producs[i].kg+" шт на основі "+producsInBasket.producs[i].base +"  з начинкою "+producsInBasket.producs[i].TasteCapcake+ " \n"
       } else{
         readyOrder= readyOrder + producsInBasket.producs[i].description+" "+producsInBasket.producs[i].pricePerOne+" грн  "+producsInBasket.producs[i].kg+"шт \n"
        
       }
       

       
}

       
        
}
var tokenIndex=0;
var token =allTokens[tokenIndex].tokens;

  
 $('#history').on('click', "#sendOrder", function(event) {
       
       setOrderText();
       var total= producsInBasket.basketTotalPrice;
        var subject = $("#sendName").val();
        var message = $("#sendCommit").val();
        var number = $("#sendTel").val();
        
        var data = {
        "access_token":token,
        "subject":subject,
        "text": "  номер:" + number +"\n" +readyOrder +"Коментар:  "+message + "\n  Итого:" + total+ "грн ",
    };
    console.log(data)
       send(data);
      
      });


    












    // function onSuccess() {
    //     // remove this to avoid redirect
    //     window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
    // }

    // function onError(error) {
    //     // remove this to avoid redirect
    //     window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
    // }


    // function send() {
    //     sendButton.val('Sending…');
    //     sendButton.prop('disabled',true);

    //     $.post('https://postmail.invotes.com/send',
    //         data,
    //         onSuccess
    //     ).fail(onError);

    //     return false;
    // }

    // sendButton.on('click', send);

    // var $form = $("#" + form_id);
    // $form.submit(function( event ) {
    //     event.preventDefault();
    // });