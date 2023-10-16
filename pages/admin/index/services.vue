<!-- NOTE: Barangay implementation move to SERVICES -->

<template>
  <v-container fluid fill-height>
    <no-ssr>
      <v-layout wrap justify-center align-center>
        <v-row>
          <v-col
            cols="10"
            lg="9"
            sm="6"
          >
            <v-text-field
              solo
              label="Search"
              v-model="search"
              clearable
            ></v-text-field>
          </v-col>
          <v-col
            cols="1"
            lg="1"
            sm="6"
          >
            <v-btn block @click="searchbarangay()">
              Search
            </v-btn>
            
          </v-col>
          <v-col
            cols="1"
            lg="2"
            sm="6"
          >
            <v-btn block @click="showbarangay = !showbarangay">
              Create Service
            </v-btn>
            
          </v-col>


          <!-- table -->
          <v-col
            cols="12"
            lg="12"
            sm="6"
          >
            <v-card>
              <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Service Name
                    </th>
                    <th class="text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in requests"
                    :key="index"
                  >
                    <td>{{ item.barangay }}</td>
                    <td class="text-right">
                      <v-btn @click="view(item)">Edit</v-btn>
                      <v-btn @click="deletebarangay(item.id)">Delete</v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>

            <v-dialog width="500" v-model="showbarangay">
              <v-card class="pa-4">


                <v-flex lg11 md12 sm12 xs12>
                  <h1>
                    Manage Event
                  </h1>
                </v-flex>
                <v-flex lg1 md12 sm12 xs12>
                  <v-btn @click="hideevent()"> close</v-btn>
                </v-flex>
                <v-row>
                  <v-col
                    cols="12"
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                  >
                    <v-text-field
                      solo
                      label="Search"
                      v-model="form.barangay"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                  >
                    <v-btn block @click="save()">Save</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-snackbar
          v-model="snackbar"
          timeout="2000"
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
      </v-layout>
    </no-ssr>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import _ from 'lodash'
  import moment from 'moment'
  import io from 'socket.io-client';

  export default {
    data: () => ({
      requests: [],
      dialog: false,
      form: {},
      search: '',
      showbarangay: false,
      showusersinbrgy: false,
      usersinbrangay: [],
      snackbar: false,
      text: ''
    }),
    computed: {
      ...mapGetters('users', ['user'])
    },
    methods: {
      async view (payload) {
        await axios.post('http://localhost:5000/search-barangay', {id: payload.id, barangay: ''}).then(data => {
          this.showbarangay = true
          console.log(data.data[0])
          this.form = data.data[0]

          console.log(this.form)
        })
      },
      async save () {
        if (_.has(this.form, 'id')) {
          await axios.post('http://localhost:5000/update-barangay', {barangay: this.form.barangay, id: this.form.id}).then(data => {
            this.showbarangay = false
            this.getallbarangay()
            this.form = {}
          })
        } else {
          await axios.post('http://localhost:5000/create-barangay', this.form).then(data => {
            this.showbarangay = false
            this.getallbarangay()
            this.form = {}
          })
        }
      },
      async getallbarangay () {
        await axios.get('http://localhost:5000/get-all-barangay').then(data => {
          this.requests = data.data
          console.log(data)
        })
      },
      async searchbarangay () {
        await axios.post('http://localhost:5000/search-barangay', {barangay: _.isNull(this.search) ? '' : this.search, id: null}).then(data => {
          this.requests = data.data
        })
      },
      isNull (param) {
        return _.isNull(param)
      },
      async showusersinbarangay (param) {
        await axios.post('http://localhost:5000/get-users-in-barangay', {barangay: param}).then(data => {
          this.showusersinbrgy = true
          this.usersinbrangay = data.data
        })
      },
      async deletebarangay (payload) {
        await axios.post('http://localhost:5000/delete-barangay', {id: payload}).then(data => {
          this.snackbar = true
          this.text = data.data.message
          this.getallbarangay()
        })
      },
      hideevent () {
        this.showbarangay = false
        this.form = {}
      }
    },
    mounted () {
      this.getallbarangay()
    }
  }
</script>