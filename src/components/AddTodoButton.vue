<script lang="ts">
import WindowAddTodo from './WindowAddTodo.vue';

export default {
    components: { WindowAddTodo },
    data() {
        return {
            isWindowOpen: false
        }
    }
}
</script>
<template>
    
    <v-dialog persistent v-model="isWindowOpen">
        <template v-slot:activator="{ props }">
            <v-btn 
                v-bind="props"
                icon="mdi-plus"  
                id="plusButton" 
            ></v-btn>
        </template>
        
        <WindowAddTodo @closeWindow="isWindowOpen = false"/>
    </v-dialog>
    
</template>

<style scoped lang="scss">
#plusButton {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: rgb(var(--v-theme-secondary));
}

.v-overlay {
    height: 90%;
    width: 90%;
}

</style>