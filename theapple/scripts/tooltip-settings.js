(function($){
        $(document).ready(function(){
            $("[title],img[title]").style_my_tooltips({
              tip_follows_cursor: true,
              tip_delay_time: 0,
              tip_fade_speed: 100,
              attribute:"title"
              });
        });
    })(jQuery);