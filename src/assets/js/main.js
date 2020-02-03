

"use strict";

/*[ Back to top ]
===========================================================*/
let windowH = $(window).height() / 2;

$(window).on('scroll', function () {
    if ($(this).scrollTop() > windowH) {
        $("#myBtn").css('display', 'flex');
    } else {
        $("#myBtn").css('display', 'none');
    }
});

$('#myBtn').on("click", function () {
    $('html, body').animate({ scrollTop: 0 }, 300);
});




let checkExistMenu = setInterval(function () {
    if ($('.container-menu-desktop').length && $('.wrap-menu-desktop').length) {

        /*==================================================================
        [ Fixed Header ]*/
        let headerDesktop = $('.container-menu-desktop');
        let wrapMenu = $('.wrap-menu-desktop');
        let posWrapHeader = 0;
        if ($('.top-bar').length > 0) {
            posWrapHeader = $('.top-bar').height();
        }
        else {
            posWrapHeader = 0;
        }


        if ($(window).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top', 0);
        }
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > posWrapHeader) {
                $(headerDesktop).addClass('fix-menu-desktop');
                $(wrapMenu).css('top', 0);
            }
            else {
                $(headerDesktop).removeClass('fix-menu-desktop');
                $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
            }
        });

        /*==================================================================
        [ Menu mobile ]*/

        $('.btn-show-menu-mobile').on('click', function () {
            $(this).toggleClass('is-active');
            $('.menu-mobile').slideToggle();
        });

        let arrowMainMenu = $('.arrow-main-menu-m');

        for (let i = 0; i < arrowMainMenu.length; i++) {
            $(arrowMainMenu[i]).on('click', function () {
                $(this).parent().find('.sub-menu-m').slideToggle();
                $(this).toggleClass('turn-arrow-main-menu-m');
            })
        }

        $(window).resize(function () {
            if ($(window).width() >= 992) {
                if ($('.menu-mobile').css('display') == 'block') {
                    $('.menu-mobile').css('display', 'none');
                    $('.btn-show-menu-mobile').toggleClass('is-active');
                }

                $('.sub-menu-m').each(function () {
                    if ($(this).css('display') == 'block') {
                        console.log('hello');
                        $(this).css('display', 'none');
                        $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                    }
                });

            }
        });


        clearInterval(checkExistMenu);
    }
}, 300);








/*==================================================================
[ Show / hide modal search ]*/


$('.js-show-modal-search').on('click', function () {
    $('.modal-search-header').addClass('show-modal-search');
    $(this).css('opacity', '0');
});

$('.js-hide-modal-search').on('click', function () {
    $('.modal-search-header').removeClass('show-modal-search');
    $('.js-show-modal-search').css('opacity', '1');
});

$('.container-search-header').on('click', function (e) {
    e.stopPropagation();
});


/*==================================================================
[ Filter / Search product ]*/

let checkExistFilterAndSearch = setInterval(function () {

    if ($('.js-show-filter').length > 0 && $('.js-show-search').length > 0) {
        $('.js-show-filter').on('click', function () {
            $(this).toggleClass('show-filter');
            $('.panel-filter').slideToggle(400);

            if ($('.js-show-search').hasClass('show-search')) {
                $('.js-show-search').removeClass('show-search');
                $('.panel-search').slideUp(400);
            }
        });

        $('.js-show-search').on('click', function () {
            $(this).toggleClass('show-search');
            $('.panel-search').slideToggle(400);

            if ($('.js-show-filter').hasClass('show-filter')) {
                $('.js-show-filter').removeClass('show-filter');
                $('.panel-filter').slideUp(400);
            }
        });
        clearInterval(checkExistFilterAndSearch);
    }
}, 300);





/*==================================================================
[ Cart ]*/
$('.js-show-cart').on('click', function () {
    $('.js-panel-cart').addClass('show-header-cart');
});

$('.js-hide-cart').on('click', function () {
    $('.js-panel-cart').removeClass('show-header-cart');
});

/*==================================================================
[ Cart ]*/
$('.js-show-sidebar').on('click', function () {
    $('.js-sidebar').addClass('show-sidebar');
});

$('.js-hide-sidebar').on('click', function () {
    $('.js-sidebar').removeClass('show-sidebar');
});

/*==================================================================
[ +/- num product ]*/
$('.btn-num-product-down').on('click', function () {
    let numProduct = Number($(this).next().val());
    if (numProduct > 0) $(this).next().val(numProduct - 1);
});

$('.btn-num-product-up').on('click', function () {
    let numProduct = Number($(this).prev().val());
    $(this).prev().val(numProduct + 1);
});

/*==================================================================
[ Rating ]*/
$('.wrap-rating').each(function () {
    let item = $(this).find('.item-rating');
    let rated = -1;
    let input = $(this).find('input');
    $(input).val(0);

    $(item).on('mouseenter', function () {
        let index = item.index(this);
        let i = 0;
        for (i = 0; i <= index; i++) {
            $(item[i]).removeClass('zmdi-star-outline');
            $(item[i]).addClass('zmdi-star');
        }

        for (let j = i; j < item.length; j++) {
            $(item[j]).addClass('zmdi-star-outline');
            $(item[j]).removeClass('zmdi-star');
        }
    });

    $(item).on('click', function () {
        let index = item.index(this);
        rated = index;
        $(input).val(index + 1);
    });

    $(this).on('mouseleave', function () {
        let i = 0;
        for (i = 0; i <= rated; i++) {
            $(item[i]).removeClass('zmdi-star-outline');
            $(item[i]).addClass('zmdi-star');
        }

        for (let j = i; j < item.length; j++) {
            $(item[j]).addClass('zmdi-star-outline');
            $(item[j]).removeClass('zmdi-star');
        }
    });
});

/*==================================================================
[ Show modal1 ]*/
$('.js-show-modal1').on('click', function (e) {
    e.preventDefault();
    $('.js-modal1').addClass('show-modal1');
});

$('.js-hide-modal1').on('click', function () {
    $('.js-modal1').removeClass('show-modal1');
});