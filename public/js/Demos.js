demos = {
    init: function(){
        utility.attach_show_events({
            triggers: $('button[id^=collapse_button_demos]'),
            event: "mousemove",
            collapsers: $('div[id^=collapse_details_demos]'),
            delay: false,
            on_show: function(trigger, collapser){
                $(collapser).show();
                trigger.innerHTML = "-";
            },
            on_hide: function(trigger, collapser){
                 $(collapser).hide();
                trigger.innerHTML = "+";
            }
        }).close("all");
    }
};