class InsurancePackageResource {
	constructor(data) {
		this.data = data;
	}

	formatData() {
		return {
			id: this.data.id,
			name: this.data.name,
			coverageFocus: this.data.coverageFocus,
			deductible: this.data.deductible,
			claimProcessingTime: this.data.claimProcessingTime,
		};
	}
}
