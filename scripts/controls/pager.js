angular.module("sn.controls").directive('pager', function() {
	return {
		restrict : 'E',
		scope : {},
		controller : function($scope, pagerConfig) {
			$scope.pages = [];

			$scope.currentPage = 0;
			$scope.totalPages = 1;
			$scope.totalItems = 0;
			$scope.pageOffset = 0;

			$scope.reset = function() {
				if ($scope.totalItems % $scope.itemsPerPage == 0) {
					$scope.totalPages = $scope.totalItems / $scope.itemsPerPage;
				} else {
					$scope.totalPages = Math.floor($scope.totalItems / $scope.itemsPerPage) + 1;
				}

				if ($scope.totalPages == 0) {
					$scope.totalPages = 1;
				}

				if ($scope.currentPage > $scope.totalPages) {
					$scope.currentPage = 0;
				}

				$scope.resetPageList();
			};

			$scope.resetPageList = function() {
				$scope.pages = [];

				var offset = Math.min($scope.currentPage, $scope.totalPages - $scope.listSize);
				if (offset < 0) {
					offset = 0;
				}
				$scope.pageOffset = offset;

				var last = Math.min($scope.pageOffset + $scope.listSize, $scope.totalPages);
				for (var i = $scope.pageOffset; i < last; i++) {
					$scope.pages.push({
						text : i,
						pageIndex : i,
						active : false
					});
				}

				$scope.pages[$scope.currentPage - $scope.pageOffset].active = true;
			};

			$scope.getText = function(key) {
				return pagerConfig.text[key];
			};

			$scope.isFirst = function() {
				return $scope.currentPage <= 0;
			};

			$scope.isLast = function() {
				return $scope.currentPage >= $scope.totalPages - 1;
			};

			$scope.selectPage = function(value) {
				if ((value >= $scope.totalPages) || (value < 0)) {
					return;
				}

				if ((value < $scope.pageOffset) || (value >= $scope.pageOffset + $scope.listSize)) {
					$scope.currentPage = value;
					this.resetPageList();
				} else {
					$scope.pages[$scope.currentPage - $scope.pageOffset].active = false;
					$scope.currentPage = value;
				}

				$scope.pages[$scope.currentPage - $scope.pageOffset].active = true;
				$scope.$emit("sn.controls.pager:pageIndexChanged", $scope.pages[$scope.currentPage]);
			};

			$scope.first = function() {
				if (this.isFirst()) {
					return;
				}
				this.selectPage(0);
			};

			$scope.last = function() {
				if (this.isLast()) {
					return;
				}
				this.selectPage(this.totalPages - 1);
			};

			$scope.previous = function() {
				if (this.isFirst()) {
					return;
				}
				this.selectPage(this.currentPage - 1);
			};

			$scope.next = function() {
				if (this.isLast()) {
					return;
				}
				this.selectPage(this.currentPage + 1);
			};
		},
		link : function(scope, element, attrs, ctrls) {
			scope.itemsPerPage = (attrs.itemsperpage - 0) || 10;
			scope.listSize = (attrs.listsize - 0) || 10;
			
			attrs.$observe("totalitems", function(value) {
				scope.totalItems = value;
				scope.reset();
			});
		},
		templateUrl : 'templates/pager/pager.html'
	};
}).constant('pagerConfig', {
	itemsPerPage : 10,
	text : {
		first : 'First',
		previous : 'Previous',
		next : 'Next',
		last : 'Last'
	}
})