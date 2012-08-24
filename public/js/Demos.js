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
        
        this.init_images();
    },
    
    init_images: function(){
      // every image pops up "onclick"
        $('img[class="demo_img"]').each(function(){
            // When clicked the larger version of the element is created then lightboxed. Close it when clicked.
            $(this).click(function(){
                console.log(this);
                var large_image = $("<img/>").attr('src', this.src.replace('_s','')).attr('id', this.id + "_clone");
                large_image.lightbox_me({destroyOnClose: true, centered: true, overlaySpeed: 0, lightboxSpeed: 300});//not going to chain that would get ugly
                large_image.click(function(){ $(this).trigger('close'); });
            });
        });  
    }
};