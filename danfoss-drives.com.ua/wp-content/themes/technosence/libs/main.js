$(function() {
    setTimeout(function(){
        $(".pgf_fix").addClass("pgf_iframe");
        setTimeout(function() {
            $(".pgf_fix_icon").addClass("pgf_iframe");
        }, 4000);
    }, 100);

    jQuery('.header__item__center li a, #leftside-navigation .nano-content li a').on('click', function( event ){
        event.preventDefault();
        
        var hrefSection = jQuery( jQuery(this).attr('href') );
        if ( hrefSection.get(0) ) jQuery('html, body').animate({ scrollTop: hrefSection.offset().top + 'px' }, 400);

        jQuery('#menu-trigger').removeClass('clicked');
        jQuery('.menu-type').removeClass('open');
    });

    
    jQuery('.services_slider .arr_l').on('click', function(){
        var slider = jQuery(this).parents('.services_slider').first();
        startServiceSlider( slider, true );
        startServiceSlider( slider );
        serviceSlideChange( slider, 'prev' );
    });
    jQuery('.services_slider .arr_r').on('click', function(){
        var slider = jQuery(this).parents('.services_slider').first();
        startServiceSlider( slider, true );
        startServiceSlider( slider );
        serviceSlideChange( slider, 'next' );
    });

    jQuery('.services_slider ul li').on('click', function(){
        var slider = jQuery(this).parents('.services_slider').first();
        var index = parseInt( jQuery(this).attr('data-index') );
        
        startServiceSlider( slider, true );
        startServiceSlider( slider );
        serviceSlideChange( slider, index );
    });

    jQuery('.form-accept').on('click', function(){
        jQuery(this).toggleClass('active');
        jQuery(this).removeClass('invalid');
    });

    jQuery('.faq__main__item .hipe_block').on('click', function(){
        var hide = jQuery(this).parents('.hipe');

        jQuery('.faq__main__item .hipe.active').removeClass('active');
        hide.addClass('active');
    });

    jQuery('.why_slider_block').first().addClass('active');
    jQuery('.clients_sl_block').first().addClass('active');
    jQuery('.why_slider_block').each(function( i ){
        jQuery(this).attr( 'data-index', i );
    });
    jQuery('.clients_sl_block').each(function( i ){
        jQuery(this).attr( 'data-index', i );
    });
    jQuery('.why_slider ul li').each(function( i ){
        jQuery(this).attr( 'data-index', i );
    });
    whySlideChange( 0 );
    jQuery('.clients__slider ul li').each(function( i ){
        jQuery(this).attr( 'data-index', i );
    });
    clientsSlideChange( 0 );
    jQuery('.why_slider ul li').on('click', function(){
        var index = parseInt( jQuery(this).attr('data-index') );
        whySlideChange( index );
    });


    jQuery('.clients__slider ul li').on('click', function(){
        var index = parseInt( jQuery(this).attr('data-index') );
        clientsSlideChange( index );
    });

    setTimeout(function(){
        jQuery('span.lazy-iframe-on-load').each(function() {
            lazyFrames(this);
        });
    }, 4000);

    jQuery('.vipad ul li').on('click', function(){
        var value = jQuery(this).html();

        jQuery(this).parents('.vipad').first().find('p').html( value );

        jQuery(this).parents('.vipad').first().find('input').val( value );

        jQuery(this).parents('.vipad').first().removeClass('invalid');
    });
    jQuery('.vipad').on('click', function(){
        var self = this;
        jQuery(this).data('clicked', true);
        setTimeout(function(){
            jQuery(self).toggleClass('active');
            jQuery(self).data('clicked', false);
        }, 100);
    });
    jQuery('body').bind('click', function(){
        setTimeout(function(){
            jQuery('.vipad').each(function(){
                if ( !jQuery(this).data('clicked') )
                    jQuery(this).removeClass('active');
            });
        }, 50);
    });

    jQuery('.cheks .config').on('click', function(){
        var cheks = jQuery(this).parents('.cheks').first();

        cheks.find('.config input').prop('checked', false);
        jQuery(this).find('input').prop('checked', true);

        var popup = jQuery(this).parents('.popup').first();
        if ( popup.get(0) ){
            var messenger = jQuery(this).find('label').html();

            var phoneInput = popup.find('.phone_numb').first();
            if ( phoneInput.get(0) ){
                phoneInput.attr('data-invalid', phoneInput.attr('data-invalid').replace(/Viber|WhatsApp/, messenger) );
                phoneInput.attr('placeholder', phoneInput.attr('placeholder').replace(/Viber|WhatsApp/, messenger) );
            }
        }
    });

    jQuery('.div_pfoto input').on('change', function( evemt ){
        var file = event.target.files[0] || {};
        
        var divPfoto = jQuery(this).parents('.div_pfoto').first().find('p').first();

        jQuery(this).parents('.div_pfoto').removeClass('invalid');

        if ( [ 'image/jpeg', 'image/png', 'image/gif' ].indexOf( file.type ) < 0 ){
            divPfoto.html( divPfoto.attr('data-type-error') );
            // jQuery(this).parents('.div_pfoto').addClass('invalid');
        } else if ( file.size > 2000000 ){
            divPfoto.html( divPfoto.attr('data-size-error') );
            // jQuery(this).parents('.div_pfoto').addClass('invalid');
        } else divPfoto.html( file.name || divPfoto.attr('data-text') );
    });

    jQuery('.phonebutton_callback_phone').on('click', function(){
        if ( jQuery(window).width() < 992 ){
            var phonePage = window.open(jQuery(this).attr('data-phone'), '_blank');
            phonePage.focus();
        } else showPopup(null, this, 'pop_up');
    });

    var ua = navigator.userAgent.toLowerCase();
    if ( jQuery(window).width() < 1200 && ua.indexOf("android") > -1 ){
        jQuery("a").each(function(){
            var href = jQuery(this).attr('href');
            if ( href.indexOf('viber://') === 0 ) jQuery(this).attr( 'href', href.replace('+', '') );
        });
    }

    jQuery('.to-top').on('click', function(){
        jQuery('html, body').animate({ scrollTop: 0 }, 1000);
    });

    scrollFunction();
    jQuery(window).bind('scroll', scrollFunction);
    jQuery('body, html').on('scroll', scrollFunction);

    resizeFunction();
    jQuery(window).on('resize', resizeFunction);

});


