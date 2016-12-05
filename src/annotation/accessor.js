'use strict';

import { DraggableElementAccessor } from '../accessor';
import { DraggableLineAnnotationElement } from './line-element';

/*
annotation: {
	annotations: [
		{
			draggable: true,
			onDragStart: function() {
				
			},
			onDrag: function() {
				
			},
			onDragEnd: function() {
				
			}
		}
	]
}
*/

export class DraggableAnnotationAccessor extends DraggableElementAccessor {
	static isSupported() {
		return !!Chart.Annotation;
	}

	static getElements(chartInstance) {
		return DraggableElementAccessor.getElements(
			chartInstance,
			Object.keys(chartInstance.annotation.elements).map(id => chartInstance.annotation.elements[id]),
			Object.keys(chartInstance.annotation.elements).map(id => chartInstance.annotation.elements[id].options),
			(config) => {
				switch (config.type) {
					case 'line':
						return DraggableLineAnnotationElement;

					// @TODO: implement 'box' support, DraggableBoxAnnotationElement class
				}
			}
		);
	}
}
