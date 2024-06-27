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
              search
            </v-btn>
            
          </v-col>
          <v-col
            cols="1"
            lg="2"
            sm="6"
          >
            <v-btn block @click="showbarangay = !showbarangay">
              create barangay
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
                      Purok
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
                    <td class="text-right"><v-btn @click="showusersinbarangay(item.barangay)">show users</v-btn></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>

            <v-dialog width="500" v-model="showbarangay">
              <v-card class="pa-4">
                <v-row>
                  <h1>
                    Insert new barangay
                  </h1>
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

            <v-dialog width="380" v-model="showusersinbrgy">
              <v-card class="pa-4">
                <v-row>
                  <h1>Users</h1>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Firstname
                          </th>
                          <th class="text-right">
                            Lastname
                          </th>
                          <th class="text-right">
                            Gender
                          </th>
                          <th class="text-right">
                            Phone Number
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in usersinbrangay"
                          :key="index"
                        >
                          <td>{{ item.first_name }}</td>
                          <td>{{ item.last_name }}</td>
                          <td>{{ item.gender }}</td>
                          <td>{{ item.phone_number }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-col
                    cols="12"
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                  >
                    <v-btn block @click="showusersinbrgy = !showusersinbrgy">Close</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
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
      usersinbrangay: []
    }),
    computed: {
      ...mapGetters('users', ['user'])
    },
    methods: {
      async save () {
        await axios.post('http://localhost:5000/api/create-barangay', this.form).then(data => {
          console.log(data)
        })
      },
      async getallbarangay () {
        await axios.get('http://localhost:5000/api/get-all-barangay').then(data => {
          this.requests = data.data
          console.log(data)
        })
      },
      async searchbarangay () {
        await axios.post('http://localhost:5000/api/search-barangay', {barangay: _.isNull(this.search) ? '' : this.search}).then(data => {
          this.requests = data.data
        })
      },
      isNull (param) {
        return _.isNull(param)
      },
      async showusersinbarangay (param) {
        await axios.post('http://localhost:5000/api/get-users-in-barangay', {barangay: param}).then(data => {
          this.showusersinbrgy = true
          this.usersinbrangay = data.data
        })
      }
    },
    mounted () {
      this.getallbarangay()
    }
  }
</script>