function resizeFunction(){
    jQuery('.services_sl_track').each(function(){
        jQuery(this).find('.services_sl_block').first().addClass('active');
        jQuery(this).find('.services_sl_block').each(function( i ){
            var blockWidth = jQuery(this).width();

            var img = jQuery(this).find('img').first();
            var segs = 10;
            for ( var ii=0; ii<segs; ii++ ){
                var div = document.createElement('div');
                
                jQuery(this).append( div );
                jQuery(div).append( img.clone() );

                var step = blockWidth / segs;
                var left = step * ii;
                
                jQuery(div).css({
                    width: ( step + 10 ) + 'px',
                    left: left + 'px'
                }).data('width', step);

                jQuery(div).find('img').css({
                    width: blockWidth + 'px',
                    left: ( left * -1 ) + 'px'
                });
            }
            img.remove();

            jQuery(this).attr( 'data-index', i + 1 );
        });
    });
    jQuery('.services_slider ul').each(function(){
        jQuery(this).find('li').first().addClass('active');
        jQuery(this).find('li').each(function( i ){
            jQuery(this).attr( 'data-index', i + 1 );
        });
    });

    jQuery('.clients__slider ul').each(function(){
        jQuery(this).find('li').first().addClass('active');
        jQuery(this).find('li').each(function( i ){
            jQuery(this).attr( 'data-index', i );
        });
    });
}

function sliderDotsAnimation( slider ){
    slider.find('.k_svg_sl').css({ 'stroke-dashoffset': 545 });
    slider.find('.k_svg_sl').stop().animate({ 'stroke-dashoffset': 0 }, 4000, 'swing', function(){
        jQuery(this).css({ 'stroke-dashoffset': 545 });
    });
}


