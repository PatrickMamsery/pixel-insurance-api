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
			phone: this.data.phone,
			gender: this.data.gender,
		};
	}
}

module.exports = UserResource;
