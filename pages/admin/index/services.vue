<!-- NOTE: Barangay implementation move to SERVICES -->

<template>
  <v-container fluid >
    <no-ssr>
      <v-layout my-3 mx-2>
        <v-flex>
          <h2>Services</h2>
        </v-flex>
      </v-layout>

      <v-card style="border-radius: 15px" class=" pa-3">
        <v-layout wrap align-center>
          <v-flex xs12 sm8 pa-1>
            <v-text-field
              outlined
              label="Search"
              v-model="search"
              clearable
              dense
              hide-details
              prepend-inner-icon="search"
            ></v-text-field>
          </v-flex>
          <v-flex pa-1>
            <v-btn block depressed color="#dfdfdf" @click="searchbarangay()">
              Search
            </v-btn>
          </v-flex>
          <v-flex pa-1>
            <v-btn block depressed dark color="#0D650E" @click="showbarangay = !showbarangay">
              Create Service
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout mt-2 pa-1 >
          <v-flex lg12 md12 sm12 xs12>
            <v-simple-table fixed-header height="470px">
              <template v-slot:default>
                <thead class="custom-thead">
                  <tr>
                    <th class="text-left">
                      Service Name
                    </th>
                    <th class="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="custom-tbody">
                  <tr
                    v-for="(item, index) in requests"
                    :key="index"
                  >
                    <td>{{ item.barangay }}</td>
                    <td class="text-center">
                      <v-btn depressed dark small  color="#ffa621" @click="view(item)">Edit</v-btn>
                      <v-btn depressed dark small  color="#d9544b" @click="areyousuredeleteevent(item)">Delete</v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-flex>
        </v-layout>
      </v-card>

      <v-dialog width="500" persistent v-model="showbarangay">
        <v-card>
          <v-card-title style="background: #1976D2; color: white">
            <span>Manage Service</span>
            <v-spacer/>
            <v-btn
              icon
              dark
              @click="hideevent()"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            
          </v-card-title>
          <v-card-text class="pt-4">
            <v-layout row wrap>
              <v-flex class="pa-2">
                <v-text-field
                  outlined
                  label="Service"
                  v-model="form.barangay"
                  clearable
                  dense
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4">
            <v-spacer/>
            <v-btn depressed dark color="#1976D2" @click="save()">Save</v-btn>
          </v-card-actions>
          
        </v-card>
      </v-dialog>

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

      <v-dialog
        v-model="deletedialog"
        persistent
        max-width="400"
      >
        <v-card class="pa-2">
          <v-card-title class="text-h5">
            Are you sure you want to delete service name " {{ choosen.barangay | capitalizeFirst }} "?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="gray darken-1"
              text
              @click="deletedialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="deletebarangay(choosen.id)"
            >
              Proceed
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      text: '',
      deletedialog: false,
      choice: null,
      choosen: {}
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
      areyousuredeleteevent(payload) {
        this.deletedialog = true
        this.choosen = payload
        // this.deleteevent(payload)
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
          this.deletedialog = false
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
<style scoped>
.custom-thead th {
  background-color: #DEF4DE !important;
}

.custom-tbody {
  overflow-y: auto;
}
</style>