export const UIHelper = {
	getOffset (element) {
		let x = 0;
		let y = 0;

		while (element.offsetParent) {
			x += element.offsetLeft;
			y += element.offsetTop;

			element = element.offsetParent;
		}

		return {
			x: x,
			y: y
		};
	},

	listen (target, eventType, callback) {
		if (target.addEventListener) {
			target.addEventListener(eventType, callback, false);
			return {
				remove() {
					target.removeEventListener(eventType, callback, false);
				}
			}
		}
		else if (target.attachEvent) {
			target.attachEvent('on' + eventType, callback);
			return {
				remove() {
					target.detachEvent('on' + eventType, callback);
				}
			}
		}
	}
}