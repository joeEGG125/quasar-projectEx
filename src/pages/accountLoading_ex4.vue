<template>
  <div class="q-pa-md">
    <div class="column" style="max-width: 80%">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
        <div class="col">
          <div class="row justify-center q-col-gutter-md">
            <div class="col-4">
              <q-input clearable filled v-model="name" ref="nameRef" label="用戶名*" :rules="nameRules" />
              <q-select filled v-model="place" :options="options" label="居住地區*" :rules="[val => !!val || '請選擇 居住地區']" />
              <q-input clearable filled v-model="age" label="年齡*" :rules="ageRules" />
              <q-input clearable filled v-model="phone" label="手機號碼*" :rules="phoneRules" />
            </div>
            <div class="col-4">
              <q-input clearable v-model="password" filled :type="isPwd ? 'password' : 'text'" label="密碼*"
                :rules="passwordRules">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <q-input clearable filled v-model="date" label="出生日期 年/月/日*" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input clearable filled v-model="email" label="信箱*" :rules="emailRules" />
            </div>
          </div>
          <div class="row justify-center">
            <div class="col buttonBox">
              <div>
                <q-toggle v-model="accept" label="我同意遵守條款" />
                <div>
                  <q-btn label="送出" type="submit" color="green" />
                  <q-btn label="重填" type="reset" color="blue" flat class="q-ml-sm" />
                </div>
              </div>
              <div>
                <!-- {{ store.getters.userdata }} -->
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
export default {

  setup() {

    const $q = useQuasar()
    const name = ref(null)
    const place = ref(null)
    const phone = ref(null)
    const email = ref(null)
    const date = ref(null)
    const age = ref(null)
    const password = ref(null)
    const accept = ref(false)
    const store = useStore()

    const isValid = ref(false)
    const router = useRouter()
    

    return {
      store,
      isPwd: ref(true),

      accept,

      name,
      place,
      phone,
      email,
      date,
      age,
      password,
      options: [
        '北部', '中部', '南部', '東部', '離島'
      ],

      nameRules: [
        val => {
          if (!val || val.trim().length === 0) {
            isValid.value = false;
            return '請輸入 用戶名';
          }
          else if (!/[a-zA-Z]/.test(val[0])) {
            isValid.value = false;
            return '用戶名需為英文開頭';
          }
          else if (!/[a-zA-Z]\w{5,17}$/.test(val)) {
            isValid.value = false;
            return '用戶名需為6~18英文數字組合,且英文開頭';
          }
          else {
            isValid.value = true;
          }
        }
      ],

      ageRules: [
        val => {
          if (!val || val.trim().length === 0) {
            isValid.value = false;
            return '請輸入 年齡';
          }
          else if (!(val >= 0 && val <= 120)) {
            isValid.value = false;
            return '請輸入正確年齡';
          }
          else {
            isValid.value = true;
          }
        }
      ],



      phoneRules: [
        val => {
          if (!val || val.trim().length === 0) {
            isValid.value = false;
            return '請輸入 手機號碼共10碼';
          }
          else if (!/^09\d{8}$/.test(val)) {
            isValid.value = false;
            return '手機號碼格式錯誤';
          }
          else {
            isValid.value = true;
          }
        }
      ],

      passwordRules: [
        val => {
          if (!val || val.trim().length === 0) {
            isValid.value = false;
            return '請輸入 密碼';
          }
          else if ((/\d+/.test(val) && /[a-z]+/.test(val) && /[A-Z]+/.test(val) && /[a-zA-Z0-9]{6,18}/.test(val)) == false) {
            isValid.value = false;
            return '密碼需為6~18大小寫英文數字組合';
          }
          else {
            isValid.value = true;
          }
        }
      ],

      emailRules: [
        val => {
          if (!val || val.trim().length === 0) {
            isValid.value = false;
            return '請輸入 Email';
          }
          else if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(val)) {
            isValid.value = false;
            return 'email格式錯誤';
          }
          else {
            isValid.value = true;
          }
        }
      ],




      onSubmit() {
        if (!isValid.value) {
          $q.notify({
            color: 'negative',
            message: '請確認所有欄位都輸入且格式正確'
          })
        }
        else if (accept.value !== true && isValid.value === true) {
          $q.notify({
            color: 'negative',
            message: '請同意 <條款>'
          })
        }
        else {
          $q.loading.show({
            message: '正在儲存中，請稍候...'
          })
          //將資料存入userInfo
          const userInfo = {
            username: name.value,
            userplace: place.value,
            userage: age.value,
            userphone: phone.value,
            userpassword: password.value,
            userdate: date.value,
            useremail: email.value
          }
          //dispatch 給actions的add方法
          store.dispatch('add', userInfo)
          console.log(userInfo)





          //新增settimeout 2.5s後關閉Loading畫面
          setTimeout(() => {
            $q.loading.hide()
          }, 2500)
          //新增settimeout 2.6s後顯示"成功送出" 
          setTimeout(() => {
            $q.notify({
              icon: 'done',
              color: 'positive',
              message: '成功送出'
            })
            // -----------------新增畫面跳轉到/actshowing_ex4
          }, 2600)
          setTimeout(() => {
            router.push('/actshowing_ex4')
          }, 4000)


        }
      },

      onReset() {
        name.value = null
        place.value = null
        age.value = null
        phone.value = null
        password.value = null
        date.value = null
        email.value = null
      }
    }
  }
}

</script>
  
  
<style>
.buttonBox {
  position: absolute;
}
</style>