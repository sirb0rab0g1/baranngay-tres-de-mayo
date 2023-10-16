<template>
  <v-flex>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ fullname | capitalizeFirst }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.role | capitalizeFirst }}
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
  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' , goto: '/admin'},
        // { title: 'Barangays', icon: 'mdi-view-dashboard' , goto: '/admin/barangays'},
        { title: 'Events', icon: 'mdi-view-dashboard' , goto: '/admin/events'},
        { title: 'Services', icon: 'mdi-view-dashboard' , goto: '/admin/services'},
        { title: 'Anouncements', icon: 'mdi-view-dashboard' , goto: '/admin/anouncements'},
        { title: 'Users', icon: 'mdi-view-dashboard' , goto: '/admin/barangays'},
        { title: 'Settings', icon: 'mdi-view-dashboard' , goto: '/admin/barangays'},
      ],
    }),
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
    }
  }
</script>