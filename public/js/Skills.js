skills = {
    init: function(){
        var parent = this;
        main_skills = utility.attach_show_events({
            triggers: $('button[id^=skills_collapse_skill]'),
            event: "mousemove",
            collapsers: $('ul[id^=collapse_points_skill]'),
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
        
        var skill_sections = constant.page_text.skills.skill_types;
        for (var i = 0; i < skill_sections.length; i++){
            utility.attach_show_events({
                triggers: $('button[id^=skills_point_collapse_skill_'+i+']'),
                event: "mousemove",
                collapsers: $('ul[id^=collapse_point_points_skill_'+i+']'),
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
    }
};