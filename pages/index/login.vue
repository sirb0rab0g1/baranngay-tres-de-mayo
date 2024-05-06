<template>
  <v-container fluid fill-height>
    <no-ssr>
    <v-layout wrap justify-center align-center>
      <v-flex xs12 sm8 md5 lg3>
        <v-card class="elevation-12 px-2 pt-10 pb-2">
          <v-text-field
            outlined
            v-model="form.username"
            label="Username"
            prepend-icon="person"
            class="px-2"/>
          <v-text-field
            outlined
            v-model="form.password"
            label="Password"
            prepend-icon="lock"
            class="px-2"
            type="password"/>

          <v-btn block depressed @click="login()" class="white--text" color="#fbb730">
            LOGIN
          </v-btn>
          
          <v-card-actions>
            <span class="forgot-text pointer" @click="register('/registration')">
              Register
            </span>
          </v-card-actions>
        </v-card>

        <v-snackbar
          v-model="snackbar"
          timeout="2000"
        >
          {{ snackerror }}

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
      </v-flex>
    </v-layout>
    </no-ssr>
  </v-container>
</template>
<script>
  import Global from '~/plugins/mixins/global'
  import axios from 'axios'
  import { mapMutations } from 'vuex'

  export default {
    mixins: [Global],
    data: () => ({
      form: {},
      snackbar: false,
      snackerror: ''
    }),
    methods: {
      ...mapMutations('users' , ['SET_USER']),
      register (payload) {
        this.goTo(payload)
      },
      async login () {
        await axios.post('http://192.168.100.147:5000/login', this.form).then(data => {
          let ldata = data.data.data[0]
          console.log(ldata)
          if(ldata.role == 'user') {
            this.SET_USER(ldata)
            this.goTo('/user/complain')
          }else if(ldata.role == 'admin') {
            this.SET_USER(ldata)
            this.goTo('/admin')
          }
        }).catch(data => {
          console.log(data)
          this.snackbar = true
          this.snackerror = data.response ? data.response.data ? data.response.data.error: '' : ''
        })
      }
    }
  }
</script>
