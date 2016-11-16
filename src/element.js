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

// http://stackoverflow.com/a/10816667/168815
function getOffset(evt) {
	var el = evt.target,
		x = 0,
		y = 0;

	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		x += el.offsetLeft - el.scrollLeft;
		y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}

	x = evt.clientX - x;
	y = evt.clientY - y;

	return { x: x, y: y };
}

export class DraggableElement {
	constructor(chartInstance, elementInstance, elementConfig) {
		this.chart = chartInstance;
		this.element = elementInstance;
		this.config = elementConfig;
	}

	getBox(tolerance) {
		return {
			x: [ this.element._view.x - tolerance, this.element._view.x + tolerance ],
			y: [ this.element._view.y - tolerance, this.element._view.y + tolerance ],
		};
	}

	isInBox(event, tolerance) {
		let click = getOffset(event);
		let box = this.getBox(tolerance || 0);
		return (
			click.x >= box.x[0] && click.x <= box.x[1] &&
			click.y >= box.y[0] && click.y <= box.y[1]
		);
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
