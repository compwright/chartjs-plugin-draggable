'use strict';

export class DraggableElementAccessor {
	static isSupported() {
		return true;
	}

	static getElements(chartInstance, elements, configs, elementClass) {
		let elementClassFn = (typeof elementClass === 'function')
			? elementClass
			: () => elementClass;

		return elements
			.map((element, i) => {
				let className = elementClassFn(configs[i]);
				return new className(chartInstance, element, configs[i]);
			})
			.filter((element, i) => !!configs[i].draggable);
	}
}
