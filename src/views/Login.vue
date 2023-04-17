<script lang="ts">
import { ref, Ref, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { VForm } from 'vuetify/components/VForm';
import { ValidationRule } from 'vuetify/components/VTextField'


import { useAuthStore } from '../stores/authStore';
import { animations } from '../utils/general'


export default {
    setup() {
        const authStore = useAuthStore()
        const instance: ComponentInternalInstance = getCurrentInstance() as ComponentInternalInstance

        const username = authStore.username
        const password = authStore.password
        const email = authStore.email
        const validationRules: ValidationRule[] = [
            (v: any) =>  !!v || 'Field Is Required',
            (v: any) => v.length > 6 || 'Password must contains at least 6 chars',
            (v: any) =>  /[A-Z]/.test(v) || 'Password must contains at least one Upper letter',
            (v: any) =>  /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Password must contains at least one special char',
        ]



        const switchForms = (login:string, signin:string) => {
            authStore.resetValues()
            animations.switchForm(login, signin)
        }
        const login = () => {
            const loginForm: VForm = instance.refs.loginForm as VForm
            loginForm.validate().then(res => {
                if (res.valid) {
                    authStore.login()
                    instance.proxy?.$router.push('/')
                }
                else return;
            })
        }

        return {
            username, password, email,
            switchForms, login,
            validationRules
        }
    },
    mounted() {
        setTimeout(() => {
            alert('This is a only-frontend template!\nTheres is no database and you can try the app with few cards and category, there will be no change when you refresh!\nTo login, just simply insert any value in the users and pass fields!\nHave Fun ;)')
        }, 100);
    }

}
</script>

<template>
    <div class="container">
        <div class="form-container__login">
            <v-form id="loginForm" ref="loginForm" color="primary">
                <h2 class="text-h2 text-center">Login</h2>
                <v-text-field label="Username" variant="outlined"
                    :v-model="username" :rules="[validationRules[0]]"
                >
                </v-text-field>
                <v-text-field label="Password" variant="outlined" type="password"
                    :v-model="password" :rules="[validationRules[0]]"
                >
                </v-text-field>
                <v-btn variant="outlined" @click="login()">Log-in</v-btn>
                <p class="text-caption text-right" @click="switchForms('-100%', '0%')">Non ancora registrato?</p>
            </v-form>
        </div>

        <div class="form-container__signin">
            <v-form id="signinForm" ref="signinForm">
                <h2 class="text-h2 text-center">Signin</h2>
                <v-text-field label="Username" variant="outlined"
                    :v-model="username" :rules="[validationRules[0]]"
                ></v-text-field>
                <v-text-field label="Email" variant="outlined"
                    :v-model="email" :rules="[validationRules[0]]"
                ></v-text-field>
                <v-text-field label="Password" variant="outlined"
                    :v-model="password" :rules="validationRules"
                ></v-text-field>
                <v-btn variant="outlined">Sign-in</v-btn>
                <p class="text-caption text-right" @click="switchForms('0%', '100%')">Già registrato?</p>
            </v-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container {
        position: relative;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;

        .form-container__login, .form-container__signin {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            right: 0;
            bottom: 0;
            
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .form-container__login { left: 0%; }
        .form-container__signin { left: 100%; }
        
        form {
            position: relative;
            width: 80%;
            max-width: 700px;
            padding: 3rem 1.5rem 6rem 1.5rem;
            border-radius: 15px;

            h2 { margin-bottom: 3rem; }
            .v-text-field { margin-bottom: 1rem; }
            p {
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                cursor: pointer;
            }

            &#signinForm {background-color: rgb(var(--v-theme-secondary));}
            &#loginForm {background-color: rgb(var(--v-theme-primary));}
            
        }
    }

    @media(max-width: 500px) {
        .v-input--density-defaul {
          --v-input-padding-top: 0;
        }
    }
</style>