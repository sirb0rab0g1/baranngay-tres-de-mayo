<template>
  <v-flex>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
          <v-list-item-avatar>
           <v-img :src="'http://20.84.109.153/' + this.user.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-title class="text-h6">
            {{ fullname }} <br>
            <span style="font-weight: normal; font-size: 14px;">
              Resident
            </span>
          </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          :class="$nuxt._route.fullPath === item.goto ? 'activeRoute' : 'hoverEffect'"
          v-for="item in items"
          :key="item.title"
          link
          @click="goTo(item.goto)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>

    <v-app-bar app style="background-color: #0D650E">
      <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="color: white">Application</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-menu
        bottom
        left
        min-width="400"
        max-width="400"
        offset-y
        max-height="400"
        allow-overflow
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon style="font-size: 30px;">mdi-bell</v-icon>
            <div class="notification-container" v-if="counter_unread > 0">
              <div class="notification-badge">
                <span class="count">{{ counter_unread }}</span>
              </div>
            </div>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in notif"
            :key="i"
          >
            <v-list-item-content @click="updateitem(item)" :style="item.is_read == 'false' ? 'background-color: #EEEEEE;' : ''">
                <v-list-item-title>
                  <span :style="item.is_read == 'false' ? 'font-weight: bold' : ''">Administrator</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Title: <span :style="item.is_read == 'false' ? 'font-weight: bold' : ''">{{ item.title }}</span> <br>
                  <v-flex style="margin-top: 10px;">
                    {{ item.description }} <br />{{ parseDate(item.scheduled_date) }}
                  </v-flex>
                  
                </v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- <v-btn @click="logout()">Logout</v-btn> -->
      <v-btn
        text
        dark
        @click="logout()"
      >
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <nuxt-child />
    </v-main>
  </v-flex>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Global from '~/plugins/mixins/global'
  import axios from 'axios'
  import moment from 'moment'

  import io from 'socket.io-client';

  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Query', icon: 'mdi-view-dashboard' , goto: '/user/complain'},
        { title: 'Request', icon: 'mdi-animation-outline' , goto: '/user/requestdocument'},
        { title: 'Profile', icon: 'mdi-account-key' , goto: '/user/profile'},
        { title: 'FAQ', icon: 'mdi-account-key' , goto: '/user/faq'},
      ],
      notif: [],
      counter_unread: 0
    }),
    watch: {
      'user': {
        handler (old, neww) {
          if (Object.entries(old).length > 0) {
            this.getnotification(old)
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters('users', ['user']),
      fullname () {
        return this.user.first_name + ' ' + this.user.last_name
      }
    },
    mixins: [Global],
    methods: {
      ...mapMutations('users', ['RESET_USEER_STATE']),
      logout () {
        this.RESET_USEER_STATE()
        this.goTo('/')
      },
      async getnotification (param) {
        // this.counter_unread = 0
        // await axios.post('http://20.84.109.153/api/get-notification', {id: param ? param.id : ''}).then(data => {
        //   this.notif = data.data
        //   for (let item of data.data) {
        //     if (item.is_read == 'false') {
        //       this.counter_unread += 1
        //     }
        //   }
        // })
      },
      parseDate (param) {
        return moment(param).format('LL')
      },
      async updateitem (payload) {
        this.$set(payload, 'scheduled_date', moment(payload.scheduled_date).format('YYYY-MM-DD'))
        this.$set(payload, 'is_read', 'true')
        await axios.post('http://20.84.109.153/api/update-notification', payload).then(data => {
          this.getnotification(this.user)
        })
      }
    },
    mounted () {
      this.getnotification(this.user)


      // const socket = io('http://20.84.109.153/api');

      // socket.on('connect', () => {
      //   console.log('Connected')
      // });

      // socket.on('message', (data) => {
      //   this.getnotification(this.user)
      // });
    }
  }
</script>

<style type="text/css">
.notification-container {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red; /* Change this to your desired background color */
  color: #fff; /* Change this to your desired text color */
  border-radius: 70%;
  padding: 5px;
  font-size: 8px;
  min-width: 18px;
  text-align: center;
  margin-top: -20px;
}
</style>