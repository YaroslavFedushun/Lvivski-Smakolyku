  

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
    renderTmpl("dessertmpl", "history", dessert)


});
$("#seventhmenu").click(function() {
    $(".content").hide(100);
    renderTmpl("dishtmpl", "history", dish)


});
$("#secondmenu").click(function() {
    $(".content").hide(100);
    renderTmpl("strawberrytmpl", "history", strawberry)


});
$('body').on('click', '#type1', function() {
    renderTmpl("strawberrytypeTmpl", "history", strawberryType1)
});
//     
$('body').on('click', '#type2', function() {
    renderTmpl("strawberrytypeTmpl", "history", strawberryType2)
});
  
$('body').on('click', '#type3', function() {
    renderTmpl("strawberrytypeTmpl", "history", strawberryType3)
});


$("#firstmenu").click(function() {
    $(".content").hide(100);
    renderTmpl("strawberrytmpl", "history", cake)


});
$('body').on('click', '#caketype1', function() {
    renderTmpl("cakeTmpl", "history", caketype1)

});

$('body').on('click', '#caketype2', function() {
    renderTmpl("cakeTmpl", "history", caketype2)

});




$("#fourthmenu").click(function() {
    $(".content").hide(100);

    renderTmpl("capcakeTmpl", "history", capcake)



    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });



});
$("#sixthmenu").click(function() {
    $(".content").hide(100);

    renderTmpl("candybarTmpl", "history", candybar)

 $(".lazy1").slick({
        lazyLoad: 'ondemand', // ondemand progressive anticipated
        infinite: true
    });


    
});

$("#thirdmenu").click(function() {
    $(".content").hide(100);
    renderTmpl("giftTmpl", "history", gift)


});



function renderTmpl(tmplid, conteinerid, data) {
    var tmpl = document.getElementById(tmplid).innerHTML.trim();
    tmpl = _.template(tmpl);


    document.getElementById(conteinerid).innerHTML = tmpl({
        list: data
    });
}




var producsInBasket = [];
var producsInBasketId = [];


var totalPrice = 0;

function buy(e) {
 var inputnum=$(this).attr("dessert-id")
 var numberdessert =$(this).closest(".dessert").find('.dessertinput'+inputnum).val()
  
    var idAttr = $(e).attr("products-id");
    

 dessert[idAttr].num=numberdessert 
   producsInBasket.push(dessert[idAttr]);
  


}

function delItem(v) {
    var del = $(v).parent()
    $(del).hide();
    var prevDel = $(".del-item").prev()
    totalPriceDel = totalPrice - prevDel;


}



$("#button1").click(function() {


    renderTmpl("basketTmpl", "history", producsInBasket)
})
var caketypeTmpl = [];
var caketypeId = [];

function chosseCake(z, cakearr) {
    var idCake = $(z).attr("cake-id");


    caketypeId.push(idCake);

    caketypeTmpl[0] = cakearr[idCake];
    
    
}
$('#history').on('click', ".chosseTypeCake", function() {

    renderTmpl("cakeTasteTmpl", "history", caketypeTmpl)
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });


});

$('#history').on('click', ".slider-tastecake", function() {
 var taste = $(this).attr("tasteAttr")
 caketypeTmpl[0].taste= taste



});

$('#history').on('click', ".baseTaste", function() {
var baseTaste = $(this).attr("tasteAttrCap");

caketypeTmpl[0].taste= baseTaste
});

$('#history').on('click', ".chossebase", function() {
var base = $(this).attr("baseAttrCap")
caketypeTmpl[0].base= base
});






var number = 0;
$('#history').on('click', ".basketCake", function() {
 var masa = $(this).closest(".Lastcake").find("#inputcake").val()
 caketypeTmpl[0].kg=masa
 
    producsInBasket.push(caketypeTmpl[0]);
    producsInBasket.indexOf(caketypeTmpl[0])
    caketypeTmpl.shift();
    
});


$('#history').on('click', ".chosseTypestraw", function() {
    renderTmpl("strawTasteTmpl", "history", caketypeTmpl)

});
$('#history').on('click', ".chosseTypeCapcake", function() {
    renderTmpl("capTasteTmpl", "history", caketypeTmpl)

});