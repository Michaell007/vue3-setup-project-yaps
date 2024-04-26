<template>
    <div class="copyright">
        <button v-on:click="buttonClicked">Launch!</button>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'

    onMounted(() => {
    })

    const buttonClicked = () => {
        alert("Mission Launched");
    }

</script>