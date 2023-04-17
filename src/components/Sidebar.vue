<script lang="ts">
import { ref, getCurrentInstance, } from 'vue';
import { useCategoriesStore } from '../stores/categoriesStore';

export default {
    props: {isMobile: Boolean, isOptionView: Boolean},
    setup() {
        const categoriesStore = useCategoriesStore()

        const isOptionViewActive = ref(false)
        const profilePic = ref('src/assets/defaultAvatar.png')
        const listIndex = ref(null);

        return { profilePic, listIndex, categoriesStore, isOptionViewActive }
        
    },
    methods: {
        handleCheckboxClick () { 
            this.$emit('toggleShowUndone') 
        },
        handleSetCategory(category: string, index: any)  {
            if (this.listIndex! === index) {
                this.listIndex = null
                this.categoriesStore.setSelectedCategory('')
            }
            else {
                this.listIndex = index
                this.categoriesStore.setSelectedCategory(category)
            }
        },
        handleImgResponsiveness() {
            if (window.innerWidth < this.$vuetify.display.thresholds.xs) return 'width: 50px; height: 50px;'

            if (this.$vuetify.display.xs) return 'width: 60px; height: 60px;'
            else return 'width: 80px; height: 80px;'
        },
        handleListResponsiveness() {
            if (this.isOptionView && this.isMobile) return 'display: none;'
            else if (this.isOptionView && !this.isMobile) return 'visibility: hidden'
            else return '';
        }
    }
}
</script>

<template>
    <div :id="isMobile  ?'sidebarMobile'  :'sidebar'">
        <h1 :style="$vuetify.display.xs  ?'font-size: 3em'  :''">MY TODO</h1>
        <img 
            :src="profilePic" 
            alt="profilePic" 
            :style="handleImgResponsiveness()"
            @click="isOptionView  ?$router.push('/')  :$router.push('/options')"
        >

        <v-list :style="handleListResponsiveness()">
            <v-list-item v-for="(category, i) in categoriesStore.categories"
            @click="handleSetCategory(category.name, i)"
            :active="listIndex === i"
            
            >
                <span :key="i">
                    <div class="pallino-categoria" :style="`background-color: ${category.color};`"></div>
                    <p :style="$vuetify.display.xs  ?'font-size: 1em'  :''">{{ category.name }}</p>
                </span>
            </v-list-item>
        </v-list>

        <div id="undoneCheckbox" :style="isOptionView  ?'visibility: hidden'  :''">
            <input type="checkbox" @click="handleCheckboxClick()"/>
            <label for="Show-Undone">Show only undone</label>
        </div>
    </div>
</template>






<style scoped lang="scss">
#sidebar {
    width: 100%;
    height: 100vh;
    position: sticky;
    inset: 0;


    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    img, ul {margin-bottom: 1rem;}


    img {
        /*width: 40%;
        aspect-ratio: 1/1;*/
        width: 120px;
        height: 120px;
        border-radius: 50%;
        cursor: pointer;
    }
    .v-list {
        height: 50%;
        width: 85%;
        padding: 1.5rem 0;
        border-radius: 10px;
        list-style: none;

        background-color: transparent;

        overflow-y: scroll;
        &::-webkit-scrollbar {display: none;}
        &::-webkit-scrollbar-track {background: #6e6e6e;}
        &::-webkit-scrollbar-thumb {background: #888;}
        &::-webkit-scrollbar-thumb:hover {background: #555;}

        .v-list-item {
            margin: 0;
            padding: 0;

            span {
                position: relative;
                cursor: pointer;

                width: 100%;
                height: 3rem;
                
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0.3rem 1rem;

                transition: 200ms background-color ease;
                &:hover { background-color: #555;}
                .pallino-categoria {
                    display: inline-block;
                    height: 1.5rem;
                    width: 1.5rem;
                    border-radius: 50%;
                    margin-right: 2rem;
                }
                p { display: inline-block }
            }
        }
            
        
    }

    #undoneCheckbox {
        width: 100%;
        font-size: 0.8rem;
        color: gray;
        display: flex;
        justify-content: flex-end;
        margin-right: 0.5rem;
        input {
            margin-right: 0.5rem;
        }
    }
}


#sidebarMobile {
    width: 100%;
    height: min-content;
    
    
    padding: 1rem;

    display: flex;
    flex-wrap: wrap;

    h1 {
        flex-grow: 1;
    }
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        cursor: pointer;
    }
    .v-list {
        width: 100%;
        height: min-content;
        min-height: min-content;
        border-radius: 10px;
        list-style: none;

        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        

        background-color: transparent;
        margin-bottom: 1rem;

        overflow-x: scroll;
        &::-webkit-scrollbar {height: 3px;}
        &::-webkit-scrollbar-track {background: #494949;}
        &::-webkit-scrollbar-thumb {background: #646464;}
        &::-webkit-scrollbar-thumb:hover {background: #929292;}

        .v-list-item {
            margin: 0;
            padding: 0;
            height: min-content;
            min-height: min-content;

            span {
                position: relative;
                cursor: pointer;

                width: 100%;
                height: 3rem;
                
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0.3rem 1rem;

                transition: 200ms background-color ease;
                &:hover { background-color: #555;}
                .pallino-categoria {
                    display: inline-block;
                    height: 1.5rem;
                    width: 1.5rem;
                    border-radius: 50%;
                    margin-right: 2rem;
                }
                p { display: inline-block }
            }
        }
            
        
    }

    #undoneCheckbox {
        width: 100%;
        height: min-content;
        min-height: min-content;
        font-size: 0.8rem;
        color: gray;
        display: flex;
        justify-content: flex-end;
        margin-right: 0.5rem;
        input {
            margin-right: 0.5rem;
        }
    }
}
</style>