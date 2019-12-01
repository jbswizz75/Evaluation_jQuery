'use strict';

(function ($) {
  $.fn.MyTodo = function (options) {
    this.settings = $.extend({
      'placeholder': 'Mon texte',
      'el': $(this) || []
    }, options);
    var el = this.settings.el;
    var priv = {};
    // Public Methods - External methods
    Object.assign(this, {
      /**
       * Get the value after keypress "enter"
       * @param {function} callback
       */
      'getValue': function (callback) {
        el.on('keyup', function (e) {
          if (e.keyCode == 13) {
            callback(e, el.val());
            el.val('');
          }
        });
        return this;
      },
      /**
       * Generate li element with a value
       * @param {String} value
       */
      'setTask': function (value) {
        if (! value.length) {
          return this;
        }
        var id = Math.floor(Math.random() * 26) + Date.now();

        $('body').append('<li id="'+ id +'"><span>' + value + '</span></li>');
        $('#' + id).append(' <button class="btn-remove">remove</button>');
        $('#' + id).append(' <button class="btn-done">done</button>');
        $('#' + id).append(' <button class="btn-edit">edit</button>');

        return this;
      },
      /**
       * done task
       */
      'doneTask': function () {
        $('li > .btn-done').on('click', function () {
          $(this).parent().children('span').css({
            'color': 'green',
            'font-weight': 'bold',
            'text-decoration': 'line-through'
          });
        });
      },
      /**
       * remove task
       */
      'removeTask': function () {
        $('li > .btn-remove').on('click', function () {
          $(this).parent().remove();
        });
      },
      /**
       * edit task
       */
      'editTask': function() {
        $('li > .btn-edit').on('click', function () {
          $(this).parent().children('.btn-edit').hide();
          var valueTask = $(this).parent().children('span').text();

          var button = $('<button/>', {
            text: 'update',
            click: function () {
              var value = $(this).parent().children('input').val();
              $(this).parent().children('span').text(value);
              $(this).parent().children('input').remove();
              $(this).parent().children('.btn-edit').show();
              $(this).remove();
            }
          });

          $(this).parent().append('<input class="edit-input" value="'+valueTask+'"></input>');
          $(this).parent().append(button);
        });
      }
    });
    // Private Methods - Internal methods
    Object.assign(priv, {
      'style': function () {
        el.css({
          'padding': 10,
          'fontSize': 15,
          'border-radius': 5,
          'border': '1px solid #eaeaea',
        });
        return this;
      },
      /**
       * Initialize the plugin
       */
      'init': function () {
        priv.style();
        el.attr('placeholder', this.settings.placeholder);

        // Set a new task after touch "enter"
        this.getValue(function(e, value) {
          this.setTask(value);
          this.doneTask();
          this.removeTask();
          this.editTask();
        }.bind(this));
        return this;
      }.bind(this)
    });
    // Initialise the plugin
    priv.init();
    return this;
  };
}(jQuery));