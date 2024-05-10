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
              v-model="gfilter.description"
              clearable
            ></v-text-field>
          </v-col>
          <v-col
            cols="1"
            lg="1"
            sm="6"
          >
            <v-btn large block @click="searchgoals(null)">
              Search
            </v-btn>
            
          </v-col>
          <v-col
            cols="1"
            lg="2"
            sm="6"
          >
            <v-btn large block @click="showbarangay = !showbarangay">
              Create Goal
            </v-btn>
            
          </v-col>


          <!-- table -->
          <v-spacer></v-spacer>
          <v-flex lg3 md3 sm3 xs3 pl-3>
          	<v-select
    	        :items="items"
    	        solo
    	        v-model="gfilter.is_vission_or_mission"
    	        placeholder="Mission or Vision"
  	        ></v-select>
          </v-flex>
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
                      Goal
                    </th>
                    <th class="text-left">
                      Mission or Vision
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
                    <td>{{ limitedText(item.description) }}</td>
                    <td>{{ item.is_vission_or_mission }}</td>
                    <td class="text-right">
                      <v-btn @click="view(item)">Edit</v-btn>
                      <v-btn @click="areyousuredeleteevent(item)">Delete</v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card>

            <v-dialog width="500" v-model="showbarangay">
              <v-card class="pa-4">
                <v-layout row wrap>
                  <v-toolbar
                      dark
                      color="primary"
                    >
                      <v-toolbar-title>Manage Goal</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn
                          icon
                          @click="hideevent()"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
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
                   <v-select
			        :items="items"
			        solo
			        v-model="form.is_vission_or_mission"
			        placeholder="Mission or Vision"
			        ></v-select>
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

        <v-dialog
          v-model="deletedialog"
          persistent
          max-width="400"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this goal?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
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
      text: '',
      items: ['Mission', 'Vision', 'Reset'],
      filter: '',
      gfilter: {id: null, description: null, is_vission_or_mission: null},
      deletedialog: false,
      choice: null,
      choosen: {}
    }),
    computed: {
      ...mapGetters('users', ['user'])
    },
    watch: {
    	'gfilter.is_vission_or_mission': {
    		handler () {
    			if (this.gfilter.is_vission_or_mission == 'Reset') {
            this.$set(this.gfilter, 'is_vission_or_mission', null)
    			}
          
    			this.searchgoals()
    		}, deep: true
    	}
    },
    methods: {
      limitedText (param) {
      	if (param.length > 100) {
      		let sliceee = param.slice(0, 100) + '...'
	        return sliceee;
	     }
	     return param;
      },
      async view (payload) {
        await axios.post('http://20.189.115.250/api/search-goals', payload).then(data => {
          this.showbarangay = true
          this.form = data.data[0]
        }).catch(e => {
          console.log(e)
        })
      },
      async save () {
        if (_.has(this.form, 'id')) {
          await axios.post('http://20.189.115.250/api/update-goals', {
          	description: this.form.description, 
          	id: this.form.id, 
            is_vission_or_mission: this.form.is_vission_or_mission
          }).then(data => {
            this.showbarangay = false
            this.getallgoals()
            this.form = {}
          })
        } else {
          await axios.post('http://20.189.115.250/api/create-goals', this.form).then(data => {
            this.showbarangay = false
            this.getallgoals()
            this.form = {}
          })
        }
      },
      async getallgoals () {
        await axios.get('http://20.189.115.250/api/get-all-goals').then(data => {
          this.requests = data.data
          console.log(data)
        })
      },
      async searchgoals (xx) {
        // await axios.post('http://20.189.115.250/api/search-goals', {
        // 	description: _.isNull(this.search) ? '' : this.search, 
        // 	id: null,
        // 	is_vission_or_mission: xx
        // }).then(data => {
        //   this.requests = data.data
        // })

        await axios.post('http://20.189.115.250/api/search-goals', this.gfilter).then(data => {
          this.requests = data.data
        })
      },
      isNull (param) {
        return _.isNull(param)
      },
      async deletebarangay (payload) {
        await axios.post('http://20.189.115.250/api/delete-goals', {id: payload}).then(data => {
          this.snackbar = true
          this.text = data.data.message
          this.deletedialog = false
          this.getallgoals()
        })
      },
      areyousuredeleteevent(payload) {
        this.deletedialog = true
        this.choosen = payload
        // this.deleteevent(payload)
      },
      hideevent () {
        this.showbarangay = false
        this.form = {}
      }
    },
    mounted () {
      this.getallgoals()
    }
  }
</script>