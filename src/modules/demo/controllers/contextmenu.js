export default class ContextMenuController {
	constructor($scope) {
		$scope.students = [
			{ name: "Tom", age: 18, gender: "Male" },
			{ name: "Lily", age: 15, gender: "Female" },
			{ name: "Jerry", age: 14, gender: "Male" }
		];

		$scope.itemMenu = function (student) {
			let arr = [
				{
					title: "greet",
					action: function () {
						alert("Hello, I am " + student.name);
					}
				},
				{
					title: "divider"
				},
				{
					title: "sleep",
					action: function () {
						alert("zzz");
					}
				}
			];

			if (student.age >= 18) {
				arr.push({
					title: "smoke",
					action: function () {
						alert("I am adult, I can smoke!");
					}
				});
			}

			if (student.gender == "Female") {
				arr.push({
					title: "make up",
					action: function () {
						alert("I am a girl, am I beautiful?");
					}
				});
			}

			return arr;
		};
	}
}

ContextMenuController.$inject = ["$scope"];