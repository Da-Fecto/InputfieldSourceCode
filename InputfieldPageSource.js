$(function () {

    'use strict';

    var $copyButton = $(".InputfieldPageSource button"),
        client = new ZeroClipboard($copyButton),
        $textarea,
        $button;


    $(".InputfieldPageSource textarea").on('focus', function () {
        $(this).select();
    });

    // copy to clipboad button
    $copyButton.on('click', function (event) {
        event.preventDefault();
    });

    // control
    client.on('ready', function () {

        // copy
        client.on('copy', function (event) {
            $button = $(event.target);
            $textarea = $button.parent().find('textarea');
            $button.parent().find('.notes').removeClass('hide');
            event.clipboardData.setData('text/plain', $textarea.val());
        });

        // after copy
        client.on('aftercopy', function (event) {
            $button = $(event.target);
            $button.parent().find('.notes').addClass('hide');
            window.setTimeout(function () {
                $button.removeClass('ui-state-active');
            }, 330);

        });
    });

    // destroy & remove unnecessary
    client.on('error', function () {

        ZeroClipboard.destroy();

        $textarea = $copyButton.parent().find('textarea');
        $textarea.removeClass('hide');

        // when rows set to 0 and button fails reset the rows of the textarea
        if (parseInt($textarea.attr('rows'), 10) === 0) {
            $textarea.attr('rows', 5);
        }

        $copyButton.remove();
        $(".InputfieldPageSource .notes").remove();
    });

});
