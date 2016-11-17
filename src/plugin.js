'use strict';

import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';

function getFilter(chartInstance, accessors) {
	return () => {
		chartInstance.draggable.draggables = accessors
			// All draggable elements that are enabled
			.map(accessor => accessor.getElements(chartInstance))
			// Flatten array of arrays
			.reduce((list, innerList) => list.concat(innerList), [])
			// Find the elements whose box the click started in
			.filter(draggable => draggable.isInBox(event, 10));

		return chartInstance.draggable.draggables.length > 0;
	};
}

function getSubjectPicker(chartInstance) {
	// @TODO: select the nearest element to drag
	return () => chartInstance.draggable.draggables[0];
}

function getDispatcher(subjectPicker, type) {
	return () => subjectPicker().dispatch(type, event);
}

export class ChartjsDraggablePlugin {
	constructor(accessors) {
		this.accessors = accessors.filter(accessor => accessor.isSupported());
	}

	afterInit(chartInstance) {
		chartInstance.draggable = {};

		let subjectPicker = getSubjectPicker(chartInstance);

		select(chartInstance.chart.canvas).call(
			drag().container(chartInstance.chart.canvas)
				.filter(getFilter(chartInstance, this.accessors))
				.subject(subjectPicker)
				.on('start', getDispatcher(subjectPicker, 'onDragStart'))
				.on('drag', getDispatcher(subjectPicker, 'onDrag'))
				.on('end', getDispatcher(subjectPicker, 'onDragEnd'))
		);
	}
}
