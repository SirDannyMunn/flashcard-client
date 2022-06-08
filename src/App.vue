<template>
  <nav>
    <button v-if="isAuthenticated" @click="logout">Logout</button>
    <button v-else @click="login">Login</button>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { getAccessTokenSilently } = useAuth0();
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    return {
      doSomethingWithToken: async () => {
        const token = await getAccessTokenSilently();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },
      user,
      isAuthenticated
    };
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect()
    },
    logout() {
      this.$auth0.logout({ returnTo: this.$auth0.redirectUri })
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
