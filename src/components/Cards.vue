<script lang="ts">
import { darkenColor } from '../utils/general'

import WindowAddTodo from './WindowAddTodo.vue'

export default {
    components: { WindowAddTodo },
    props: {
        id: Number, 
        title: String, 
        category: String, 
        text: String, 
        isDone: Boolean, 
        color: String
    },
    data() {
        return {
            isDoneIcon: this.isDone  ?'mdi-check-circle'  :'mdi-check-circle-outline',
            isDoneText: this.isDone  ?'text-decoration: line-through;'  :'text-decoration: none;',
            isEditWindowOpen: false,
            isMenuOpen: false,
            options: ['Edit', 'Delete'],
        }
    },
    methods: {
        handleOptionsClick(item:string) {
            if (item === 'Delete') {
                this.isMenuOpen = false;
                this.$emit('removeTask')
            }
            if (item === 'Edit') {
                this.isEditWindowOpen = true;
                this.$emit('editTask')
            }
        },
        darkenColor(color: string | undefined) {
            return darkenColor(color)
        },
        closeAddEditWindow() {
            this.isEditWindowOpen = false;
            this.isMenuOpen = false;
        }
    }
}

</script>
<template>

    <v-card 
    :id="id" 
    :style="isDone  ?'opacity: 0.5'  :'opacity: 1'" 
    :color="color"
    >
        <v-toolbar :color="darkenColor(color)" density="compact">

            <!-- TITOLO -->
            <v-toolbar-title v-bind:style="isDoneText">
                {{ title }}
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- MENU MODIFICA/ELIMINA -->
            <v-menu :close-on-content-click="false" v-model="isMenuOpen" >
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" >
                        <v-icon style="text-decoration: none;">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(item, index) in options"
                        :key="index"
                        :value="index"
                        @click="handleOptionsClick(item)"
                    >   
                        <v-list-item-title v-if="item === 'Edit'">
                            {{ item }}
                                <v-dialog persistent v-model="isEditWindowOpen">
                                    <WindowAddTodo @closeWindow="closeAddEditWindow()"/>
                                </v-dialog>
                        </v-list-item-title>

                        <v-list-item-title v-else>{{ item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-toolbar>

        <!-- CATEGORIA -->
        <v-card-subtitle v-bind:style="isDoneText">
            {{ category }}
        </v-card-subtitle>
        
        <!-- TESTO -->
        <v-card-text v-bind:style="isDoneText"> 
            {{ text }}
        </v-card-text>


        <v-card-actions>
            <v-icon id="doneIcon" @click="$emit('changeIsDone', id, isDone)">
                {{ isDoneIcon }}
            </v-icon>
        </v-card-actions>
    </v-card>

</template>


<style scoped lang="scss">
.v-card {
    transition-property: none;
    .v-toolbar {
        margin-bottom: 1rem;
        transition: 0 all;
    }
    .v-card-subtitle {
        margin-bottom: 1rem;
    }
    .v-card-text {
        max-height: 50px;
        overflow-y: scroll;
        padding: 0 1rem;
        &::-webkit-scrollbar {width: 0;}
        &::-webkit-scrollbar-track {background: #6e6e6e;}
        &::-webkit-scrollbar-thumb {background: #888;}
        &::-webkit-scrollbar-thumb:hover {background: #555;}
    }
    .v-card-actions {
        justify-content: flex-end;
        .v-icon {
            cursor: pointer;
        }
    }
}
</style>