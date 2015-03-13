angular.module("sn.controls").directive("snScrollbar", ["$document", function ($document) {
    return {
        restrict: "E",
        scope: {},
        controller: function ($scope) {
            $scope.updatePosition = function(position) {
                $scope.$emit("sn.controls.scrollbar:positionChanged", position);
            };
        },
        link: function (scope, element, attrs) {
            var options = {
                axis: 'y',
                wheel: true,
                wheelSpeed: 40,
                wheelLock: true,
                touchLock: true,
                trackSize: false,
                handleSize: false,
                handleSizeMin: 20
            };

            var $container = element.parent()[0];

            var $body = angular.element(document.querySelectorAll("body")[0]);
            var $viewport = $container.querySelectorAll(".viewport")[0];
            var $overview = $container.querySelectorAll(".overview")[0];

            var $scrollbar = element[0];
            var $track = angular.element($scrollbar.querySelectorAll(".track")[0]);
            var $handle = angular.element($scrollbar.querySelectorAll(".handle")[0]);

            var $topArrow = angular.element($scrollbar.querySelectorAll(".arrow")[0]);
            var $bottomArrow = angular.element($scrollbar.querySelectorAll(".arrow")[1]);

            var mousePosition = 0;
            var isHorizontal = options.axis === 'x';
            var hasTouchEvents = ("ontouchstart" in document.documentElement);
            var wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                    document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                        "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

            var sizeLabel = isHorizontal ? "width" : "height";
            var posiLabel = isHorizontal ? "left" : "top";

            var contentPosition = 0;
            var viewportSize = 0;
            var contentSize = 0;
            var contentRatio = 0;
            var trackSize = 0;
            var trackRatio = 0;
            var handleSize = 0;
            var handlePosition = 0;
            var hasContentToScroll = false;

            function update(scrollTo) {
                var sizeLabelCap = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();

                viewportSize = $viewport['offset' + sizeLabelCap];
                contentSize = $overview['scroll' + sizeLabelCap];

                contentRatio = viewportSize / contentSize;
                trackSize = options.trackSize || viewportSize;
                handleSize = Math.min(trackSize, Math.max(options.handleSizeMin, (options.handleSize || (trackSize * contentRatio))));
                trackRatio = (contentSize - viewportSize) / (trackSize - handleSize);

                hasContentToScroll = contentRatio < 1;

                if (hasContentToScroll) {
                    element.removeClass("disable");
                }
                else {
                    element.addClass("disable");
                }

                switch (scrollTo) {
                    case "bottom":
                        contentPosition = Math.max(contentSize - viewportSize, 0);
                        break;

                    case "relative":
                        contentPosition = Math.min(contentSize - viewportSize, Math.max(0, contentPosition));
                        break;

                    default:
                        contentPosition = parseInt(scrollTo, 10) || 0;
                }

                handlePosition = contentPosition / trackRatio;

                $handle[0].style[posiLabel] = handlePosition + "px";
                $scrollbar.style[sizeLabel] = trackSize + "px";
                $track[0].style[sizeLabel] = trackSize + "px";
                $handle[0].style[sizeLabel] = handleSize + "px";
            }

            function hitBorder() {
                return (contentPosition > 0) && (contentPosition <= (contentSize - viewportSize) - 5);
            }

            function _start(event, gotoMouse) {
                if (hasContentToScroll) {
                    mousePosition = gotoMouse ? $handle[0].getBoundingClientRect()[posiLabel] : (isHorizontal ? event.clientX : event.clientY);

                    $body.addClass("noSelect");

                    if (hasTouchEvents) {
                        document.ontouchmove = function (event) {
                            if (options.touchLock || hitBorder()) {
                                event.preventDefault();
                            }
                            _drag(event.touches[0]);
                        };
                        document.ontouchend = _end;
                    }
                    else {
                        document.onmousemove = _drag;
                        document.onmouseup = $handle.onmouseup = _end;
                    }

                    _drag(event);
                }
            }

            function _wheel(event) {
                if (hasContentToScroll) {
                    var evt = event || window.event;
                    var wheelSpeedDelta = -(evt.deltaY || evt.detail || (-1 / 3 * evt.wheelDelta)) / 40;
                    var multiply = (evt.deltaMode === 1) ? options.wheelSpeed : 1;

                    contentPosition -= wheelSpeedDelta * options.wheelSpeed;
                    contentPosition = Math.min((contentSize - viewportSize), Math.max(0, contentPosition));
                    handlePosition = contentPosition / trackRatio;

                    dispatchMoveEvent();

                    $handle[0].style[posiLabel] = handlePosition + "px";

                    if (options.wheelLock || hitBorder()) {
                        evt.preventDefault();
                    }
                }
            }

            function _drag(event) {
                if (hasContentToScroll) {
                    var mousePositionNew = isHorizontal ? event.clientX : event.clientY;
                    var handlePositionDelta = hasTouchEvents ? (mousePosition - mousePositionNew) : (mousePositionNew - mousePosition);
                    var handlePositionNew = Math.min((trackSize - handleSize), Math.max(0, handlePosition + handlePositionDelta));

                    contentPosition = handlePositionNew * trackRatio;

                    dispatchMoveEvent();

                    $handle[0].style[posiLabel] = handlePositionNew + "px";
                }
            }

            function _end() {
                handlePosition = parseInt($handle[0].style[posiLabel], 10) || 0;

                $body.removeClass("noSelect");

                document.onmousemove = document.onmouseup = null;
                $handle.off("onmouseup");
                $track.off("onmouseup");
                document.ontouchmove = document.ontouchend = null;
            }

            function dispatchMoveEvent() {
                //contentPosition;
            }

            update();

            if (hasTouchEvents) {
                $viewport.ontouchstart = function (event) {
                    if (1 === event.touches.length) {
                        _start(event.touches[0]);
                        event.stopPropagation();
                    }
                };
            }
            else {
                $handle.on("mousedown", function (event) {
                    event.stopPropagation();
                    _start(event);
                });

                $track.on("mousedown", function (event) {
                    _start(event, true);
                });
            }

            $topArrow.on("mousedown", function() {
                update(contentPosition - 1);
            });

            $bottomArrow.on("mousedown", function() {
                update(contentPosition + 1);
            });

            window.addEventListener("resize", function () {
                update("relative");
            }, true);

            if (options.wheel && window.addEventListener) {
                $container.addEventListener(wheelEvent, _wheel, false);
            }
            else if (options.wheel) {
                $container.onmousewheel = _wheel;
            }
        },
        templateUrl: "templates/scrollbar/scrollbar.html"
    };
}]);