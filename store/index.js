export const state = () => ({
    currentUser: "Khai Minh Mai",
})

export const getters = {
    getCurrentUser(state) {
        return state.currentUser
    }
}