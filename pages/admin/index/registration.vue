<template>
  <v-container fluid fill-height>
    <no-ssr>
    <v-layout wrap justify-center align-center>
      <v-flex xs12 sm12 md12 lg12>
        <v-card class="elevation-12 px-2 pt-10 pb-10">
          <v-row>
          <v-flex lg6>
            <v-text-field
            outlined
            v-model="form.first_name"
            label="first name"
            prepend-icon="person"
            class="px-2"/>
          </v-flex>
          <v-flex lg6> 
            <v-text-field
            outlined
            v-model="form.last_name"
            label="last name"
            prepend-icon="person"
            class="px-2"/>
          </v-flex>
          <v-flex lg6>
            <v-text-field
            outlined
            v-model="form.username"
            label="username"
            prepend-icon="person"
            class="px-2"/>
          </v-flex>
          <v-flex lg6>
            <v-text-field
            outlined
            v-model="form.password"
            label="Password"
            prepend-icon="lock"
            class="px-2"
            type="password"/>
          </v-flex>
          <!-- <v-flex lg3>
            <v-combobox
            outlined
            prepend-icon="lock"
            v-model="form.barangay"
            :items="barangaylist"
            label="Barangay"
            class="px-2"
          ></v-combobox>
          </v-flex> -->
          <v-flex lg4>
            <v-text-field
            outlined
            v-model="form.age"
            label="age"
            prepend-icon="lock"
            class="px-2"
            type="text"/>
          </v-flex>
          <v-flex lg4>
            <v-combobox
            outlined
            prepend-icon="lock"
            v-model="form.gender"
            :items="genderlist"
            label="Gender"
            class="px-2"
          ></v-combobox>
          </v-flex>
          <v-flex lg4>
            <v-text-field
            outlined
            v-model="form.phone_number"
            label="phone_number"
            prepend-icon="lock"
            class="px-2"
            type="text"/>
          </v-flex>
          </v-row>

          <v-row>
            <v-col
              cols="6"
              lg="6"
              sm="6"
            >
              <v-btn block depressed @click="cancel">
                cancel
              </v-btn>
            </v-col>
            <v-col
              cols="6"
              lg="6"
              sm="6"
            >

              <v-btn block depressed @click="createuser()" class="white--text" color="#fbb730">
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
    </no-ssr>
  </v-container>
</template>
<script>
  import Global from '~/plugins/mixins/global'
  import axios from 'axios'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    mixins: [Global],
    data: () => ({
      form: {role: 'user', barangay: '', gender: ''},
      barangaylist: [],
      genderlist: ['male', 'female'],
    }),
    computed: {
      ...mapGetters('users', ['user'])
    },
    methods: {
      ...mapMutations('users' , ['SET_USER']),
      async createuser () {
        await axios.post('http://localhost:5000/register', this.form).then(data => {
          // this.SET_USER(this.form)
          this.goTo('/admin')
        })
      },
      cancel () {
        // this.goTo('/user')
      },
      setForm () {
        // this.form = Object.assign({}, this.form, this.user)
      },
      async getallbarangay () {
        // await axios.get('http://localhost:5000/get-all-barangay').then(data => {
        //   for (let item of data.data) {
        //     console.log(item)
        //     this.barangaylist.push(item.barangay)
        //   }
        // })
      }
    },
    mounted (){
      this.getallbarangay()
      this.setForm()
    }
  }
</script>
