    jQuery(document).ready(function(){
      $('.menu-item').addClass('menu-trigger');
      $('.menu-trigger').click(function(){
        $('#menu-trigger').toggleClass('clicked');
        $('.page_wrapper').toggleClass('push');
        $('.menu-type').toggleClass('open');
      });
    });