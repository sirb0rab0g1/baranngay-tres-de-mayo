<template>
<v-container fluid fill-height>
    <v-app-bar
      app
      style="background-color: #0d650e; color: white;"
      flat
      dark
    >

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="(item, index) in links"
          :key="index"
          @click="scrollToTarget(item.goto)"
        >
          {{ item.txt }}
        </v-tab>
      </v-tabs>
      <v-btn color="#f1fff8" light outlined depressed @click="goTo('/login')">
        <span style="font-weight: bold">Login</span>
      </v-btn>
    </v-app-bar>

    <!-- contact us-->

    <v-flex lg12 id="contactus">
      <v-parallax :src="require('@/static/images/1.jpg')"  style="margin-top: 2%; height: 40vh;">
      
      <v-row style="margin-top: 5%;">
        <v-col 
          class="text-center"
          cols="6"
        >
            <v-text-field
            solo
            label="Name"
            v-model="form.name"
            clearable
          ></v-text-field>
          <v-text-field
            solo
            label="Contact Number"
            v-model="form.mobilenumber"
            clearable
          ></v-text-field>
          <v-text-field
            solo
            label="Email"
            v-model="form.email"
            clearable
          ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-textarea
              auto-grow
              v-model="form.message"
              label="Message"
              rows="3"
              row-height="40"
              solo
            ></v-textarea>
            <v-btn block large @click="sendcontact()"> SEND</v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      timeout="3000"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</v-container>
</template>

<script>
import Global from '~/plugins/mixins/global'
import moment from 'moment'
import axios from 'axios'

export default {
    data: () => ({
      links: [
        {goto: 'home', txt: 'Home'},
        {goto: 'services', txt: 'Services'},
        {goto: 'about', txt: 'About'},
        {goto: 'officials', txt: 'Officials'},
        {goto: 'contactus', txt: 'Contact Us'},
      ],
      length: 2,
      window: 0,
      carouselitems: [
        {
          src: require('@/static/images/1.jpg'),
        },
        {
          src: require('@/static/images/2.jpg'),
        },
        {
          src: require('@/static/images/3.jpg'),
        },
        {
          src: require('@/static/images/4.jpg'),
        },
      ],
      form: {},
      snackbar: false,
      text: '',
      services: [],
      announcements: {},
      events: {}
    }),
    mixins: [Global],
    methods: {
      scrollToTarget(param) {
        console.log(param)
        if (param != 'contactus') {
          this.goTo('/')
        }
      },
      async sendcontact () {
        await axios.post('http://localhost:5000/create-contact-us', this.form).then(data => {
          this.text = data.data ? data.data.data : '' 
          this.snackbar = true
          this.form = {}
          this.goTo('/')
        })
      }
    }
}
</script>