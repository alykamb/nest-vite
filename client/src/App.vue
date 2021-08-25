<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + NestJs" />
        <form @submit.prevent="submit">
            <input type="text" name="username" v-model="username" />
            <input type="password" name="password" v-model="password" />
            <button>Logar</button>
        </form>
        <button @click="getMeaning">getMeaning</button>
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent, ref } from 'vue'

import HelloWorld from './components/HelloWorld.vue'
export default defineComponent({
    name: 'App',
    components: {
        HelloWorld,
    },
    setup() {
        const username = ref('')
        const password = ref('')

        const submit = async () => {
            await axios.post('/api/login', {
                username: username.value,
                password: password.value,
            })
        }

        const getMeaning = async () => {
            const res = await axios.post('/api/meaning', null, {
                withCredentials: true,
            })

            console.log(res.data)
        }
        return { username, password, submit, getMeaning }
    },
})
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
