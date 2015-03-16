(function($) {

  $.fn.stickynote = function(options) {
    var opts = $.extend({}, $.fn.stickynote.defaults, options);
    return this.each(function() {
      $this = $(this);
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      switch (o.event) {
        case 'dblclick':
          $this.dblclick(function(e) {
            $.fn.stickynote.createNote(o);
          })
          break;
        case 'click':
          $this.click(function(e) {
            $.fn.stickynote.createNote(o);
          })
          break;
      }
    });
  };
  $.fn.stickynote.defaults = {
    size: 'small',
    event: 'click',
    color: '#000000'
  };
  $.fn.stickynote.createNote = function(o) {
    if (o.size === 'large') {
      $('.carousel').carousel(0).carousel('pause');
    }
    var _note_content = $(document.createElement('textarea'));
    var _div_note = $(document.createElement('div'))
      .addClass('jStickyNote')
      .css('cursor', 'move');
    if (!o.text) {
      _div_note.append(_note_content);
      var _div_create = $(document.createElement('div'))
        .addClass('jSticky-create')
        .attr('title', 'Create Sticky Note').append(
          "<span class='glyphicon glyphicon-ok-sign'></span>");

      _div_create.click(function(e) {
        $('.carousel').carousel('pause');
        var _p_note_text = $(document.createElement('p'))
          .css('color', o.color)
          .html(
            $(this)
            .parent()
            .find('textarea')
            .val()
          );
        $(this)
          .parent()
          .find('textarea')
          .before(_p_note_text)
          .remove();
        var id = (new Date().getTime());
        if (o.size === 'large') {
          var _div_reply = $(document.createElement('div'))
            .addClass('jSticky-create').attr("id", id).css("position",
              "absolute").css("left", "275px").append(
              "<span class='glyphicon glyphicon-pencil'></span>");
          $(this).parent().attr("id", id + "up").append(_div_reply);
          $("#" + id).stickynote({
            size: 'small',
            containment: id + "up",
            container: "#" + id + "up",
            ontop: true,
            color: '#658688'
          });
        }
        $(this).remove();
        $('.carousel').carousel({
          interval: 30000,
          pause: 'hover'
        });
      })
    } else
      _div_note.append('<p style="color:' + o.color + '">' + o.text +
        '</p>');

    var _div_delete = $(document.createElement('div'))
      .addClass('jSticky-delete').append(
        "<span class='glyphicon glyphicon-remove-sign'></span>");

    _div_delete.click(function(e) {
      $(this).parent().remove();
    })
    var left = parseInt(Math.random() * ($('.carousel').width() - 410) +
      Math.random() * 100) + "px";
    var _div_wrap = $(document.createElement('div'))
      .css({
        'position': 'absolute',
        'top': '80px',
        'left': (o.size === 'large') ? left : '200px'
      })
      .append(_div_note)
      .append(_div_delete)
      .append(_div_create);
    switch (o.size) {
      case 'large':
        _div_wrap.addClass('jSticky-large');
        break;
      case 'small':
        _div_wrap.addClass('jSticky-medium');
        break;
    }
    if (o.containment) {
      _div_wrap.draggable({
        containment: '#' + o.containment,
        scroll: false,
        start: function(event, ui) {
          if (o.ontop)
            $(this).parent().append($(this));
        }
      });
    } else {
      _div_wrap.draggable({
        scroll: false,
        start: function(event, ui) {
          if (o.ontop)
            $(this).parent().append($(this));
        }
      });
    }
    $(o.container).append(_div_wrap);

    if (!!o.text) {
      var id = (new Date().getTime());
      var _div_reply = $(document.createElement('div'))
        .addClass('jSticky-create').attr("id", id).css("position",
          "absolute").css("left", "275px").append(
          "<span class='glyphicon glyphicon-pencil'></span>");
      _div_wrap.attr("id", id + "up").append(_div_reply);
      $("#" + id).stickynote({
        size: 'small',
        containment: id + "up",
        container: "#" + id + "up",
        ontop: true,
        color: '#658688'
      });
    }
  };
  $('.carousel').carousel({
    interval: 30000,
    pause: 'hover'
  });
})(jQuery);
