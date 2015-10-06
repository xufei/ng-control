import AlertService from "./services/alert";

export default angular.module("components.services.alert", [])
	.service("AlertService", AlertService)
	.name;