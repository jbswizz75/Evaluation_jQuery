'use strict';

(function ($) {
    $.fn.MyForm = function (options) {
        this.settings = $.extend({
            'el': $(this) || [],
            'placeholder': 'Mon text',
            form: [],
            cssDefault: {
                margin: 10,
                padding: 10,
                fontSize: 13,
                borderRadius: 50,
                border: '1px solid'
            },
            buttonDefault: {
                marginTop: 10,
                border: 'none',
                borderRadius: 50,
                padding: 10,
                textAlign: 'center',
                textDecoration: 'none',
                display: 'block',
                fontSize: 16
            },
            errorDefault: {
                margin: 10,
                padding: 10,
                fontSize: 13,
                color: 'red',
            },
            validDefault: {
                margin: 10,
                padding: 10,
                fontSize: 13,
                color: 'green',
            }
        }, options);

        var el = this.settings.el;
        var cssDefault = this.settings.cssDefault;
        var buttonDefault = this.settings.buttonDefault;
        var errorDefault =  this.settings.errorDefault;
        var validDefault = this.settings.validDefault;
        var priv = {};

        // Public Methods - External methods
        Object.assign(this, {});

        // Private Methods
        Object.assign(priv, {
            /**
             * Create Form
             */
            'formGenerator': (form) => {
                var forms= $('<form/>');

                form.forEach((input) => {

                    if (input.type === 'input') {
                        forms.append(priv.setWrap(priv.setInput(input)));
                    }
                });

                el.append(forms);
                forms.append(priv.button());

            },
            /**
             * Create input wrap
             */
            'setWrap': (wrap) => {

                var div = $('<div/>');
                return div.append(wrap, priv.setError(wrap.data('options').errorDefault));
            },
            /**
             * Create input
             */
            'setInput': (input) => {

                return $('<input/>', {
                    class: 'my-input',
                    name : input.name,
                    value: input.value || '',
                    data: {...input},
                    placeholder: input.options.placeholder || '',
                    keypress : (() => {
                        const value = $(this).val();
                        const regex = RegExp(input.options.validRegex, 'gi');

                        if (!regex.test(value)) {
                            $(this).parent().children('p').show();
                        } else {
                            $(this).parent().children('p').hide();
                        }
                    })
                }.css(cssDefault));
            },
            /**
             * Create error
             */
            'select': (select) => {
                var el = $('<select selected />');

                select.options.forEach((option, index) => {
                  if (! index) {
                    el.append($('<option />', {
                      'value': option.value,
                      'text': option.name,

                    }))
                  } else {
                    el.append($('<option />', {
                      'value': option.value,
                      'text': option.name
                    }))
                  }
                })

                return el;
            },
            /**
             * Create error
             */
            'setError': (message) => {

                return $('<p/>', {
                    class: 'msg-error'
                }).css(errorDefault).text(message).hide();
            },
            /**
             * Create error
             */
            'setValid': (message) => {

                return $('<p/>', {
                    class: 'msg-valid'
                }).css(validDefault).text(message).hide();
            },
            /**
             * Create button
             */
            'button': () => {

                return $('<button/>', {
                    text: 'Submit'
                }).css(buttonDefault)
            },
            /**
             * Get Data
             */
            'Data': (callback) => {
                $(el).children('form').children('input').children('select').children('button').on('click', (e) => {
                    e.preventDefault();

                    callback(el.children('form').serializeArray());

                });
            },
            /**
             * Initialize the plugin
             */
            'init': function () {
                priv.formGenerator(this.settings.form);
                console.log(el);
            }.bind(this)
        });

        // Initialise the plugin
        priv.init();

        return this;
    };
}(jQuery));