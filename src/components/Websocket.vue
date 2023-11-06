<script lang="ts" setup>
    import { ref, inject } from 'vue'
    import type { Ref } from "vue";
    import { onMessage, onOpen, onClose } from 'vue3-websocket'

    const text = ref('')
    const messages = ref(<string[]>[])
    const socket = <Ref<WebSocket>>inject('socket')

    let pingInterval = 0

    function composeMessageFrame() { 
        return {
            command: 'message', 
            payload: text.value,        
        } 
    }

    function composePingFrame() {
        return {
            command: 'ping',
            payload: [],
        }
    }

    function sendFrame(composeFrameCallback: Function) {
        const frame = composeFrameCallback()
        socket.value.send(JSON.stringify(frame))
    }

    function sendMessageFrame() {
        sendFrame( composeMessageFrame )
        text.value = ''
    }

    function sendPingFrame() {
        sendFrame( composePingFrame )
    }

    onOpen(() => {
        pingInterval = setInterval(() => { sendPingFrame() }, 10000)
    })

    onClose(() => {
        clearInterval(pingInterval)
    })

    onMessage((message: MessageEvent) => {
        const decoded = JSON.parse(message.data)

        switch (decoded.command) {
            case 'message':
                messages.value.push(`${decoded.payload}`)
                break
            case 'error':
                messages.value.push(`Error! ${decoded.payload}`)
                break
            case 'pong':
                messages.value.push(`Pong!`)
                break
            default:
                console.error('Unknown command', message.data)
        }
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
                @keyup.enter="sendMessageFrame()"
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
        overflow: auto;
    }
</style>
