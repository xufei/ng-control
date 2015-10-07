
export default class UIHelper {
	getOffset(element) {
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
	}
}