'use strict';

import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';

export class ChartjsDraggablePlugin {
	constructor(accessors) {
		this.accessors = accessors.filter(accessor => accessor.isSupported());
		this.subject = null;
	}

	afterInit(chartInstance) {
		select(chartInstance.chart.canvas).call(
			drag().container(chartInstance.chart.canvas)
				.filter(() => {
					this.subject = this.accessors
						// All draggable elements that are enabled
						.map(accessor => accessor.getElements(chartInstance))
						// Flatten array of arrays
						.reduce((list, innerList) => list.concat(innerList), [])
						// Select the first element whose box the click started in
						// @TODO: select the nearest element to drag
						.filter(draggable => draggable.isInBox(event, 10))[0];
					
					// Only proceed if the drag gesture started on a draggable element
					return !!this.subject;
				})
				.subject(() => this.subject)
				.on('start', this._getDispatcher('onDragStart'))
				.on('drag', this._getDispatcher('onDrag'))
				.on('end', this._getDispatcher('onDragEnd'))
		);
	}

	_getDispatcher(type) {
		return (() => {
			this.subject.dispatch(type, event);
		}).bind(this);
	}
}
