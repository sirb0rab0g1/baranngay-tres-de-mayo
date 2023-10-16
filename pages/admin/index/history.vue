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
              Create History
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
                      History
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
                    <td>{{ item.description }}</td>
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
                <v-layout row wrap>
                  <v-flex lg10 md10 sm10 xs10>
                    <h1>
                      Manage History
                    </h1>
                  </v-flex>
                  <v-flex lg2 md2 sm2 xs2>
                    <v-btn @click="hideevent()"> close</v-btn>
                  </v-flex>
                </v-layout>
                <v-row>
                  <v-col
                    cols="12"
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                  >
                    <v-textarea
                      solo
                      label="Description"
                      v-model="form.description"
                      clearable
                    ></v-textarea>
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
        await axios.post('http://localhost:5000/search-history', {id: payload.id, description: ''}).then(data => {
          this.showbarangay = true
          this.form = data.data[0]
        })
      },
      async save () {
        if (_.has(this.form, 'id')) {
          await axios.post('http://localhost:5000/update-history', {description: this.form.description, id: this.form.id}).then(data => {
            this.showbarangay = false
            this.getallhistory()
            this.form = {}
          })
        } else {
          await axios.post('http://localhost:5000/create-history', this.form).then(data => {
            this.showbarangay = false
            this.getallhistory()
            this.form = {}
          })
        }
      },
      async getallhistory () {
        await axios.get('http://localhost:5000/get-all-history').then(data => {
          this.requests = data.data
          console.log(data)
        })
      },
      async searchbarangay () {
        await axios.post('http://localhost:5000/search-history', {description: _.isNull(this.search) ? '' : this.search, id: null}).then(data => {
          this.requests = data.data
        })
      },
      isNull (param) {
        return _.isNull(param)
      },
      async deletebarangay (payload) {
        await axios.post('http://localhost:5000/delete-history', {id: payload}).then(data => {
          this.snackbar = true
          this.text = data.data.message
          this.getallhistory()
        })
      },
      hideevent () {
        this.showbarangay = false
        this.form = {}
      }
    },
    mounted () {
      this.getallhistory()
    }
  }
</script>