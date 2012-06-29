$(document).ready(function(){
    // Tries to load the sent in value if loaded via URL. Otherwise checks for a hash and loads using that
    var to_load = $(".to_load")[0]
    if (window.location.href.split('#').length > 1){
        var send =  window.location.href.split('#').pop();
        if(send == "") send = constant.pages[0]
    }
    else
        var send = to_load.id
    
    system.init(send);
});

var system = {    
    init: function(cur_page){
        this.NEW_PAGE = $('#main_box');//cached for later
        this.COLR_BAR = $('.page_state');//cached for later
        this[cur_page].init();
        
        menu.open_link(cur_page, cur_page);
        menu.init();
    },
  
    // Just clears up image of myself
    home: {
        init: function(){
            this.clear_main();
        },
        
        //Clear up image of myself, there could be more than one hence the each
        clear_main: function(){
            $("#main_image").each( function (i, element) {
                $(this).attr("src", $(this).attr("src").replace('_s',''));
            });
        }
    },
    
    demos: {
        init: function(){}
    }
};

var menu = {
    L_NAME: "_link",
    
     //NOTE: Maybe causes an IE error with the for in, make sure to check...
    init: function(){
        var parent = this;
        for (page in constant.pages){
            var _page = constant.pages[page].toLowerCase();
            // Using mouse enter will make the interface more reactive (test in mulitple browsers to be sure)
            $("#" + _page + this.L_NAME).mouseenter(function(){ parent.open_link(this) });
        }
    },
    
    // Uses ajax to fake a page link
    open_link: function(page, link){
        //parse link
        if(!link) page = page.id.split('_')[0];

        //load the link and put up page address in address bar and add title. Then run page initializations.
        system.NEW_PAGE.load('/' + page, {}, function() {
            if (window.history.pushState)
                window.history.pushState(constant.title + page + " page", constant.title, '/' + page);
            else
                window.location.href = window.location.href.split('#')[0] + '#' + page;
            
            // add title
            document.title = constant.page_text[page]["title"]
                
            system.COLR_BAR.attr('id', page);
            system[page].init();
            
            // every image pops up "onclick"
            $('img').each(function(){
                
                // When clicked a duplicate html element is created then lightboxed, when the duplicate element is clicked
                // call the close event.
                $(this.parentNode).mouseenter(function(){
                    var img_clone = $(this).clone();
                    $(img_clone).lightbox_me({destroyOnClose: true, centered: true, overlaySpeed: 0, lightboxSpeed: 300});//not going to chain that would get ugly
                    $(img_clone).click(function(){ $(this).trigger('close'); });
                });
            });
        });
    }
}