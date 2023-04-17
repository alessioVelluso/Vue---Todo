import { defineStore, StoreDefinition } from "pinia";



type store = {
    username: string,
    password: string,
    email: string,
    isAuth: Boolean
}
type getters = {}
type actions = {
    resetValues: () => void
    login: () => void
    signin: () => void
}




export const useAuthStore:
StoreDefinition<string, store, getters, actions>
= defineStore('auth', {
    state: () => ({
        username: '',
        password: '',
        email: '',
        isAuth: false
    }),
    getters: {},
    actions: {
        resetValues() {
            this.username = '';
            this.password = '';
            this.email = '';
        },
        login() {
            this.isAuth = true;
            this.resetValues()
        }, 
        signin() {
            console.log('Registrato')
        }
    }
})