var animationInterval = {};
function startServiceSlider( slider, stopSlider ){
    var index = parseInt( jQuery(slider).attr('data-index') );

    function stop(){
        if ( animationInterval[ index ] ){
            clearInterval( animationInterval[ index ] );
            animationInterval[ index ] = null;
        }

        jQuery(slider).find('.play').removeClass('active');
        jQuery(slider).find('.stop').addClass('active');
    }

    if ( stopSlider ) stop();
    else {
        if ( !animationInterval[ index ] ) animationInterval[ index ] = null;
        else clearInterval( animationInterval[ index ] );

        jQuery(slider).find('.stop').removeClass('active');
        jQuery(slider).find('.play').addClass('active');

        function startAutoplay(){
            animationInterval[ index ] = setInterval(function(){
                serviceSlideChange( jQuery(slider), 'next' );
                sliderDotsAnimation( jQuery(slider) );
            }, 4000);
            sliderDotsAnimation( jQuery(slider) );
        }
        startAutoplay();
        
        jQuery(slider).find('.play').off('click').on('click', function(){
            jQuery(slider).data('stopped', true);

            stop();
        });
        
        jQuery(slider).find('.stop').off('click').on('click', function(){
            startAutoplay();

            jQuery(slider).data('stopped', false);

            jQuery(this).removeClass('active');
            jQuery(slider).find('.play').addClass('active');
        });
    }
}




function serviceSlideChange( slider, direction ){
    var activeSlide = slider.find('.services_sl_block.active').first();

    var newActive = null;
    if ( direction == 'prev' ){
        newActive = activeSlide.prev('.services_sl_block');
        if ( !newActive.get(0) ) newActive = slider.find('.services_sl_block').last();
    } else if ( direction == 'next' ){
        newActive = activeSlide.next('.services_sl_block');
        if ( !newActive.get(0) ) newActive = slider.find('.services_sl_block').first();
    } else {
        direction = parseInt( direction ) || 0;
        newActive = slider.find('.services_sl_block[data-index=' + direction + ']').first();
    }

    var index = parseInt( newActive.attr('data-index') );

    
    newActive.addClass('active');
    activeSlide.css({ zIndex: 1 });
    newActive.css({ zIndex: 2 });
    newActive.find('div').each(function( i, div ){
        jQuery(this).css({
            width: 0,
            opacity: 0
        });

        setTimeout(function(){
            jQuery(div).stop().animate({
                width: jQuery(div).data('width') + 'px',
                opacity: 1
            }, 400);
        }, 50 * i);

        setTimeout(function(){
            activeSlide.removeClass('active');
        }, 1000);
    });


    slider.find('ul li.active').removeClass('active');
    slider.find('ul li[data-index=' + index + ']').addClass('active');
}

function whySlideChange( index ){
    index = parseInt( index );

    var activeDot = jQuery('.why_slider ul li[data-index=' + index + ']');
    var activeSlide = jQuery('.why_slider_block[data-index=' + index + ']');

    jQuery('.why_slider_block.active').removeClass('active');
    activeSlide.addClass('active');

    jQuery('.why_slider li svg').stop().css({ 'stroke-dashoffset': 545 });
    activeDot.find('svg').stop().animate({ 'stroke-dashoffset': 0 }, 4000, 'swing', function(){
        jQuery(this).css({ 'stroke-dashoffset': 545 });

        var newIndex = index + 1;
        if ( !jQuery('.why_slider_block[data-index=' + newIndex + ']').length ) newIndex = 0;
        whySlideChange( newIndex );
    });
}


function clientsSlideChange( index ){
    index = parseInt( index );

    var activeDot = jQuery('.clients__slider ul li[data-index=' + index + ']');
    var activeSlide = jQuery('.clients_sl_block[data-index=' + index + ']');

    jQuery('.clients__slider ul li.active').removeClass('active');
    activeDot.addClass('active')
    jQuery('.clients_sl_block.active').removeClass('active');
    activeSlide.addClass('active');
}


