'use strict';

import { DraggableElement } from '../element';

export class DraggableBoxAnnotationElement extends DraggableElement {
	constructor(chartInstance, elementInstance, elementConfig) {
		super(chartInstance, elementInstance, elementConfig);
    this.xScale = this.chart.scales[elementConfig.xScaleID];
		this.yScale = this.chart.scales[elementConfig.yScaleID];
	}

	_getPixel(event,axis) {
    return event[axis]
	}

	_getXMin(event) {
		let offset = this.offsetXMin || 0;
		return this.xScale.getValueForPixel(this._getPixel(event,'x') - offset);
	}

	_getXMax(event) {
		let offset = this.offsetXMax || 0;
		return this.xScale.getValueForPixel(this._getPixel(event,'x') - offset);
	}

	_getYMin(event) {
		let offset = this.offsetYMin || 0;
		return this.yScale.getValueForPixel(this._getPixel(event,'y') - offset);
	}

	_getYMax(event) {
		let offset = this.offsetYMax || 0;
		return this.yScale.getValueForPixel(this._getPixel(event,'y') - offset);
	}

	onDragStart(event) {
		this.offsetXMin = this._getPixel(event,'x') - this.xScale.getPixelForValue(this.config.xMin);
    this.offsetXMax = this._getPixel(event,'x') - this.xScale.getPixelForValue(this.config.xMax);
		this.offsetYMin = this._getPixel(event,'y') - this.yScale.getPixelForValue(this.config.yMin);
    this.offsetYMax = this._getPixel(event,'y') - this.yScale.getPixelForValue(this.config.yMax);
	}

	onDrag(event) {
		this.config.xMin = this._constrainValue(this.xScale, this._getXMin(event));
    this.config.xMax = this._constrainValue(this.xScale, this._getXMax(event));
    this.config.yMin = this._constrainValue(this.yScale, this._getYMin(event));
    this.config.yMax = this._constrainValue(this.yScale, this._getYMax(event));
		this.chart.update(0);
	}

	onDragEnd(event) {
		this.offsetXMin = undefined;
    this.offsetXMax = undefined;
		this.offsetYMin = undefined;
    this.offsetYMax = undefined;
	}
}
