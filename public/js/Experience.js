experience = {
    init: function(){
        utility.attach_show_events({
            triggers: $('button[id^=exp_collapse_]'),
            event: "mousemove",
            collapsers: $('ul[id^=collapse_points_]'),
            delay: false,
            on_show: function(trigger, collapser){
                $(collapser).show();
                trigger.innerHTML = "-";
            },
            on_hide: function(trigger, collapser){
                 $(collapser).hide();
                trigger.innerHTML = "+";
            }
        }).close("all").open(0);
    }
};