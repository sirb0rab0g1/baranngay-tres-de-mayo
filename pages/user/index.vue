<template>
  <v-flex>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ fullname }}
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="goTo(item.goto)">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu
        bottom
        left
        min-width="300"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon style="font-size: 30px;">mdi-bell</v-icon>
            <div class="notification-container">
              <div class="notification-badge">
                <span class="count">5</span>
              </div>
            </div>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in notif"
            :key="i"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn @click="logout()">Logout</v-btn>
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
  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' , goto: '/user'},
      ],
      notif: [],
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
        console.log(param)
        await axios.post('http://localhost:5000/get-notification', {id: param.id}).then(data => {
          this.notif = data.data
        })
      }
    },
    mounted () {
      this.getnotification(this.user)
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