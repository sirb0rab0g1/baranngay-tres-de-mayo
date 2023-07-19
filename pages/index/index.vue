<template>
  <v-container fluid fill-height>
    <no-ssr>
    <v-layout wrap justify-center align-center>
      <v-flex xs12 sm8 md5 lg3>
        <v-card class="elevation-12 px-2 pt-10">
          <v-text-field
            outlined
            v-model="form.first_name"
            label="first name"
            prepend-icon="person"
            class="px-2"/>
            <v-text-field
            outlined
            v-model="form.last_name"
            label="last name"
            prepend-icon="person"
            class="px-2"/>
          <v-text-field
            outlined
            v-model="form.username"
            label="username"
            prepend-icon="person"
            class="px-2"/>
          <v-text-field
            outlined
            v-model="form.password"
            label="Password"
            prepend-icon="lock"
            class="px-2"
            type="password"/>

          <v-btn block depressed @click="login" class="white--text" color="#fbb730">
            register
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    </no-ssr>
  </v-container>
</template>
<script>
  import Global from '~/plugins/mixins/global'
  import axios from 'axios'
  export default {
    mixins: [Global],
    data: () => ({
      form: {}
    }),
    methods: {
      login () {
        axios.post('http://localhost:5000/register', this.form).then(data => {
          console.log(data)
        })
      }
    }
  }
</script>
