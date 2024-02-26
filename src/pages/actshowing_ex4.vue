<template>
  <div class="q-pa-md">
    <div class="column" style="max-width: 80%">
      <div class="col">
        <h4 style="text-align: center;">This is your account file.</h4>
        <div class="row justify-center q-col-gutter-md">
          <div class="col-4 q-col-gutter-md">
            <q-input clearable filled  v-model="rowdata.username" ref="nameRef" label="用戶名*" placeholder="Username" />
            <q-input clearable filled  v-model="rowdata.userplace" ref="placeRef" label="居住地區*" />
            <q-input clearable filled  v-model="rowdata.userage" label="年齡*" />
            <q-input clearable filled  v-model="rowdata.userphone" label="手機號碼*" />
          </div>
          <div class="col-4 q-col-gutter-md">
            <q-input clearable  v-model="rowdata.userpassword" filled :type="isPwd ? 'password' : 'text'" label="密碼*">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <q-input clearable filled  v-model="rowdata.userdate" label="出生日期 年/月/日*" mask="date">
            </q-input>
            <q-input clearable filled  v-model="rowdata.useremail" label="信箱*" />
          </div>
        </div>
        <div class="row justify-center">
          <div class="col buttonBox">
            <div>
              <div>
                <q-btn class="q-mt-xl" color="blue" text-color="white" unelevated to="/accountLoading_ex4" label="Go Back"
                  no-caps />
              </div>
            </div>
            <div>
              <!-- {{ store.getters.userdata }} -->
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { computed } from 'vue'




export default {

  setup() {

    const store = useStore()
    const rowdata = computed(() => store.state.userfiledata)

    return {
      isPwd: ref(true),
      rowdata,
      store

    }
  }
}

</script>
  
  
<style>
.buttonBox {
  position: absolute;
}
</style>