var company = false;
var why = false;
var services_slider_1 = false;
var services_slider_2 = false;
var services_slider_3 = false;
var trust = false;
var clients = false;

function scrollFunction() {
    var windowHeight = window.innerHeight;
    var scrollTop = $(window).scrollTop();
    var scrollBottom = scrollTop + windowHeight;

    if ($('.company').length) {
        var offsetTop = $('.company').offset().top + 400 - windowHeight;
        if ((scrollTop >= offsetTop) && !jQuery('.company').data('scrolled')) {

            jQuery('.polo_1').each(function(i, self) {
                var id = jQuery(self).attr('data-id');
                jQuery(self).html('<iframe src="/wp-content/themes/technosence/shape/' + id + '.html" frameborder="0" class="icon_svg" style="background: transparent"></iframe>');
            });
            jQuery('.polo_2').each(function(i, self) {
                var id = jQuery(self).attr('data-id');
                jQuery(self).html('<iframe src="/wp-content/themes/technosence/shape/' + id + '.html" frameborder="0" class="icon_svg" style="background: transparent"></iframe>');
            });
            jQuery('.company').data('scrolled', true);
        }
    }

    if ( scrollTop > 120 ) jQuery('.header__menu').addClass('scrolled');
    else jQuery('.header__menu').removeClass('scrolled');
    
    if ( scrollTop > 10 ) jQuery('.pgf_fix').addClass('scrolled');
    else jQuery('.pgf_fix').removeClass('scrolled');

    if ($('.services_slider_1').length) {
        var offsetTop = $('.services_slider_1').offset().top + 200 - windowHeight;
        if ((scrollTop >= offsetTop) && !why) {
            $(".services_slider_1").addClass("services_anime");
            services_slider_1 = true;
        }
    }


    var windowMiddle = scrollTop + windowHeight / 2;
    var links = jQuery('.header__item__center li a, #leftside-navigation .nano-content li a');
    links.removeClass('active');
    var activeSection = null;
    links.each(function(){
        var href = jQuery(this).attr('href');
        var hrefSection = jQuery( href + ', [data-dependecy-id="' + href + '"]' );
        var firstSection = hrefSection.first();
        var lastSection = hrefSection.last();
        if ( firstSection.get(0) || lastSection.get(0) ){
            var top = firstSection.offset().top;
            var height = ( lastSection || firstSection ).height();
            if (
                top <= windowMiddle
                && scrollTop < top + height
            ) activeSection = jQuery(this);
        }
    });
    if ( activeSection ) activeSection.addClass('active');


    if ($('.services_slider_2').length) {
        var offsetTop = $('.services_slider_2').offset().top + 200 - windowHeight;
        if ((scrollTop >= offsetTop) && !why) {
            $(".services_slider_2").addClass("services_anime");
            services_slider_2 = true;
        }
    }


    if ($('.services_slider_3').length) {
        var offsetTop = $('.services_slider_3').offset().top + 200 - windowHeight;
        if ((scrollTop >= offsetTop) && !why) {
            $(".services_slider_3").addClass("services_anime");
            services_slider_3 = true;
        }
    }

    if ($('.why').length) {
        var offsetTop = $('.why').offset().top + 700 - windowHeight;
        if ((scrollTop >= offsetTop) && !why) {
            $(".why_block_1").addClass("why_anime");
            why = true;
            setTimeout(function() {
                $(".why_block_2").addClass("why_anime");
            }, 500);
            setTimeout(function() {
                $(".why_block_3").addClass("why_anime");
            }, 1000);
        }
    }

    if ($('.why').length) {
        var offsetTop = $('.why').offset().top + 400 - windowHeight;
        if ((scrollTop >= offsetTop) && !jQuery('.why').data('scrolled')) {

            jQuery('.polo_3').each(function(i, self) {
                var id = jQuery(self).attr('data-id');
                jQuery(self).html('<iframe src="/wp-content/themes/technosence/shape/' + id + '.html" frameborder="0" class="icon_svg" style="background: transparent"></iframe>');
            });
            setTimeout(function() {
                jQuery('.why_block_icon').each(function(i, self) {
                    var id = jQuery(self).attr('data-id');
                    jQuery(self).html('<iframe src="/wp-content/themes/technosence/shape/' + id + '.html" frameborder="0" class="icon_svg" style="background: transparent"></iframe>');
                });
            }, 2000);
            jQuery('.why').data('scrolled', true);
        }
    }

    if ($('.trust').length) {
        var offsetTop = $('.trust').offset().top + 400 - windowHeight;
        if ((scrollTop >= offsetTop) && !jQuery('.trust').data('scrolled')) {

            jQuery('.polo_4').each(function(i, self) {
                var id = jQuery(self).attr('data-id');
                jQuery(self).html('<iframe src="/wp-content/themes/technosence/shape/' + id + '.html" frameborder="0" class="icon_svg" style="background: transparent"></iframe>');
            });
            jQuery('.trust_icon').each(function(i, self) {
                var id = jQuery(self).attr('data-id');
                jQuery(self).html('<iframe src="/wp-content/themes/technosence/shape/' + id + '.html" frameborder="0" class="icon_svg" style="background: transparent"></iframe>');
            });
            jQuery('.trust').data('scrolled', true);
        }
    }
    if ($('.clients').length) {
        var offsetTop = $('.clients').offset().top - 100 - windowHeight;
        if ((scrollTop >= offsetTop) && !clients) {
            $(".clients_block").addClass("clients_anime");
            clients = true;
        }
    }


    jQuery('span.lazy-iframe').each(function() {
        var offsetTop = $(this).offset().top + 200 - windowHeight;
        if ((scrollTop >= offsetTop)) {
            lazyFrames(this);
        }
    });

    jQuery('img.lazy-image').each(function() {
        var offsetTop = $(this).offset().top - 300 - windowHeight;
        if (scrollTop >= offsetTop) {
            if ($(this).attr('data-src')) $(this).attr('src', $(this).attr('data-src'));
            if ($(this).attr('data-href')) this.setAttributeNS('http://www.w3.org/1999/xlink', 'href', $(this).attr('data-href'));
            $(this).removeClass('lazy-image');
            $(this).removeAttr('data-src')
        }
    });




    if ($('#contacts').length) {
        var offsetTop = $('#contacts').offset().top - 800 - windowHeight;
        if (scrollTop >= offsetTop && !$('#google-map-container').data('scrolled')) {
            jQuery.ajax({
                type: 'GET',
                url: '/wp-admin/admin-ajax.php',
                data: { action: 'add_map' },
                dataType: 'html',
                success: function(data) {
                    jQuery('#google-map-container').html(data);
                }
            });
            $('#google-map-container').data('scrolled', true);
        }
    }


    jQuery('.services_slider').each(function(){
        if ( !jQuery(this).data('stopped') ){
            var offsetHight = $(this).height();
            var offsetTop = $(this).offset().top - offsetHight / 2;
            var offsetBottom = offsetTop + $(window).height() + offsetHight;

            if (
                offsetTop < scrollTop
                && offsetBottom > scrollBottom
            ){
                if ( !parseInt( jQuery(this).attr('data-slider-started') ) ){
                    jQuery(this).attr('data-slider-started', 1);

                    startServiceSlider( this );
                }
            } else {
                jQuery(this).attr('data-slider-started', 0);

                startServiceSlider( this, true );
            }
        }
    });


}

