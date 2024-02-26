export function someGetter (/* state */) {
    return {
        getters: {
            getRegisterUsers: state => state.getRegisterUsers
        }
    }
}
