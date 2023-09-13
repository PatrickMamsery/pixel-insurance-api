class CargoRecordResource {
	constructor(data) {
		this.data = data;
	}

	formatData() {
		return {
			id: this.data.id,
			policy: this.data.policy,
			itemValue: this.data.itemValue,
			procumentDocument: this.data.procumentDocument,
		};
	}
}

module.exports = CargoRecordResource;
