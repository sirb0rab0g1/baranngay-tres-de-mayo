<template>
	<v-container fluid >
		<no-ssr>
			<v-layout my-3 mx-2>
        <v-flex>
          <h2>Request Document</h2>
        </v-flex>
      </v-layout>

			<v-card style="border-radius: 15px" class=" pa-3">
        <v-layout wrap align-center>
          <v-flex xs12 sm10 pa-1>
					<!-- <v-flex xs12 sm8 pa-1> if e uncomment ang 'request document' na button--> 
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
          <!-- <v-flex pa-1>
            <v-btn block depressed dark color="#0D650E" @click="dialog = true">
              Request Document
            </v-btn>
          </v-flex> -->
        </v-layout>

        <v-layout mt-2 pa-1>
          <v-flex lg12 md12 sm12 xs12>
            <v-simple-table fixed-header height="470px">
              <template v-slot:default>
                <thead class="custom-thead">
                  <tr>
										<th class="text-left">
											Requested by 
										</th>
										<th class="text-left">
											Service
										</th>
										<th class="text-left">
											Purpose
										</th>
										<th class="text-left">
											Status
										</th>
										<th class="text-center">
											Date Response
										</th>

										<th class="text-center">
											Pick up Date
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
										<td>{{ item.requested_by_user ? item.requested_by_user.first_name : '' }} {{ item.requested_by_user ? item.requested_by_user.last_name : '' }} : {{ item.age >= 60 ? 'Senior' : ' '}} </td>
										<td>{{ item.service }}</td>
										<td>{{ item.reason }}</td>
										<td>{{ item.status | capitalizeFirst}}</td>

										<th class="text-center">
											{{ item.dateresponse }}
										</th>
										<th class="text-center">
											{{ item.pickupdate }}
										</th>
										<td class="text-center">
											<v-flex v-if="item.status === 'pending'">
												<v-btn depressed dark small color="#d9544b" @click="showacceptordeclined('reject', item)">Reject</v-btn> 
												<v-btn depressed dark small color="#5fcd63" @click="showacceptordeclined('approved', item)">Approve</v-btn>
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


			<v-dialog
				v-model="acceptordeclined"
				persistent
				max-width="500"
			>
				<v-card>
					<v-card-title class="text-h5">
						<v-flex v-if="selected.statuses !== 'approved'">
							Why you would like to {{ selected.statuses }}? 
						</v-flex>
						<v-flex v-else>
							Are you sure you want to {{ selected.statuses }}? 
						</v-flex>
					</v-card-title>
					<v-card-text>
						<v-layout>
							<v-flex pa-1 mt-3>
								<v-flex v-if="selected.statuses === 'approved'">
									<v-card>
										<v-date-picker full-width v-model="picker"></v-date-picker>
									</v-card>
								</v-flex>
								<v-text-field outlined label="Please leave a note!" v-model='selected.description' style="margin-top: 20px;" ></v-text-field>
							</v-flex>
						</v-layout>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="gray darken-1"
							text
							@click="acceptordeclined = false"
						>
							Cancel
						</v-btn>
						<v-btn
							color="green darken-1"
							text
							@click="updatexx()"
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
    	notifcard: false,
    	notification: {},
    	barangaylist: [],
    	acceptordeclined: false,
    	selected: {},
    	picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    	pickupdate: false
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
    				this.getdocument(this.user)
    			}
    		},
    		deep: true
    	}
    },
    methods: {
    	async getdocument (param) {
    		await axios.post('http://20.84.109.153/api/get-all-request-document', {requested_by_id: null, service: ''}).then(data => {
    			console.log(data)
    			this.requests = data.data
	      })
    	},
    	isNull (param) {
    		return _.isNull(param)
    	},
      parseDate (param) {
        return moment(param).format('LL')
      },
    	async searchnow () {
    		await axios.post('http://20.84.109.153/api/get-all-request-document', {service: _.isNull(this.search) ? '' : this.search, requested_by_id: null}).then(data => {
    			console.log(data)
    			this.requests = data.data
	        })
    	},
    	setpickupdate (payload) {
    		this.pickupdate = true
    		this.selected = payload
    	},
    	showacceptordeclined (text, item) {
    		this.$set(item, 'statuses', text)
    		this.$set(item, 'pickupdate', '')
    		this.acceptordeclined = true
    		this.selected = item
    	},
    	async updatexx() {
    		console.log(this.selected)
    		delete this.selected.requested_by_user
    		delete this.selected.age
    		this.$set(this.selected, 'status', this.selected.statuses)
    		this.$set(this.selected, 'dateresponse', moment().format('L'))
    		this.$set(this.selected, 'pickupdate', this.picker)
        await axios.post('http://20.84.109.153/api/update-request-document', this.selected).then(data => {
          this.getdocument(this.user)
          this.selected = {}
          this.acceptordeclined = false
        })
      }
    },
    mounted () {
    	this.getdocument(this.user)
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