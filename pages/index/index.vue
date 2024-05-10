<template>
  <v-container fluid fill-height>
    <v-app-bar
      app
      style="background-color: #0d650e; color: white;"
      flat
      dark
    >

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="(item, index) in links"
          :key="index"
          @click="scrollToTarget(item.goto)"
        >
          {{ item.txt }}
        </v-tab>
      </v-tabs>
      <v-btn color="#f1fff8" light outlined depressed @click="goTo('/login')">
        <span style="font-weight: bold">Login</span>
      </v-btn>
    </v-app-bar>
    <v-row id="home">
      <v-col cols="12">
        <!-- carousel --> 
        <v-carousel hide-delimiters height="950"> 
          <v-carousel-item
            v-for="(item, i) in announcexevents"
            :key="i"
            :src="'http://20.189.115.250/api/' + item.image"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-sheet
              color="grey lighten-3"
              height="100%"
            >
              <v-img :src="'http://20.189.115.250/api/' + item.image" 
              aspect-ratio="1"
              class="custom-image-class"
            ></v-img>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <!-- services -->

    <v-row style="margin-top: 5%;" id="services">
      <v-col cols="12" class="text-center">
        <h1>SERVICES</h1>
      </v-col>
      <v-col 
        class="text-center pa-2"
        cols="3"
        v-for="(item, index) in services"
        :key="index"
      >
        <div @click="goTo('/login')">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>
              {{ item.barangay | capitalizeFirst }}
            </v-card-title>
          </v-img>
        </div>
      </v-col>
    </v-row>

    <!-- announcement and events -->

    <!-- <v-row>
      <v-col cols="6">
        <v-card
          class="mx-auto"
          max-width="100%"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Announcements</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            {{ announcements.title | capitalizeFirst}}
          </v-card-subtitle>

          <v-card-text class="text--primary" style="height: 18vh; overflow: hidden;">
            <div>{{ announcements.description | capitalizeFirst}}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="mx-auto"
          max-width="100%"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Events</v-card-title>
          </v-img>
          
          <v-card-subtitle class="pb-0">
            {{ events.title | capitalizeFirst}}
          </v-card-subtitle>

          <v-card-text class="text--primary" style="height: 18vh; overflow: hidden;">
            <div>{{ events.summary | capitalizeFirst}}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- About Barangay -->

    <v-row  id="about">
      <v-col cols="12" class="text-center">
        <h1>
          ABOUT BARANGAY
        </h1>
      </v-col>

      <v-col cols="5" pa-3>
        <v-card
          class="mx-auto"
          max-width="100%"
          min-height="500px"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>History</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary" style="height: 20vh; overflow: hidden;">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="orange"
              text
            >
              Share
            </v-btn>

            <v-btn
              color="orange"
              text
            >
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card
          class="mx-auto pa-3"
          max-width="100%"
          height="500px"
        >
          <v-layout>
            <v-flex md9>
              <v-card flat height="200" style="align-content: center;">
                <v-card-title>Mission</v-card-title>
                <v-card-subtitle style="text-align: justify;">
                  Barangay Tres de Mayo aspires to be a pro-family, peaceful, socially nurturing, economically prosperous, politically fair, and environmentally friendly community in the city of Digos.
                </v-card-subtitle>
              </v-card>
            </v-flex>
            <v-flex md3 style="text-align: center; align-content: center;">
              <v-card class="pa-3" outlined>
                <v-avatar
                  color="transparent"
                  size="180"
                  tile
                >
                  <v-img :src="mission" alt="mission"></v-img>
                </v-avatar>
              </v-card>
                
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex md3 style="text-align: center; align-content: center;">
              <v-card class="pa-3" outlined>
                <v-avatar
                  color="transparent"
                  size="180"
                  tile
                >
                  <v-img :src="vision" alt="vision"></v-img>
                </v-avatar>
              </v-card>
            </v-flex>
            <v-flex md9>
              <v-card flat height="270" style="align-content: center;">
                <v-card-title>Vision</v-card-title>
                <v-card-subtitle style="text-align: justify;">
                  <p>To attain its vision, the Barangay government states its role as follows:</p>
                  <ul
                  >
                    <li>To inculcate family values and the importance of a strong and stable family in building a strong and stable society.</li>
                    <li>To sustain and preserve peace.</li>
                    <li>To promote social and moral values and relations among the residents of the Barangay.</li>
                    <li>To encourage commercial, industrial, and agricultural investments that will lead to economic progress.</li>
                    <li>To promote and advocate for environmental preservation and protection.</li>
                  </ul>
                </v-card-subtitle>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>

    <!-- official -->
    <v-row id="officials">
      <v-col cols="12" class="text-center">
        <h1>
          OFFICIALS
        </h1>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-flex lg12 class="text-center">
          <v-avatar size="150">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="300"
              max-width="500"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-avatar>


          <v-flex lg12>
            Monkey D. Luffy<br>
            Position
          </v-flex>
        </v-flex>

        <v-layout row wrap  class="text-center">
          <v-flex lg3 pa-2 v-for="(item, index) in 8" :key="index">
            <v-avatar size="100">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="300"
                max-width="500"
                src="https://picsum.photos/id/11/500/300"
              ></v-img>
            </v-avatar>

            <v-flex lg12>
              Monkey D. Luffy<br>
              Position
            </v-flex>
          </v-flex>
        </v-layout>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-flex lg12 class="text-center">
          <v-avatar size="150">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="300"
              max-width="500"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-avatar>


          <v-flex lg12>
            Monkey D. Luffy<br>
            Position
          </v-flex>
        </v-flex>

        <v-layout row wrap  class="text-center">
          <v-flex lg3 pa-2 v-for="(item, index) in 8" :key="index">
            <v-avatar size="100">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="300"
                max-width="500"
                src="https://picsum.photos/id/11/500/300"
              ></v-img>
            </v-avatar>

            <v-flex lg12>
              Monkey D. Luffy<br>
              Position
            </v-flex>
          </v-flex>
        </v-layout>
        </v-card>
      </v-col>
    </v-row>

    <!-- contact us-->

    <!-- <v-flex lg12>
      <v-parallax :src="require('@/static/images/1.jpg')"  style="margin-top: 2%; height: 40vh;">
      
      <v-row style="margin-top: 5%;">
        <v-col 
          class="text-center"
          cols="6"
        >
            <v-text-field
            solo
            label="Name"
            v-model="form.name"
            clearable
          ></v-text-field>
          <v-text-field
            solo
            label="Contact Number"
            v-model="form.mobilenumber"
            clearable
          ></v-text-field>
          <v-text-field
            solo
            label="Email"
            v-model="form.email"
            clearable
          ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-textarea
              auto-grow
              v-model="form.message"
              label="Message"
              rows="3"
              row-height="40"
              solo
            ></v-textarea>
            <v-btn block large @click="sendcontact()"> SEND</v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      timeout="3000"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar> -->
  </v-container>
