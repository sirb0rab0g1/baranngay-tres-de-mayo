<template>
  <v-container fluid>
    <no-ssr>
      <v-layout my-3 mx-2>
        <v-flex>
          <h2>Complain</h2>
        </v-flex>
      </v-layout>

      <v-card style="border-radius: 15px" class=" pa-3">
        <v-layout wrap align-center>
          <v-flex xs12 sm10 pa-1>
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
            <v-btn block depressed color="#dfdfdf" @click="searchnow()">
              Search
            </v-btn>
          </v-flex>
        </v-layout>

        <!-- table -->
        <v-layout mt-2 pa-1>
          <v-flex lg12 md12 sm12 xs12 >
            <v-simple-table fixed-header height="470px">
              <template v-slot:default>
                <thead class="custom-thead">
                  <tr>
                    <th class="text-left">
                      Requestor Name
                    </th>
                    <th class="text-left">
                      Title
                    </th>
                    <th class="text-left">
                      Name Reported
                    </th>
                    <th class="text-left">
                      Reason
                    </th>
                    <th class="text-left">
                      Schedule Appearance
                    </th>

                    <th class="text-left">
                      User Query
                    </th>
                    <th class="text-center">
                      Action
                    </th>
                    <th class="text-center">
                      Date Approved
                    </th>
                    <th class="text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="custom-tbody">
                  <tr
                    v-for="(item, index) in requests"
                    :key="index"
                  >
                    <td>{{ item.requested_by_user ? item.requested_by_user.first_name : '' }} {{ item.requested_by_user? item.requested_by_user.last_name : '' }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.name_reported }}</td>
                    <td>{{ item.reason }}</td>
                    <td>{{ !isNull(item.schedule_hearing) ? parseDate(item.schedule_hearing) : 'Waiting' }}</td>
                    <td>{{ item.query_by_user }}</td>
                    <td class="text-center">
                      <v-btn depressed dark small color="#5fcd63" @click="getData(item)"> {{ !isNull(item.schedule_hearing) ? 'Change Schedule' : 'Set Schedule'}}</v-btn>
                    </td>
                    <td class="text-center">
                      {{ item.dateapproved}}
                    </td>
                    <td class="text-center">
                      {{ item.status}}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-flex>
        </v-layout>
      </v-card>

      <v-dialog width="300" v-model="datedialog">
        <v-card>
          <v-col
            cols="12"
            lg="12"
            sm="6"
          >
          
            <v-date-picker style="width: 100%;" v-model="picker"></v-date-picker>
            <v-btn depressed dark small color="primary" @click="selectdate(picker)">Select</v-btn>

            <v-btn depressed dark small color="primary" v-if="selectedconcern.schedule_hearing" @click="setDone()">Set Done</v-btn>
          </v-col>
        </v-card>
      </v-dialog>

      <!-- <v-btn @click="sendsms()">
          send sms
        </v-btn> -->
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
    methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
      async getallreports () {
        await axios.get('http://20.84.109.153/api/get-all-concerns-original').then(data => {
          this.requests = data.data
          console.log(this.requests)
        })
      },
      async searchnow () {
        await axios.post('http://20.84.109.153/api/search-admin-concerns', {search: this.search === null ? '' : this.search}).then(data => {
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
        delete fparam.requested_by_user
        await axios.post('http://20.84.109.153/api/update-report-user', fparam).then(data => {
          this.getallreports()
          this.datedialog = false
        })
      },
      async setDone () {
        let param = this.selectedconcern
        delete param.requested_by_user
        this.$set(param, 'status', 'Done')
        this.$set(param, 'dateapproved', moment().format('L'))
        await axios.post('http://20.84.109.153/api/update-report-user-done', param).then(data => {
          this.getallreports()
          this.datedialog = false
        })
      },
      async sendsms () {
        let param = {
          to_phone: '9667542245'
        }
        await axios.post('http://20.84.109.153/api/send-sms', param).then(data => {
          this.requests = data.data
        })
      }
    },
    mounted () {
      this.getallreports()
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