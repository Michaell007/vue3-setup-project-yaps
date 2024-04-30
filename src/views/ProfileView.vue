<template>
    <div class="pagetitle">
        <h1>Liste de profils</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">Home</li>
                <li class="breadcrumb-item active">Liste de profils</li>
            </ol>
        </nav>
    </div>

    <l-modal ref="modalRefDetails" :name="'test'" :draggable="true" :resizable="true" width="650" :buttons="buttonsModal">
        <template #title>
            Some title
        </template>
        <template #content>
            Some content
        </template>
        <template #footer>
            Some footer
        </template>
    </l-modal>

    <section class="section mt-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">

                        <div class="col-md-12 d-flex justify-content-between my-2">
                            <div class="col-md-4">
                                <button @click="gotoPage('profil-creer')" type="button" class="btn btn-primary"><i class="bi bi-plus me-1"></i> Créer un nouveau</button>
                            </div>
                            <div class="col-md-4">
                                <input v-model="paramsTable.search" type="text" class="form-control" placeholder="Rechercher ...">
                            </div>
                        </div>
                        <vue3-datatable
                            :rows="rowsTable" 
                            :columns="colsTable" 
                            :loading="loadingTable" 
                            :totalRows="totaRowsTable"
                            :sortable="true"
                            :pageSize="paramsTable.pagesize"
                            :hasCheckbox="false"
                            :columnFilter="false"
                            :stickyHeader="true"
                            :columnFilterLang="columnFilterLang"
                            :search="paramsTable.search"
                            :noDataContent="'Aucun contenu trouvé.'"
                            @change="changeServerTable"
                        >
                            <template #id="data">
                                <strong>#{{ data.value.id }}</strong>
                            </template>
                            <template #actions="data">
                                <div class="flex gap-4 bh-sticky">
                                    <button type="button" @click="showDetails(data)" class="btn btn-sm btn-success me-1"><i class="bi bi-check-circle"></i></button>
                                    <button type="button" class="btn btn-sm btn-danger"><i class="bi bi-exclamation-octagon"></i></button>
                                </div>
                            </template>
                        </vue3-datatable>

                        <VueSpinner size="20" color="red" />

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import '@bhplugin/vue3-datatable/dist/style.css';
    import { VueSpinner } from 'vue3-spinners';
    import Swal from 'sweetalert2'
    import { toast } from 'vue3-toastify';
    import { useRouter } from 'vue-router'
    import api from "../services/axios"

    const router = useRouter()

    // MODAL
    const modalRefDetails = ref(null)
    const buttonsModal = ref([
        {
            text: 'Fermer', title: 'fermer',
            class: 'light-button-close',
            options: { disabled: false },
            click: () => {
                modalRefDetails.value.$modals.close('test')
            }
        }
    ])

    // DATATABLE
    const loadingTable = ref(false);
    const columnFilterLang = ref({no_filter: 'Aucun', contain: 'Contiens', not_contain: 'Ne contiens pas', equal: 'Egale', not_equal: 'Différent', start_with: 'Commence par', end_with: 'Termine par', greater_than: 'Supérieur à', greater_than_equal: 'Sup. ou égale à', less_than: 'Inférieur à', less_than_equal: 'Inf. ou égale à', is_null: 'Est null', is_not_null: 'Non null'})
    const paramsTable = reactive({
        current_page: 1,
        pagesize: 10,
        sort_column: 'id',
        sort_direction: 'asc',
        search: ""
    });
    const colsTable = ref([
        { field: 'id', title: 'ID', isUnique: true, type: 'number' },
        { field: 'firstName', title: 'First Name', minWidth: "150px" },
        { field: 'lastName', title: 'Last Name', minWidth: "200px" },
        { field: 'email', title: 'Email' },
        { field: 'age', title: 'Age', type: 'number' },
        { field: 'dob', title: 'Birthdate', type: 'date' },
        { field: 'address.city', title: 'City' },
        { field: 'isActive', title: 'Active', type: 'bool' },
        { field: 'actions', title: 'Actions' },
    ])
    const rowsTable = ref([
        {
            "id": 1,
            "firstName": "Caroline",
            "lastName": "Jensen",
            "email": "carolinejensen@zidant.com",
            "dob": "2004-05-28",
            "address": {
                "street": "529 Scholes Street",
                "city": "Temperanceville",
                "zipcode": 5235,
                "geo": {
                    "lat": 23.806115,
                    "lng": 164.677197
                }
            },
            "phone": "+1 (821) 447-3782",
            "isActive": true,
            "age": 39,
            "company": "POLARAX"
        },
        {
            "id": 2,
            "firstName": "Celeste",
            "lastName": "Grant",
            "email": "celestegrant@polarax.com",
            "dob": "1989-11-19",
            "address": {
                "street": "639 Kimball Street",
                "city": "Bascom",
                "zipcode": 8907,
                "geo": {
                    "lat": 65.954483,
                    "lng": 98.906478
                }
            },
            "phone": "+1 (838) 515-3408",
            "isActive": false,
            "age": 32,
            "company": "MANGLO"
        },
        {
            "id": 3,
            "firstName": "Tillman",
            "lastName": "Forbes",
            "email": "tillmanforbes@manglo.com",
            "dob": "2016-09-05",
            "address": {
                "street": "240 Vandalia Avenue",
                "city": "Thynedale",
                "zipcode": 8994,
                "geo": {
                    "lat": -34.949388,
                    "lng": -82.958111
                }
            },
            "phone": "+1 (969) 496-2892",
            "isActive": false,
            "age": 26,
            "company": "APPLIDECK"
        },
        {
            "id": 4,
            "firstName": "Daisy",
            "lastName": "Whitley",
            "email": "daisywhitley@applideck.com",
            "dob": "1987-03-23",
            "address": {
                "street": "350 Pleasant Place",
                "city": "Idledale",
                "zipcode": 9369,
                "geo": {
                    "lat": -54.458809,
                    "lng": -127.476556
                }
            },
            "phone": "+1 (861) 564-2877",
            "isActive": true,
            "age": 21,
            "company": "VOLAX"
        },
        {
            "id": 5,
            "firstName": "Weber",
            "lastName": "Bowman",
            "email": "weberbowman@volax.com",
            "dob": "1983-02-24",
            "address": {
                "street": "154 Conway Street",
                "city": "Broadlands",
                "zipcode": 8131,
                "geo": {
                    "lat": 54.501351,
                    "lng": -167.47138
                }
            },
            "phone": "+1 (962) 466-3483",
            "isActive": false,
            "age": 26,
            "company": "ORBAXTER"
        },
        {
            "id": 6,
            "firstName": "Buckley",
            "lastName": "Townsend",
            "email": "buckleytownsend@orbaxter.com",
            "dob": "2011-05-29",
            "address": {
                "street": "131 Guernsey Street",
                "city": "Vallonia",
                "zipcode": 6779,
                "geo": {
                    "lat": -2.681655,
                    "lng": 3.528942
                }
            },
            "phone": "+1 (884) 595-2643",
            "isActive": true,
            "age": 40,
            "company": "OPPORTECH"
        },
        {
            "id": 7,
            "firstName": "Latoya",
            "lastName": "Bradshaw",
            "email": "latoyabradshaw@opportech.com",
            "dob": "2010-11-23",
            "address": {
                "street": "668 Lenox Road",
                "city": "Lowgap",
                "zipcode": 992,
                "geo": {
                    "lat": 36.026423,
                    "lng": 130.412198
                }
            },
            "phone": "+1 (906) 474-3155",
            "isActive": true,
            "age": 24,
            "company": "GORGANIC"
        },
        {
            "id": 8,
            "firstName": "Kate",
            "lastName": "Lindsay",
            "email": "katelindsay@gorganic.com",
            "dob": "1987-07-02",
            "address": {
                "street": "773 Harrison Avenue",
                "city": "Carlton",
                "zipcode": 5909,
                "geo": {
                    "lat": 42.464724,
                    "lng": -12.948403
                }
            },
            "phone": "+1 (930) 546-2952",
            "isActive": true,
            "age": 24,
            "company": "AVIT"
        },
        {
            "id": 9,
            "firstName": "Marva",
            "lastName": "Sandoval",
            "email": "marvasandoval@avit.com",
            "dob": "2010-11-02",
            "address": {
                "street": "200 Malta Street",
                "city": "Tuskahoma",
                "zipcode": 1292,
                "geo": {
                    "lat": -52.206169,
                    "lng": 74.19452
                }
            },
            "phone": "+1 (927) 566-3600",
            "isActive": false,
            "age": 28,
            "company": "QUILCH"
        },
        {
            "id": 10,
            "firstName": "Decker",
            "lastName": "Russell",
            "email": "deckerrussell@quilch.com",
            "dob": "1994-04-21",
            "address": {
                "street": "708 Bath Avenue",
                "city": "Coultervillle",
                "zipcode": 1268,
                "geo": {
                    "lat": -41.550295,
                    "lng": -146.598075
                }
            },
            "phone": "+1 (846) 535-3283",
            "isActive": false,
            "age": 27,
            "company": "MEMORA"
        },
        {
            "id": 12,
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe@example.com",
            "dob": "1990-01-01",
            "address": {
                "street": "123 Main St",
                "city": "Anytown",
                "zipcode": 12345,
                "geo": {
                    "lat": 40.7128,
                    "lng": -74.006
                }
            },
            "phone": "+1 (123) 456-7890",
            "isActive": true,
            "age": 32,
            "company": "ABC Company"
        },
        {
            "id": 13,
            "firstName": "Jane",
            "lastName": "Smith",
            "email": "janesmith@example.com",
            "dob": "1995-05-05",
            "address": {
                "street": "456 Oak St",
                "city": "Sometown",
                "zipcode": 54321,
                "geo": {
                    "lat": 38.9072,
                    "lng": -77.0369
                }
            },
            "phone": "+1 (987) 654-3210",
            "isActive": false,
            "age": 27,
            "company": "XYZ Corporation"
        },
        {
            "id": 14,
            "firstName": "Emily",
            "lastName": "Brown",
            "email": "emilybrown@example.com",
            "dob": "1980-12-25",
            "address": {
                "street": "101 Pine St",
                "city": "Anothertown",
                "zipcode": 13579,
                "geo": {
                    "lat": 37.7749,
                    "lng": -122.4194
                }
            },
            "phone": "+1 (444) 444-4444",
            "isActive": false,
            "age": 41,
            "company": "Beehive Co"
        },
        {
            "id": 15,
            "firstName": "Elizabeth",
            "lastName": "Taylor",
            "email": "elizabethtaylor@zidant.com",
            "dob": "1987-03-11",
            "address": {
                "street": "390 Seeley Street",
                "city": "North Krystel",
                "zipcode": 9158,
                "geo": {
                    "lat": -33.236106,
                    "lng": -167.791848
                }
            },
            "phone": "+1 (966) 421-2057",
            "isActive": true,
            "age": 35,
            "company": "FUTURITY"
        },
        {
            "id": 16,
            "firstName": "David",
            "lastName": "Wilson",
            "email": "davidwilson@example.com",
            "dob": "1992-08-18",
            "address": {
                "street": "246 Maple St",
                "city": "Westville",
                "zipcode": 24680,
                "geo": {
                    "lat": 41.8781,
                    "lng": -87.6298
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": true,
            "age": 29,
            "company": "Tech Innovations"
        },
        {
            "id": 17,
            "firstName": "Sarah",
            "lastName": "Martinez",
            "email": "sarahmartinez@example.com",
            "dob": "1984-06-30",
            "address": {
                "street": "753 Cedar St",
                "city": "Southtown",
                "zipcode": 13579,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (888) 888-8888",
            "isActive": false,
            "age": 37,
            "company": "Global Solutions"
        },
        {
            "id": 18,
            "firstName": "Christopher",
            "lastName": "Anderson",
            "email": "christopheranderson@example.com",
            "dob": "1988-11-22",
            "address": {
                "street": "555 Pine St",
                "city": "Newtown",
                "zipcode": 54321,
                "geo": {
                    "lat": 40.7128,
                    "lng": -74.006
                }
            },
            "phone": "+1 (999) 999-9999",
            "isActive": true,
            "age": 33,
            "company": "Innovate Co"
        },
        {
            "id": 19,
            "firstName": "Jessica",
            "lastName": "Lee",
            "email": "jessicalee@example.com",
            "dob": "1993-04-17",
            "address": {
                "street": "987 Elm St",
                "city": "Westtown",
                "zipcode": 97531,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (222) 222-2222",
            "isActive": false,
            "age": 28,
            "company": "InnoTech Solutions"
        },
        {
            "id": 20,
            "firstName": "Daniel",
            "lastName": "Garcia",
            "email": "danielgarcia@example.com",
            "dob": "1996-02-10",
            "address": {
                "street": "369 Oak St",
                "city": "Easttown",
                "zipcode": 36985,
                "geo": {
                    "lat": 38.9072,
                    "lng": -77.0369
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": true,
            "age": 26,
            "company": "Data Solutions Inc"
        },
        {
            "id": 21,
            "firstName": "Olivia",
            "lastName": "Hernandez",
            "email": "oliviahernandez@example.com",
            "dob": "1989-07-08",
            "address": {
                "street": "456 Cedar St",
                "city": "Westtown",
                "zipcode": 12345,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (666) 666-6666",
            "isActive": true,
            "age": 32,
            "company": "Tech Solutions LLC"
        },
        {
            "id": 22,
            "firstName": "William",
            "lastName": "Lopez",
            "email": "williamlopez@example.com",
            "dob": "1985-11-12",
            "address": {
                "street": "753 Elm St",
                "city": "Southtown",
                "zipcode": 75309,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": false,
            "age": 36,
            "company": "Tech Innovations"
        },
        {
            "id": 23,
            "firstName": "Sophia",
            "lastName": "Gonzalez",
            "email": "sophiagonzalez@example.com",
            "dob": "1991-03-20",
            "address": {
                "street": "369 Maple St",
                "city": "Easttown",
                "zipcode": 95173,
                "geo": {
                    "lat": 38.9072,
                    "lng": -77.0369
                }
            },
            "phone": "+1 (555) 555-5555",
            "isActive": true,
            "age": 30,
            "company": "Data Solutions Inc"
        },
        {
            "id": 24,
            "firstName": "James",
            "lastName": "Perez",
            "email": "jamesperez@example.com",
            "dob": "1994-08-28",
            "address": {
                "street": "555 Cedar St",
                "city": "Newtown",
                "zipcode": 95173,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (999) 999-9999",
            "isActive": false,
            "age": 27,
            "company": "Global Innovations"
        },
        {
            "id": 25,
            "firstName": "Benjamin",
            "lastName": "Torres",
            "email": "benjamintorres@example.com",
            "dob": "1983-02-14",
            "address": {
                "street": "123 Cedar St",
                "city": "Anytown",
                "zipcode": 12345,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (123) 456-7890",
            "isActive": true,
            "age": 39,
            "company": "Tech Solutions LLC"
        },
        {
            "id": 26,
            "firstName": "Isabella",
            "lastName": "Ramirez",
            "email": "isabellaramirez@example.com",
            "dob": "1980-05-30",
            "address": {
                "street": "753 Maple St",
                "city": "Southtown",
                "zipcode": 75309,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (444) 444-4444",
            "isActive": false,
            "age": 41,
            "company": "Data Solutions Inc"
        },
        {
            "id": 27,
            "firstName": "Ethan",
            "lastName": "Gomez",
            "email": "ethangomez@example.com",
            "dob": "1997-09-09",
            "address": {
                "street": "987 Pine St",
                "city": "Westtown",
                "zipcode": 97531,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (222) 222-2222",
            "isActive": false,
            "age": 24,
            "company": "Global Innovations"
        },
        {
            "id": 28,
            "firstName": "Mia",
            "lastName": "Reyes",
            "email": "miareyes@example.com",
            "dob": "1990-12-03",
            "address": {
                "street": "369 Cedar St",
                "city": "Easttown",
                "zipcode": 36985,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": true,
            "age": 31,
            "company": "Tech Innovations"
        },
        {
            "id": 29,
            "firstName": "Alexander",
            "lastName": "Scott",
            "email": "alexanderscott@example.com",
            "dob": "1988-06-25",
            "address": {
                "street": "555 Elm St",
                "city": "Newtown",
                "zipcode": 95173,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (555) 555-5555",
            "isActive": false,
            "age": 33,
            "company": "Global Innovations"
        },
        {
            "id": 30,
            "firstName": "Charlotte",
            "lastName": "Nguyen",
            "email": "charlottenguyen@example.com",
            "dob": "1987-04-05",
            "address": {
                "street": "753 Oak St",
                "city": "Southtown",
                "zipcode": 75309,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (999) 999-9999",
            "isActive": false,
            "age": 34,
            "company": "Data Solutions Inc"
        },
        {
            "id": 31,
            "firstName": "William",
            "lastName": "Hill",
            "email": "williamhill@example.com",
            "dob": "1983-11-18",
            "address": {
                "street": "987 Cedar St",
                "city": "Westtown",
                "zipcode": 97531,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (222) 222-2222",
            "isActive": true,
            "age": 38,
            "company": "Tech Innovations"
        },
        {
            "id": 32,
            "firstName": "Amelia",
            "lastName": "King",
            "email": "ameliaking@example.com",
            "dob": "1996-10-12",
            "address": {
                "street": "369 Cedar St",
                "city": "Easttown",
                "zipcode": 36985,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": false,
            "age": 25,
            "company": "Global Innovations"
        },
        {
            "id": 33,
            "firstName": "Evelyn",
            "lastName": "Green",
            "email": "evelyngreen@example.com",
            "dob": "1984-08-22",
            "address": {
                "street": "555 Pine St",
                "city": "Newtown",
                "zipcode": 95173,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (555) 555-5555",
            "isActive": true,
            "age": 37,
            "company": "Data Solutions Inc"
        },
        {
            "id": 34,
            "firstName": "Liam",
            "lastName": "Baker",
            "email": "liambaker@example.com",
            "dob": "1990-03-07",
            "address": {
                "street": "753 Elm St",
                "city": "Southtown",
                "zipcode": 75309,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (999) 999-9999",
            "isActive": true,
            "age": 31,
            "company": "Tech Innovations"
        },
        {
            "id": 35,
            "firstName": "Ava",
            "lastName": "Turner",
            "email": "avaturner@example.com",
            "dob": "1985-05-15",
            "address": {
                "street": "987 Maple St",
                "city": "Westtown",
                "zipcode": 97531,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (222) 222-2222",
            "isActive": false,
            "age": 36,
            "company": "Global Innovations"
        },
        {
            "id": 36,
            "firstName": "Noah",
            "lastName": "Gonzalez",
            "email": "noahgonzalez@example.com",
            "dob": "1988-09-29",
            "address": {
                "street": "369 Cedar St",
                "city": "Easttown",
                "zipcode": 36985,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": true,
            "age": 33,
            "company": "Tech Innovations"
        },
        {
            "id": 37,
            "firstName": "Sophia",
            "lastName": "Evans",
            "email": "sophiaevans@example.com",
            "dob": "1995-04-18",
            "address": {
                "street": "555 Cedar St",
                "city": "Newtown",
                "zipcode": 95173,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (555) 555-5555",
            "isActive": false,
            "age": 26,
            "company": "Data Solutions Inc"
        },
        {
            "id": 38,
            "firstName": "William",
            "lastName": "Collins",
            "email": "williamcollins@example.com",
            "dob": "1991-10-29",
            "address": {
                "street": "753 Elm St",
                "city": "Southtown",
                "zipcode": 75309,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (999) 999-9999",
            "isActive": true,
            "age": 30,
            "company": "Tech Innovations"
        },
        {
            "id": 39,
            "firstName": "Olivia",
            "lastName": "Stewart",
            "email": "oliviastewart@example.com",
            "dob": "1980-08-13",
            "address": {
                "street": "987 Pine St",
                "city": "Westtown",
                "zipcode": 97531,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (222) 222-2222",
            "isActive": false,
            "age": 41,
            "company": "Global Innovations"
        },
        {
            "id": 40,
            "firstName": "Emma",
            "lastName": "Morales",
            "email": "emmamorales@example.com",
            "dob": "1984-01-25",
            "address": {
                "street": "369 Maple St",
                "city": "Easttown",
                "zipcode": 36985,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": true,
            "age": 37,
            "company": "Tech Innovations"
        },
        {
            "id": 41,
            "firstName": "Liam",
            "lastName": "Gutierrez",
            "email": "liamgutierrez@example.com",
            "dob": "1993-05-27",
            "address": {
                "street": "555 Cedar St",
                "city": "Newtown",
                "zipcode": 95173,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (555) 555-5555",
            "isActive": false,
            "age": 28,
            "company": "Data Solutions Inc"
        },
        {
            "id": 42,
            "firstName": "Sophia",
            "lastName": "Sullivan",
            "email": "sophiasullivan@example.com",
            "dob": "1987-09-05",
            "address": {
                "street": "753 Elm St",
                "city": "Southtown",
                "zipcode": 75309,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (999) 999-9999",
            "isActive": true,
            "age": 34,
            "company": "Tech Innovations"
        },
        {
            "id": 43,
            "firstName": "Lucas",
            "lastName": "Coleman",
            "email": "lucascoleman@example.com",
            "dob": "1990-02-08",
            "address": {
                "street": "987 Pine St",
                "city": "Westtown",
                "zipcode": 97531,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (222) 222-2222",
            "isActive": false,
            "age": 31,
            "company": "Global Innovations"
        },
        {
            "id": 44,
            "firstName": "Mia",
            "lastName": "Russell",
            "email": "miarussell@example.com",
            "dob": "1984-03-23",
            "address": {
                "street": "369 Cedar St",
                "city": "Easttown",
                "zipcode": 36985,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": true,
            "age": 37,
            "company": "Tech Innovations"
        },
        {
            "id": 45,
            "firstName": "Ethan",
            "lastName": "Alexander",
            "email": "ethanalexander@example.com",
            "dob": "1996-11-14",
            "address": {
                "street": "555 Cedar St",
                "city": "Newtown",
                "zipcode": 95173,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (555) 555-5555",
            "isActive": false,
            "age": 25,
            "company": "Data Solutions Inc"
        },
        {
            "id": 46,
            "firstName": "Avery",
            "lastName": "Washington",
            "email": "averywashington@example.com",
            "dob": "1988-07-26",
            "address": {
                "street": "753 Elm St",
                "city": "Southtown",
                "zipcode": 75309,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (999) 999-9999",
            "isActive": true,
            "age": 33,
            "company": "Tech Innovations"
        },
        {
            "id": 47,
            "firstName": "Harper",
            "lastName": "Simmons",
            "email": "harpersimmons@example.com",
            "dob": "1993-12-17",
            "address": {
                "street": "987 Pine St",
                "city": "Westtown",
                "zipcode": 97531,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (222) 222-2222",
            "isActive": false,
            "age": 28,
            "company": "Global Innovations"
        },
        {
            "id": 48,
            "firstName": "Evelyn",
            "lastName": "Martinez",
            "email": "evelynmartinez@example.com",
            "dob": "1985-01-08",
            "address": {
                "street": "369 Cedar St",
                "city": "Easttown",
                "zipcode": 36985,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (777) 777-7777",
            "isActive": true,
            "age": 36,
            "company": "Tech Innovations"
        },
        {
            "id": 49,
            "firstName": "Mason",
            "lastName": "Allen",
            "email": "masonallen@example.com",
            "dob": "1983-06-09",
            "address": {
                "street": "555 Elm St",
                "city": "Newtown",
                "zipcode": 95173,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (555) 555-5555",
            "isActive": false,
            "age": 38,
            "company": "Data Solutions Inc"
        },
        {
            "id": 50,
            "firstName": "Ella",
            "lastName": "Nelson",
            "email": "ellanelson@example.com",
            "dob": "1990-09-04",
            "address": {
                "street": "753 Cedar St",
                "city": "Southtown",
                "zipcode": 75309,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (999) 999-9999",
            "isActive": true,
            "age": 31,
            "company": "Tech Innovations"
        },
        {
            "id": 41,
            "firstName": "Logan",
            "lastName": "Hill",
            "email": "loganhill@example.com",
            "dob": "1984-11-28",
            "address": {
                "street": "987 Elm St",
                "city": "Westtown",
                "zipcode": 97531,
                "geo": {
                    "lat": 34.0522,
                    "lng": -118.2437
                }
            },
            "phone": "+1 (222) 222-2222",
            "isActive": false,
            "age": 37,
            "company": "Global Innovations"
        },
    ])
    const totaRowsTable = ref(rowsTable.value.length)

    const changeServerTable = (data) => {
        paramsTable.current_page = data.current_page;
        paramsTable.pagesize = data.pagesize;
    };

    const showDetails = (data) => {
        console.log("Hello click", data.value);
        modalRefDetails.value.$modals.open('test')

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annuler",
            confirmButtonText: "Valider"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Confirmer a été validé");
                notify()
            }
        })
    }

    const notify = () => {
        toast("Wow so easy !", {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    const gotoPage = (name) => {
        router.push({ name: name })
    }


    onMounted(() => {
        api.get('https://api.restful-api.dev/objects/7')
        .then((response) => {
            console.log("axios response", response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    })

</script>

<style>
</style>