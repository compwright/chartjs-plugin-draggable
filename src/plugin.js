'use strict';

import Chart from 'chart.js';
import { drag } from 'd3-drag';
import { select, event } from 'd3-selection';

function getFilter(chartInstance, accessors) {
	return () => {
		let position = Chart.helpers.getRelativePosition(event, chartInstance.chart);
		let minDistance = Number.POSITIVE_INFINITY;

		chartInstance.draggable.subject = accessors
			// All draggable elements that are enabled
			.map(accessor => accessor.getElements(chartInstance))
			// Flatten array of arrays
			.reduce((list, innerList) => list.concat(innerList), [])
			// Each element must implement these methods for the rest to work
			.filter(element => element.element.inRange && element.element.getCenterPoint && element.element.getArea)
			// Find the elements in range of the mouse position
			.filter(element => element.element.inRange(position.x, position.y))
			// Pick the element(s) nearest the mouse position
			.reduce((nearestElements, element) => {
				let center = element.element.getCenterPoint();
				let distance = Chart.helpers.distanceBetweenPoints(position, center);

				if (distance < minDistance) {
					nearestElements = [element];
					minDistance = distance;
				} else if (distance === minDistance) {
					// Can have multiple items at the same distance
					nearestElements.push(element);
				}

				return nearestElements;
			}, [])
			// Use the element size as a tiebreaker
			.sort((a, b) => a.element.getArea() - b.element.getArea())
			[0];

		return !!chartInstance.draggable.subject;
	};
}

function getSubjectPicker(chartInstance) {
	return () => chartInstance.draggable.subject;
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
