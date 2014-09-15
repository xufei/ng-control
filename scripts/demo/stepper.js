angular.module("sn.demo").controller("TestStepperCtrl", function($scope) {
	$scope.maxStep = 100;
	$scope.initStep = 20;

	$scope.$on("sn.controls.stepper:stepperValueChanged", function(evt, newValue) {
		$scope.currentStep = newValue;
		$scope.$digest();
	});
});