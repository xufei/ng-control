export default class SliderController {



	mousedown() {
		if (this.disabled) {
			return;
		}

		this.dragging = true;
	}

	trackClick(evt) {
		if (this.disabled) {
			return;
		}

		let allWidth = evt.currentTarget.offsetWidth;
		let currentWidth = (evt.offsetX || evt.layerX);

		this.changeValue(Math.round(this.max * currentWidth / allWidth));
	}

	increase() {
		this.changeValue(this.value + 1);
	}

	decrease() {
		this.changeValue(this.value - 1);
	}

	valueInRange(value) {
		if (!value) {
			return true;
		}

		if (value - this.min < 0) {
			return false;
		}

		if (value - this.max > 0) {
			return false;
		}
		return true;
	}

	changeValue(value) {
		if (this.valueInRange(value)) {
			this.value = value;
		}
	}
}