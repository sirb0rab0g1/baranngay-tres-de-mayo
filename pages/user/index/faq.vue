<template>
  <v-container fluid>
    <no-ssr>
      <v-layout my-3 mx-2>
        <v-flex>
          <h2>FAQ</h2>
        </v-flex>
      </v-layout>

      <v-layout mx-2>
        <v-flex>
          <v-card style="border: solid 1px #a9a9a9; border-radius: 15px" class="elevation-0 pa-3 pb-10">
            <template>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item,i) in items"
                  :key="i"
                >
                  <v-expansion-panel-header>
                    {{ item.title }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ item.desc}}                 
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </template>
          </v-card>
        </v-flex>
      </v-layout>
    </no-ssr>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          title: 'What type of documents can be processed at the barangay hall?', 
          desc: 'Documents that are commonly processed in the barangay hall are, barangay certificates, certificate of indegency and cedula.'
        },
        {
          title: 'How can i apply for a brgy certificate?', 
          desc: 'You can visit our website and go to services, you can see the services offered by the barangay.'
        },
        {
          title: 'What documents are usually required for document processing?', 
          desc: 'Dociments comonly required valid IDs (governement issued id such as national id, drivers liscense, passport).'
        },
        {
          title: 'How long does the document processing usually take?', 
          desc: 'Processing times can vary depending on the complexity of the transaction and the efficiency of the barangay office. Simple transactions like barangay certificates can often be completed within the same day, while more complex matters may take longer, sometimes requiring several days. But rest assured the office will just text you if the process is done and ready to be picked-up.'
        },
        {
          title: 'Can barangay processing be done online?', 
          desc: 'Yes, our barangay offers online services for the convience of our residents.'
        },
        {
          title: 'What fees are involved in barangay processing?', 
          desc: 'Fees for barangay processing are usually minimal and standardized. They may vary slightly depending on the type of service or certification needed. Examples for cedula the fee will vary by your income'
        },
        {
          title: 'What should I do if I encounter problems during barangay processing?', 
          desc: 'If you encounter issues such as delays, unclear requirements, or difficulties in obtaining documents, it is advisable to communicate directly with barangay officials or staff. Or go to contact us and fill out your concerns, rest assured our admins can provide guidance on the necessary steps or escalate concerns if needed.'
        }
      ]
    })
  }
</script>
