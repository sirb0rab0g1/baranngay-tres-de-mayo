<template>
	<v-container fluid >
		<no-ssr>
      <v-layout my-3 mx-2>
        <v-flex>
          <h2>Complain</h2>
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
            <v-btn block depressed color="#dfdfdf" @click="searchnow()">
              Search
            </v-btn>
          </v-flex>
          <v-flex pa-1>
            <v-btn block depressed dark color="#0D650E" @click="createquery()">
              Create Query
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
                      Status
                    </th>
                    <th class="text-left">
                      Date Approved
                    </th>
                    <th class="text-left">
                      Edit
                    </th>
									</tr>
                </thead>
                <tbody class="custom-tbody">
                  <tr
										v-for="(item, index) in requests"
										:key="index"
									>
										<td>{{ item.title }}</td>
										<td>{{ item.name_reported }}</td>
										<td>{{ item.reason }}</td>
										<td>{{ !isNull(item.schedule_hearing) ? parseDate(item.schedule_hearing) : 'Waiting' }}</td>
                    <td>{{ item.status }}</td>
                    <td>{{ item.dateapproved }}</td>
                    <td>
                      <v-flex v-if="item.status === 'Pending'">
                        <v-btn
                          class="mx-2"
                          flat
                          fab
                          small
                          @click="getdata(item)"
                        >
                          <v-icon dark>
                            mdi-pencil-outline
                          </v-icon>
                        </v-btn>

                        <v-btn
                          class="mx-2"
                          flat
                          fab
                          small
                          @click="deletereport(item)"
                        >
                          <v-icon dark>
                            mdi-trash-can
                          </v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex v-else>
                        <v-btn depressed dark small>{{ item.status | capitalizeFirst }}</v-btn> 
                      </v-flex>
                    </td>
									</tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-flex>
        </v-layout>
      </v-card>

			<!-- modal -->
			<v-dialog
				v-model="dialog"
				width="500"
			>
				<v-card>
					<v-card-title style="background: #1976D2; color: white">
						Query
					</v-card-title>

					<v-card-text class="pt-4">
            <v-layout row wrap>
              <v-flex class="pa-2">
                <v-text-field
                  outlined
                  label="Title"
                  v-model="form.title"
                  clearable
                  dense
                ></v-text-field>
                <v-text-field
                  outlined
                  label="Fullname"
									clearable
									:value="fullname"
                  dense
                ></v-text-field>
                <v-select
									outlined
									dense
									v-model="form.query_by_user"
									:items="items"
									label="Options"
									:menu-props="{ top: false, offsetY: true }"
								></v-select>

								<v-text-field
									v-if="form.query_by_user === 'Complain'"
									outlined
									label="Name of the accused"
									v-model="form.name_reported"
									clearable
								></v-text-field>
								<v-textarea
									outlined
									label="Please input the details of your query here."
									v-model="form.reason"
									clearable
								></v-textarea>
                <!-- :label="form.query_by_user !== '' ? 'What is your ' + form.query_by_user + ' ?' : ' '" -->
              </v-flex>
            </v-layout>
          </v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							depressed dark color="#1976D2"
							@click="!form.id ? report() : comupdate()"
						>
							{{ !form.id ? 'Send' : 'Update' }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

      <v-dialog
        v-model="continuex"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Notice
          </v-card-title>

          <v-card-text>
            Thank you for submitting your request! Please expect to receive a call from the administrator.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="continuex = false"
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

			<v-card style="position: fixed; bottom: 0; left: 0; z-index: 1000; margin: 20px; border: 1px solid #9ebd9e;" v-if="notifcard === true">
				<v-card-text class="pa-2" style="line-height: 1">
          <v-card-actions class="pa-0">
            <div style="display: flex; align-items: center;">
              <v-icon small>email</v-icon>
              <div style="font-size: 12px" class="ml-1"><b>Notification</b></div>
            </div>
            <v-spacer></v-spacer>
            <v-icon small class="pointer" @click="notifcard = false">cancel</v-icon>
          </v-card-actions>
          <div style="display: flex; align-items: center;" class="mt-2 pr-4">
            <v-avatar
                size="50px"
              >
            <img
                src="https://cdn-icons-png.flaticon.com/512/2942/2942813.png"
                alt="Avatar"
              >
            </v-avatar>
            <div class="ml-4">
              <div><small><b>
              	Administrator
              </b></small></div>
              <div><small>
              	{{ notification.message }}
              </small></div>
              <div style="color: #2e8b57; font-size: 10px;" class="mt-1"><b>a few seconds ago</b></div>
            </div>
          </div>
        </v-card-text>
			</v-card>
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
    	form: {query_by_user: '', name_reported: ''},
    	search: '',
    	notifcard: false,
    	notification: {},
    	items: ['Complain', 'Concern'],
      continuex: false
    }),
    computed: {
    	...mapGetters('users', ['user']),
    	fullname () {
    		return this.user.first_name + ' ' + this.user.last_name
    	}
    },
    watch: {
    	'user': {
    		handler (old, neww) {
    			if (Object.entries(this.user).length > 0) {
    				this.getreports(this.user)
    			}
    		},
    		deep: true
    	}
    },
    methods: {
      async comupdate () {
        await axios.post('http://20.84.109.153/api/update-report-user', this.form).then(data => {
          console.log(data)
          this.dialog = false
          this.getreports(this.user)
        })
      },
      createquery () {
        this.dialog = true
        this.form = {}
      },
      getdata (payload) {
        this.dialog = true
        console.log(payload)
        this.form = payload
      },
    	async report () {
    		this.$set(this.form, 'requested_by_user_id', this.user.id)
        this.$set(this.form, 'status', 'Pending')
        this.$set(this.form, 'dateapproved', '')
        if (this.form.query_by_user === 'Concern') {
          this.$set(this.form, 'name_reported', '')
        }
    		await axios.post('http://20.84.109.153/api/report-user', this.form).then(data => {
    			console.log(data)
    			this.dialog = false
    			this.getreports(this.user)
    			this.form = {query_by_user: '', name_reported: ''}
          
          this.dialog = false
          this.continuex = true
	      })
    	},
      async deletereport (payload) {
        await axios.post('http://20.84.109.153/api/delete-report-user', payload).then(data => {
          this.getreports(this.user)
          })
      },
    	async getreports (param) {
    		console.log(param)
    		await axios.post('http://20.84.109.153/api/get-concerns', {id: param.id}).then(data => {
					this.requests = data.data.sort((a, b) => a.title.localeCompare(b.title))
	      })
    	},
    	isNull (param) {
    		return _.isNull(param)
    	},
      parseDate (param) {
        return moment(param).format('LL')
      },
    	async searchnow () {
    		console.log(this.user)
    		await axios.post('http://20.84.109.153/api/search-concerns', {search: _.isNull(this.search) ? '' : this.search, user_id: this.user.id}).then(data => {
    			this.requests = data.data.sort((a, b) => a.title.localeCompare(b.title))
	        })
    	}
    },
    mounted () {
    	this.getreports(this.user)

    	const socket = io('http://20.84.109.153/api');

      socket.on('connect', () => {
      	console.log('Connected')
      });

      socket.on('message', (data) => {
      	this.notifcard = true
      	this.notification = data
      	this.getreports(this.user)
      	setTimeout(() => {
      		this.notifcard = false
      		this.notification = {}
        }, 4000);
      });
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