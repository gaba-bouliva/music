<template>
  <!-- Auth Modal -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !getAuthModalShow }"
    id="modal"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50">
              <i class="fas fa-times" @click="toggleAuthModalShow"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'register',
                }"
                href="#"
                @click.prevent="tab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover:text-blue-600': tab === 'login',
                }"
                @click.prevent="tab = 'register'"
                >Register</a
              >
            </li>
          </ul>

          <!-- Login Form -->
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              v-show="tab === 'login'"
              @submit.prevent="handleSubmit(onSubmitLogin)"
            >
              <!-- Email -->
              <div class="mb-3">
                <label class="inline-block mb-2">Email</label>
                <ValidationProvider
                  name="Email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <input
                    type="email"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Email"
                    v-model="loginFormData.email"
                  />
                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Password -->
              <div class="mb-3">
                <label class="inline-block mb-2">Password</label>
                <ValidationProvider
                  name="Password"
                  rules="required|max:12|min:6"
                  v-slot="{ errors }"
                >
                  <input
                    type="password"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Password"
                    v-model="loginFormData.password"
                  />

                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <button
                type="submit"
                class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
              >
                Submit
              </button>
            </form>
          </ValidationObserver>

          <!-- Registration Form -->
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              v-show="tab === 'register'"
              @submit.prevent="handleSubmit(onSubmitRegister)"
            >
              <!-- Name -->
              <div class="mb-3">
                <label class="inline-block mb-2">Name</label>
                <ValidationProvider
                  name="Name"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Name"
                    v-model="registerFormData.name"
                  />
                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Email -->
              <div class="mb-3">
                <label class="inline-block mb-2">Email</label>
                <ValidationProvider
                  name="Email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <input
                    type="email"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Email"
                    v-model="registerFormData.email"
                  />
                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Age -->
              <div class="mb-3">
                <label class="inline-block mb-2">Age</label>
                <ValidationProvider
                  name="Age"
                  rules="required|digits:2"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="registerFormData.age"
                    type="number"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                  />
                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Password -->
              <div class="mb-3">
                <label class="inline-block mb-2">Password</label>
                <ValidationProvider
                  name="Password"
                  rules="required|max:12|min:6"
                  v-slot="{ errors }"
                >
                  <input
                    type="password"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Password"
                    v-model="registerFormData.password"
                  />

                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Confirm Password -->
              <div class="mb-3">
                <label class="inline-block mb-2">Confirm Password</label>
                <ValidationProvider
                  name="Confrim Password"
                  rules="required|confirmed:Password"
                  v-slot="{ errors }"
                >
                  <input
                    type="password"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Confirm Password"
                    v-model="registerFormData.confirmedPassword"
                  />

                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Country -->
              <div class="mb-3">
                <label class="inline-block mb-2">Country</label>
                <ValidationProvider
                  name="Country"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select
                    v-model="registerFormData.country"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                  >
                    <option value="CMR">CMR</option>
                    <option value="IT">IT</option>
                    <option value="USA">USA</option>
                  </select>

                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- TOS -->
              <div class="mb-3 pl-6">
                <ValidationProvider
                  name="Accept Terms"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div>
                    <input
                      type="checkbox"
                      class="w-4 h-4 float-left -ml-6 mt-1 rounded"
                      v-model="registerFormData.acceptTerms"
                    />
                    <label class="inline-block">Terms of service</label>
                  </div>

                  <span class="text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <button
                type="submit"
                class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
              >
                Submit
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppAuth",
  data() {
    return {
      tab: "login",
      registerFormData: {
        name: "",
        email: "",
        password: "",
        confirmedPassword: "",
        age: null,
        country: "",
        termOfServiceChecked: null,
        acceptTerms: null,
      },
      loginFormData: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions("auth", ["toggleAuthModalShow"]),

    onSubmitLogin() {
      console.log(this.loginFormData);
    },

    onSubmitRegister() {
      if (this.registerFormData.acceptTerms === false) {
        this.registerFormData.acceptTerms = null;
      }
      console.log(this.registerFormData);
    },
  },
  computed: {
    ...mapGetters("auth", ["getAuthModalShow"]),
  },
};
</script>
<style scoped>
.red {
  color: red;
}
</style>
