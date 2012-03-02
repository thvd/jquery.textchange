ko.bindingHandlers['textchange'] = {
	'init': function(element, valueAccessor, viewModel) {
		var $element = $(element),
			value = ko.utils.unwrapObservable(valueAccessor());

		$element.on('textchange', value.call(viewModel, element));
	}
};


