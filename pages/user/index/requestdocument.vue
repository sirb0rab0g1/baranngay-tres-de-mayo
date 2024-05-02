<template>
	<v-container fluid>
		<no-ssr>
			<v-layout my-3 mx-2>
        <v-flex>
          <h2>Request</h2>
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
            <v-btn block depressed dark color="#0D650E" @click="dialog = true">
              Request
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
											Service
										</th>
										<th class="text-left">
											Reason
										</th>
										<th class="text-left">
											Status
										</th>
										<th class="text-left">
											Description
										</th>
										<th class="text-left">
											Time Status
										</th>
										<th class="text-left">
											Time Accomplished
										</th>
									</tr>
                </thead>
                <tbody class="custom-tbody">
                  <tr
										v-for="(item, index) in requests"
										:key="index"
									>
											<td>{{ item.service }}</td>
											<td>{{ item.reason }}</td>
											<td>{{ item.status | capitalizeFirst }}</td>
											<td>{{ item.description}}</td>
											<td>
												<!-- for time status -->
											</td>
											<td>
												<!-- for time accomplished -->
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
						REQUEST
					</v-card-title>

					<v-card-text class="pt-4">
						<v-layout row wrap>
							<v-flex class="pa-2">
								<v-select
									:items="barangaylist"
									outlined
									label="Filled style"
									v-model="form.service"
									:menu-props="{ top: false, offsetY: true }"
								></v-select>
								<v-textarea
									outlined
									label="Reason"
									v-model="form.reason"
									clearable
								></v-textarea>
							</v-flex>
						</v-layout>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							depressed dark color="#1976D2"
							@click="report()"
						>
							SEND
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
    	form: {},
    	search: '',
    	notifcard: false,
    	notification: {},
    	barangaylist: []
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
    	async report () {
    		this.$set(this.form, 'requested_by_id', this.user.id)
    		this.$set(this.form, 'status', 'pending')
    		this.$set(this.form, 'description', '')
    		await axios.post('http://localhost:5000/request-document', this.form).then(data => {
    			console.log(data)
    			this.dialog = false
    			this.getdocument(this.user)
	        })
    	},
    	async getdocument (param) {
    		// console.log(param)
    		await axios.post('http://localhost:5000/get-all-request-document', {requested_by_id: param.id, service: ''}).then(data => {
    			console.log(data)
    			this.requests = data.data
    			this.getallbarangay()
	      })
    	},
    	isNull (param) {
    		return _.isNull(param)
    	},
      parseDate (param) {
        return moment(param).format('LL')
      },
    	async searchnow () {
    		// console.log(this.user)
    		await axios.post('http://localhost:5000/get-all-request-document', {service: _.isNull(this.search) ? '' : this.search, requested_by_id: this.user.id}).then(data => {
    			console.log(data)
    			this.requests = data.data
	        })
    	},
    	async getallbarangay () {
        await axios.get('http://localhost:5000/get-all-barangay').then(data => {
          for (let item of data.data) {
            console.log(item)
            this.barangaylist.push(item.barangay)
          }
        })
      }
    },
    mounted () {
    	this.getdocument(this.user)

    	// const socket = io('http://localhost:5000');

     //  socket.on('connect', () => {
     //  	console.log('Connected')
     //  });

     //  socket.on('message', (data) => {
     //  	this.notifcard = true
     //  	this.notification = data
     //  	this.getreports(this.user)
     //  	setTimeout(() => {
     //  		this.notifcard = false
     //  		this.notification = {}
     //    }, 4000);
     //  });
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