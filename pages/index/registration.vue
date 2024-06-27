<template>
  <v-container fluid fill-height>
    <no-ssr>

    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md5 lg6>
        <v-layout my-3 mx-2>
          <v-flex>
            <h2 style="color: #0D650E">Registration</h2>
          </v-flex>
        </v-layout>
        <v-card style="border: solid 1px #a9a9a9; border-radius: 15px" class="elevation-0 pa-3 pb-5">
          <div v-if="isregistration">
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
            <!-- <v-flex lg6>
            <v-text-field
              outlined
              v-model="form.age"
              label="age"
              prepend-icon="lock"
              class="px-2"
              type="text"/>
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
                <span class="px-3"> {{ isSeniorCitizen }}</span>
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

            <v-card-actions v-if="isregistration">
              <v-spacer/>
              <v-btn outlined depressed @click="cancel">
                cancel
              </v-btn>

              <v-btn depressed @click="sendotp()" class="white--text" color="#0D650E">
                Send OTP
              </v-btn>

            </v-card-actions>
          </div>

          <v-layout v-if="!isregistration" wrap justify-center align-center>
            <v-flex xs12 sm8 md5 lg8>
              <v-otp-input
                length="6"
                v-model="otp"
              ></v-otp-input>
            </v-flex>

            <v-flex xs12 sm8 md5 lg8>
              <v-btn block depressed class="white--text" color="#fbb730" @click="validateotp()">
                  {{ formatTime }} | Verify
              </v-btn>
            </v-flex>
          </v-layout>
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

  export default {
    mixins: [Global],
    data: () => ({
      showPassword: false,
      menu: false,
      form: {role: 'user', status: 'pending', barangay: '', gender: '', phone_number: '', age: '0'},
      barangaylist: [],
      genderlist: ['Male', 'Female'],
      isregistration: true,
      otp: '',
      id: '',
      countdown: 600, // Countdown time in seconds (e.g., 1 hour)
      intervalId: null
    }),
    computed: {
      formatTime() {
        const minutes = Math.floor(this.countdown / 60);
        const seconds = this.countdown % 60;
        return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
      },
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
              const result = this.form.age.replace(/[^0-9]/g, "")
              Vue.nextTick(() => this.form.age   = result);
          }
        },
      },
      'form.phone_number': {
        handler () {
          if(this.form.phone_number !== undefined) {
              const result = this.form.phone_number 
                .replace(/[^0-9]/g, "");
              Vue.nextTick(() => this.form.phone_number   = result);
          }
        },
      },
    },
    methods: {
      async login () {
        await axios.post('http://localhost:5000/api/register', this.form).then(data => {
          this.goTo('/login')
        })
      },
      async validateotp () {
        let payload = {
          id: this.id,
          otp: this.otp
        }
        await axios.post('http://localhost:5000/api/validate-otp-login', payload).then(data => {
          if (data.data.data === "Validated") {
            this.goTo('/')
          } else {
            alert(data.data.error)
          }
        })
      },
      async sendotp () {
        this.startCountdown()
        let randomString = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
          randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        this.$set(this.form, 'otp', randomString)
        // this.$set(this.form, 'age', this.form.birth_date)
        console.log(this.form)

        await axios.post('http://localhost:5000/api/register', this.form).then(data => {
          this.isregistration = false
          this.id = data.data.id
        })
      },
      cancel () {
        this.goTo('/login')
      },
      async getallbarangay () {
        await axios.get('http://localhost:5000/api/get-all-barangay').then(data => {
          for (let item of data.data) {
            console.log(item)
            this.barangaylist.push(item.barangay)
          }
        })
      },
      startCountdown() {
        this.intervalId = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(this.intervalId);
            // Optional: Perform any action when countdown completes
            console.log('Countdown complete!');
          }
        }, 1000); // Update every second
      },
      padZero(num) {
        return num < 10 ? '0' + num : num;
      }
    },
    mounted (){
      this.getallbarangay()
      // this.startCountdown()
    }
  }
</script>
