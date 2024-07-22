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
                  label="Email"
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
              <v-flex sm12 md3 pa-2>
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
              <v-flex sm12 md3 pa-2>
                <v-select
                  outlined
                  prepend-icon="lock"
                  v-model="form.gender"
                  :items="genderlist"
                  label="Gender"
                  :menu-props="{ top: false, offsetY: true }"
                ></v-select>
              </v-flex>
              <v-flex sm12 md3 pa-2>
                <v-text-field
                  outlined
                  v-model="form.phone_number"
                  label="Phone Number"
                  prepend-icon="lock"
                  prefix="+63"
                  maxLength="10"
                />
              </v-flex>

              <v-flex sm12 md3 pa-2>
                <v-select
                  outlined
                  prepend-icon="lock"
                  v-model="form.kindid"
                  :items="kindid"
                  label="ID Description"
                  :menu-props="{ top: false, offsetY: true }"
                ></v-select>
              </v-flex>
              <!-- <v-flex sm12 md3 pa-2>
                <v-select
                  outlined
                  prepend-icon="lock"
                  v-model="otpchoice"
                  :items="otplist"
                  label="Send OTP via"
                  :menu-props="{ top: false, offsetY: true }"
                ></v-select>
              </v-flex> -->
            </v-layout>

            <v-layout row wrap>
              

              <v-flex sm12 md3 pa-2 lg4>
                <v-text-field
                  outlined
                  v-model="form.address"
                  label="Address"
                  prepend-icon="lock"
                />
              </v-flex>

              <v-flex sm12 md3 pa-2 lg2>
                <v-select
                  outlined
                  prepend-icon="lock"
                  v-model="form.civil_status"
                  :items="civilStatus"
                  label="Civil Status"
                  :menu-props="{ top: false, offsetY: true }"
                ></v-select>
              </v-flex>

              <v-flex sm12 md3 pa-2 lg2>
                <v-select
                  outlined
                  prepend-icon="lock"
                  v-model="form.religion"
                  :items="religion"
                  label="Religion"
                  :menu-props="{ top: false, offsetY: true }"
                ></v-select>
              </v-flex>
              <v-flex lg4 class="pa-2">
                <span>Upload your 2X2 picture with white background</span>
                <croppa
                  v-model="croppa"
                  :width="croppa.width"
                  :height="croppa.height"
                  :placeholder="croppa.placeholder"
                  @file-choose="onCropped"
                >
                  <!-- <img slot="initial" :src="form.image" /> -->
                  <img slot="initial" :src="'http://20.84.109.153/' + form.image" />
                </croppa>
              </v-flex>
            </v-layout>

            <v-card-actions v-if="isregistration">
              <v-spacer/>
              <v-btn outlined depressed @click="cancel">
                Cancel
              </v-btn>
              <v-btn depressed @click="senddialog = !senddialog" class="white--text" color="#0D650E">
                Send
              </v-btn>


              <!-- <v-btn depressed @click="sendotp()" class="white--text" color="#0D650E">
                Send OTP
              </v-btn> -->

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

          <v-dialog
            v-model="senddialog"
            width="500"
            persistent
          >

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                SEND OTP VIA
              </v-card-title>

              <v-card-text>
                <v-layout row wrap>
                  <v-flex sm12 md3 pa-2 lg12 mt-4>
                    <v-select
                      outlined
                      prepend-icon="lock"
                      v-model="otpchoice"
                      :items="otplist"
                      label="Send OTP via"
                      :menu-props="{ top: false, offsetY: true }"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                
                  <v-btn outlined depressed @click="senddialog = !senddialog">
                    Cancel
                  </v-btn>
                  <v-btn depressed @click="sendotp()" class="white--text" color="#0D650E">
                    Send OTP
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="confirmed"
            width="500"
          >

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Registration Notice!
              </v-card-title>

              <v-card-text>
                Account successfully created. Please wait for 5 minutes for the admin to verify your account.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#0D650E"
                  text
                  class="white--text"
                  @click="proceeded()"
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      form: {role: 'user', status: 'pending', barangay: '', gender: '', phone_number: '', age: '0', image: ''},
      barangaylist: [],
      genderlist: ['Male', 'Female'],
      isregistration: true,
      otp: '',
      id: '',
      countdown: 600, // Countdown time in seconds (e.g., 1 hour)
      intervalId: null,
      croppa: {
        width: 200,
        height: 200,
        placeholder: 'Select an image'
      },
      kindid: ['National ID', 'Passport', 'Drivers license', 'Student ID', 'Company ID'],
      religion: ['Islam', 'Catholic', 'Iglesia Ni Cristo', 'Seventh-day Adventist'],
      civilStatus: ['Single', 'Married', 'Widowed', 'Legally Separated'],
      otplist: ['Email', 'SMS'],
      otpchoice: '',
      confirmed: false,
      senddialog: false
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
      proceeded () {
        this.goTo('/login')
      },
      async login () {
        await axios.post('http://20.84.109.153/api/register', this.form).then(data => {
          // this.goTo('/login')
          this.confirmed = true
        })
      },
      async validateotp () {
        let payload = {
          id: this.id,
          otp: this.otp
        }
        await axios.post('http://20.84.109.153/api/validate-otp-login', payload).then(data => {
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

        await axios.post('http://20.84.109.153/api/register', this.form).then(async data => {
          if (this.otpchoice === 'Email') {
            // Email api
            let param = {
              email: this.form.username,
              otp: this.form.otp
            }
            await axios.post('http://20.84.109.153/api/send-otp-email', param).then(regdata => {
              this.isregistration = false
              this.id = data.data.id
              this.getdataimage(data.data)
            })
          } else {
            // SMS api
          }
        })
      },
      cancel () {
        this.goTo('/login')
      },
      async getallbarangay () {
        await axios.get('http://20.84.109.153/api/get-all-barangay').then(data => {
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
      },
      onCropped(data) {
        this.croppedImage = data
      },
      async getdataimage (data) {
        const formData = new FormData();
        formData.append('file', this.croppedImage);
        formData.append('userid', data.id);

        await axios.post('http://20.84.109.153/api/user-reg-upload', formData)
        .then(data => {
          // this.goTo('/')
          // this.showevent = false
          // this.getallevents()
        })
        .catch(error => console.error('Error:', error));
      }
    },
    mounted (){
      this.getallbarangay()
      // this.startCountdown()
    }
  }
</script>
