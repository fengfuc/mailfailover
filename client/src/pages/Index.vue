<template>
  <q-page class="mail-page flex flex-center">
    <q-card inline style="width: 500px">
      <q-card-title>
        Mail form
      </q-card-title>
      <q-card-main>
        <q-input v-model="from" float-label="Sender mail address" placeholder="sender@example.com" />
        <q-input v-model="to" float-label="Receiver mail address" placeholder="r1@example.com,r1@example.com" />
        <q-input v-model="subject" float-label="Subject" placeholder="Hello from Jane" />
        <q-input v-model="text" type="textarea" float-label="Main content" placeholder="Hi John, ..." />
      </q-card-main>
      <q-card-separator />
      <q-card-actions align="center">
        <q-btn @click="sendMail" icon="mail" color="primary" class="q-mt-lg text-center" label="Send"></q-btn>
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<style scoped lang='stylus'>
.box
  width 90%
  max-width 420px
</style>

<script>
import { QInput, QCard, QCardTitle, QCardMain, QCardActions, QCardSeparator } from 'quasar'

export default {
  name: 'MailPage',
  components: { QInput, QCard, QCardTitle, QCardMain, QCardActions, QCardSeparator },
  data() {
    return {
      from: null,
      to: null,
      subject: null,
      text: null
    }
  },

  created() {
    // for test only
    // this.from = 'fengfu.chen@gmail.com'
    // this.to = 'kentroad@gmail.com, fengfu.chen@gmail.com'
    // this.subject = null,
    // this.text = 'Mail body'
  },

  methods: {

    notify(message, type) {
        this.$q.notify({
          message: message,
          type: type
        })
    },

    sendMail() {
      console.log(this.from, this.to, this.subject, this.text)
      this.$axios.post('/api/sendmail', {
        from: this.from,
        to: this.to.replace(/\s+/g, ''),
        subject: this.subject || 'Mail@' + new Date().toJSON(),
        text: this.text
      })
      .then(res => {
        res.data.status === 'failed' ? this.notify('Mail sent failed', 'negative') : this.notify('Mail sent', 'positive')
        console.log(res)
      })
      .catch(err => {
        this.notify(err, 'negative')
        console.log(err)
      })
    }
  },
}
</script>
