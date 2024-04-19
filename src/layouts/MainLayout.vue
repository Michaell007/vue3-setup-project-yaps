<template>
    <HeaderComponent />
    <SideBarComponent />

    <main id="main" class="main">
        <div class="pagetitle">
            <h1>Dashboard</h1>
            <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active">Dashboard</li>
            </ol>
            </nav>
        </div>

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

    onMounted (() => {
    })

</script>

<style>
</style>