$(document).ready(function(){
    /*********************
            Scroll-Spy
            Activating Scroll-spy.
    *********************/
    $('body').scrollspy({ target: '#tributepage-navbar-collapse' })
    /*********************
            Carousel
            Reference: https://www.sitepoint.com/full-screen-bootstrap-carousel-random-initial-image/
    *********************/
    // Initialise the Carousel. Set to keep the image cycling active by setting 'pause' to 'false'
    var $tabCarousel = $('.carousel');
    
    $tabCarousel.carousel({
      interval: 4000,
      pause: "false"
    });
    
    // To implement full-screen carousel slide show.
    var $item = $('.carousel .item');
    var $wHeight = $(window).height();

    $item.height($wHeight); 
    $item.addClass('full-screen');

    $('.carousel img').each(function() {
        var $src = $(this).attr('src');
        var $color = $(this).attr('data-color');
        $(this).parent().css({
            'background-image' : 'url(' + $src + ')',
            'background-color' : $color
        });
        $(this).remove();
    });

    $(window).on('resize', function (){
        $wHeight = $(window).height();
        $item.height($wHeight);
    });
    
    // Add a random 'active' slide
    var $numberofSlides = $('.item').length;
    var $currentSlide = Math.floor((Math.random() * $numberofSlides));

    $('.carousel-indicators li').each(function(){
        var $slideValue = $(this).attr('data-slide-to');
        if($currentSlide == $slideValue) {
            $(this).addClass('active');
            $item.eq($slideValue).addClass('active');
        } else {
            $(this).removeClass('active');
            $item.eq($slideValue).removeClass('active');
        }
    });
    
    // Animate the Carousel
    function carouselAnimations(elems) {
        var animEndEv = 'webkitAnimationEnd animationend';
        
        elems.each(function () {
            var $this = $(this), 
                $animationType = $this.data('animation');
            
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }
    
    var $firstAnimatingElems = $tabCarousel.find('.item:first').find('[data-animation ^= "animated"]');

    carouselAnimations($firstAnimatingElems);
    //$tabCarousel.carousel('pause');
    
    $tabCarousel.on('slide.bs.carousel', function (e) { 
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        carouselAnimations($animatingElems);
    });
    
    /*********************
            Collapsable Menu
    *********************/
    $('.navbar-toggle').click(function(){
        $(this).toggleClass('active-toggle');
    });
    
    /**************************
            Scroll - Sticky Menu
    ***************************/
    $(window).scroll(function() {
        var $wWidth = $(window).width();
        //console.log($wWidth);
	    if ($(this).scrollTop() > 450){  
            $('.navbar').addClass('sticky-navbar');
            $('.navbar-header').addClass('sticky-navbar-header').removeClass('navbar-header');  
            $('.navbar .collapse').addClass('sticky-navbar-collapse').removeClass('navbar-collapse');
            if($('.sticky-navbar-collapse').attr('style') !== 'undefined' ) {
                $('.sticky-navbar-collapse').removeAttr('style');
            }
             $('.navbar-nav').addClass('sticky-ul');
            $('.navbar-nav>li').addClass('sticky-li');
            if($wWidth < 768) {
                var $listItem = $('nav.navbar ul.navbar-nav li a');
                //console.log($('nav.navbar ul.navbar-nav li a').length);
                $listItem.empty();
                $listItem.each(function(i) {
                    var $hrefAttr = $(this).attr('href');
                    if($hrefAttr === '#msd') {
                        $(this).append('<i class="fa fa-user" aria-hidden="true"></i>');
                    } else if($hrefAttr === '#personal') {
                        $(this).append('<i class="fa fa-bullseye" aria-hidden="true"></i>');
                    } else if($hrefAttr === '#achive') {
                        $(this).append('<i class="fa fa-anchor" aria-hidden="true"></i>');
                    } else if($hrefAttr === '#gallery') {
                        $(this).append('<i class="fa fa-picture-o" aria-hidden="true"></i>');
                    }
                });
            } else {
                var $listItem = $('nav.navbar ul.navbar-nav li a');
                //console.log($('nav.navbar ul.navbar-nav li a').length);
                $listItem.empty();
                $listItem.each(function(i) {
                    var $hrefAttr = $(this).attr('href');
                    if($hrefAttr === '#msd') {
                        $(this).text('MSD');
                    } else if($hrefAttr === '#personal') {
                        $(this).text('Personal');
                    } else if($hrefAttr === '#achive') {
                        $(this).text('Achivements');
                    } else if($hrefAttr === '#gallery') {
                        $(this).text('Gallery');
                    }
                });
            }            
        }
        else{
            $('.navbar').removeClass('sticky-navbar');
            $('.sticky-navbar-header').addClass('navbar-header').removeClass('sticky-navbar-header');
            $('.navbar .collapse').addClass('navbar-collapse').removeClass('sticky-navbar-collapse');
            $('.navbar-nav').removeClass('sticky-ul');
            $('.navbar-nav>li').removeClass('sticky-li');
            if($wWidth < 768) {
                var $listItem = $('nav.navbar ul.navbar-nav li a');
                //console.log($('nav.navbar ul.navbar-nav li a').length);
                $listItem.empty();
                $listItem.each(function(i) {
                    var $hrefAttr = $(this).attr('href');
                    if($hrefAttr === '#msd') {
                        $(this).text('MSD');
                    } else if($hrefAttr === '#personal') {
                        $(this).text('Personal');
                    } else if($hrefAttr === '#achive') {
                        $(this).text('Achivements');
                    } else if($hrefAttr === '#gallery') {
                        $(this).text('Gallery');
                    }
                });
            }
        }
    });
});