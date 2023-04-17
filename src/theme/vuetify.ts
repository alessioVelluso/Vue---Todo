import 'vuetify/styles'
import { createVuetify, VuetifyOptions } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import themes from './themes'

console.log(createVuetify())
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: themes,
    },
    components,
    directives,
    display: {
        thresholds: {
            xs: 380,
            sm: 500,
            md: 850,
            lg: 1015,
            xl: 1920,
            xxl: 2560,
        }
    }
})


export default vuetify