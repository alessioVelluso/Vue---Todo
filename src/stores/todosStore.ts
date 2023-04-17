import { defineStore, Store, StoreDefinition } from "pinia";
import { useCategoriesStore } from "./categoriesStore";
import { useAddEditTodoStore } from "./addEditCardsStore";



export type CardType = {
    id: Number,
    title: String,
    category: String,
    text: String,
    isDone: Boolean,
    color: string
}



type initialState = {
    cardsUndone: CardType[],
    cardsDone: CardType[],
}
type getters = {}
type actions = {
    handleChangeIsDone: (id: Number, isDone: Boolean) => void,
    addTodo: (title: string, category: string, text: string, color: string, id: null|number) => void,
    handleRemoveTask: (id:number, category:string) => void,
    handleEditTask: (id:number, title: string, category: string, text: string, color: string) => void,
    filterFromCategory: (category: string, wholeList: CardType[]) => CardType[]
}



export const changeArray = (id: Number, from: CardType[], to: CardType[]) => {
    const indexFrom = from.findIndex(obj => obj.id === id)
    if (indexFrom === -1) throw new Error('Card not found');

    let fromObject = from.splice(indexFrom, 1)[0]
    fromObject.isDone = !fromObject.isDone;

    const indexTo = to.findIndex(obj => obj.id > id)
    if (indexTo === -1) to.push(fromObject)
    else to.splice(indexTo, 0, fromObject);
} // ------ EXPORT FOR PERSONAL STUDIES





export const useTodosStore: 
StoreDefinition<string, initialState, getters, actions> = 
defineStore('todos', {

    state: () => ({
        cardsUndone: [
            { id: 0, title: 'Titolo1', category: 'Work', text: 'testo1', isDone: false, color: '#a02cb8' },
            { id: 1, title: 'Titolo2', category: 'Work', text: 'testo2', isDone: false, color: '#a02cb8' },
            { id: 2, title: 'Titolo2', category: 'Free-Time', text: 'testo2', isDone: false, color: '#32a84c' },
            { id: 3, title: 'Titolo3', category: 'Home', text: 'testo3', isDone: false, color: '#1e91d9' },
        ],
        cardsDone: [
            { id: 4, title: 'Titolo4', category: 'Free-Time', text: 'testo4', isDone: true, color: '#32a84c' },
        ]
    }),

    getters: {

    },

    actions: {
        filterFromCategory(category: string, wholeList: CardType[]) {
            if (category==='') return wholeList

            const filteredList = wholeList.filter(obj => obj.category === category)
            return filteredList
        },
        handleChangeIsDone(id: Number, isDone: Boolean)  {
            switch (isDone) {
                case true: 
                    changeArray(id, this.cardsDone, this.cardsUndone); 
                    break;
                
                case false: 
                    changeArray(id, this.cardsUndone, this.cardsDone); 
                    break;
            }
        },
        handleRemoveTask(id:number, category:string) {
            const doneIndex = this.cardsDone.findIndex(obj => obj.id===id)
            const undoneIndex = this.cardsUndone.findIndex(obj => obj.id===id)
            if (doneIndex !== -1 && undoneIndex === -1) this.cardsDone.splice(doneIndex, 1)
            else if (undoneIndex !== -1 && doneIndex === -1) this.cardsUndone.splice(undoneIndex, 1)
            else console.log('There has been an error during the add / edit of your tasks, it seems you card is undone and done at the same time')


            const doneCategoryIndex: number = this.cardsDone.findIndex(obj => obj.category===category) 
            const undoneCategoryIndex: number = this.cardsUndone.findIndex(obj => obj.category===category)
            if (doneCategoryIndex===-1 && undoneCategoryIndex===-1) useCategoriesStore().removeCategory(category)

        },
        handleEditTask(id:number, title:string, category:string, text:string, color:string) {
            useAddEditTodoStore().setInputsForEditing(title, category, text, color, id)
        },
        addTodo(title: string, category: string, text: string, color: string, id: null|number) {
            if (title==='' || category==='' || text==='') return

            if (id===null) {
                // ---- Axios, inserisci, ASPETTA e ritorna nuovo id
                    useCategoriesStore().editAddCategory(category, color)
                    this.cardsUndone.push({
                        id: 99, title: title, category: category, text: text, isDone: false, color: color
                    })
            }
            else {
                const undoneIndex = this.cardsUndone.findIndex(obj => obj.id===id)
                const doneIndex = this.cardsDone.findIndex(obj => obj.id===id)

                if(undoneIndex === -1 && doneIndex !== -1) {
                    useCategoriesStore().editAddCategory(category, color)
                    // ---- Axios categorie
                    this.cardsDone[doneIndex].title = title;
                    this.cardsDone[doneIndex].category = category;
                    this.cardsDone[doneIndex].text = text;
                    this.cardsDone[doneIndex].color = color;
                }
                else if(undoneIndex !== -1 && doneIndex === -1) {
                    useCategoriesStore().editAddCategory(category, color)
                    // ---- Axios categorie
                    this.cardsUndone[undoneIndex].title = title;
                    this.cardsUndone[undoneIndex].category = category;
                    this.cardsUndone[undoneIndex].text = text;
                    this.cardsUndone[undoneIndex].color = color;
                }
                else {
                    console.log('There has been an error during the add / edit of your tasks, it seems you card is undone and done at the same time')
                }
            }
            useAddEditTodoStore().resetInputs()
        }
    }
})