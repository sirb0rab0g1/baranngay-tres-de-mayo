<template>
	<v-container fluid>
		<no-ssr>
			<v-layout my-3 mx-2>
        <v-flex>
          <h2>Users</h2>
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

        <v-layout mt-2 pa-1 >
          <v-flex lg12 md12 sm12 xs12>
            <v-simple-table fixed-header height="470px">
              <template v-slot:default>
                <thead class="custom-thead">
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
										<th class="text-center">
											Action
										</th>
									</tr>
                </thead>
                <tbody class="custom-tbody">
                  <tr v-for="(item, index) in requests" :key="index">
									
										<td>{{ item.first_name}}</td>
										<td>{{ item.last_name}}</td>
										<td>{{ item.username}}</td>
										<td>{{ item.age}}</td>
										<td>{{ item.gender}}</td>
										<td>{{ item.phone_number}}</td>
										<td>{{ item.status | capitalizeFirst}}</td>
										<td class="text-center">
											<v-btn depressed dark small color="#d9544b"  @click="updatexx('declined', item)">Decline</v-btn> 
											<v-btn depressed dark small color="#5fcd63" @click="updatexx('active', item)">Activate</v-btn>
										</td>
									</tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-flex>
        </v-layout>
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
    		await axios.get('http://localhost:5000/api/get-all-users').then(data => {
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
    		await axios.post('http://localhost:5000/api/get-all-request-document', {service: _.isNull(this.search) ? '' : this.search, requested_by_id: null}).then(data => {
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
    		await axios.post('http://localhost:5000/api/update-user-status', load).then(data => {
    			this.getusers()
	      })
      }
    },
    mounted () {
    	this.getusers()
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