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

    <!-- The AG Grid component -->
    <ag-grid-vue
        :rowData="rowData"
        :columnDefs="colDefs"
        :defaultColDef="defaultColDef"
        :rowSelection="rowSelection"
        :pagination="pagination"
        :paginationPageSize="paginationPageSize"
        :rowClassRules="rowClassRules"
        :paginationPageSizeSelector="paginationPageSizeSelector"
        style="height: 500px"
        class="ag-theme-quartz"
    />

    <section class="section mt-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Datatables</h5>
                        <p>Add lightweight datatables to your project with using the
                            <a href="" target="_blank">Simple DataTables</a> library. Just add
                            <code>.datatable</code> class name to any table you wish to conver to a datatable. Check for
                            <a href="" target="_blank">more examples</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import "ag-grid-community/styles/ag-grid.css";
    import "ag-grid-community/styles/ag-theme-quartz.css";
    import { AgGridVue } from "ag-grid-vue3";
    // eslint-disable-next-line no-unused-vars
    import CustomBtnFragment from "../fragment/CustomBtnFragment"

    const pagination = ref(true)
    const paginationPageSize = ref(10)
    const rowClassRules = ref({
        'bg-danger': params => params.data.make === 'Jeep',
    })
    const paginationPageSizeSelector = ref([200, 500, 1000])
    const rowSelection  = ref('multiple')
    const defaultColDef = ref({
        sortable: true
    })
    
    const rowData = ref([
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: "Honda", model: "Civic", price: 28300, electric: false },
        { make: "Ford", model: "F-150", price: 42500, electric: false },
        { make: "Tesla", model: "Model 3", price: 39490, electric: true ,  },
        { make: "Chevrolet", model: "Silverado", price: 41600, electric: false },
        { make: "Nissan", model: "Altima", price: 28700, electric: false },
        { make: "Jeep", model: "Wrangler", price: 37500, electric: false },
        { make: "Ram", model: "1500", price: 42400, electric: false },
        { make: "Subaru", model: "Outback", price: 33500, electric: false },
        { make: "Hyundai", model: "Sonata", price: 28100, electric: false },
        { make: "Kia", model: "Sorento", price: 33000, electric: false },
        { make: "GMC", model: "Sierra", price: 41700, electric: false },
        { make: "BMW", model: "3 Series", price: 41250, electric: false },
        { make: "Mercedes-Benz", model: "C-Class", price: 46500, electric: false },
        { make: "Audi", model: "A4", price: 43500, electric: false },
        { make: "Volkswagen", model: "Jetta", price: 24000, electric: false },
        { make: "Mazda", model: "CX-5", price: 30500, electric: false },
        { make: "Dodge", model: "Charger", price: 37500, electric: false },
        { make: "Chrysler", model: "Pacifica", price: 37000, electric: false },
        { make: "Lincoln", model: "Navigator", price: 76700, electric: false },
        { make: "Cadillac", model: "Escalade", price: 76500, electric: false },
        { make: "Infiniti", model: "QX60", price: 50000, electric: false },
        { make: "Lexus", model: "RX", price: 51500, electric: false },
        { make: "Acura", model: "MDX", price: 50000, electric: false },
        { make: "Volvo", model: "XC90", price: 59500, electric: false },
        { make: "Land Rover", model: "Range Rover Sport", price: 71000, electric: false },
        { make: "Porsche", model: "Cayenne", price: 78000, electric: false },
        { make: "Toyota", model: "Camry", price: 29200, electric: false },
        { make: "Honda", model: "Accord", price: 28800, electric: false },
        { make: "Ford", model: "Explorer", price: 38000, electric: false },
        { make: "Tesla", model: "Model Y", price: 53990, electric: true },
        { make: "Chevrolet", model: "Equinox", price: 31000, electric: false },
        { make: "Nissan", model: "Rogue", price: 30000, electric: false },
        { make: "Jeep", model: "Grand Cherokee", price: 42000, electric: false },
        { make: "Ram", model: "2500", price: 44000, electric: false },
        { make: "Subaru", model: "Forester", price: 30500, electric: false },
        { make: "Hyundai", model: "Tucson", price: 29000, electric: false },
        { make: "Kia", model: "Telluride", price: 37000, electric: false },
        { make: "GMC", model: "Yukon", price: 56000, electric: false },
        { make: "BMW", model: "X3", price: 49000, electric: false },
        { make: "Mercedes-Benz", model: "GLC-Class", price: 50000, electric: false },
        { make: "Audi", model: "Q5", price: 50000, electric: false },
        { make: "Volkswagen", model: "Tiguan", price: 30000, electric: false },
        { make: "Mazda", model: "Mazda3", price: 25000, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const colDefs = ref([
        { 
            headerName: "Perso Details",
            children: [
                {
                    field: "athlete",
                    width: 90,
                    suppressSizeToFit: true,
                },
                {
                    field: "age",
                    width: 90,
                    minWidth: 75,
                    maxWidth: 100
                },
            ]
        },
        { headerName: "ID", 
            valueGetter: p => p.data.make + ' 1250 ',
            cellRenderer: params => {
                return 'Value is <b>' + params.value + '</b>';
            }
        },
        {   headerName: "Make & Model", 
            valueGetter: p => p.data.make + ' ' + p.data.model,
            cellRenderer: 'CustomBtnFragment',
        },
        { 
            field: "make",
            sortable: false,
            filter: true, 
            floatingFilter: false, 
            editable: false,
            cellEditor: 'agSelectCellEditor',

        },
        { field: "model", width: 200, pinned: 'right'},
        { field: "price", valueFormatter: p =>  Math.floor(p.value).toLocaleString() + ' XOF' },
        { 
            field: "electric",
            cellClassRules: {
                'bg-warning': params => params.value === true,
            }
        },
    ]);

    // const onClick = () => {
    //     console.log("Hello world ");
    // }

    onMounted(() => {
    })

</script>