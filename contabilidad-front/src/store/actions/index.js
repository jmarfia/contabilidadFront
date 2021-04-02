export const isLogged = user => {
    return {
        type: "SIGN_IN",
    }
}
export const actionLogout = () => ({
    type: "SIGN_OUT",
  });