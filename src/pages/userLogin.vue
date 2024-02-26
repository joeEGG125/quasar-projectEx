<template>
    <div style="background-color: rgb(224, 254, 255); height: 645px;">
        <div class="column" style="height: 80px;">

        </div>

        <div class="row" style="height: 400px; height: 500px;">
            <div class="col" style="width: 25%;"></div>
            <div class="col">
                <fieldset style="border-radius: 10px; border: 5px solid #003371; background-color: #fff;">
                    <legend style="font-size: 30px; background: #1F497D; color:
                     #fff; border-radius: 5px; margin-left: 32%; padding: 5px 10px ;">使用者登入</legend>
                    <div style="height: 130px;">

                    </div>
                    <div class="row" style="margin: 0 10% 0 20%;">
                        <p style="padding-top: 7px; font-size: 18px;">帳號：</p>
                        <q-input outlined :dense="dense" v-model="userid" />
                    </div>
                    <div class="row" style="margin: 0 10% 0 20%;">
                        <p style="padding-top: 7px; font-size: 18px;">密碼：</p>
                        <q-input outlined :dense="dense" v-model="userpassword" />
                    </div>
                    <div style="margin: 7% 10% 0 43%;">
                        <q-btn color="primary" type="submit" label="登入" @click="login" />
                    </div>
                </fieldset>
            </div>
            <div class="col" style="width: 25%;"></div>
        </div>

    </div>
</template>
    
<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

// const router = useRouter()




export default {

    setup() {
        const userid = ref(null)
        const userpassword = ref(null)
        const $q = useQuasar()
        const router = useRouter()


        return {
            dense: ref(true),
            userid,
            userpassword,

            login() {

                console.log("submited ok!!")
                const userdata = {
                    USER_ID: userid.value,
                    PASSWORD: userpassword.value
                };
                console.log(userdata)
                axios.post(process.env.env_API + "/VueTest/Login", userdata)
                    .then(response => {
                        // 請求成功時
                        console.log('API回應', response.data);
                        if (response.data.Status == "Y") {
                            $q.notify({
                                message: response.data.Message,
                                color: 'green',
                                timeout: 1000,
                            })
                            // 2s後跳轉頁面
                            setTimeout(() => {
                                router.push('/userProduction')
                            }, 2000)
                        }
                        else {

                            setTimeout(() => $q.notify({
                                message: response.data.Message,
                                color: 'red',
                                timeout: 1000,
                            }), 200)                            
                        }
                    })
                    .catch(error => {
                        // 請求失敗時的錯誤回報
                        console.error('Error:', error);
                        $q.notify({
                            message: error.message,
                            color: 'red',
                            timeout: 1000,
                        })
                    });
            }
        }
    }
}
</script>
    
    
<style></style>