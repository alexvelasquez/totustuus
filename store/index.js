export const state = () => ({
    token: null
})
export const getters = {
    token(state) {
        return state.token
    }
}

export const mutations = {
    token(state, value) {
        state.token = value
    }
}

export const actions = {
    logout({ commit }) {
        commit('token', null);
        this.$router.push('/totus/login');
    }
}