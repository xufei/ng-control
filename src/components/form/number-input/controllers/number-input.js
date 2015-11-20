export default class NumberInputController {
	decrease() {
		if (this.disabled) {
			return;
		}

		if (this.minValue) {
			if (this.value <= this.minValue) {
				return;
			}
		}
		this.value--;
	}

	increase() {
		if (this.disabled) {
			return;
		}

		if (this.maxValue) {
			if (this.value >= this.maxValue) {
				return;
			}
		}
		this.value++;
	}
}