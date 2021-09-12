const TOKEN_MESSAGE_EXPIRED = 'Expired JWT Token'
const TOKEN_MESSAGE_INVALID = 'Invalid JWT Token'

export default function ({ $axios, store, redirect}) {
    $axios.onRequest(() => {
        $axios.setToken(`bearer ${store.getters.token}`)
    });
    
    $axios.onError((error) => {
        const { response: { data: { message } } } = error
        if (message === TOKEN_MESSAGE_EXPIRED || message === TOKEN_MESSAGE_INVALID) {
            store.dispatch('logout')
            // redirect('/totus/login')
        }
        return false;
    })
}