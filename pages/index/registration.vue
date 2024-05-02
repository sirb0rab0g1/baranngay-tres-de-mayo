<template>
  <v-container fluid fill-height>
    <no-ssr>
    <v-layout wrap justify-center align-center>
      <v-flex xs12 sm8 md5 lg6>
        <v-card class="elevation-12 px-2 pt-10 pb-10">
          <v-layout row wrap px-2 v-if="isregistration">
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
            <v-flex lg6>
            <v-text-field
              outlined
              v-model="form.age"
              label="age"
              prepend-icon="lock"
              class="px-2"
              type="text"/>
            </v-flex>
            <v-flex lg6>
            <v-combobox
              outlined
              prepend-icon="lock"
              v-model="form.gender"
              :items="genderlist"
              label="Gender"
              class="px-2"
            ></v-combobox>
            </v-flex>
            <v-flex lg6>
            <v-text-field
              outlined
              v-model="form.phone_number"
              label="phone_number"
              prepend-icon="lock"
              class="px-2"
              type="text"/>
            </v-flex>
          </v-layout>

          <v-row v-if="isregistration">
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

              <v-btn block depressed @click="form.phone_number !== '' ? sendotp() : login()" class="white--text" color="#fbb730">
                {{ form.phone_number !== '' ? 'Send OTP' : 'Register' }}
              </v-btn>
            </v-col>
          </v-row>

          <v-layout wrap justify-center align-center>
          <v-flex xs12 sm8 md5 lg8 v-if="!isregistration">
            <v-otp-input
              length="6"
              v-model="otp"
            ></v-otp-input>
          </v-flex>

          <v-flex xs12 sm8 md5 lg8 v-if="!isregistration">
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
  import Global from '~/plugins/mixins/global'
  import axios from 'axios'

  export default {
    mixins: [Global],
    data: () => ({
      form: {role: 'user', status: 'pending', barangay: '', gender: '', phone_number: ''},
      barangaylist: [],
      genderlist: ['male', 'female'],
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
      }
    },
    methods: {
      async login () {
        await axios.post('http://localhost:5000/register', this.form).then(data => {
          this.goTo('/login')
        })
      },
      async validateotp () {
        let payload = {
          id: this.id,
          otp: this.otp
        }
        await axios.post('http://localhost:5000/validate-otp-login', payload).then(data => {
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

        await axios.post('http://localhost:5000/register', this.form).then(data => {
          this.isregistration = false
          this.id = data.data.id
        })
      },
      cancel () {
        this.goTo('/login')
      },
      async getallbarangay () {
        await axios.get('http://localhost:5000/get-all-barangay').then(data => {
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
