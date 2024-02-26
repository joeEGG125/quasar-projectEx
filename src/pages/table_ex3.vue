<template>
    <div class="column" style="height: 100%">
        <div style="height: 60px">
            <div class="row justify-end " style="width: 100%;">
                <div class="col-2 " style="width: 200px">
                    <!-- 透過v-model連結q-table的filter實現過濾篩選 -->
                    <q-input class="inputstyle" v-model="filter" filled placeholder="Search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
                <!-- 全螢幕 更換表格風格 -->
                <div class="col-1">
                    <q-btn class="btnfcg" flat round dense @click="$q.fullscreen.toggle()"
                        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
                    <q-btn class="btnfcg" flat round dense @click="toggleTableGrid" :icon="(switchmode === false) ? 'grid_on' : 'view_list'" />
                </div>
                <div class="col-2">
                    <q-btn class="btncsv" color="primary" label="Export to CSV" icon-right="archive" @click="exportTable" />
                </div>
            </div>
        </div>
        <!-- 表格 表格 表格 表格 表格 表格 表格 表格 表格 表格 表格 表格 表格 -->
        <div class="q-pa-md">                                                                                        <!--綁定的值-->
            <q-table :grid="switchmode" title="User Information" :filter="filter" :rows="rows" :columns="columns" row-key="id" :pagination="initialPagination">
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th auto-width></q-th>
                        <q-th v-for="col in props.cols" :key="col.name" :props="props">
                            {{ col.label }}
                        </q-th>
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td auto-width>
                            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                                :icon="props.expand ? 'remove' : 'add'" />
                        </q-td>
                        <q-td v-for="col in props.cols" :key="col.name" :props="props">
                            {{ col.value }}
                        </q-td>
                    </q-tr>
                    <q-tr v-show="props.expand" :props="props">
                        <q-td colspan="100%">
                            <div class="text-left"> {{ props.row.body }}</div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
    </div>
</template>






<!-- Script Script Script Script Script Script Script Script Script Script Script Script Script Script -->
<script>
import { ref } from 'vue'
import axios from 'axios'
import { reactive } from 'vue';
import { useQuasar, exportFile } from 'quasar';




const columns = [
    { name: 'userId', required: true, label: '用戶編號', align: 'center', field: 'userId', sortable: true },
    { name: 'id', align: 'center', label: '編號', field: 'id', sortable: true },
    { name: 'title', align: 'cneter', label: '名稱', field: 'title', sortable: true },
]

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}


export default {

    setup() {
        const $q = useQuasar()
        const switchmode = ref(false)
        const toggleTableGrid = () => {
            switchmode.value = !switchmode.value
        }
        const rows = reactive([])
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                rows.splice(0, rows.length, ...response.data)
                console.log("get data ok!!!")
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })

        return {
            toggleTableGrid,
            switchmode,
            filter: ref(''),
            columns,
            rows,
            initialPagination: {
                rowsPerPage: 12
            },

            // CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV 
            exportTable() {
                // naive encoding to csv format
                const content = [columns.map(col => wrapCsvValue(col.label))].concat(
                    rows.map(row => columns.map(col => wrapCsvValue(
                        typeof col.field === 'function'
                            ? col.field(row)
                            : row[col.field === void 0 ? col.name : col.field],
                        col.format,
                        row
                    )).join(','))
                ).join('\r\n')

                const status = exportFile(
                    'table-export.csv',
                    content,
                    {
                        mimeType: 'text/csv',
                        byteOrderMark: '\uFEFF'
                    }

                )

                if (status !== true) {
                    $q.notify({
                        message: 'Browser denied file download...',
                        color: 'negative',
                        icon: 'warning'
                    })
                }
            },
        }
    }
}


</script>
  
  
<style>
.line {
    border: 2px solid black;
}

.btn {
    margin: 10px 20px 10px 15px;
}

.btncsv {
    margin: 10px 10px 10px 15px;
}

.material-icons.md-36 {
    font-size: 36px;
    margin-top: 10px;
    margin-left: 10px;
}

.material-icons.md-28 {
    font-size: 28px;
    margin-top: 10px;
    margin-left: 10px;
}

.btnfcg {
    font-size: 18px;
    margin-top: 10px;
    margin-left: 5px;
}

.gridbtn {
    margin-right: 8px;
}
</style>