function lazyFrames(span) {
    var iframe = document.createElement('iframe');

    var id = jQuery(span).attr('data-id');
    if (id) jQuery(iframe).attr('id', id);

    var classAttr = jQuery(span).attr('data-class');
    if (classAttr) jQuery(iframe).attr('class', classAttr);

    var src = jQuery(span).attr('data-src');
    if (src) jQuery(iframe).attr('src', src);

    jQuery(span).after(iframe);
    jQuery(span).remove();
}

/* popup start */

jQuery(function() {
    jQuery('.show-popup').on('click', showPopup);
    jQuery('.popup .exit').on('click', hidePopup);
    jQuery('.bg_pop_up').on('click', function() {
        if (!jQuery(this).hasClass('popup-hovered')) hidePopup();
    });
    jQuery('.popup').hover(function() {
        jQuery('.bg_pop_up').addClass('popup-hovered');
    }, function() {
        jQuery('.bg_pop_up').removeClass('popup-hovered');
    });

    jQuery('.textarea_block textarea').on('keyup change', function() {
        if (jQuery.trim(jQuery(this).val())) jQuery(this).addClass('filled');
        else jQuery(this).removeClass('filled');
    });

    var locations = location.href.split('#');
    var popupHref = isPopupHref(locations[1]);
    if (popupHref.status) showPopup(event, popupHref.linkNode);

    var prev = location.href;
    jQuery(window).on('popstate', function() {
        if (isPopupHref(prev.split('#')[1]).status) hidePopup();
        prev = location.href;
    });

    jQuery('.phone_numb').mask('+38 (099) 999 99 99');

    jQuery('.input_required').on('focus', function() {
        jQuery(this).addClass('focused');
    });
    jQuery('.input_required').on('blur', function() {
        formValidation(jQuery(this).parents('form').first());
    });

    jQuery('.popup form, .consultation__main form, .technical__main form').on('submit', function(event) {
        event.preventDefault();

        var validation = formValidation(jQuery(this), true);

        jQuery(this).find('.div_pfoto').removeClass('invalid');
        var fileInput = jQuery(this).find('input[type="file"]').first().get(0);
        if ( fileInput ){
            var file = fileInput.files[0];
            if (
                file 
                && (
                    file.size > 2000000
                    || [ 'image/jpeg', 'image/png', 'image/gif' ].indexOf( file.type ) < 0
                )
            ){
                validation = false;
                jQuery(this).find('.div_pfoto').addClass('invalid');
            }
        }

        jQuery(this).find('.vipad').removeClass('invalid');
        jQuery(this).find('.vipad').each(function(){
            if ( !jQuery(this).find('input').val() ) jQuery(this).addClass('invalid');
        });

        jQuery(this).find('.form-accept').removeClass('invalid');
        if (
            jQuery(this).find('.form-accept').length
            && !jQuery(this).find('.form-accept').hasClass('active')
        ){
            validation = false;
            jQuery(this).find('.form-accept').addClass('invalid');
        }

        if (validation) {
            var formData = new FormData(this);

            jQuery.ajax({
                type: 'post',
                url: '/wp-admin/admin-ajax.php',
                data: formData,
                // dataType: 'json',
                processData: false,
                contentType: false,
                success: function(data) {
                    if (data) {
                        hidePopup();

                        setTimeout(function() {
                            if ( formData.get('email_pdf') ) showPopup(null, jQuery('.pop_up_12').get(0), 'pop_up_12');
                            else showPopup(null, jQuery('.pop_up_1').get(0), 'pop_up_1');
                        }, 100);
                    }
                },
                error: function(f, s, t) { console.log(f, s, t) }
            });
        }
    });
});



