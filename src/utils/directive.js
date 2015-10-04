"use strict";

export default class DirectiveFactory {
	static create(Directive) {
		let factory = function (...args) {
			let instance = new Directive(...args);
			for (let key in instance) {
				instance[key] = instance[key];
			}

			if (instance.link) {
				let linkOrg = instance.link;
				instance.link = function (...linkArgs) {
					let instance = new Directive(...args);
					linkOrg.apply(instance, linkArgs);
				};
			}

			if (instance.controller) {
				let controllerOrg = instance.controller;
				instance.controller = function (...controllerArgs) {
					let instance = new Directive(...args);
					controllerOrg.apply(instance, controllerArgs);
				};

				instance.controller.$inject = controllerOrg.$inject || ["$scope", "$element"];
			}

			return instance;
		};

		factory.$inject = Directive.$inject || [];

		return factory;
	}
}

DirectiveFactory.$inject = [];