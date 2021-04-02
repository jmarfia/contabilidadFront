const isLogged = (state = null, action) => {
    switch (action.type) {
        case "SIGN_IN":
            let token = localStorage.getItem("token");
            if (token == null) {
                console.log("TAS LAK", token)
                return false;
            } else {
                console.log("TAS LAK else", token)
                return true
            }
        case "SIGN_OUT":
            return false
        default:
            return state;
    }
}

export default isLogged;