function formValidation(form, force) {
    if (!force) force = false;

    var accept = true;

    let isValidEmail = (jQuery('.why__form-email').val().match(/.+?\@.+/g) || []).length === 1;
    if(!isValidEmail) {
        jQuery('.why__form-email').addClass('invalid');
        jQuery('.why__form-email').attr('placeholder', jQuery(this).attr('data-invalid') || 'Заповніть email коректно');
        accept = false;
    } else {
        jQuery('.why__form-email').removeClass('invalid');
        jQuery('.why__form-email').attr('placeholder', jQuery(this).attr('data-placeholder'));
    }

    form.find('.input_required, .input_word-required').each(function() {
        if (!jQuery(this).attr('data-placeholder')) jQuery(this).attr('data-placeholder', jQuery(this).attr('placeholder'));

        if (
            force ||
            jQuery(this).hasClass('focused')
        ) {
            if (!jQuery(this).val() || !isNaN(jQuery(this).val())) {
                jQuery(this).addClass('invalid');
                jQuery(this).attr('placeholder', jQuery(this).attr('data-invalid') || 'Р—Р°РїРѕР»РЅРёС‚Рµ');
                accept = false;
            } else {
                jQuery(this).removeClass('invalid');
                jQuery(this).attr('placeholder', jQuery(this).attr('data-placeholder'));
            }
        }
    });

    return accept;
}

