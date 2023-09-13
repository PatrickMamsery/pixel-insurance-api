class ClaimResource {
	constructor(data) {
		this.data = data;
	}

	formatData() {
		return {
			id: this.data.id,
			policy: this.data.policy,
			claimType: this.data.claimType,
			claimStatus: this.data.claimStatus,
			amount: this.data.amount,
			submissionDate: this.data.submissionDate,
			claimDetails: this.data.claimDetails,
		};
	}
}

module.exports = ClaimResource;
