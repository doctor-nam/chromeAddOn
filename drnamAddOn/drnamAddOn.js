$(function() {
    addTargetBlank();
    var url = window.location.href;

    if (url.indexOf('kims') != -1) {
        var $lastStyle = $('link[rel=Stylesheet]').last();
        $('<link rel="Stylesheet" href="http://www.desitive.co.kr/kada/share/css/kada-custom.css">').insertAfter($('body'));
    }

    if (url.indexOf('youtube.com') != -1) {//유튜브
        var repeat = setInterval(function() {
            if ($('#buttons .btn-hide-bar').length == 0) {
                $('#buttons').prepend('<a href="#none" class="btn-hide-bar normal">캡쳐 모드</a>');
                console.log('yt');
            }
            else {
                clearInterval(repeat);
            }
        }, 1000);

		$(document).on('click', 'a.btn-hide-bar.normal', function() {
            $(this).addClass('active');
            $(this).removeClass('normal');
            $(this).html('캡쳐 모드 해제');
            $('.ytp-chrome-bottom, .ytp-gradient-bottom').hide();
            return false;
		});
        $(document).on('click', 'a.btn-hide-bar.active', function() {
            $(this).addClass('normal');
            $(this).removeClass('active');
            $(this).html('캡쳐 모드');
            $('.ytp-chrome-bottom, .ytp-gradient-bottom').show();
            return false;
		});
    }

    if (url.indexOf('oksusu.com') != -1) {//옥수수
        $('body').append('<a href="#none" class="btn-oksusu-zoom">+</a>');

		$('a.btn-oksusu-zoom').on('click', function() {
			$('body').toggleClass('oksusu-zoom');

			if ($('body').hasClass('oksusu-zoom'))
			{
				$("html, body").stop().animate({scrollTop:120}, 500, 'swing');
				$('a.btn-oksusu-zoom').html('-');
			}
			else {
				$("html, body").stop().animate({scrollTop:0}, 500, 'swing');
				$('a.btn-oksusu-zoom').html('+');
			}
		});
    }

    if (url.indexOf('http://lpcd.co.kr/') != -1) {
        $('style + table').find('td').each(function() {
            var src = $(this).find('.sell_price + img').attr('src');
            console.log(typeof src);
            if (typeof src != 'undefined') {
                if (src.indexOf('icon_product0.gif') != -1) {
                    $(this).css('opacity', '0.1');
                }
            }
        });
    }

    if (url.indexOf('smartstore.naver.com') != -1) {
        $('#content > div > ul > li').each(function() {
            var html = $(this).find('.text').html();
            if (typeof html != 'undefined') {
                if (html.indexOf('품절') != -1) {
                    $(this).css({'position':'fixed', 'top':'-9999px', 'left':'-9999px'});
                }
            }
        });
    }

    if (url.indexOf('//ouo') != -1) {
        $('button.btn-main').removeClass('disabled').css('z-index', 999999999999999999999999999);
        $('.footer-copy').nextAll('div').eq(0).remove();
    }

    if (url.indexOf('//javfreefull') != -1) {
        removeStreamElem();
        $(document).on('DOMNodeInserted', function(e) {
            console.log(typeof $(e.target).attr('id'));
            if ( $(e.target).is('div') && $(e.target).children('a').attr('id').indexOf('container') != 0 ) {
                $(e.target).remove();
            }
            if ( $("body").children(e.target).is('iframe')) {
                $(e.target).remove();
            }
        });

        $("body").append("<a href='#none' class='btn-mp4-play'>Play</a>");
        $(document).on('click', 'a.btn-mp4-play', function() {
            alert($('iframe').contents().find('a').length);
        });

    }

    if (url.indexOf('dolpixel') != -1) {
        $('#username').val('othertheside@naver.com');
        $('#password').val('orange30');
        $('body').addClass('dolpixel');
        $('body.dolpixel .gallery-display > figure > a, body.dolpixel .imagesFromUser > a, body.dolpixel .more-from-site > a').prop('target', '_blank');
    }

    if (url.indexOf('winktv.co.kr') != -1) {
        $('.layerPop-btnCancel > input:checkbox').prop('checked', true);
        $('.layerPop-btnCancel').trigger('click');

        $('#alert_layer').on('DOMNodeInserted', function(e) {
            $('#user_id').val('goodl2u');
            $('#user_pw').val('!@#wink4489');
        });
    }

    if (url.indexOf('//sh.') != -1) {
        // $('#timer').remove();
        // $('.skip-btn').addClass('show');
    }
});

$(window).on('hashchange', function(e){
    console.log('changed?');
});

$(window).on("load", function() {
    addTargetBlank();
});

$(window).on("scroll", function() {
    addTargetBlank();
});

function addTargetBlank() {
    $('.post-body.entry-content a').each(function() {
        $(this).attr('target', '_blank');
    });
}

/* 새창 막기 함수 */
function winOpen(url)
{
    //check if child window is already open
    if (childWin &! childWin.closed && childWin.focus){
        childWin.focus();
    } else {
        childWin = window.open(url,'','width=800,height=600');
    }
}

/* stream */
function removeStreamElem() {
}
