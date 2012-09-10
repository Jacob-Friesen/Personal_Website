// modified from http://javascript.crockford.com/prototypal.html
if (typeof Object.nu !== 'function') {
    Object.nu = function (o) {
        function F() {};
        F.prototype = o;
        return new F();
    };
} else { alert("Object.nu is already defined"); }

var utility = {
    
    init: function(){
        this.change_text.init();
        
        return this;
    },
    
    // Modifies top menu icon spacing values to reflect window size change. Will not work when virtual keyboard is used but
    // that isn't used in this site.
    orientation_compensation: function(){
        if (Math.abs(window.orientation) != 90)  
            $('#home_link').css('margin-left', 0);
        else
            $('#home_link').css('margin-left', $(window).width() * 0.0225);
    },
    
    // (psuedo-function)
    // Cycles through each element retrieved by collapse_with attaching the specified action to an event. When this event is
    // triggered the id of the current object is found and put in behind the collapse_to selector. If delay is sent the function
    // is only initialized for later use.
    attach_show_events: function(params){
        var attacher = {
            // Initializes all arguments then starts execution, finally returning its parent object.
            init: function(delay){
                this.triggers = params["triggers"];
                this.event = params["event"];
                this.collapsers = params["collapsers"];
                this.on_hide = params["on_hide"];
                this.on_show = params["on_show"];
                this.chk_attr = "name";
                if (params["chk_attr"]) this.chk_attr = params["chk_attr"];
                
                if (!delay) this.attach_events();
                return this;
            },
            
            // Attach each trigger to its corresponding collapser if it has a corresponding collapser. Keeps on trying
            // to find a collapser by looking ahead.
            attach_events: function(){
                this.order_matchers_by_name();
                
                // length must be the same so no point in checking triggers length
                for(var t = 0, c = 0; t < this.triggers.length && c < this.triggers.length; c++){
                    if($(this.triggers[t]).attr(this.chk_attr) == $(this.collapsers[c]).attr(this.chk_attr)) {
                        this.triggers[t].collapser = this.collapsers[c];
                        $(this.triggers[t])[this.event]($.proxy(this.on_event, this));
                        t += 1;
                    }
                }
            },
            
            // call the on_hide/show events when appropriate passes in the trigger and event that is to be hidden.
            on_event: function(element){
                var trigger = element.currentTarget
                if ($(trigger.collapser).css('display') == 'none')
                    this.on_show(trigger, trigger.collapser);
                else
                    this.on_hide(trigger, trigger.collapser);
            },
            
            // does an on_show/on_hide event with the current element
            open: function(index){
                this.do_event("on_show", index);
                return this
            },
            close: function(index){
                this.do_event("on_hide", index);
                return this;
            },
            do_event: function(event, index){
                if (index == "all") {
                    for(var t = 0;t < this.triggers.length; t++)
                        this[event](this.triggers[t], this.triggers[t].collapser);
                }
                else
                    this[event](this.triggers[index], this.triggers[index].collapser);
            },
            
            // orders set of collapsers and orderers by id
            order_matchers_by_name: function(){
                if (!this.triggers || !this.triggers.sort) return false;
                if (!this.collapsers || !this.collapsers.sort) return false;
                
                // I assume they are the same length for this algorithm to work
                if (this.triggers.length != this.collapsers.length) throw('triggers must be the same length as collapsers');
                
                var parent = this;
                var sorter = function(a, b){
                    if ($(a).attr(parent.chk_attr) > $(b).attr(parent.chk_attr)) return 1;
                    if ($(a).attr(parent.chk_attr) < $(b).attr(parent.chk_attr)) return -1;
                    return 0;
                }
                
                this.triggers.sort(sorter);
                this.collapsers.sort(sorter);
                
                return true;
            },
            
            // Gets the item to collapse by getting the id of the collapser and combining it
            // with the collapse_to selector. 
            get_collapsee :function(collapser){
                var id = collapser.id.split('_').pop();
                return $('#'+this.collapse_to+id);
            }
        }
        
        return Object.nu(attacher.init(params["delay"]));
    },
    
    // handles updating of layouts
    update_layout: {
        
        changes: {
            //'#menu_center': {
            //    0.75: ['width', '95.75%'],
            //    1: ['width', '95.75%'],
            //    1.25: ['width', '100%']
            //}
        },
        
        // Updates the selector (if it can be found) with the appropriate values
        // for the current multiple.
        update: function(multiple){
            for (selector in this.changes){
                var element = $(selector);
                if (element[0])
                    element.css(this.changes[selector][multiple][0], this.changes[selector][multiple][1]);
            }
        }
    },
    
    // Uses the css set font sizes as a baseline to scale all fonts
    change_text: {
        current_scale: 1,
        
        // Each of these gets a original_font_size set. Also very inefficient.
        TO_CHANGE: [
            [document.body, -1],//selector, default font size
            ['h1', -1],
            ['h4', -1]
        ],
        
        to: {
            small: function(){ utility.change_text.change_size_by(0.75); },
            normal: function(){ utility.change_text.change_size_by(1); },
            large: function(){ utility.change_text.change_size_by(1.25); }
        },
        
        // Gets all the above elements current font-size and stores that as the default.
        init: function(){
            for(var i = 0; i < this.TO_CHANGE.length; i++){
                var element = $(this.TO_CHANGE[i][0]).first();
                
                if (element[0])
                    this.TO_CHANGE[i][1] = Number(element.css('font-size').replace('px',''));
            }
        },
        
        // Multiplies all elements original font size by multiple. The updates the page layout.
        change_size_by: function(multiple){
            //record size so it can be used outside of this object
            this.current_scale = multiple;
            
            for(var i = 0; i < this.TO_CHANGE.length; i++){
                var element = $(this.TO_CHANGE[i][0]);
                var def_size = this.TO_CHANGE[i][1];
                
                // Loop through all items if selector retrieves a list
                if (element[0] && element.length > 1){
                    for(var j = 0; j < element.length; j++)
                        $(element[j]).css('font-size', def_size * multiple);
                }
                else if (element[0])
                    element.css('font-size', def_size * multiple);
            }
            
            utility.update_layout.update(multiple);
        }
    }
}.init();