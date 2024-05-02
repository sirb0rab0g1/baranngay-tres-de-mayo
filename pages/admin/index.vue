<template>
  <v-flex>
    <v-navigation-drawer
      v-model="drawer"
      app
    >

      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="require('@/static/images/admin.jpg')"></v-img>
        </v-list-item-avatar>

        
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
          v-for="(item, index) in items"
          :key="index"
          link
          @click="goTo(item.goto)"
          :class="$nuxt._route.fullPath === item.goto ? 'activeRoute' : 'hoverEffect'"
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

      <v-toolbar-title style="color: white">Barangay Tres de Mayo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        dark
        @click="dialog = true"
      >
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>

      <!-- logout dialog -->
      <v-dialog
        v-model="dialog"
        persistent
        max-width="400"
      >
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to logout? 
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="logout()"
            >
              Proceed
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
        { title: 'Events', icon: 'mdi-calendar-month-outline' , goto: '/admin/events'},
        { title: 'Anouncements', icon: 'mdi-bullhorn-variant-outline' , goto: '/admin/anouncements'},
        { title: 'Services', icon: 'mdi-note-text-outline' , goto: '/admin/services'},
        { title: 'Registration', icon: 'mdi-application-edit' , goto: '/admin/registration'},
        { title: 'Request', icon: 'mdi-animation-outline' , goto: '/admin/requestdocument'},
        { title: 'Query', icon: 'mdi-book-edit' , goto: '/admin/complain'},
        { title: 'Users', icon: 'mdi-account-plus' , goto: '/admin/users'},
        // { title: 'History', icon: 'mdi-history' , goto: '/admin/history'},
        // { title: 'Mission and Vision', icon: 'mdi-flag-checkered' , goto: '/admin/goals'},
        // { title: 'Sk Chairman and Kagawads', icon: 'mdi-view-dashboard' , goto: '/admin/barangays'},
      ],
      dialog: false
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
        this.dialog = false
        this.RESET_USEER_STATE()
        this.goTo('/')
      },
    }
  }
</script>