</template>
<script>
  import axios from 'axios'
  import Global from '~/plugins/mixins/global'

  export default {
    data: () => ({
      vision: require('@/assets/images/vision.png'),
      mission: require('@/assets/images/mission.png'),
      links: [
        {goto: 'home', txt: 'Home'},
        {goto: 'services', txt: 'Services'},
        {goto: 'about', txt: 'About'},
        {goto: 'officials', txt: 'Officials'},
        {goto: 'contactus', txt: 'Contact Us'},
      ],
      length: 2,
      window: 0,
      carouselitems: [
        {
          src: require('@/static/images/1.jpg'),
        },
        {
          src: require('@/static/images/2.jpg'),
        },
        {
          src: require('@/static/images/3.jpg'),
        },
        {
          src: require('@/static/images/4.jpg'),
        },
      ],
      form: {},
      snackbar: false,
      text: '',
      services: [],
      announcements: {},
      events: {},
      announcexevents: []
    }),
    mixins: [Global],
    methods: {  
      scrollToTarget(param) {
        console.log(param)
        if (param == 'contactus') {
          this.goTo('/contactus')
        } else {
          const targetElement = document.getElementById(param);
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
      async sendcontact () {
        await axios.post('http://20.189.115.250/api/create-contact-us', this.form).then(data => {
          this.text = data.data ? data.data.data : '' 
          this.snackbar = true
          this.form = {}
        })
      },
      async getallbarangay () {
        await axios.get('http://20.189.115.250/api/get-all-barangay').then(data => {
          this.services = data.data
          this.getallannouncements()
        })
      },
      async getallannouncements () {
        await axios.get('http://20.189.115.250/api/get-all-announcements').then(data => {
          data.data.forEach(announcement => {
            // Perform your operations with each announcement
            this.announcexevents.push(announcement)
          });
          this.getallevents()
        })
      },
      async getallevents () {
        await axios.get('http://20.189.115.250/api/get-all-events').then(data => {
          // this.events = data.data

          data.data.forEach(announcement => {
            // Perform your operations with each announcement
            this.announcexevents.push(announcement)
          });
        })
      }
    },
    created () {
      this.getallbarangay()
    }
  }
</script>

<style scoped>
.custom-image-class {
  max-height: 950px; /* Set your desired height here */
}
.ph--eye {
  display: inline-block;
  width: 96px;
  height: 96px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath fill='%2309900b' d='M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32'/%3E%3C/svg%3E");
}
.streamline--target {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cg fill='none' stroke='%2309900b' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13.48 7.516a6.5 6.5 0 1 1-6.93-7'/%3E%3Cpath d='M9.79 8.09A3 3 0 1 1 5.9 4.21M7 7l2.5-2.5m2 .5l-2-.5l-.5-2l2-2l.5 2l2 .5z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>

