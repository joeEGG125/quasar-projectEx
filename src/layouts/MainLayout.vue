<!-- 首頁畫面 -->
<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar Practice
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>


    <!-- 左邊功能表外框   show-if-above加入後會預設打開   -->
    <q-drawer style="background-color: rgb(203, 247, 203);" v-model="leftDrawerOpen" elevated overlay bordered>
      <q-list>
        <q-item-label header>
          各連結
        </q-item-label>
        <!-- 內容內縮程度 -->
        <q-expansion-item expand-seperator icon="warning" :content-inset-level="0.4" label="Quasar 例題" header-class="bg-teal text-white"
          expand-icon-class="text-white">
          <!-- 呼叫元件列出每個項目 -->
          <EssentialLink v-for="link in essentialLinks" :key="link.link" v-bind="link">
          </EssentialLink>
          <!-- </q-expansion-item> -->
        </q-expansion-item>

        <!-- 新的 透過json實現父子關係列表 -->
        <q-expansion-item expand-seperator
          v-for="linkN in linksListN" 
          :key="linkN.title"
          :label="linkN.label"
          :icon="linkN.icon"
          :content="linkN.content"
          :content-inset-level="0.4"
          header-class="bg-teal text-white"
          expand-icon-class="text-white">
          <template v-for="linkNch in linkN.children" :key="linkNch.title">
            <q-item clickable tag="router-link" :to="linkNch.link">
              <q-item-section v-if="linkNch.icon" avatar>
                <q-icon :name="linkNch.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ linkNch.title }}</q-item-label>
                <q-item-label caption>{{ linkNch.caption }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import axios from 'axios'
import { reactive } from 'vue'

// const linksList = [
//   {
//     title: 'HomePage',
//     caption: 'HomePage',
//     icon: 'house',
//     link: '/'
//   },
//   {
//     title: 'Quasar Account Example',
//     caption: 'Account 例題',
//     icon: 'manage_accounts',
//     link: '/account_ex1'
//   },
//   {
//     title: 'Quasar Product Example',
//     caption: 'Product 例題',
//     icon: 'shopping_cart',
//     link: '/product_ex2'
//   },
//   {
//     title: 'Quasar Json Example',
//     caption: '透過Axios讀取json 例題',
//     icon: 'segment',
//     link: '/table_ex3'
//   },
//   {
//     title: 'Quasar AccountLoading Example',
//     caption: '送出資料後Loading',
//     icon: 'manage_accounts',
//     link: '/accountLoading_ex4'
//   }
// ]

const linksList = reactive([])
const linksListN = reactive([])
//舊版無children
axios.get('../static/pagelink.json')
  .then(response => {
    linksList.splice(0, linksList.length, ...response.data)
    console.log("get link data ok!!!")
    console.log(linksList)
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
  //新的 有父子關係
  axios.get('../static/pagelinkN.json')
  .then(response => {
    linksListN.splice(0, linksListN.length, ...response.data)
    console.log("get linkChildren data ok!!!")
    console.log(linksListN)
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      linksListN,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
