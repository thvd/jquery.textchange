/*!
 * jQuery TextChange Plugin
 * http://www.zurb.com/playground/jquery-text-change-custom-event
 *
 * Origin:
 * Copyright 2010, ZURB
 * Released under the MIT License
 */
(function ($) {
	
	$.fn.hasContentEditable = function() {
		return this[0].contentEditable === 'true';
	};
	
	$.event.special.textchange = {
		
		setup: function (data, namespaces) {
			var $this = $(this);
			$this.data('lastValue', $this.hasContentEditable() ? $this.html() : $this.val())
				.on('keyup.textchange', $.event.special.textchange.handler)
				.on('cut.textchange paste.textchange input.textchange', $.event.special.textchange.delayedHandler);
		},
		
		teardown: function (namespaces) {
			$(this).off('textchange');
		},
		
		handler: function (event) {
			$.event.special.textchange.triggerIfChanged($(this));
		},
		
		delayedHandler: function (event) {
			var $this = $(this);
			setTimeout(function () {
				$.event.special.textchange.triggerIfChanged($this);
			}, 25);
		},
		
		triggerIfChanged: function (element) {
			var current = element.hasContentEditable() ? element.html() : element.val();
			if (current !== element.data('lastValue')) {
				element.trigger('textchange',  [element.data('lastValue')]);
				element.data('lastValue', current);
			}
		}
	};
	
	$.event.special.hastext = {
		
		setup: function (data, namespaces) {
			$(this).on('textchange', $.event.special.hastext.handler);
		},
		
		teardown: function (namespaces) {
			$(this).off('textchange', $.event.special.hastext.handler);
		},
		
		handler: function (event, lastValue) {
			var $this = $(this);
			if (lastValue === '' && lastValue !== $this.val()) {
				$this.trigger('hastext');
			}
		}
	};
	
	$.event.special.notext = {
		
		setup: function (data, namespaces) {
			$(this).on('textchange', $.event.special.notext.handler);
		},
		
		teardown: function (namespaces) {
			$(this).off('textchange', $.event.special.notext.handler);
		},
		
		handler: function (event, lastValue) {
			var $this = $(this), 
			value = $this.val();
			if (value === '' && value !== lastValue) {
				$this.trigger('notext');
			}
		}
	};

})(jQuery);
