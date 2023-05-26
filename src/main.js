import { createVuetify } from 'vuetify/lib/framework.mjs'
import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import router from './router'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
})

// export default createVuetify({
//   icons: {
//     defaultSet: 'mdi',
//     aliases,
//     sets: {
//       mdi,
//     },
//   },
// })

createApp(App).use(router).use(vuetify).mount('#app')
