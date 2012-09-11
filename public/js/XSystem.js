$(document).ready(function (){
    if (window.jasmine) return true;// test mode
    
    utility.orientation_compensation();
    window.onresize = function() { utility.orientation_compensation(); };
    
    // Tries to load the sent in value if loaded via URL. Otherwise checks for a hash and loads using that
    var page = window.location.href.split('/#').pop();
    if (page == window.location.href)
       page = $(".to_load")[0].id;

    system.init_with(page);
    
    return true; 
});

var system = {
    SHOW: "<p>▲</p>",
    HIDE: "<p>▼</p>",
    
    NEW_PAGE: null,
    COLR_BAR: null,
    
    // Sets constants then initializes current pages javascript. Then opens the current page.
    init_with: function(cur_page){
        this.NEW_PAGE = $('#main_box');//cached for later
        this.COLR_BAR = $('.page_state');//cached for later
        
        this.pre_page_load();
        menu.init(constant.pages, constant.page_text);
        menu.open_link(cur_page);
    },
    
    // Sets up bottom bar, so adds event handlers for the buttons. Also sets the text to normal.
    pre_page_load: function(){
        $('#small_text_change').mousemove(function(){ system.update_text('small', this); });
        $('#normal_text_change').mousemove(function(){ system.update_text('normal', this); });
        $('#large_text_change').mousemove(function(){ system.update_text('large', this); });
        
        system.update_text('normal', $('#normal_text_change')[0]);
    },
    
    // Adjust the size of the text based on size. Then updates the element to show that it is
    // disabled, and all the other ones are now not disabled.
    update_text: function(size, button){
        utility.change_text.to[size]();
        
        // Update all other buttons to the default class except the one selected
        $('button[id$="text_change"]').each(function(){
            this.className = "text_change";
        })
        if(button) button.className = "text_change_selected";
    },
    
    page_init: function(page){    
        // update the main color bar that provides page context
        this.COLR_BAR.attr('id', page);
        
        this[page].init();
        
        // make sure text is in the right size on page load
        utility.change_text.change_size_by(utility.change_text.current_scale);
    },
    
    //Shows a temporary loading message then replaces the page when the page has loaded
    load_page: function(page, data, callback){
        this.NEW_PAGE[0].innerHTML = "<center>Loading...<center>";
        
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
    demos: demos,
    blog: {init:function(){}}
};
