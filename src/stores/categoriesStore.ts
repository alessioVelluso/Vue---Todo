import { defineStore, StoreDefinition } from "pinia";
import { useTodosStore, CardType } from "./todosStore";

export type CategoryType = {
    id: number,
    color: string,
    name: string
}




type store = {
    categories: CategoryType[],
    selectedCategory: string
}
type getters = {}
type actions = {
    editAddCategory: (category: string, color: string) => void,
    setSelectedCategory: (category: string) => void,
    removeCategory: (category: string) => void
}



const changeCategoryColor = (cardsList: CardType[], category: string, newColor: string) => {
    cardsList.forEach((obj, i) => {
        if (obj.category === category) cardsList[i].color = newColor
    })
}

export const useCategoriesStore: 
StoreDefinition<string, store, getters, actions> 
= defineStore('categories', {
    state: () => ({
        categories: [
            { id: 1, color: '#32a84c', name: 'Free-Time' },
            { id: 2, color: '#a02cb8', name: 'Work' },
            { id: 3, color: '#1e91d9', name: 'Home' },
        ],
        selectedCategory: '' 
    }),
    getters: {},
    actions: {
        editAddCategory(category: string, color: string) {
            const categoryIndex = this.categories.findIndex(obj => obj.name === category)
            if (categoryIndex === -1) this.categories.push({ id: 99, color: color, name: category})
            else {
                const cardsUndone = useTodosStore().cardsUndone;
                const cardsDone = useTodosStore().cardsDone;
                
                this.categories[categoryIndex].color = color;
                changeCategoryColor(cardsDone, category, color)
                changeCategoryColor(cardsUndone, category, color)

            }
        },
        setSelectedCategory(category: string) {
            this.selectedCategory = category
        },
        removeCategory(category: string) {
            const categoriesIndex = this.categories.findIndex(obj => obj.name===category)
            if (categoriesIndex===-1) return
            else this.categories.splice(categoriesIndex, 1)
        }
    }
})