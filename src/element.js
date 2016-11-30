'use strict';

/*
{
	draggable: true,
	onDragStart: function(event) {
		
	},
	onDrag: function(event) {
		
	},
	onDragEnd: function(event) {
		
	}
}
*/

export class DraggableElement {
	constructor(chartInstance, elementInstance, elementConfig) {
		this.chart = chartInstance;
		this.element = elementInstance;
		this.config = elementConfig;
	}

	_constrainValue(scale, value) {
		if (typeof scale.min !== 'undefined' && value < scale.min) {
			return scale.min;
		} else if (typeof scale.max !== 'undefined' && value > scale.max) {
			return scale.max;
		} else {
			return value;
		}
	}

	dispatch(type, event) {
		// Invoke plugin callback
		if (typeof this[type] === 'function') {
			this[type](event);
		}

		// Invoke user callback
		if (typeof this.config[type] === 'function') {
			this.config[type](event);
		}
	}
}
