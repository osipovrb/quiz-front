<script lang="ts" setup>
    import { ref, inject } from 'vue'
    import type { Ref } from "vue";
    import { onMessage } from 'vue3-websocket'

    const text = ref('')
    const messages = ref(<string[]>[])

    const socket = <Ref<WebSocket>>inject('socket')

    const sendMessage = () => socket.value.send(text.value)

    onMessage((message: MessageEvent) => {
        messages.value.push(`Server: ${message.data}`)
    })
</script>

<template>
    <div class="col gap-20">
        <div class="messages col gap-5">
            <div class="message" v-for="message in messages">
                <code>{{ message }}</code>
            </div>
        </div>
        <div>
            <input 
                v-model="text" 
                @keyup.enter="sendMessage()"
                type="text" 
                placeholder="Enter для отправки..."/>
        </div>
    </div>
</template>

<style scoped>
    .col {
        display: flex;
        flex-direction: column;
    }

    .gap-5 {
        gap: 5px;
    }

    .gap-20 {
        gap: 20px;
    }

    .messages, 
    input {
        width: 600px;
        box-sizing: border-box;
    }

    .messages {
        height: 372px;
        border: 1px solid black;
        border-radius: 4px;
        padding: 5px;
        cursor: default;
    }
</style>
