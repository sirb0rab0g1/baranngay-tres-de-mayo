<template>
	<v-container fluid fill-height>
		<no-ssr>
			<v-layout wrap justify-center align-center>
				<v-row>
					<v-col
	          cols="12"
	          lg="9"
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
							Search
						</v-btn>
	          
	        </v-col>
	        <v-col
	          cols="12"
	          lg="2"
	          sm="6"
	          
	        >
						<v-btn block @click="dialog = true">
							Create Query
						</v-btn>
	          
	        </v-col>
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
											Title
										</th>
										<th class="text-left">
											Name Reported
										</th>
										<th class="text-left">
											Reason
										</th>
										<th class="text-left">
											Schedule Hearing
										</th>
									</tr>
								</thead>
							<tbody>
							<tr
							v-for="(item, index) in requests"
							:key="index"
							>
								<td>{{ item.title }}</td>
								<td>{{ item.name_reported }}</td>
								<td>{{ item.reason }}</td>
								<td>{{ !isNull(item.schedule_hearing) ? parseDate(item.schedule_hearing) : 'Waiting' }}</td>
							</tr>
							</tbody>
							</template>
						</v-simple-table>

					</v-col>

			    	<!-- modal -->
			    	<v-dialog
				      v-model="dialog"
				      width="500"
				    >
				      <v-card>
				        <v-card-title class="text-h5 grey lighten-2">
				          REKLAMO
				        </v-card-title>

				        <v-row class="pa-2">
				        	<v-col
					          cols="12"
					          lg="12"
					          sm="6"
					        >

					        <v-text-field
					            solo
					            label="Title"
					            clearable
					            v-model="form.title"
					          ></v-text-field>
					        <v-text-field
					            solo
					            label="Fullname"
					            clearable
					            :value="fullname"
					          ></v-text-field>
					        </v-col>
					        <v-col
					          cols="12"
					          lg="12"
					          sm="6"
					          style="margin-top: -20px;"
					        >
						        <v-select
						        	solo
						        	v-model="form.query_by_user"
						          :items="items"
						          label="Options"
						        ></v-select>

					        <v-text-field
					        		v-if="form.query_by_user === 'Complain'"
					            solo
					            label="Name sa gisumbong"
					            v-model="form.name_reported"
					            clearable
					          ></v-text-field>
					        </v-col>
					        <v-col
					          cols="12"
					          lg="12"
					          sm="6"
					          style="margin-top: -40px;"
					        >
					        <v-textarea
					            solo
					            :label="form.query_by_user !== '' ? 'What is your ' + form.query_by_user + ' ?' : ' '"
					            v-model="form.reason"
					            clearable
					          ></v-textarea>
					        </v-col>
				        </v-row>

				        <v-divider></v-divider>

				        <v-card-actions>
				          <v-spacer></v-spacer>
				          <v-btn
				            color="warning"
				            text
				            @click="report()"
				          >
				            Send
				          </v-btn>
				        </v-card-actions>
				      </v-card>
				    </v-dialog>
				</v-row>

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
    	form: {query_by_user: '', name_reported: ''},
    	search: '',
    	notifcard: false,
    	notification: {},
    	items: ['Complain', 'Concern'],
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
    	async report () {
    		this.$set(this.form, 'requested_by_user_id', this.user.id)
    		await axios.post('http://localhost:5000/report-user', this.form).then(data => {
    			console.log(data)
    			this.dialog = false
    			this.getreports(this.user)
    			this.form = {query_by_user: '', name_reported: ''}
	      })
    	},
    	async getreports (param) {
    		console.log(param)
    		await axios.post('http://localhost:5000/get-concerns', {id: param.id}).then(data => {
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
    		console.log(this.user)
    		await axios.post('http://localhost:5000/search-concerns', {search: _.isNull(this.search) ? '' : this.search, user_id: this.user.id}).then(data => {
    			this.requests = data.data
	        })
    	}
    },
    mounted () {
    	this.getreports(this.user)

    	const socket = io('http://localhost:5000');

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