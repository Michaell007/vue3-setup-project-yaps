<template>
    <main>
        <div class="container">
            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div class="d-flex justify-content-center py-4">
                                <a href="" class="logo d-flex align-items-center w-auto">
                                    <img src="/img/logo.png" alt="">
                                    <span class="d-none d-lg-block">NiceAdmin</span>
                                </a>
                            </div>

                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="pt-4 pb-2">
                                        <h5 class="card-title text-center pb-0 fs-4">Authentification</h5>
                                        <p class="text-center small">Entrez votre nom d'utilisateur et votre mot de passe pour vous connecter</p>
                                    </div>


                                    <form class="row g-3">
                                        <div class="col-12">
                                            <label for="email" class="form-label">Email</label>
                                            <div class="input-group has-validation">
                                                <input type="email" v-model="formData.email" class="form-control">
                                                <template v-if=" v$.email.$error">
                                                    <div v-for="(error, index) in v$.email.$silentErrors" :key="index+'email'" class="invalid-feedback">{{ error.$message }}</div>
                                                </template>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <label for="pwd" class="form-label">Mot de passe</label>
                                            <input type="password" name="password" v-model="formData.password" class="form-control">
                                            <template v-if=" v$.password.$error">
                                                <div v-for="(error, index) in v$.password.$silentErrors" :key="index+'pwd'" class="invalid-feedback">{{ error.$message }}</div>
                                            </template>
                                        </div>

                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" @click.prevent="submitHandler()">Login</button>
                                        </div>
                                        <div class="col-12">
                                            <p class="small mb-0">Don't have account? <a
                                                    href="pages-register.html">Create an account</a></p>
                                        </div>
                                    </form>

                                    


                                </div>
                            </div>

                            <div class="credits">
                                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    </main>
</template>

<script setup>
    import { onMounted, reactive } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { useRoute, useRouter } from 'vue-router'
    import { required, email, helpers, minLength } from '@vuelidate/validators'

    const router = useRouter()
    const route = useRoute()

    const formData = reactive({
        email: '',
        password: '',
    })

    const rules = {
        email: { 
            required: helpers.withMessage('Ce champ ne peut pas être vide', required), 
            email: helpers.withMessage("La valeur n'est pas une adresse électronique valide", email), 
        },
        password: {
            required: helpers.withMessage('Ce champ ne peut pas être vide', required),
            minLength: helpers.withMessage('Ce champ doit comporter plus de caractères', minLength(6)),
        },
    }

    const v$ = useVuelidate(rules, formData)

    onMounted(() => {
        console.log("params route", route.query.search ?? '' );
    })

    const submitHandler = async () => {
        const result = await v$.value.$validate();
        if (result) {
            console.log("succes form", formData);
            router.push({ name: 'home'})
        }
    }

</script>