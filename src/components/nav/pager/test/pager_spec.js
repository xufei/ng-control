import PagerController from "../controllers/pager";

describe("Component:nav.pager", () => {
	describe("Pager Controller", () => {
		let pager = new PagerController();
	
		it("should be instantiable", () => {
			expect(pager).toBeDefined();
		});
		
		it("count should not accept negetive values", () => {
		});
	});
});