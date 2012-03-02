ko.bindingHandlers['textchange'] = {
	'update': function(element, valueAccessor) {
		var $element = $(element),
			value = ko.utils.unwrapObservable(valueAccessor());

		$element.off('textchange').on('textchange', value);
	}
};


