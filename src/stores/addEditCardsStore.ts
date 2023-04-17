import { defineStore, StoreDefinition } from "pinia";


type store = {
    id: null | number,
    title: string,
    category: string,
    text: string,
    color: string,
    isWindowOpen: Boolean
}
type getters = {}
type actions = {
    openWindow: () => void,
    closeWindow: () => void,
    resetInputs: () => void,
    setInputsForEditing: (title:string, category:string, text:string, color:string, id:null|number) => void
}



export const useAddEditTodoStore: 
StoreDefinition<string, store, getters, actions>
= defineStore('addEditTodo', {
    state: () => ({
        id: null as null|number,
        title: '',
        category: '',
        text: '',
        color: '#ac4ebf',
        isWindowOpen: false
    }),
    getters: {},
    actions: {
        openWindow() { 
            this.isWindowOpen = true 
            console.log(this.isWindowOpen)
        },
        closeWindow() { 
            this.isWindowOpen = false 
            console.log(this.isWindowOpen)
        },
        resetInputs() {
            this.title = '';
            this.category = '';
            this.text = '';
            this.color = '#ac4ebf';
            this.id = null;
        },
        setInputsForEditing(title:string, category:string, text:string, color:string, id:null|number) {
            this.title = title;
            this.category = category;
            this.text =text;
            this.color = color;
            this.id = id
        }
    }
})