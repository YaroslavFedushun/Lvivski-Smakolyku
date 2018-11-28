function router(url){
    var n=getUrlProductId();
    switch (url) {
        case "/":
            renderMainPageContent();
            break;
        case "/cake":
            $(".content").hide(100);
            renderDescribeTmpl("strawberrytmpl","titlecake")
            break;
        case "/caketype1":
            renderDescribeTmpl("WeddingCake", "cake2");
            break;
        case "/caketype2":
            n ? (() => {routerTmpl(n), initPopover()})() : renderDescribeTmpl("cakeTmpl", "cake2");
            break;
        case "/caketype3":
            n ? (() => {routerTmpl(n), initPopover()})() : renderDescribeTmpl("cakeTmpl", "cake3");
            break;
        case "/straw":
            renderDescribeTmpl("strawberrytmpl","titlestraw");
            break;
        case "/strawtype1":
            n?routerTmpl(n):renderDescribeTmpl("strawberrytypeTmpl", "strawberrybox");
            break;
        case "/strawtype2":
            n?routerTmpl(n):renderDescribeTmpl("strawberrytypeTmpl", "strawberryflowerbox");
            break;
        case "/strawtype3":
            n?routerTmpl(n):renderDescribeTmpl("strawberrytypeTmpl", "strawberryflower");
            break;
        case "/giftbox":
            n?routerTmpl(n):renderDescribeTmpl("cakeTmpl", "giftbox");

            break;
        case "/capcake":
            n?routerTmpl(n): renderDescribeTmpl("capcakeTmpl", "capcake"), renderCakeTasteSlider();
            break;
        case "/desserts":
            renderDescribeTmpl("dessertmpl", "desserts");
            break;
        case "/candybar":
            renderDescribeTmpl("candybarTmpl", "candybar");
            break;
        case "/dishes":
            renderDescribeTmpl("dessertmpl", "dishes");
            break;
        case "/comment":
            renderDescribeTmpl("commentTmpl", "dishes");
            break;
        case "/dailyandpay":
            renderDescribeTmpl("dailyAndPay", "dishes");
            break;


    }
}
function renderMainPageContent() {
    renderTmpl("mainContentTmpl", "mainContainer", dataproducts);
    getInstagramPhotos.done(function(data) {
        renderTmpl("instagrammTmpl", "instagrammBlock",instagramPhotos);
    })
        .fail(function(xhr) {
            console.log('error callback', xhr);
        });

}