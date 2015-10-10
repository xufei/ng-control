import EventBus from "./services/eventbus";

export default angular.module("components.services.eventbus", [])
	.service("EventBus", EventBus)
	.name;