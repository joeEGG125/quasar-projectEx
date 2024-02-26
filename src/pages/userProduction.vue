<template>
    <div class="column" style="height: 100%; background-color: rgb(229, 251, 252);">
        <div style="height: 180px;">
            <div class="row" style="height: 60px; width: 60%; margin-left: auto; margin-right: auto;">
                <div style="width: 33%; height: 98%; margin: 1px 0 2px 0;">
                    <!-- 商品代號欄位 -->
                    <div class="row justify-center">
                        <p style="padding-top: 15px; font-size: 18px;">商品代號：</p>
                        <q-input v-model="apinumber" style="padding-top: 7px;" outlined :dense="dense" />
                    </div>
                </div>
                <div style="width: 33%; height: 98%; margin: 1px 0 2px 0;">
                    <!-- 商品名稱欄位 -->
                    <div class="row justify-center">
                        <p style="padding-top: 15px; font-size: 18px;">商品名稱：</p>
                        <q-input v-model="apiname" style="padding-top: 7px;" outlined :dense="dense" />
                    </div>
                </div>
                <div style="width: 33%; height: 98%; margin: 1px 0 2px 0;">
                    <!-- 稅別欄位 -->
                    <div class="row justify-center">
                        <p style="padding-top: 15px; font-size: 18px;">稅別：</p>
                        <!-- <q-input style="padding-top: 7px;" outlined :dense="dense" /> -->
                        <q-select v-model="apitax" style="padding-top: 7px; width: 150px;" outlined :dense="dense"
                            :options="options" />
                    </div>
                </div>
            </div>
            <div class="row" style="height: 60px; width: 60%; margin-left: auto; margin-right: auto;">
                <div style="width: 33%; height: 98%; margin: 1px 0 2px 0;">
                    <!-- 開始日 -->
                    <div class="row">
                        <p style="padding-top: 15px; font-size: 18px;">適用開始日：</p>
                        <q-input v-model="apistart" style="padding-top: 7px; width: 60%;" outlined :dense="dense"
                            type="date" />
                    </div>
                </div>
                <div style="width: 33%; height: 98%; margin: 1px 0 2px 0;">
                    <!-- 結束日 -->
                    <div class="row">
                        <p style="padding-top: 15px; font-size: 18px;">適用結束日：</p>
                        <q-input v-model="apiend" style="padding-top: 7px; width: 60%;" outlined :dense="dense"
                            type="date" />
                    </div>
                </div>
                <div style="width: 33%; height: 98%; margin: 1px 0 2px 0;"></div>
            </div>
            <div class="row" style="height: 50px; width: 60%; margin-left: auto; margin-right: auto;">
                <div style="width: 33%; height: 98%; margin: 3px 0 2px 0;">
                    <q-btn class="btn" color="secondary" label="查詢" @click="apisearchproduct"></q-btn>
                    <q-btn class="btn" color="secondary" label="清空" @click="clearsearch"></q-btn>
                    <q-btn class="btn" color="primary" label="新增" @click="promptnew = true"></q-btn>
                </div>
            </div>
            <!-- --------------------------------filter查詢 全屏 表格 產CSV---------------------------------------- -->

        </div>
        <div class="row justify-end" style="width: 100%; margin-top: 13px;">
            <div class="col-2 " style="width: 200px">
                <!-- 透過v-model連結q-table的filter實現過濾篩選 v-model="filter"-->
                <q-input class="inputstyle" v-model="filter" filled placeholder="Search" :dense="dense">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <!-- 全螢幕or切換表格風格 -->
            <div style="width: 100px;">
                <q-btn class="btnfcg" flat round dense @click="$q.fullscreen.toggle()"
                    :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
                <q-btn class="btnfcg" flat round dense @click="toggleTableGrid"
                    :icon="(switchmode === false) ? 'grid_on' : 'view_list'" />
            </div>
            <div>
                <q-btn class="btnfcg" color="primary" label="Export to CSV" icon-right="archive" @click="exportTable" />
            </div>
        </div>
        <!-- 表格 表格 表格 表格 表格 表格 表格 表格 表格 表格 表格 表格 表格  :filter="filter"-->
        <div class="q-pa-md">
            <q-table :grid="switchmode" style="height: 550px" title="Product Information" :rows="rows" :columns="columns"
                row-key="name" :pagination="initialPagination" :filter="filter" virtual-scroll :rows-per-page-options="[0]">
                <!--  -->
                <template v-slot:body-cell-movement="props">
                    <q-td :props="props">
                        <q-btn class="gridbtn" color="green" icon="mode_edit" @click="edit(props.row)" />
                        <q-btn color="red" @click="deleterow(props.row)" icon="delete" />
                    </q-td>

                </template>
            </q-table>
        </div>
    </div>
    <!-- ------------以下為彈出視窗---------------- -->
    <!-- 按下新增後出現的功能 -->
    <q-dialog v-model="promptnew" persistent>
        <q-card style="min-width: 500px">
            <q-card-section>
                <div class="text-h6">新增資料</div>
            </q-card-section>

            <q-card-section class="q-pa-md q-col-gutter-md">
                <q-input filled v-model="addnumber" label="商品代號*" :rules="numRules" />
                <q-input filled v-model="addproductname" label="商品名稱*" :rules="nameRules" />
                <q-input filled v-model="addprice" label="價格(TWD)*" :rules="priceRules" />

                <q-input clearable filled v-model="fromdate" label="適用開始日*" mask="date" :rules="validdate">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="fromdate">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <!-- validofenddate -->
                <q-input clearable filled v-model="enddate" label="適用結束日*" mask="date" :rules="validdate">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="enddate">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>


                <q-select filled v-model="tax" :options="options" label="稅別*" :rules="taxRules" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn label="取消" color="red" @click="cancel" />
                <q-btn label="保存" color="primary" @click="insertproduct" />
                <!-- v-close-popup -->
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>






