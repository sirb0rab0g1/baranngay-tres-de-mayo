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
        <v-carousel hide-delimiters height="auto"> 
          <v-carousel-item
            v-for="(item, i) in announcexevents"
            :key="i"
            :src="'http://localhost:5000/' + item.image"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-sheet
              color="grey lighten-3"
              height="100%"
            >
              <v-img :src="'http://localhost:5000/' + item.image" 
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
        class=" pa-4"
        cols="4"
        v-for="(item, index) in services"
        :key="index"
      >
        <div @click="goTo('/login')">
          <v-img
            src="images/tdmlogo.png"
         
            class="white--text align-center "
            gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5)"
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

      <v-col cols="6" pa-2>
        <v-card
          class="mx-auto"
          
        >
          <v-img
            class="white--text align-center"
            height="auto"
          gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.7)"

            src="images/1.jpg"
          >
       


            <v-card-title>History</v-card-title>
          

          <v-card-text>
            

           Early in the nineteen century (19th) only few are living in this Barangay, those individual person our brothers & sisters who are the "lumad" particularly the Bagobo tribe. Many are interested to live in this Barangay, because of its abundant land. 
When they arrived in this place, they practiced their customs and tradition as Christian like Mr. Enrique Cimafranca who is devoted to his patron Sr. Sta Cruz. He celebrate the feast day of his saint every 3rd day of May together with his family. During his victorious celebration for his patron Sta. Cruz he invite his neighbors to attend a pulong-pulong concerning their feast and what patron/saint they are going to celebrate. 

The residents during that time, are united until this became "Baranggay Tres de Mayo" it was born on 1927 and this barangay belongs to the municipality of Sta. Cruz. Barangay Tres de Mayo was the mother barangay in the municipality of Digos.


          </v-card-text>
       

          </v-img>

        </v-card>

      </v-col>

      <!-- Mission and Vision -->
      <v-col cols="6">
       <v-card
          class="mx-auto"
          
        >
          <v-img
            class="white--text align-center"
            height="auto"
          gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.7)"

            src="images/mvbgimg.jpg"
          >
       


           <v-card-title>Mission</v-card-title>
                <v-card-subtitle style="text-align: justify;">
                  Barangay Tres de Mayo aspires to be a pro-family, peaceful, socially nurturing, economically prosperous, politically fair, and environmentally friendly community in the city of Digos.
                </v-card-subtitle>

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
       

          </v-img>

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
        <v-card max-width="92%" style = "margin-left: 25px;">
          <v-flex lg12 class="text-center" style = "padding: 10px">
          <v-avatar size="100">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="300"
              max-width="500"
              :src="skhead.src"
            ></v-img>
          </v-avatar>


          <v-flex>
            <div style = "font-size: 15px; font-weight: bold; margin-bottom: -26px;">  {{ skhead.name }} </div> <br>
            <div style = "font-size: 11px;">
            {{ skhead.position }}  </div> 
          </v-flex>
        </v-flex>

        <v-layout row wrap  class="text-center">
          <v-flex pa-2 v-for="(item, index) in sk" :key="index">
            <v-avatar size="90">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="300"
                max-width="500"
                :src="item.src"
              ></v-img>
            </v-avatar>

            <v-flex lg12>
            <div style = "font-size: 15px; font-weight: bold; margin-bottom: -26px;"> 
              {{ item.name }} </div>  <br>
             <div style = "font-size: 11px;"> {{ item.position }} </div> 
            </v-flex>
          </v-flex>
        </v-layout>
        </v-card>
      </v-col>



      <v-col cols="6">
        <v-card max-width="95%" style = "margin-right: 20px;">
          <v-flex lg12 class="text-center" style = "font-size: 15px; padding: 10px">
          <v-avatar size="100">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="300"
              max-width="500"
              :src="brgyhead.src"
            ></v-img>
          </v-avatar>
