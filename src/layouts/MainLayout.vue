<template>
    <HeaderComponent />
    <SideBarComponent />

    <main id="main" class="main">
        <!-- children -->
        <router-view />
    </main>

    <FooterComponent />
</template>

<script setup>
    import {  onMounted } from 'vue'
    import HeaderComponent from '../components/HeaderComponent.vue'
    import SideBarComponent from '../components/SideBarComponent.vue'
    import FooterComponent from '../components/FooterComponent.vue'
    const backendUrl = process.env.VUE_APP_BACKEND_URL;

    onMounted (() => {
        console.log("load env", backendUrl);
    })

</script>

<style>
</style>