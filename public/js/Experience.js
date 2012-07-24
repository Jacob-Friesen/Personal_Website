experience = {
    COLLAPSE_POINT: 'collapse_points_',
    STATE: ['-','+'],
    
    init: function(){
        this.attach_events();
    },
    
    // Attach hiding and showing events to the collapse buttons. All except first element are
    // hidden by default.
    attach_events: function(){
        $('button[id^=exp_collapse_]').each(function(index){
            if(index > 0) experience.get_collapsee(this).hide();
            
            $(this).mousemove(function(){
                var to_collapse = experience.get_collapsee(this);
                
                this.innerHTML = experience.STATE[1];
                if (to_collapse.css('display') == 'none'){
                    to_collapse.show();
                    this.innerHTML = experience.STATE[0];
                }
                else
                    to_collapse.hide();
            });
        });
    },
    
    get_collapsee :function(collapser){
        var job = collapser.id.split('_').pop();
        return $('#'+experience.COLLAPSE_POINT+job);
    }
};