<v-flex lg12>
          <div style = "font-size: 15px; font-weight: bold; margin-bottom: -26px;"> 
            {{ brgyhead.name }}  </div>  <br>
            <div style = "font-size: 11px;"> {{ brgyhead.position }} </div> 
          </v-flex>
        </v-flex>

        <v-layout row wrap  class="text-center">
          <v-flex pa-2 v-for="(item, index) in brgy" :key="index">
            <v-avatar size="90">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="300"
                max-width="500"
                :src="item.src"
              ></v-img>
            </v-avatar>

            <v-flex lg12>
            <div style = "font-size: 15px; font-weight: bold; margin-bottom: -26px;"> 
              {{ item.name }} </div> <br>
              <div style = "font-size: 11px; padding: 2px;"> {{ item.position }}  </div> 
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
      brgyhead: {
        src: require('@/static/images/LABAJO.jpg'),
        name: 'Hon. Dominic Labajo',
        position: 'SK Chairman'
      },
      brgy: [
        {
          src: require('@/static/images/JASMINE.jpg'),
          name: 'Hon. Jasmine Ramos',
          position: 'SK Kagawad'
        },
        {
          src: require('@/static/images/NER.jpg'),
          name: 'Hon. Nikki Ner',
          position: 'SK Kagawad'
        },
        {
          src: require('@/static/images/DACER.jpg'),
          name: 'Hon. Princess Dacer',
          position: 'SK Kagawad'
        },
        {
          src: require('@/static/images/MARANAN.jpg'),
          name: 'Hon. Darlene Marañan',
          position: 'SK Kagawad'
        },
        {
          src: require('@/static/images/NAVARO.jpg'),
          name: 'Hon. Bea Dianne Navarro',
          position: 'SK Kagawad'
        },
        {
          src: require('@/static/images/SENAJON.jpg'),
          name: 'Hon. Louie Senajon',
          position: 'SK Kagawad'
        },
        {
          src: require('@/static/images/AGTONG.jpg'),
          name: 'Hon. Grace Agtong',
          position: 'SK Kagawad'
        }
      ],
      skhead: {
        src: require('@/static/images/KAP.jpg'),
        name: 'Hon. Oscar Bucol',
        position: 'Barangay Chairman'
      },
      sk: [
        {
          src: require('@/static/images/WADBUCOL.jpg'),
          name: 'Hon. Jeric Bucol',
          position: 'Barangay Kagawad'
        },
        {
          src: require('@/static/images/CASTILLO.jpg'),
          name: 'Hon. Marlon Castillo',
          position: 'Barangay Kagawad'
        },
        {
          src: require('@/static/images/NUESCA.jpg'),
          name: 'Hon. Rey Nuesca',
          position: 'Barangay Kagawad'
        },
        {
          src: require('@/static/images/BARRETO.jpg'),
          name: 'Hon. Albert Barreto',
          position: 'Barangay Kagawad'
        },
        {
          src: require('@/static/images/ALCOVER.jpg'),
          name: 'Hon. Bobong Alcover',
          position: 'Barangay Kagawad'
        },
        {
          src: require('@/static/images/CAIMAN.jpg'),
          name: 'Hon. Arvin Caiman',
          position: 'Barangay Kagawad'
        },
        {
          src: require('@/static/images/BAGNOL.jpg'),
          name: 'Hon. Alfe Bagnol',
          position: 'Barangay Kagawad'
        }
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
        await axios.post('http://localhost:5000/create-contact-us', this.form).then(data => {
          this.text = data.data ? data.data.data : '' 
          this.snackbar = true
          this.form = {}
        })
      },
      async getallbarangay () {
        await axios.get('http://localhost:5000/get-all-barangay').then(data => {
          this.services = data.data
          this.getallannouncements()
        })
      },
      async getallannouncements () {
        await axios.get('http://localhost:5000/get-all-announcements').then(data => {
          data.data.forEach(announcement => {
            // Perform your operations with each announcement
            this.announcexevents.push(announcement)
          });
          this.getallevents()
        })
      },
      async getallevents () {
        await axios.get('http://localhost:5000/get-all-events').then(data => {
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
.history{
  text-indent:50px;
  text-align: justify;
}
</style>

