$(document).ready(function(){
    if (window.jasmine) return true;// test mode
    
    // Tries to load the sent in value if loaded via URL. Otherwise checks for a hash and loads using that
    var page = window.location.href.split('/#').pop();
    if (page == window.location.href)
       page = $(".to_load")[0].id;

    system.init_with(page);
    return true;
});

var system = {
    NEW_PAGE: null,
    COLR_BAR: null,
    
    // Sets constants then initializes current pages javascript. Then opens the current page.
    init_with: function(cur_page){
        this.NEW_PAGE = $('#main_box');//cached for later
        this.COLR_BAR = $('.page_state');//cached for later
        
        menu.init(constant.pages, constant.page_text);
        menu.open_link(cur_page);
    },
    
    page_init: function(page){
        // update the main color bar that provides page context
        this.COLR_BAR.attr('id', page);
        
        this[page].init();
    },
    
    load_page: function(page, data, callback){
        this.NEW_PAGE.load('/' + page, data, callback);
    },
  
    // Just clears up image of myself
    home: {
        init: function(){
            $("#main_image").each( function () {
                $(this).attr("src", $(this).attr("src").replace('_s',''));
            });
        }
    },
    
    experience: experience,
    skills: skills,
    demos: demos
};
