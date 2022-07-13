<!--  <nav>-->
<!--    <button v-if="isAuthenticated" @click="logout">Logout</button>-->
<!--    <button v-else @click="login">Login</button>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/flashcard/create">Create Flashcard</router-link>-->
<!--  </nav>-->
<template>
  <div class="h-full flex">
    <!-- Narrow sidebar -->
    <div class="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
      <div class="w-full py-6 flex flex-col items-center">
        <div class="flex-shrink-0 flex items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow" />
        </div>
        <div class="flex-1 mt-6 w-full px-2 space-y-1">
          <a v-for="item in sidebarNavigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white', 'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium']" :aria-current="item.current ? 'page' : undefined">
            <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white', 'h-6 w-6']" aria-hidden="true" />
            <span class="mt-2">{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog as="div" class="relative z-20 md:hidden" @close="mobileMenuOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-1 right-0 -mr-14 p-1">
                  <button type="button" class="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white" @click="mobileMenuOpen = false">
                    <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    <span class="sr-only">Close sidebar</span>
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-shrink-0 px-4 flex items-center">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow" />
              </div>
              <div class="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                <nav class="h-full flex flex-col">
                  <div class="space-y-1">
                    <a v-for="item in sidebarNavigation" :key="item.name" @click="$router.push(item.href)" :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white', 'group py-2 px-3 rounded-md flex items-center text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
                      <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white', 'mr-3 h-6 w-6']" aria-hidden="true" />
                      <span>{{ item.name }}</span>
                    </a>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Content area -->
    <div class="flex-1 flex flex-col overflow-hidden">
<!--      <TopNavbar/>-->

      <!-- Main content -->
      <router-view/>

      <!--      <div class="flex-1 flex items-stretch overflow-hidden">
              <main class="flex-1 overflow-y-auto">
                &lt;!&ndash; Primary column &ndash;&gt;
                <section aria-labelledby="primary-heading" class="min-w-0 flex-1 h-full flex flex-col lg:order-last">
                  <h1 id="primary-heading" class="sr-only">Photos</h1>
                  &lt;!&ndash; Your content &ndash;&gt;
                </section>
              </main>

              &lt;!&ndash; Secondary column (hidden on smaller screens) &ndash;&gt;
              <aside class="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block">
                &lt;!&ndash; Your content &ndash;&gt;
              </aside>
            </div>-->
    </div>
  </div>


</template>

<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  PhotographIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/vue/outline'
import TopNavbar from "@/components/Layout/TopNavbar";

const sidebarNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  { name: 'Videos', href: '/videos', icon: ViewGridIcon, current: false },
  { name: 'Highlights', href: '/highlights', icon: PhotographIcon, current: true },
  { name: 'Settings', href: '/settings', icon: CogIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

const mobileMenuOpen = ref(false)
</script>

<script>
import {useAuth0} from '@auth0/auth0-vue';

export default {
  setup() {
    const {getAccessTokenSilently} = useAuth0();
    const {loginWithRedirect, user, isAuthenticated} = useAuth0();

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
      this.$auth0.logout({returnTo: this.$auth0.redirectUri})
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

@import "./assets/output.css";

</style>