<!-- Script Script Script Script Script Script Script Script Script Script Script Script Script Script -->
<script>
import { ref, onMounted} from 'vue'
import { exportFile, useQuasar, AppFullscreen } from 'quasar'
import { reactive } from 'vue';
import axios from 'axios'
import router from 'src/router';


const columns = [
    { name: 'number', required: true, label: '商品代號', align: 'left', field: 'number', sortable: true },
    { name: 'productname', align: 'left', label: '商品名稱', field: 'productname', sortable: true },
    { name: 'price', align: 'right', label: '價格(TWD)', field: 'price', sortable: true },
    { name: 'startofdate', label: '適用開始日期', field: 'startofdate', sortable: true },
    { name: 'endofdate', label: '適用結束日期', field: 'endofdate', sortable: true },
    { name: 'tax', label: '稅別', field: 'tax', sortable: true },
    { name: 'movement', field: 'movement', label: '操作', align: 'center' },
]

function wrapCsvValue(val, formatFn, row) {
    let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
}


export default {

    setup() {
        const addnumber = ref('')
        const addproductname = ref('')
        const addprice = ref('')
        const fromdate = ref('')
        const enddate = ref('')
        const tax = ref('')
        const $q = useQuasar()
        const promptnew = ref(false)

        const isediting = ref(-2)
        const editnumber = ref(-2)
        const validform = ref(false)

        const switchmode = ref(false)
        // api查詢
        const apinumber = ref('')
        const apiname = ref('')
        const apistart = ref('')
        const apiend = ref('')
        const apitax = ref('')
        const options = reactive([])


        // 透過API 請求初始商品資料  API => grows => rows
        let rows = reactive([])
        let grows = reactive([])
        const initialrow = {
            ITEM_NO: ""
        }
        axios.post(process.env.env_API + "/VueTest/QueryProduct", initialrow)
            .then(response => {
                grows = response.data
                console.log("get data ok!!!")
                copyArray()
                console.log(rows)
            })
            .catch(error => {
                console.log(error)
            })
        axios.post(process.env.env_API + "/VueTest/QuerySelectOptions/", { "Title": "TAX" })
            .then(response => {
                response.data.forEach((item) => {
                    options.push(item.LABEL)
                })
                console.log("get options data ok!!!")
            })
            .catch(error => {
                console.log(error)
            })

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~手動輸入條件查詢~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const apisearchproduct = () => {
            const search = {
                ITEM_NO: apinumber.value,
                ITEM_NAME: apiname.value,
                EFF_DATE_FROM: apistart.value,
                EFF_DATE_TO: apiend.value,
                TAX_NAME: apitax.value
            }

            axios.post(process.env.env_API + "/VueTest/QueryProduct", search)
                .then(response => {
                    grows = response.data
                    console.log("get search data ok!!!")
                    rows.splice(0, rows.length);
                    copyArray()
                    console.log(rows)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        const clearsearch = () => {
            apinumber.value = ''
            apiname.value = ''
            apistart.value = ''
            apiend.value = ''
            apitax.value = ''
            console.log('clear Search ok!!')
        }








        const copyArray = () => {
            grows.forEach((element) => {
                rows.push({
                    number: element.ITEM_NO,
                    productname: element.ITEM_NAME,
                    price: element.PRICE,
                    startofdate: element.EFF_DATE_FROM,
                    endofdate: element.EFF_DATE_TO,
                    tax: element.TAX_NAME
                })
            })
        }








        const toggleTableGrid = () => {
            switchmode.value = !switchmode.value
        }


        // 編輯商品資料
        const edit = (index) => {
            console.log("editing")
            // isediting.value = rows.value.indexOf(index)
            isediting.value = rows.indexOf(index)
            editnumber.value = index.number
            promptnew.value = true
            addnumber.value = index.number
            addproductname.value = index.productname
            addprice.value = index.price
            fromdate.value = index.startofdate
            enddate.value = index.endofdate
            tax.value = index.tax
        }
        // 檢查商品是否存在
        const existcheck = (pnumber, pname, type) => {
            switch (type) {
                case 1:
                    for (let i = 0; i < rows.length; i++) {
                        if (pnumber === rows[i].number) {
                            showNotification('已存在同樣 商品序號', 'warning')
                            return true
                        }
                        if (pname === rows[i].productname) {
                            showNotification('已存在同樣 商品名稱', 'warning')
                            return true
                        }
                    }
                case 2:
                    for (let i = 0; i < rows.length; i++) {
                        if (pnumber === rows[i].number && i !== isediting.value) {
                            showNotification('已存在同樣 商品序號', 'warning')
                            return true
                        }
                        if (pname === rows[i].productname && i !== isediting.value) {
                            showNotification('已存在同樣 商品名稱', 'warning')
                            return true
                        }
                    }
            }  
        }


        // 在 rows 陣列中刪除指定的行
        const deleterow = (indexrow) => {
            $q.dialog({
                title: 'Editing Product Information',
                message: 'DELETE THIS ROW - Are you sure ?',
                cancel: true,
                persistent: true
            }).onOk(() => {
                // rows.value.splice(rows.value.indexOf(indexrow), 1)
                rows.splice(rows.indexOf(indexrow), 1)
            }).onCancel(() => {
                return
            }).onDismiss(() => {
                return
            })
        }

        // 新增新商品資訊
        const insertproduct = () => {
            if (isediting.value === -2) {
                console.log('adding')
                var newnumber = addnumber.value
                var newproductname = addproductname.value
                var newprice = addprice.value
                var newnfromdate = fromdate.value
                var newenddate = enddate.value
                var newtax = tax.value
                // 判斷是否無點擊欄位空白就保存
                if ((newnumber === '' || newproductname === '' || newprice === '' || newnfromdate === '' || newenddate === '' || newtax === '') || validform.value == false) {
                    showNotification('請確認所有欄位都填妥且正確')
                    return
                }
                if (existcheck(newnumber, newproductname, 1)) {
                    // showNotification('已存在同樣商品名稱 或 商品序號', 'warning')
                    return
                }

                // api add product
                const addproduct = {
                    ITEM_NO: newnumber,
                    ITEM_NAME: newproductname,
                    PRICE: newprice,
                    EFF_DATE_FROM: newnfromdate,
                    EFF_DATE_TO: newenddate,
                    TAX_NAME: newtax
                }
                axios.post(process.env.env_API + "/VueTest/AddProduct", addproduct)
                    .then(response => {
                        console.log(response.data)
                        console.log("Add data ok!!!")
                    })
                    .catch(error => {
                        console.log(error)
                    })

                // rows.value.push(
                rows.push(
                    {
                        number: newnumber,
                        productname: newproductname,
                        price: newprice,
                        startofdate: newnfromdate,
                        endofdate: newenddate,
                        tax: newtax
                    }
                )
                addnumber.value = ''
                addproductname.value = ''
                addprice.value = ''
                fromdate.value = ''
                enddate.value = ''
                tax.value = ''
                promptnew.value = false
            }
            else {
                // ~~~~~~~~~~~~~~~~~~~~編輯商品~~~~~~~~~~~~~~~~~~~~~~
                console.log('editing')
                if (existcheck(addnumber.value, addproductname.value, 2)) {
                    return
                }
                const check = {
                    ITEM_NO: addnumber.value,
                    ITEM_NAME: addproductname.value,
                    PRICE: addprice.value,
                    EFF_DATE_FROM: fromdate.value,
                    EFF_DATE_TO: enddate.value,
                    TAX_NAME: tax.value
                }
                axios.post(process.env.env_API + "/VueTest/UpdateProduct", check)
                    .then(response => {
                        console.log(response.data)
                        if (response.data.Status == 'N') {
                            showNotification(response.data.Message, 'warning')
                        } else {
                            console.log('成功修改')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                rows[isediting.value].productname = addproductname.value
                rows[isediting.value].price = addprice.value
                rows[isediting.value].startofdate = fromdate.value
                rows[isediting.value].endofdate = enddate.value
                rows[isediting.value].tax = tax.value
                addnumber.value = ''
                addproductname.value = ''
                addprice.value = ''
                fromdate.value = ''
                enddate.value = ''
                tax.value = ''
                isediting.value = -2
                promptnew.value = false
                editnumber.value = -2
            }
        }

        const showNotification = (message, color = 'negative', icon = 'error') => {
            $q.notify({
                message,
                color,
                icon
            });
        };



        return {
            editnumber,
            dense: ref(true),
            existcheck,
            toggleTableGrid,
            switchmode,
            validform,
            isediting,
            edit,
            deleterow,
            filter: ref(''),
            columns,
            rows,
            initialPagination: {
                rowsPerPage: 10
            },

            // api
            apinumber,
            apiname,
            apistart,
            apiend,
            apitax,
            apisearchproduct,
            copyArray,
            clearsearch,



            // promptnew: ref(false),
            promptnew,
            addnumber,
            addproductname,
            addprice,
            fromdate,
            enddate,
            insertproduct,
            tax,
            options,
            // options: [
            //     '免稅', '應稅'
            // ],
            // validform = false
            numRules: [
                val => {
                    if (!val && val.trim().length === 0) {
                        validform.value = false
                        return '請輸入商品代號'
                    } else if (val != editnumber.value && isediting.value != -2) {
                        validform.value = false
                        return '請勿異動商品代號'
                    }
                    else {
                        validform.value = true
                        return true
                    }
                },
                val => {

                }
            ],
            nameRules: [
                val => {
                    if (!val && val.trim().length === 0) {
                        validform.value = false
                        return '請輸入商品名稱'
                    }
                    else {
                        validform.value = true
                        return true
                    }
                }
            ],
            priceRules: [
                val => {
                    if (!val && val.trim().length === 0) {
                        validform.value = false
                        return '請輸入商品價格'
                    }
                    else if (!/^[1-9]\d*|0$/.test(val)) {
                        validform.value = false
                        return '請輸入正確價格格式'
                    }
                    else {
                        validform.value = true
                        return true
                    }
                }
            ],
            // 日期區間判定
            validdate: [
                val => {
                    if (!val) {
                        validform.value = false
                        return '請選擇日期'
                    }

                    if (fromdate.value && enddate.value) {
                        if (fromdate.value > enddate.value) {
                            validform.value = false
                            return '開始或結束日期區間有誤'
                        } else {
                            validform.value = true
                            return true
                        }
                    }
                }
            ],
            taxRules: [
                val => {
                    if (!val && val.trim().length === 0) {
                        validform.value = false
                        return '請輸入商品稅制'
                    }
                    else {
                        validform.value = true
                        return true
                    }
                }
            ],

            // CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV CSV 
            exportTable() {
                // naive encoding to csv format
                const content = [columns.map(col => wrapCsvValue(col.label))].concat(
                    rows.value.map(row => columns.map(col => wrapCsvValue(
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
                        // 更改參數 避免產出亂碼CSV
                        byteOrderMark: '\uFEFF'
                    }

                )

                if (status !== true) {
                    showNotification('Browser denied file download...', negative, warning)
                }
            },
            // 取消新增商品
            cancel() {
                addnumber.value = ''
                addproductname.value = ''
                addprice.value = ''
                fromdate.value = ''
                enddate.value = ''
                tax.value = ''
                isediting.value = -2
                promptnew.value = false
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
    margin: 2px 3px 0px 15px;
}

.btnfcg {
    margin-left: 15px;
}

.gridbtn {
    margin-right: 8px;
}
</style>