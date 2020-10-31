function User(id, username, room) {
	this.id = id;
	this.username = username;
	this.room = room;
}

User.prototype.getId = function () {
	return this.id;
};
User.prototype.getUsername = function () {
	return this.username;
};
User.prototype.getRoom = function () {
	return this.room;
};

module.exports = User;
