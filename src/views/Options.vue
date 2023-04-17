<script lang="ts">
import { computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useAuthStore } from '../stores/authStore';

export default {
    components: { Sidebar },
    setup() {
        const { thresholds, width, name } = useDisplay()
        const authStore = useAuthStore()

        const isMdAndDown = computed(()=> {
            if (width.value.valueOf() < thresholds.value.md.valueOf()) return true
            else return false
        })

        return { isMdAndDown, authStore }
    },
    methods: {
        logout() {
            this.authStore.isAuth = false;
            this.$router.push('/login');
        }
    }
}
</script>

<template>
<v-container id="container" fluid>
    <v-row v-if="isMdAndDown" no-gutters>
        <v-col>
            <Sidebar 
                :isOptionView="true"
                :isMobile="isMdAndDown"
            />
        </v-col>
    </v-row>

    <v-row no-gutters>

        <v-col md="3" sm="4" v-if="!isMdAndDown">
            <Sidebar 
                :isOptionView="true"
                :isMobile="false"
            />
        </v-col>

        <v-col id="options">
            <v-container fluid>
                <v-row no-gutters>
                    <v-col sm="3"><p>Username:</p></v-col>
                    <v-col><v-text-field variant="outlined" hide-details>Axios</v-text-field></v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col sm="3"><p>Email:</p></v-col>
                    <v-col><v-text-field variant="outlined" hide-details>Axios</v-text-field></v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col sm="3"><p>Password:</p></v-col>
                    <v-col><v-text-field variant="outlined" hide-details>Axios</v-text-field></v-col>
                </v-row>
                <v-row no-gutters style="margin-top: 3rem; text-align: right;">
                    <v-spacer></v-spacer>
                    <v-col sm="2"><v-btn>Edit info</v-btn></v-col>
                </v-row>
            </v-container>
        </v-col>

        <v-btn variant="outlined" id="logoutBtn"
            @click="logout()"
        >
            Logout
        </v-btn>

    </v-row>
</v-container>
</template>


<style scoped lang="scss">
.v-container#container {
    min-height: 100vh;
    padding: 0;
    position: relative;

    #options {
        padding: 2rem 2rem;

        display: flex;
        align-items: center;
        .v-row {
            align-items: center;
            margin-bottom: 1rem;
        }
    }

    #logoutBtn {
        position: absolute;
        bottom: 2rem;
        left: 2rem;
    }
}
</style>