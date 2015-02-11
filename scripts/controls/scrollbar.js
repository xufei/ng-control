angular.module("sn.controls").directive("snScrollbar", ["$document", "UIHelper", function ($document, UIHelper) {
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
                thumbSize: false,
                thumbSizeMin: 20
            };

            var $container = element.parent()[0];

            var $body = document.querySelectorAll("body")[0];
            var $viewport = $container.querySelectorAll(".viewport")[0];
            var $overview = $container.querySelectorAll(".overview")[0];
            var $scrollbar = element[0];
            var $track = $scrollbar.querySelectorAll(".track")[0];
            var $handle = $scrollbar.querySelectorAll(".handle")[0];

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
            var thumbSize = 0;
            var thumbPosition = 0;
            var hasContentToSroll = false;

            function update(scrollTo) {
                var sizeLabelCap = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();
                var scrcls = $scrollbar.className;

                viewportSize = $viewport['offset' + sizeLabelCap];
                contentSize = $overview['scroll' + sizeLabelCap];
                contentRatio = viewportSize / contentSize;
                trackSize = options.trackSize || viewportSize;
                thumbSize = Math.min(trackSize, Math.max(options.thumbSizeMin, (options.thumbSize || (trackSize * contentRatio))));
                trackRatio = (contentSize - viewportSize) / (trackSize - thumbSize);
                hasContentToSroll = contentRatio < 1;

                $scrollbar.className = hasContentToSroll ? scrcls.replace(/disable/g, "") : scrcls + " disable";

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

                thumbPosition = contentPosition / trackRatio;

                $handle.style[posiLabel] = thumbPosition + "px";
                $overview.style[posiLabel] = -contentPosition + "px";
                $scrollbar.style[sizeLabel] = trackSize + "px";
                $track.style[sizeLabel] = trackSize + "px";
                $handle.style[sizeLabel] = thumbSize + "px";
            }

            function _isAtBegin() {
                return contentPosition > 0;
            }

            function _isAtEnd() {
                return contentPosition <= (contentSize - viewportSize) - 5;
            }

            function _start(event, gotoMouse) {
                if (hasContentToSroll) {
                    var posiLabelCap = posiLabel.charAt(0).toUpperCase() + posiLabel.slice(1).toLowerCase();
                    mousePosition = gotoMouse ? $handle.getBoundingClientRect()[posiLabel] : (isHorizontal ? event.clientX : event.clientY);

                    $body.className += " noSelect";

                    if (hasTouchEvents) {
                        document.ontouchmove = function (event) {
                            if (options.touchLock || _isAtBegin() && _isAtEnd()) {
                                event.preventDefault();
                            }
                            drag(event.touches[0]);
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
                if (hasContentToSroll) {
                    var evntObj = event || window.event
                        , wheelSpeedDelta = -(evntObj.deltaY || evntObj.detail || (-1 / 3 * evntObj.wheelDelta)) / 40
                        , multiply = (evntObj.deltaMode === 1) ? options.wheelSpeed : 1
                        ;

                    contentPosition -= wheelSpeedDelta * options.wheelSpeed;
                    contentPosition = Math.min((contentSize - viewportSize), Math.max(0, contentPosition));
                    thumbPosition = contentPosition / trackRatio;

                    dispatchMoveEvent();

                    $handle.style[posiLabel] = thumbPosition + "px";
                    $overview.style[posiLabel] = -contentPosition + "px";

                    if (options.wheelLock || _isAtBegin() && _isAtEnd()) {
                        evntObj.preventDefault();
                    }
                }
            }

            function _drag(event) {
                if (hasContentToSroll) {
                    var mousePositionNew = isHorizontal ? event.clientX : event.clientY
                        , thumbPositionDelta = hasTouchEvents ? (mousePosition - mousePositionNew) : (mousePositionNew - mousePosition)
                        , thumbPositionNew = Math.min((trackSize - thumbSize), Math.max(0, thumbPosition + thumbPositionDelta))
                        ;

                    contentPosition = thumbPositionNew * trackRatio;

                    dispatchMoveEvent();

                    $handle.style[posiLabel] = thumbPositionNew + "px";
                    $overview.style[posiLabel] = -contentPosition + "px";
                }
            }

            function _end() {
                thumbPosition = parseInt($handle.style[posiLabel], 10) || 0;

                $body.className = $body.className.replace(" noSelect", "");
                document.onmousemove = document.onmouseup = null;
                $handle.onmouseup = null;
                $track.onmouseup = null;
                document.ontouchmove = document.ontouchend = null;
            }

            function dispatchMoveEvent() {
                scope.updatePosition(contentPosition);
                console.log(contentPosition);
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
                $handle.onmousedown = function (event) {
                    event.stopPropagation();
                    _start(event);
                };

                $track.onmousedown = function (event) {
                    _start(event, true);
                };
            }

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