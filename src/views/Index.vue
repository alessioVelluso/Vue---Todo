<script lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs';
import Sidebar from '../components/Sidebar.vue'
import Card from '../components/Cards.vue'
import AddTodoButton from '../components/AddTodoButton.vue';

import { useTodosStore, CardType } from '../stores/todosStore'
import { useCategoriesStore, CategoryType } from '../stores/categoriesStore'


export default {
    
    components: { Sidebar, Card, AddTodoButton },
    setup() {
        const todosStore = useTodosStore()
        const categoriesStore = useCategoriesStore()

        const { thresholds, width, name } = useDisplay()

        const isMdAndDown = computed(()=> {
            if (width.value.valueOf() < thresholds.value.md.valueOf()) return true
            else return false
        })
        const todosColumns = computed(() => {
            if (name.value==='lg' || name.value==='xl' ) return 3
            else if (name.value==='md') return 2
            else return 1
        })
            /* if (smAndDown.value) return true
            else return false */
            
        

        const isShowOnlyUndone_Active = ref(false)
        const cardsUndone = computed(() => todosStore.filterFromCategory(categoriesStore.selectedCategory, todosStore.cardsUndone))
        const cardsDone = computed(() => todosStore.filterFromCategory(categoriesStore.selectedCategory, todosStore.cardsDone))

        const handleChangeIsDone = (id: Number, isDone: Boolean) =>  todosStore.handleChangeIsDone(id, isDone)
        const handleRemoveTask = (id:number, category: string) => todosStore.handleRemoveTask(id, category)
        const handleEditTask = (id:number, title:string, category:string, text:string, color:string) => {
            todosStore.handleEditTask(id, title, category, text, color);
        }
        
            

        return {
            isShowOnlyUndone_Active, cardsDone, cardsUndone, isMdAndDown, todosColumns,
            handleChangeIsDone, handleEditTask, handleRemoveTask
        }
    },
    methods: {
        handleMobileMainCol() {
            if (this.isMdAndDown) return `grid-template-columns: repeat(${this.todosColumns}, 1fr); padding-bottom: 6rem;`
            else return `grid-template-columns: repeat(${this.todosColumns}, 1fr);`
        }
    }

}
</script>

<template>
    <v-container fluid >
        <v-row v-if="isMdAndDown" no-gutters>
            <v-col>
                <Sidebar 
                :isOptionView="false"
                @toggleShowUndone="isShowOnlyUndone_Active = !isShowOnlyUndone_Active"
                :isMobile="isMdAndDown"
                />
            </v-col>
        </v-row>
        <v-row no-gutters>

            <v-col md="3" sm="4" v-if="!isMdAndDown">
                <Sidebar 
                @toggleShowUndone="isShowOnlyUndone_Active = !isShowOnlyUndone_Active"
                :isMobile="false"
                :isOptionView="false"
                />
            </v-col>

            <v-col id="main" :style="handleMobileMainCol()">

                <Card v-for="c in cardsUndone"
                    :id="c.id.valueOf()"
                    :title="c.title.valueOf()"
                    :category="c.category.valueOf()"
                    :text="c.text.valueOf()"
                    :isDone="c.isDone.valueOf()"
                    :color="c.color"
                    @removeTask="handleRemoveTask(c.id.valueOf(), c.category.valueOf())"
                    @editTask="handleEditTask(
                        c.id.valueOf(), c.title.valueOf(), 
                        c.category.valueOf(), c.text.valueOf(), c.color
                    )"
                    @changeIsDone="handleChangeIsDone"
                />
                
                <Card v-if="!isShowOnlyUndone_Active"
                v-for="c in cardsDone"
                    :id="c.id.valueOf()"
                    :title="c.title.valueOf()"
                    :category="c.category.valueOf()"
                    :text="c.text.valueOf()"
                    color="#555555"
                    :isDone="c.isDone.valueOf()"
                    @changeIsDone="handleChangeIsDone"
                    @removeTask="handleRemoveTask(c.id.valueOf(), c.category.valueOf())"
                    @editTask="handleEditTask(
                        c.id.valueOf(), c.title.valueOf(), 
                        c.category.valueOf(), c.text.valueOf(), c.color
                    )"
                />
                
            </v-col>

        </v-row>

        <AddTodoButton />

    </v-container>
</template>




<style scoped lang="scss">
.v-container {
    height: 100vh;
    padding: 0;

    #main { 
        height: 100%;
        padding: 2rem 1rem;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: min-content;
        row-gap: 1rem;
        column-gap: 1rem;
    }
}

</style>