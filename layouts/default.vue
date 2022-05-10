<template>
  <v-app dark>
    <div style='margin: auto' v-if='loading'>
      <v-progress-circular indeterminate size='75'/>
    </div>
    <div v-else>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="'Пользователь ' + userId"  v-if='userId'/>
        <v-spacer/>
        <v-btn @click='logout'>Выход</v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
        <v-list>
          <v-list-item @click.native="right = !right">
            <v-list-item-action>
              <v-icon light> mdi-repeat </v-icon>
            </v-list-item-action>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import OzonService from '../services/OzonService'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Категории',
          to: '/all-categories',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Загруженные товары',
          to: '/product/list',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Новый продукт',
          to: '/product/new',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      loading: false,
    }
  },
  computed: {
    userId(){
      return this.$store.state.user.credentials.client_id;
    }
  },
  methods: {
    logout(){
      this.$router.push('/')
      localStorage.removeItem('credentials');
    },
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
  },
  mounted() {
    let credentials = localStorage.getItem('credentials');

    if (credentials) {
      credentials = JSON.parse(credentials);
      this.login(credentials);
    }
  }
}
</script>
