<template>
  <v-container fluid>
    <no-ssr>
      <v-layout my-3 mx-2>
        <v-flex>
          <h2>Events</h2>
        </v-flex>
      </v-layout>

      <v-card style="border-radius: 15px" class=" pa-3">
        <v-layout wrap align-center>
          <v-flex xs12 sm8 pa-1>
            <v-text-field
              outlined
              label="Search Event"
              v-model="search"
              clearable
              dense
              hide-details
              prepend-inner-icon="search"
            ></v-text-field>
          </v-flex>
          <v-flex pa-1>
            <v-btn block depressed color="#dfdfdf" @click="searchevent()">
              Search
            </v-btn>
          </v-flex>
          <v-flex pa-1>
            <v-btn block depressed dark color="#0D650E" @click="showeventdialog()">
              Create Event
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout mt-2 pa-1>
          <v-flex lg12 md12 sm12 xs12>
            <v-simple-table fixed-header height="470px">
              <template v-slot:default>
                <thead class="custom-thead">
                  <tr>
                    <th class="text-left">
                      Event Name
                    </th>
                    <th class="text-left">
                      Date
                    </th>
                    <th class="text-left">
                      Summary
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
                    <td>{{ item.title }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.summary }}</td>
                    <td class="text-center">
                      <v-btn depressed dark small color="#ffa621" @click="view(item)">
                        View
                      </v-btn>
                      <v-btn depressed dark small color="#d9544b" @click="areyousuredeleteevent(item)">
                        Delete
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-flex>
        </v-layout>
      </v-card>

      <!-- add event modal -->
      <v-dialog width="900" persistent v-model="showevent">
        <v-card>
          <v-card-title style="background: #1976D2; color: white">
            <span>Manage Event</span>
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
              <v-flex lg6 class="pa-2">
                <v-text-field
                  outlined
                  label="Title"
                  v-model="form.title"
                  clearable
                  dense
                  :error-messages="this.errors ? this.errors.title : ''"
                ></v-text-field>
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
                      v-model="form.date"
                      label="Date"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.date"
                    @input="menu = false"
                    no-title
                  ></v-date-picker>
                </v-menu>
                <v-textarea
                  outlined
                  label="Summary"
                  v-model="form.summary"
                  clearable
                  dense
                ></v-textarea>
              </v-flex>
              <v-flex lg6 class="pa-2">
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
  
              <v-flex lg12>
                
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4">
            <v-spacer/>
            <v-btn depressed dark color="#1976D2" @click="createevent()">Save</v-btn>
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

        <!-- logout dialog -->
        <v-dialog
          v-model="deletedialog"
          persistent
          max-width="400"
        >
          <v-card class="pa-2">
            <v-card-title class="text-h5">
              Are you sure you want to delete event name " {{ choosen.title | capitalizeFirst }} "?
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
                @click="deleteevent(choosen)"
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
      search: '',
      showevent: false,
      errors: [],
      form: {},
      menu: false,
      croppa: {
        width: 400,
        height: 400,
        placeholder: 'Select an image'
      },
      croppedImage: null,
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
      showeventdialog () {
        this.$set(this.form, 'image', '')
        this.showevent = true
      },
      async view (payload) {
        await axios.post('http://20.84.109.153/api/search-event', {id: payload.id, title: ''}).then(data => {
          this.showevent = true
          console.log(data.data[0])
          this.form = data.data[0]

          console.log(this.form)
        })
      },
      onCropped(data) {
        this.croppedImage = data
      },
      async searchevent () {
        await axios.post('http://20.84.109.153/api/search-event', {title: _.isNull(this.search) ? '' : this.search, id: null}).then(data => {
          this.requests = data.data
        })
      },
      async createevent () {
        if (_.has(this.form, 'id')) {
          this.deleteevent(this.form)
        } else {
          this.$set(this.form, 'image', '')
        }
        await axios.post('http://20.84.109.153/api/create-event', this.form).then(data => {
          this.getdataimage(data.data)
        })
      },
      async getallevents () {
        await axios.get('http://20.84.109.153/api/get-all-events').then(data => {
          this.requests = data.data
        })
      },
      async getdataimage (data) {
        const formData = new FormData();
        formData.append('file', this.croppedImage);
        formData.append('eventid', data.id);

        await axios.post('http://20.84.109.153/api/upload', formData)
        .then(data => {
          this.showevent = false
          this.getallevents()
        })
        .catch(error => console.error('Error:', error));
      },
      areyousuredeleteevent(payload) {
        this.deletedialog = true
        this.choosen = payload
        // this.deleteevent(payload)
      },
      async deleteevent (payload) {
        await axios.post('http://20.84.109.153/api/delete-event', payload).then(data => {
          this.snackbar = true
          this.text = data.data.message
          this.deletedialog = false
          this.getallevents()
        })
      },
      hideevent () {
        this.form = {}
        this.$set(this.form, 'image', '')
        this.showevent = false
      }
    },
    mounted () {
      this.getallevents()
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