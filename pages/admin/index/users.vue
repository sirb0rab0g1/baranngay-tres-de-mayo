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
											Email
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
									
										<td @click="showinfo(item)">{{ item.first_name}}</td>
										<td @click="showinfo(item)">{{ item.last_name}}</td>
										<td @click="showinfo(item)">{{ item.username}}</td>
										<td @click="showinfo(item)">{{ item.age}}</td>
										<td @click="showinfo(item)">{{ item.gender}}</td>
										<td @click="showinfo(item)">{{ item.phone_number}}</td>
										<td @click="showinfo(item)">{{ item.status | capitalizeFirst}}</td>
										<td class="text-center">
											<v-flex v-if="item.status === 'pending'">
												<v-btn depressed dark small color="#d9544b"  @click="updatexx('declined', item)">Decline</v-btn> 
												<v-btn depressed dark small color="#5fcd63" @click="updatexx('active', item)">Activate</v-btn>
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

        <!-- add event modal -->
	      <v-dialog width="900" persistent v-model="showevent">
	        <v-card>
	          <v-card-title style="background: #1976D2; color: white">
	            <span>User Information</span>
	          </v-card-title>
	          <v-card-text class="pt-4">
	            <v-layout row wrap>
	              <v-layout>
		              <v-flex sm12 md6 pa-2>
		                <v-text-field
		                  outlined
		                  v-model="form.first_name"
		                  readonly
		                  label="First Name"
		                  prepend-icon="person"
		                />
		              </v-flex>
		              <v-flex sm12 md6 pa-2> 
		                <v-text-field
		                  outlined
		                  v-model="form.last_name"
		                  readonly
		                  label="Last Name"
		                  prepend-icon="person"
		                />
		              </v-flex>
		            </v-layout>
		            <v-layout row wrap>
		              <v-flex sm12 md3 pa-2>
		                <v-menu
		                  v-model="menu"
		                  :close-on-content-click="false"
		                  :nudge-right="40"
		                  transition="scale-transition"
		                  offset-y
		                  readonly
		                  min-width="auto"
		                >
		                  <template v-slot:activator="{ on, attrs }">
		                    <v-text-field
		                      v-model="form.birth_date"
		                      label="Birth Date"
		                      prepend-icon="mdi-calendar"
		                      readonly
		                      v-bind="attrs"
		                      v-on="on"
		                      outlined
		                    ></v-text-field>
		                  </template>
		                  <v-date-picker
		                    v-model="form.birth_date"
		                    @input="menu = false"
		                    no-title
		                  ></v-date-picker>
		                </v-menu>
		                <!-- <span class="px-3"> {{ isSeniorCitizen }}</span> -->
		              </v-flex>
		              <v-flex sm12 md3 pa-2>
		                <v-select
		                  outlined
		                  prepend-icon="lock"
		                  v-model="form.gender"
		                  :items="genderlist"
		                  label="Gender"
		                  :menu-props="{ top: false, offsetY: true }"
		                  readonly
		                ></v-select>
		              </v-flex>
		              <v-flex sm12 md3 pa-2>
		                <v-text-field
		                  outlined
		                  v-model="form.phone_number"
		                  label="Phone Number"
		                  prepend-icon="lock"
		                  prefix="+63"
		                  maxLength="10"
		                  readonly
		                />
		              </v-flex>

		              <v-flex sm12 md3 pa-2>
		                <v-select
		                  outlined
		                  prepend-icon="lock"
		                  v-model="form.kindid"
		                  :items="kindid"
		                  label="ID Description"
		                  :menu-props="{ top: false, offsetY: true }"
		                  readonly
		                ></v-select>
		              </v-flex>
		              <v-flex lg6 class="pa-2">
		                <croppa
		                  v-model="croppa"
		                  :width="croppa.width"
		                  :height="croppa.height"
		                  :placeholder="croppa.placeholder"
		                >
		                  <img slot="initial" :src="'http://20.84.109.153/' + form.image" />
		                </croppa>
		              </v-flex>
		            </v-layout>
	            </v-layout>
	          </v-card-text>
	          <v-divider></v-divider>
	          <v-card-actions class="pa-4">
	            <v-spacer/>
	            <v-btn @click="showevent = !showevent">Close</v-btn>
	          </v-card-actions>
	          
	        </v-card>
	      </v-dialog>
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
    	selected: {},
    	showevent: false,
      croppa: {
        width: 200,
        height: 200,
        placeholder: 'Select an image'
      },
      genderlist: ['Male', 'Female'],
      kindid: ['National ID', 'Passport', 'Drivers license', 'Student ID', 'Company ID']
    }),
    computed: {
    	...mapGetters('users', ['user']),
    	fullname () {
    		return this.user.first_name + ' ' + this.user.last_name
    	}
    },
    methods: {
    	showinfo (payload) {
    		this.showevent = true
    		console.log(payload)
    		// payload.image = 'http://20.84.109.153/' + payload.image 
    		// this.$set(payload, 'image', 'http://20.84.109.153/' + payload.image )
    		this.form = payload
    	},
    	async getusers () {
    		await axios.get('http://20.84.109.153/api/get-all-users').then(data => {
    			let arr = []
					data.data.forEach(element => {
						console.log('eee',element)
						
						let payload = element
						if(element.birth_date) {
							let birthDate = new Date(element.birth_date);
							let dateNow = new Date();
							let age = dateNow.getFullYear() - birthDate.getFullYear();

							this.$set(payload, 'age', age)
						}
						
						arr.push(payload)
					});
    			this.requests = arr
	      })
    	},
    	isNull (param) {
    		return _.isNull(param)
    	},
      parseDate (param) {
        return moment(param).format('LL')
      },
    	async searchnow () {
    		await axios.post('http://20.84.109.153/api/search-all-users', {search: _.isNull(this.search) ? '' : this.search}).then(data => {
    			let arr = []
					data.data.forEach(element => {
						let payload = element
						if(element.birth_date) {
							let birthDate = new Date(element.birth_date);
							let dateNow = new Date();
							let age = dateNow.getFullYear() - birthDate.getFullYear();

							this.$set(payload, 'age', age)
						}
						
						arr.push(payload)
					});
    			this.requests = arr
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
    		await axios.post('http://20.84.109.153/api/update-user-status', load).then(data => {
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