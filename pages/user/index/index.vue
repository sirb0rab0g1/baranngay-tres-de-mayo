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
	          block
	        >
						<v-btn @click="searchnow()">
							search
						</v-btn>
	          
	        </v-col>
	        <v-col
	          cols="12"
	          lg="2"
	          sm="6"
	          block
	        >
						<v-btn @click="dialog = true">
							create reklamo
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
								<td>{{ item.name_reported }}</td>
								<td>{{ item.reason }}</td>
								<td>{{ !isNull(item.schedule_hearing) ? item.schedule_hearing : 'Waiting' }}</td>
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
					            label="Fullname"
					            clearable
					            :value="fullname"
					          ></v-text-field>
					        </v-col>
					        <v-col
					          cols="12"
					          lg="12"
					          sm="6"
					          style="margin-top: -40px;"
					        >
					        <v-text-field
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
					            label="reason"
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
				            REPORT
				          </v-btn>
				        </v-card-actions>
				      </v-card>
				    </v-dialog>
				</v-row>
			</v-layout>
		</no-ssr>
	</v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import _ from 'lodash'

  export default {
    data: () => ({
    	requests: [],
    	dialog: false,
    	form: {},
    	search: ''
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
    			this.getreports(old)
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
	        })
    	},
    	async getreports (param) {
    		await axios.post('http://localhost:5000/get-concerns', {id: param.id}).then(data => {
    			console.log(data)
    			this.requests = data.data
	        })
    	},
    	isNull (param) {
    		return _.isNull(param)
    	},
    	async searchnow () {
    		await axios.post('http://localhost:5000/search-concerns', {search: this.search}).then(data => {
    			this.requests = data.data
	        })
    	}
    },
    mounted () {
    	this.getreports(this.user)
    }
  }
</script>