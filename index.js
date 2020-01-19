! function ($) {
    'use strict';    
    $.fn['showWordLimit'] = function (method) {
        var methods = {
            init: function (option) {
                option = $.extend({}, {
                    change: function () {}
                }, option);
                return this.each(function () {
                    var elecontext = $(this).context,
                        tagName = elecontext.tagName,
                        maxlength = $(this).attr('maxlength');
                        
                    if (((tagName === 'INPUT' && elecontext.type !== 'number') ||
                            tagName === 'TEXTAREA') && maxlength) {
                        var $element = $(this).clone().css('box-sizing', 'border-box'),
                            $swlcol = $('<div class="swl-col">'),
                            $swlinput_suffix = $('<span class="swl-input_suffix"></span>'),
                            flag = false;

                        $swlinput_suffix.text('0/' + maxlength);
                        if ($element.context.tagName === 'INPUT') {
                            $swlinput_suffix.css('line-height', $(this).outerHeight() + 'px');
                        } else {
                            $swlinput_suffix.css({
                                'top': 'initial',
                                'bottom': 10
                            });
                        }
                        $(this).replaceWith($swlcol.append($element).append($swlinput_suffix));

                        $element.unbind().on('input propertychange', function () {
                            if (!flag) {
                                handleFontString($(this), $swlinput_suffix, maxlength, tagName, option);
                            }
                        }).on('compositionstart', function () {
                            flag = true;
                        }).on('compositionend', function () {
                            handleFontString($(this), $swlinput_suffix, maxlength, tagName, option);
                            flag = false;
                        });
                    }
                })
            }
        }

        function handleFontString($input_element, $swlinput_suffix, maxlength, tagName, option) {
            var content = $input_element.val();
            $swlinput_suffix.text(content.length + '/' + maxlength);
            if (tagName === 'INPUT') {
                $input_element.css('padding-right', $swlinput_suffix.outerWidth());
            }
            if (typeof option.change === 'function') {
                option.change(content);
            }
        }
        if (methods[method])
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof method === 'object' || !method)
            return methods.init.apply(this, arguments);
        else
            $.error('Method ' + method + ' does not exist!');
    };
    $(function () {
        $('[show-word-limit]').showWordLimit();
    });
}(jQuery);