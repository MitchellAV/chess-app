function UserList() {
	this.activeUsers = Array();
}
UserList.prototype.addUser = function (userToAdd) {
	this.activeUsers.push(userToAdd);
	return userToAdd;
};

UserList.prototype.removeUser = function (id) {
	let userToRemove;
	this.activeUsers.filter((user) => {
		if (user.id == id) {
			userToRemove = user;
		}
		return user.id !== id;
	});
	return userToRemove;
};
UserList.prototype.getUserList = function () {
	return this.activeUsers;
};

UserList.prototype.getCurrentUser = function (id) {
	return this.activeUsers.find((user) => {
		return user.id == id;
	});
};

module.exports = UserList;