function showPopup(event, _item, _popupClass, _popupTitle, _popupButtun, _additionals) {
    // if (event) event.preventDefault();

    var self = this;
    if (typeof _item == 'object') {
        self = _item;
        _item = undefined;
    }

    var popupClass = _popupClass || jQuery(self).attr('data-popup') || 'pop_up';
    var activePopup = jQuery('.popup.' + popupClass);

    var item = _item || jQuery(self).attr('data-item');
    var title = _popupTitle || jQuery(self).attr('data-popup-title');
    var button = _popupButtun || jQuery(self).attr('data-popup-button');

    var titleNode = activePopup.find('.popup-title');
    if (!titleNode.attr('data-title')) titleNode.attr('data-title', titleNode.html());
    var buttonNode = activePopup.find('.popup-button');
    if (!buttonNode.attr('data-button')) buttonNode.attr('data-button', buttonNode.html());
    var itemNode = activePopup.find('.popup-item');
    if (!itemNode.attr('data-item')) itemNode.attr('data-item', itemNode.val());

    if (title) titleNode.html(title);
    else titleNode.html(titleNode.attr('data-title'));

    if (button) buttonNode.html(button);
    else buttonNode.html(buttonNode.attr('data-title'));

    activePopup.find('.popup-item').attr('data-additionals', '');
    if (_additionals) activePopup.find('.popup-item').attr('data-additionals', JSON.stringify(_additionals));

    if (item) itemNode.val(item);
    else itemNode.val(itemNode.attr('data-item'));

    activePopup.find('input').off('keydown').on('keydown', function(event) {
        var form = jQuery(this).parents('form').first();

        if (form.get(0) && event.keyCode == 13) form.submit();
    });

    jQuery('body').off('keydown').bind('keydown', function(event) {
        if (event.keyCode == 27) hidePopup();
    });

    var callbackFunction = jQuery.trim(jQuery(self).attr('callback-function'));
    if (callbackFunction) window[callbackFunction](self);

    hideScroll();
    jQuery('.popup').addClass('closed');
    activePopup.removeClass('closed');
    jQuery('.bg_pop_up').addClass('shown');
}

function hidePopup() {
    var activProductsPopupClass = jQuery('.popup:not(.closed)').hasClass('pop_up_fon_th3');

    showScroll();
    jQuery('.popup').addClass('closed');
    jQuery('.bg_pop_up').removeClass('shown');

    jQuery('.popup input:not([type="hidden"])').removeClass('invalid').val('');

    if (activProductsPopupClass) {
        var homePage = window.open(jQuery('#home_url').val(), '_self');
        homePage.focus();
    } else if (isPopupHref(location.href.split('#')[1]).status) history.back();
}

function isPopupHref(href) {
    var popupHref = jQuery('.show-popup[href="#' + href + '"]');

    return {
        status: Boolean(popupHref.length),
        linkNode: popupHref.get(0)
    };
}

function hideScroll() {
    var scrollbarWidth = getScrollbarWidth();

    jQuery('html, body').css('overflow-y', 'hidden');
    jQuery('body').css('padding-right', scrollbarWidth + 'px');
    jQuery('.header-fixed').css('width', 'calc(100% - ' + scrollbarWidth + 'px)');
}

function showScroll() {
    jQuery('html, body').css('overflow-y', 'auto');
    jQuery('body').css('padding-right', 0);
    jQuery('.header-fixed').css('width', '100%');
}

function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;

}

/* popup end */