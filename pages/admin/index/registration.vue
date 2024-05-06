<template>
  <v-container fluid>
    <no-ssr>
      <v-layout my-3 mx-2>
        <v-flex>
          <h2>Registration</h2>
        </v-flex>
      </v-layout>
      <v-layout mx-2>
        <v-flex>
          <v-card style="border: solid 1px #a9a9a9; border-radius: 15px" class="elevation-0 pa-3 pb-10">
            <v-layout>
              <v-flex sm12 md6 pa-2>
                <v-text-field
                  outlined
                  v-model="form.first_name"
                  label="First Name"
                  prepend-icon="person"
                />
              </v-flex>
              <v-flex sm12 md6 pa-2> 
                <v-text-field
                  outlined
                  v-model="form.last_name"
                  label="Last Name"
                  prepend-icon="person"
                />
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex sm12 md6 pa-2>
                <v-text-field
                  outlined
                  v-model="form.username"
                  label="Username"
                  prepend-icon="person"
                />
              </v-flex>
              <v-flex sm12 md6 pa-2>
                <v-text-field
                  outlined
                  v-model="form.password"
                  label="Password"
                  prepend-icon="lock"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
              </v-flex>
            </v-layout>
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
            <v-layout>
              <v-flex sm12 md4 pa-2>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.birth_date"
                      label="Birth Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.birth_date"
                    @input="menu = false"
                    no-title
                  ></v-date-picker>
                </v-menu>
                <!-- <span class="px-3"> {{ isSeniorCitizen }}</span> -->
              </v-flex>
              <v-flex sm12 md4 pa-2>
                <v-select
                  outlined
                  prepend-icon="lock"
                  v-model="form.gender"
                  :items="genderlist"
                  label="Gender"
                  :menu-props="{ top: false, offsetY: true }"
                ></v-select>
              </v-flex>
              <v-flex sm12 md4 pa-2>
                <v-text-field
                  outlined
                  v-model="form.phone_number"
                  label="Phone Number"
                  prepend-icon="lock"
                  prefix="+63"
                  maxLength="10"
                />
              </v-flex>
            </v-layout>

            <!-- <v-row>
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
            </v-row> -->
            <v-card-actions>
              <v-spacer/>
              <v-btn outlined depressed @click="cancel">
                cancel
              </v-btn>
              <v-btn depressed @click="createuser()" class="white--text" color="#0D650E">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </no-ssr>
  </v-container>
</template>
<script>
  import Vue from 'vue'
  import Global from '~/plugins/mixins/global'
  import axios from 'axios'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    mixins: [Global],
    data: () => ({
      showPassword: false,
      menu: false,
      form: {role: 'user', barangay: '', gender: ''},
      barangaylist: [],
      genderlist: ['Male', 'Female'],
    }),
    computed: {
      ...mapGetters('users', ['user']),
      isSeniorCitizen() {
        if(this.form.birth_date) {
          let birthDate = new Date(this.form.birth_date);
          let dateNow = new Date();

          let age = dateNow.getFullYear() - birthDate.getFullYear();

          let month = dateNow.getMonth() - birthDate.getMonth();

          if (month < 0 || (month === 0 && dateNow.getDate() < birthDate.getDate())) {
            age--;
          }
          if(age >= 65) {
            return 'Senior Citizen'
          } else {
            return ''
          }
        }
      },
    },
    watch: {
      'form.age': {
        handler () {
          if(this.form.age   !== undefined) {
              const result = this.form.age
                .replace(/[^0-9]/g, "")
              Vue.nextTick(() => this.form.age   = result);
          }
        },
      },
      'form.phone_number': {
        handler () {
          if(this.form.phone_number   !== undefined) {
              const result = this.form.phone_number 
                .replace(/[^0-9]/g, "");
              Vue.nextTick(() => this.form.phone_number   = result);
          }
        },
      },
    },
    methods: {
      ...mapMutations('users' , ['SET_USER']),
      async createuser () {
        await axios.post('http://192.168.100.147:5000/register', this.form).then(data => {
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
        // await axios.get('http://192.168.100.147:5000/get-all-barangay').then(data => {
        //   for (let item of data.data) {
        //     console.log(item)
        //     this.barangaylist.push(item.barangay)
        //   }
        // })
      }
    },
    mounted (){
      this.getallbarangay()
    }
  }
</script>
