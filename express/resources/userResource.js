class UserResource {
  constructor(data) {
	this.data = data;
  }

  formatData() {
		return {
			id: this.data.id,
			userName: this.data.userName,
			firstName: this.data.firstName,
			lastName: this.data.lastName,
			email: this.data.email,
			phone: this.data.phone,
			gender: this.data.gender,
			dateOfBirth: this.data.dateOfBirth,
			nidaId: this.data.nidaId,
		};
	}
}

module.exports = UserResource;
