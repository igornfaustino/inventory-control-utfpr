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
const getUser = () =>{
	return localStorage.getItem('user_id')
}

module.exports = {
	isLoggedIn,
	isAdmin,
	getUser
}