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
											Fist name
										</th>
										<th class="text-left">
											Last name
										</th>
										<th class="text-left">
											Username
										</th>
										<th class="text-left">
											Age
										</th>
										<th class="text-left">
											Gender
										</th>
										<th class="text-left">
											Phone Number
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
								<tr v-for="(item, index) in requests" :key="index">
									
									<td>{{ item.first_name}}</td>
									<td>{{ item.last_name}}</td>
									<td>{{ item.username}}</td>
									<td>{{ item.age}}</td>
									<td>{{ item.gender}}</td>
									<td>{{ item.phone_number}}</td>
									<td>{{ item.status | capitalizeFirst}}</td>
									<td>
										<v-btn @click="updatexx('declined', item)">Decline</v-btn> 
										<v-btn @click="updatexx('active', item)">Activate</v-btn>
									</td>
								</tr>
							</tbody>
							</template>
						</v-simple-table>

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
    methods: {
    	async getusers () {
    		await axios.get('http://localhost:5000/get-all-users').then(data => {
    			console.log(data.data)
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
    	async updatexx(status, payload) {
    		let load = {
    			status: status,
    			id: payload.id
    		}
    		await axios.post('http://localhost:5000/update-user-status', load).then(data => {
    			this.getusers()
	      })
      }
    },
    mounted () {
    	this.getusers()
    }
  }
</script>