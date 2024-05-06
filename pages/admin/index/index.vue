<template>
  <v-container fluid>
    <no-ssr>
      <v-layout ma-2 wrap row>
        <v-flex md4 pa-1>
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Total Announcements
                </div>
                <v-list-item-title class="text-h3 mb-1">
                  {{ totalusercount }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="80">
                <v-icon color="#0D650E" style="font-size: 80px; margin-top: 10px;">mdi-bullhorn-variant-outline</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-flex>

        <v-flex md4 pa-1>
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Total Events
                </div>
                <v-list-item-title class="text-h3 mb-1">
                  {{ totalconcernscount }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="80">
                <v-icon color="#0D650E" style="font-size: 80px; margin-top: 10px;">mdi-calendar-multiple-check</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-flex>
        
        <v-flex md4 pa-1>
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Total Services
                </div>
                <v-list-item-title class="text-h3 mb-1">
                  {{ totalbarangayscount }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="80">
                <v-icon color="#0D650E" style="font-size: 80px; margin-top: 10px;">mdi-face-agent</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout ma-2>
        <v-flex pa-1>
          <v-card class="pa-2">
            <v-layout align-center="">
              <v-flex pa-1 xs12 sm10>
                <v-text-field
                  label="Search"
                  v-model="search"
                  clearable
                  hide-details
                  single-line
                  dense
                  outlined
                  prepend-inner-icon="search"
                ></v-text-field>
              </v-flex>
              <v-flex pa-1>
                <v-btn  block depressed color="#dfdfdf" @click="searchnow()">
                  Search
                </v-btn>
              </v-flex>
            </v-layout>
            <v-simple-table class="mt-2 pa-1" fixed-header height="350px">
              <template v-slot:default>
                <thead class="custom-thead">
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Mobile Number
                    </th>
                    <th class="text-left">
                      Email
                    </th>
                    <th class="text-left">
                      Message
                    </th>
                    <th class="text-left">
                      Time Sent
                    </th>
                  </tr>
                </thead>
                <tbody class="custom-tbody">
                  <tr
                    v-for="(item, index) in requests"
                    :key="index"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.mobilenumber }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.message }}</td>
                    <td>{{ item.date }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-flex>
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
      datedialog: false,
      form: {},
      search: '',
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      selectedconcern: {},
      socket: null, // Initialize socket to null,
      totalusercount: 0,
      totalconcernscount: 0,
      totalbarangayscount: 0
    }),
    computed: {
      ...mapGetters('users', ['user'])
    },
    methods: {
      async getallreports () {
        await axios.get('http://192.168.100.147:5000/get-all-concerns').then(data => {
          this.requests = data.data
          console.log('data.data', data.data)
          this.getalluserscount()
        })
      },
      async getallconcernscount () {
        await axios.get('http://192.168.100.147:5000/get-all-concerns-count').then(data => {
          this.totalconcernscount = data.data.data[0]
          this.getallbarangayscount()
        })
      },
      async getallbarangayscount () {
        await axios.get('http://192.168.100.147:5000/get-all-barangays-count').then(data => {
          this.totalbarangayscount = data.data.data[0]
        })
      },
      async getalluserscount () {
        await axios.get('http://192.168.100.147:5000/get-all-users-count').then(data => {
          this.totalusercount = data.data.data[0]
          this.getallconcernscount()
        })
      },
      async searchnow () {
        await axios.post('http://192.168.100.147:5000/search-admin-concerns', {search: _.isNull(this.search) ? '' : this.search }).then(data => {
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
      sendMessage(channel) {
        if (this.socket) {
          this.socket.send({ channel, message: 'Update calendar' });
        }
      },
      async selectdate (param, channel) {
        let fparam = this.selectedconcern
        this.$set(fparam, 'schedule_hearing', param)

        this.$set(fparam, 'modify_by_user', this.user.id)
        this.$set(fparam, 'description', 'is being approved by the administrator and scheduled on ')
        this.$set(fparam, 'status', 'false')
        this.$set(fparam, 'is_read', 'false')
        await axios.post('http://192.168.100.147:5000/update-report-user', fparam).then(data => {
          this.getallreports()
          this.datedialog = false

          if (this.socket) {
            this.socket.send({ channel, message: 'Update calendar' });
          }
        })
      },
      async sendsms () {
        let param = {
          to_phone: '9667542245'
        }
        await axios.post('http://192.168.100.147:5000/send-sms', param).then(data => {
          this.requests = data.data
        })
      }
    },
    mounted () {
      this.getallreports()

      const socket = io('http://192.168.100.147:5000');

      socket.on('connect', () => {
        console.log('Connected')
      });

      this.socket = socket;
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