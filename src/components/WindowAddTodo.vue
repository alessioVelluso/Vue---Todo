<script lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance, reactive} from 'vue';
import { VForm } from 'vuetify/components/VForm';
import { ValidationRule } from 'vuetify/components/VTextField'

import { useTodosStore } from '../stores/todosStore';
import { useAddEditTodoStore } from '../stores/addEditCardsStore'


export default {
    props: { isWindowOpen: Boolean},
    setup() {
        const todosStore = useTodosStore()
        const addEditTodoStore = useAddEditTodoStore()

        const validationRules: ValidationRule[] = [
            (v: any) => !!v || "Field can't be empty"
        ]

        const isColorPickerOpen = ref(false)

        return { todosStore, addEditTodoStore, validationRules, isColorPickerOpen }
    },
    methods: {
        addTodo(title: string, category: string, text: string, color: string) {
            const formToValidate: VForm = this.$refs.addTodoForm as VForm
            formToValidate.validate().then(res => {
                if (!res.valid) return
                
                this.todosStore.addTodo(title, category, text, color, this.addEditTodoStore.id)
                this.$emit('closeWindow')
                
            })
        },
        closeWindow() {
            this.addEditTodoStore.resetInputs()
            this.$emit('closeWindow')
        }
    }
}
</script>

<template>
    <v-form ref="addTodoForm" @click.outside="isColorPickerOpen = false">
        <v-container>
            <v-row no-gutters style="margin-bottom: 2rem;">
                <v-col>
                    <h2>Aggiungi Todo</h2>
                </v-col>
                <v-col xs="1" align-self="end" style="text-align: end;">
                    <v-btn icon  @click="closeWindow()">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col>
            </v-row>


            <v-row no-gutters>
                <v-text-field variant="outlined" hide-details
                label="Title" v-model="addEditTodoStore.title" :rules="validationRules"
                >
                </v-text-field>
            </v-row>
            
            <v-row no-gutters>
                <v-col style="flex-grow:0;" xs="1">
                    <v-menu v-model="isColorPickerOpen">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" id="colorButton" 
                            :color="addEditTodoStore.color"
                            >
                            </v-btn>
                        </template>
                        <v-color-picker  
                            @click.stop
                            v-model="addEditTodoStore.color"
                        >
                        </v-color-picker>
                    </v-menu>
                </v-col>

                <v-col>
                    <v-text-field variant="outlined" hide-details
                    label="Category" v-model="addEditTodoStore.category" :rules="validationRules"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            
            <v-row no-gutters>
                <v-textarea variant="outlined" hide-details
                label="Text" v-model="addEditTodoStore.text" :rules="validationRules"
                >
                </v-textarea>
            </v-row>

            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-col xs="2" style="text-align: end;">
                    <v-btn color="primary"
                    @click="addTodo(
                        addEditTodoStore.title, addEditTodoStore.category, 
                        addEditTodoStore.text, addEditTodoStore.color
                    )"
                    >
                        Add Todo
                    </v-btn>
                </v-col>
            </v-row>
            
        </v-container>
    </v-form>
</template>

<style scoped lang="scss">
.v-container {
   
    padding: 3rem;

    background-color: black;
    .v-row {
        margin-bottom: 1rem;
        #colorButton {
            height: 100%;
            width: 100%;
        }
        #sendButton {
            width: 100%;
        }
    }
    
}
</style>