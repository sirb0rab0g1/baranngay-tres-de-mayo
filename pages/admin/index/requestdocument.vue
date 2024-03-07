<template>
	<v-container fluid fill-height>
		<no-ssr>
			<v-layout wrap justify-center align-center>
				<v-row>
					<v-col
	          cols="12"
	          lg="11"
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
	          lg="1"
	          sm="6"
	          
	        >
						<v-btn block @click="searchnow()">
							search
						</v-btn>
	          
	        </v-col>
	        <!-- <v-col
	          cols="12"
	          lg="2"
	          sm="6"
	          
	        >
						<v-btn block @click="dialog = true">
							Request Document
						</v-btn>
	          
	        </v-col> -->
					<!-- table -->
					<v-col
					cols="12"
					lg="12"
					sm="6"
					>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">
											Requested by 
										</th>
										<th class="text-left">
											Service
										</th>
										<th class="text-left">
											Reason
										</th>
										<th class="text-left">
											Status
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
									<td>{{ item.requested_by_user ? item.requested_by_user.first_name : '' }} {{ item.requested_by_user ? item.requested_by_user.last_name : '' }} : {{ item.age >= 60 ? 'Senior' : ' '}} </td>
									<td>{{ item.service }}</td>
									<td>{{ item.reason }}</td>
									<td>{{ item.status | capitalizeFirst}}</td>
									<td>
										<v-btn @click="showacceptordeclined('declined', item)">Decline</v-btn> 
										<v-btn @click="showacceptordeclined('accept', item)">Accept</v-btn>
									</td>
							</tr>
							</tbody>
							</template>
						</v-simple-table>

						<v-dialog
			        v-model="acceptordeclined"
			        persistent
			        max-width="500"
			      >
			        <v-card>
			          <v-card-title class="text-h5">
			            Are you sure you want to {{ selected.statuses }}? 

			            <v-flex lg12 md12 sm12 xs12>
			            	<v-text-field label="Please leave a note!" v-model='selected.description'></v-text-field>
			            </v-flex>
			          </v-card-title>
			          <v-card-actions>
			            <v-spacer></v-spacer>
			            <v-btn
			              color="green darken-1"
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
    	notifcard: false,
    	notification: {},
    	barangaylist: [],
    	acceptordeclined: false,
    	selected: {}
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
    		await axios.post('http://localhost:5000/get-all-request-document', {requested_by_id: null, service: ''}).then(data => {
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
    		await axios.post('http://localhost:5000/get-all-request-document', {service: _.isNull(this.search) ? '' : this.search, requested_by_id: null}).then(data => {
    			console.log(data)
    			this.requests = data.data
	        })
    	},
    	showacceptordeclined (text, item) {
    		this.$set(item, 'statuses', text)
    		this.acceptordeclined = true
    		this.selected = item
    	},
    	async updatexx() {
    		console.log(this.selected)
    		delete this.selected.requested_by_user
    		delete this.selected.age
    		this.$set(this.selected, 'status', this.selected.statuses)
        await axios.post('http://localhost:5000/update-request-document', this.selected).then(data => {
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