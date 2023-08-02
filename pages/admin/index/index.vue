<template>
  <v-container fluid fill-height>
    <no-ssr>
      <v-layout wrap justify-center align-center>
        <v-row>
          <!-- stats -->
          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    OVERLINE
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    Headline 5
                  </v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    OVERLINE
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    Headline 5
                  </v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            lg="4"
            sm="6"
          >
            
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    OVERLINE
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    Headline 5
                  </v-list-item-title>
                  <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>

          <!-- search -->

          <v-col
            cols="12"
            lg="10"
            sm="6"
          >
            <v-text-field
              solo
              label="Solo"
              v-model="search"
              clearable
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            lg="2"
            sm="6"
          >
            <v-btn block @click="searchnow()">
              search
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
                      Requestor Name
                    </th>
                    <th class="text-left">
                      Name Reported
                    </th>
                    <th class="text-left">
                      Reason
                    </th>
                    <th class="text-left">
                      Schedule Hearing
                    </th>
                    <th class="text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in requests"
                    :key="index"
                  >
                    <td>{{ item.requested_by_user ? item.requested_by_user.first_name : '' }} {{ item.requested_by_user? item.requested_by_user.last_name : '' }}</td>
                    <td>{{ item.name_reported }}</td>
                    <td>{{ item.reason }}</td>
                    <td>{{ !isNull(item.schedule_hearing) ? parseDate(item.schedule_hearing) : 'Waiting' }}</td>
                    <td><v-btn @click="getData(item)"> {{ !isNull(item.schedule_hearing) ? 'Change Schedule' : 'Set Schedule'}}</v-btn></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>

            
            <v-dialog width="300" v-model="datedialog">
              <v-card>
                <v-col
                  cols="12"
                  lg="12"
                  sm="6"
                >
                  <v-date-picker style="width: 100%;" v-model="picker"></v-date-picker>
                  <v-btn @click="selectdate(picker)">Select</v-btn>
                </v-col>
              </v-card>
            </v-dialog>

            <!-- <v-btn @click="sendsms()">
              send sms
            </v-btn> -->

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

  export default {
    data: () => ({
      requests: [],
      dialog: false,
      datedialog: false,
      form: {},
      search: '',
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      selectedconcern: {}
    }),
    computed: {
      ...mapGetters('users', ['user'])
    },
    methods: {
      async getallreports () {
        await axios.get('http://localhost:5000/get-all-concerns').then(data => {
          this.requests = data.data
        })
      },
      async searchnow () {
        await axios.post('http://localhost:5000/search-admin-concerns', {search: this.search}).then(data => {
          this.requests = data.data
        })
      },
      isNull (param) {
        return _.isNull(param)
      },
      parseDate (param) {
        return moment(param).format('LL')
      },
      getData (param) {
        this.datedialog = true
        this.selectedconcern = param
        console.log(param)
      },
      async selectdate (param) {
        let fparam = this.selectedconcern
        this.$set(fparam, 'schedule_hearing', param)

        this.$set(fparam, 'modify_by_user', this.user.id)
        this.$set(fparam, 'description', 'is being approved by the administrator')
        this.$set(fparam, 'status', 'false')
        await axios.post('http://localhost:5000/update-report-user', fparam).then(data => {
          this.getallreports()
          this.datedialog = false
        })
      },
      async sendsms () {
        let param = {
          to_phone: '9667542245'
        }
        await axios.post('http://localhost:5000/send-sms', param).then(data => {
          this.requests = data.data
        })
      }
    },
    mounted () {
      this.getallreports()
    }
  }
</script>