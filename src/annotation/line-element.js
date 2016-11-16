'use strict';

import { DraggableElement } from '../element';

export class DraggableLineAnnotationElement extends DraggableElement {
	constructor(chartInstance, elementInstance, elementConfig) {
		super(chartInstance, elementInstance, elementConfig);
		this.scale = this.chart.scales[elementConfig.scaleID];
	}

	_getPixel(event) {
		return this.scale.isHorizontal() ? event.x : event.y;
	}

	_getValue(event) {
		let offset = this.offset || 0;
		return this.scale.getValueForPixel(this._getPixel(event) - offset);
	}

	getBox(tolerance) {
		return {
			x: [ this.element._view.x1 - tolerance, this.element._view.x2 + tolerance ],
			y: [ this.element._view.y1 - tolerance, this.element._view.y2 + tolerance ]
		};
	}

	onDragStart(event) {
		this.offset = this._getPixel(event) - this.scale.getPixelForValue(this.config.value);
	}

	onDrag(event) {
		this.config.value = this._constrainValue(this.scale, this._getValue(event));
		this.chart.update(0);
	}

	onDragEnd(event) {
		this.offset = undefined;
	}
}
