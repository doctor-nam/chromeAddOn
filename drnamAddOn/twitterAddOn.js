$(function() {
    createDownload();
    $('.nav.js-global-actions, .new-tweets-bar').mouseup(function() {
        createDownload();
    });

    twitterIcoChange();
    twitterTitleChange();
    addDeleteBtn();

    $("title").bind("DOMSubtreeModified", function(){
        twitterTitleChange();
    });

    $('.people.notifications .new-count .count-inner').bind("DOMSubtreeModified", function(){
        var cnt = $(this).html();
        //twitterPush(cnt);
    });

    $('.PermalinkOverlay-modal, .stream-container').on('DOMNodeInserted', function(e) {
        createDownload();
    });

    $('.AdaptiveMedia-photoContainer, div[aria-label=이미지]').on('mouseenter', function(e) {
        createDownload();
    });

    $('.Gallery-media').on('DOMNodeInserted', function(e) {
        $(this).siblings('.btn').remove();
        createDownload();
    });

    $('.btn-img-download').on('DOMNodeInserted', function(e) {
        alert($(this).attr('href'));
    });

    /* 60초에 한 번씩 알림 체크
    setInterval(function() {
        var cnt = $('.people.notifications .new-count .count-inner').html();
        //twitterPush(cnt);
    }, 60000); */
});

$(window).on("load", function() {
    createDownload();
    twitterIcoChange();
    twitterTitleChange();
    addDeleteBtn();

    var cnt = $('.people.notifications .new-count .count-inner').html();
    //twitterPush(cnt);
});

$(window).on("scroll", function() {
    createDownload();
    twitterIcoChange();
    twitterTitleChange();
    addDeleteBtn();

    var cnt = $('.people.notifications .new-count .count-inner').html();
    //twitterPush(cnt);
});

var rep = '다음';

function createDownload() {
    $('.AdaptiveMedia-photoContainer, .Gallery-media').each(function() {
        var imgUrl = $(this).children('img').attr('src');
        if (typeof imgUrl != 'undefined') {
            var large = ':large'
            if (imgUrl.indexOf(':large') != -1 || imgUrl.indexOf('profile_images') != -1) {
                large = '';
            }
            if ($(this).siblings('.btn').length == 0) {
                $(this).after("<a class='btn'></a>");
                $(this).siblings('.btn').attr({'href' : imgUrl+large, 'target':'_blank'});
            }
        }
    });

    $('div[aria-label=이미지]').each(function() {
        var imgUrl = $(this).children('img').attr('src');
        if (typeof imgUrl != 'undefined') {
            if ($(this).closest('a').find('.btn-img-download').length == 0) {
                $(this).closest('a').append("<a class='btn-img-download'></a>");
                $(this).children('.btn-img-download').attr({'href' : imgUrl, 'target':'_blank'});
            }
        }
    });

    /* gif 가져오기 담에 하자..
    $('.PlayableMedia-reactWrapper').each(function() {
        var vidUrl = $(this).find('video').attr('src');

        if(typeof vidUrl != 'undefined') {
            if(vidUrl.indexOf('blob:') != -1){
                vidUrl = '';
            }

            if ($(this).nextAll('.btn').length == 0 && vidUrl.length != 0) {
                $(this).siblings('.btn').remove();
                $(this).after("<a class='btn'></a>");
                $(this).siblings('.btn').prop({'href' : vidUrl, 'target':'_blank'});
            }
        }
    }); */

    // 자동 삭제?
    $(document).on('click', '.btn-delete', function() {
        console.log(1);
        $('div[aria-haspopup=menu]').eq(0).trigger('click');
    });
}

function twitterIcoChange() {
    var ico = chrome.extension.getURL('favicon-daum.ico');
    $('link[rel="shortcut icon"], link[rel="mask-icon"]').attr('href', ico);
}

function twitterTitleChange() {
    /*
    if ($('title').html().indexOf('트위터') != -1) {
        var tit = $('title').html().replace('트위터', rep);
        //alert(tit);
        $('title').html(tit);
    }*/
}

function twitterPush(cnt) { // 알림 설정
    var cnt = cnt;
    //console.log(cnt);
    if ($('title').html().indexOf('알림') == -1) {
        var ti = $('title').html();
        var tiSplit = ti.split('] '); // 문자열로 자르기
        var tiFirst = ti.substring(0,1); // 문자열로 자르기

        if (cnt != 0 && typeof cnt != 'undefined' && tiFirst != '[') {
            $('title').html('['+cnt+'] '+ ti);
        }
        else {
            $('title').html(tiSplit[1]);
        }
    }
}

// 자동 삭제?
function addDeleteBtn() {
    var btn = '<button type="button" class="btn-delete">트윗삭제</button>'
    if ($('body > .btn-delete').length == 0) {
        $('body').append(btn);
    }
}