<template>
    <v-dialog v-model='dialog' persistent max-width='650'>
      <v-card>
        <v-card-title>Вход</v-card-title>
        <div class='px-5'>
          <v-text-field v-model='form.api_key' placeholder='Api-Key'/>
          <v-text-field v-model='form.client_id' placeholder='Client-Id'/>
        </div>
        <v-card-actions>
          <v-spacer/>
          <v-slide-x-transition>
            <div v-if='error' class='mx-2' @click='closeError' style='cursor: pointer;color: red'>Пользователь с такими данными не найден</div>
          </v-slide-x-transition>
          <v-btn @click='login(form)' :loading='loading'>Войти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import OzonService from '../services/OzonService'

export default {
  layout: 'login',
  data: () => ({
    dialog: true,
    loading: false,
    error: false,
    timer: null,
    form: {
      client_id: '',
      api_key: ''
    },
  }),
  methods: {
    async login(form){
      this.loading = true;
      try {
        await OzonService.login(form);
        this.$store.commit('user/setCredentials', form)
        await this.$router.push('/all-categories');
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false;
      }
    },
    closeError(){
      this.error = false;
      clearTimeout(this.timer)
    }
  },
  watch: {
    error(val){
      if (val) {
        this.timer = setTimeout(() => this.error = false, 5000)
      }
    }
  },
}
</script>

