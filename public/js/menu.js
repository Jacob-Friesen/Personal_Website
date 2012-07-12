// Maintains menu state, such as opening and closing
var Menu = {
    EVENT: "mouseenter",
    L_NAME: "_link",
    title: null,
    page_text: null,
    cur_page: null,
    
    // Attaches EVENT to all menu items so that they are opened when that event is called.
    // NOTE: Maybe causes an IE error with the for in, make sure to check...
    init: function(pages, title, page_text){
        this.title = title;
        this.page_text = page_text;
        
        for (page in pages){
            var _page = pages[page].toLowerCase();
            $("#" + _page + this.L_NAME)[this.EVENT]( $.proxy(this.open_link, this, _page) );
        }
    },
    
    // Using the send in link or page if no link was provided loads the page. 
    open_link: function(page){
        system.NEW_PAGE.load('/' + page, {}, $.proxy(this.new_page, this, page) );
    },
    
    // Load the link and put up page address in address bar and add title. Then run page initializations.
    new_page: function(page){
        // Update the address and add a title
        if (window.history.pushState)
            window.history.pushState(this.page_text[page].title + page + " page", this.page_text[page].title, '/' + page);
        else
            window.location.href = window.location.href.split('#')[0] + '#' + page;
        document.title = this.page_text[page].title;
            
        system.page_init(page);
    }
};
