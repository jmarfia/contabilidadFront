export const isLogged = user => {
    return {
        type: "SIGN_IN",
        payload: user
    }
}