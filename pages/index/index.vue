<template>
  <v-container fluid fill-height>
    <v-app-bar
      app
      color="white"
      flat
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
    </v-app-bar>
    <v-row id="home">
      <v-col cols="12">
        <!-- carousel --> 
        <v-carousel hide-delimiters height="950"> 
          <v-carousel-item
            v-for="(item, i) in carouselitems"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-sheet
              color="grey lighten-3"
              height="100%"
            >
              <v-img :src="item.src" 
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
        v-for="item in 8"
      >
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="300"
          max-width="500"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
      </v-col>
    </v-row>

    <!-- announcement and events -->

    <v-row>
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
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary" style="height: 18vh; overflow: hidden;">
            <div>Whitehaven Beach</div>
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
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary" style="height: 18vh; overflow: hidden;">
            <div>Whitehaven Beach</div>
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
    </v-row>

    <!-- About Barangay -->

    <v-row  id="about">
      <v-col cols="12" class="text-center">
        <h1>
          ABOUT BARANGAY
        </h1>
      </v-col>

      <v-col cols="6" pa-3>
        <v-card
          class="mx-auto"
          max-width="100%"
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

      <v-col cols="6">
        <v-card
          class="mx-auto mt-3"
          max-width="100%">
          <v-row align="center" style="margin-left: 20px;">
          <v-item-group
            v-model="window"
            class="shrink mr-6"
            mandatory
            tag="v-flex"
          >
            <v-item
              v-for="n in length"
              :key="n"
              v-slot="{ active, toggle }"
            >
              <div>
                <v-btn
                  :input-value="active"
                  icon
                  @click="toggle"
                >
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </div>
            </v-item>
          </v-item-group>

          <v-col>
            <v-window
              v-model="window"
              class="elevation-1"
              vertical
            >
              <v-window-item
                v-for="n in length"
                :key="n"
              >
                <v-card flat>
                  <v-card-text>
                    <v-row
                      class="mb-4"
                      align="center"
                    >
                      <v-avatar
                        color="grey"
                        class="mr-4"
                      ></v-avatar>
                      <strong class="text-h6">{{ n == 1 ? 'Mission' : 'Vision' }}</strong>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>mdi-account</v-icon>
                      </v-btn>
                    </v-row>

                    <v-responsive
                      class="overflow-y-auto"
                      max-height="400"
                    >
                      <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    </v-responsive>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
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
          <v-flex lg3 pa-2 v-for="item in 8">
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
          <v-flex lg3 pa-2 v-for="item in 8">
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
        </v-layout>
        </v-card>
      </v-col>
    </v-row>

    <!-- contact us-->

    <v-flex lg12 id="contactus">
      <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"  style="margin-top: 2%; height: 40vh;">
      
      <v-row style="margin-top: 5%;">
        <v-col 
          class="text-center"
          cols="6"
        >
            <v-text-field
            solo
            label="Title"
            v-model="form.title"
            clearable
          ></v-text-field>
          <v-text-field
            solo
            label="Date"
            v-model="form.date"
            clearable
          ></v-text-field>
          <v-text-field
            solo
            label="Date"
            v-model="form.date"
            clearable
          ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-textarea
              auto-grow
              label="Four rows"
              rows="3"
              row-height="40"
              solo
            ></v-textarea>
            <v-btn block large> SEND</v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </v-flex>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
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
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
      form: {}
    }),
    methods: {
      scrollToTarget(param) {
        console.log(param)
        const targetElement = document.getElementById(param);
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
</script>

<style scoped>
.custom-image-class {
  max-height: 950px; /* Set your desired height here */
}
</style>

