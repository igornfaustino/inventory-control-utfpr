const isLoggedIn = () => {
	if (localStorage.getItem("token")) {
		return true
	}
	return false
}

const isAdmin = () => {
	if (localStorage.getItem("token") && localStorage.getItem("admin") === "true") {
		return true
	}
	return false
}

module.exports = {
	isLoggedIn,
	isAdmin
}