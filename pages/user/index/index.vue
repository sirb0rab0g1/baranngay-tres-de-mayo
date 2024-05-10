<template>
	<v-container fluid fill-height>
		<no-ssr>
			<v-layout wrap justify-center align-center>
				samplee
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
    	notification: {}
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
    		await axios.post('http://20.189.115.250/api/report-user', this.form).then(data => {
    			console.log(data)
    			this.dialog = false
    			this.getreports(this.user)
	        })
    	},
    	async getreports (param) {
    		console.log(param)
    		await axios.post('http://20.189.115.250/api/get-concerns', {id: param.id}).then(data => {
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
    		await axios.post('http://20.189.115.250/api/search-concerns', {search: _.isNull(this.search) ? '' : this.search, user_id: this.user.id}).then(data => {
    			this.requests = data.data
	        })
    	}
    },
    mounted () {
    	this.getreports(this.user)

    	const socket = io('http://20.189.115.250/api');

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