<template>
    <aside id="sidebar" class="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'home' }">
                    <i class="bi bi-grid"></i>
                    <span>Tableau de bord</span>
                </router-link>
            </li>

            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#profil-nav" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-person-badge"></i><span>Profils</span>
                    <i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="profil-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link class="nav-link" :to="{ name: 'profil-liste' }">
                            <i class="bi bi-circle"></i><span>Liste</span>
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="nav-heading">Pages</li>
            <li class="nav-item">
                <a class="nav-link collapsed" href="">
                    <i class="bi bi-person"></i>
                    <span>Profile</span>
                </a>
            </li>

        </ul>
    </aside>
</template>

<script setup>


</script>