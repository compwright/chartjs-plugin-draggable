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
			chartInstance._annotationObjects,
			chartInstance.options.annotation.annotations,
			(config) => {
				switch (config.type) {
					case 'line':
						return DraggableLineAnnotationElement;

					default:
						throw `Unsupported annotation type: ${config.type}`;
				}
			}
		);
	}
}
