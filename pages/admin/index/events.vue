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
              label="Search Event"
              v-model="search"
              clearable
            ></v-text-field>
          </v-col>
          <v-col
            cols="1"
            lg="1"
            sm="6"
          >
            <v-btn block @click="searchevent()">
              search
            </v-btn>
            
          </v-col>
          <v-col
            cols="1"
            lg="2"
            sm="6"
          >
            <v-btn block @click="showevent = !showevent">
              Create Event
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
                      Event Name
                    </th>
                    <th class="text-left">
                      Date
                    </th>
                    <th class="text-left">
                      Summary
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
                    <td>{{ item.title }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.summary }}</td>
                    <td class="text-right">
                      <v-btn>
                        Edit
                      </v-btn>
                      <v-btn @click="deleteevent(item)">
                        Delete
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>

            <!-- add event modal -->

            <v-dialog width="900" persistent v-model="showevent">
              <v-card class="pa-4">

                <v-layout row wrap>
                  <v-flex lg11 md12 sm12 xs12>
                    <h1>
                      Manage Event
                    </h1>
                  </v-flex>
                  <v-flex lg1 md12 sm12 xs12>
                    <v-btn @click="showevent = !showevent"> close</v-btn>
                  </v-flex>
                  <v-flex lg6 class="pa-2">
                    <v-text-field
                      solo
                      label="Title"
                      v-model="form.title"
                      clearable
                    ></v-text-field>
                    <v-text-field
                      solo
                      label="Date"
                      v-model="form.date"
                      clearable
                    ></v-text-field>
                    <v-textarea
                      solo
                      label="Summary"
                      v-model="form.summary"
                      clearable
                    ></v-textarea>
                  </v-flex>
                  <v-flex lg6 class="pa-2">
                    <croppa
                      v-model="croppa"
                      :width="croppa.width"
                      :height="croppa.height"
                      :placeholder="croppa.placeholder"
                      @file-choose="onCropped"
                    ></croppa>
                  </v-flex>

                  <v-flex lg12>
                    <v-btn @click="createevent()">SAVE</v-btn>
                  </v-flex>
                </v-layout>
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
      search: '',
      showevent: false,
      form: {},
      croppa: {
        width: 400,
        height: 400,
        placeholder: 'Select an image'
      },
      croppedImage: null,
      snackbar: false,
      text: '',
    }),
    computed: {
      ...mapGetters('users', ['user'])
    },
    methods: {
      onCropped(data) {
        this.croppedImage = data
      },
      async searchevent () {
        await axios.post('http://localhost:5000/search-event', {title: _.isNull(this.search) ? '' : this.search}).then(data => {
          this.requests = data.data
        })
      },
      async createevent () {
        this.$set(this.form, 'image', '')
        await axios.post('http://localhost:5000/create-event', this.form).then(data => {
          this.getdataimage(data.data)
        })
      },
      async getallevents () {
        await axios.get('http://localhost:5000/get-all-events').then(data => {
          this.requests = data.data
        })
      },
      async getdataimage (data) {
        const formData = new FormData();
        formData.append('file', this.croppedImage);
        formData.append('eventid', data.id);

        await axios.post('http://localhost:5000/upload', formData)
        .then(data => {
          this.showevent = false
          this.getallevents()
        })
        .catch(error => console.error('Error:', error));
      },
      async deleteevent (payload) {
        await axios.post('http://localhost:5000/delete-event', payload).then(data => {
          this.snackbar = true
          this.text = data.data.message
          console.log('fasdfasdfa')
          this.getallevents()
        })
      }
    },
    mounted () {
      this.getallevents()
    }
  }
</script>