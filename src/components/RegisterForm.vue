<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <!-- alert msg -->
      <div
        v-show="register_show_alert"
        :class="register_alert_bg_color"
        class="mb-3 py-5 text-white font-bold text-center"
      >
        {{ register_alert_msg }}
      </div>
      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <ValidationProvider
          name="Name"
          rules="required|min:3|max:100|alpha_spaces"
          v-slot="{ errors }"
        >
          <input
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Name"
            v-model="formData.name"
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
            v-model="formData.email"
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
            v-model="formData.age"
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
            v-model="formData.password"
          />

          <span class="text-red-500">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <ValidationProvider
          name="Confirmed password"
          rules="required|confirmed:Password"
          v-slot="{ errors }"
        >
          <input
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Password Again"
            v-model="formData.confirmedPassword"
          />

          <span class="text-red-500">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <!-- Country -->
      <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <ValidationProvider name="Country" rules="required" v-slot="{ errors }">
          <select
            v-model="formData.country"
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
              v-model="formData.acceptTerms"
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
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirmedPassword: "",
        age: null,
        country: "",
        termOfServiceChecked: null,
        acceptTerms: null,
      },
      register_show_alert: false,
      register_in_submission: false,
      register_alert_bg_color: "bg-blue-500",
      register_alert_msg: "",
    };
  },
  methods: {
    async onSubmit() {
      if (this.formData.acceptTerms === false) {
        this.formData.acceptTerms = null;
      }

      this.register_show_alert = true;
      this.register_in_submission = true;
      this.register_alert_bg_color = "bg-blue-500";
      this.register_alert_msg = "Please wait! Your account is being created.";

      const auth = getAuth();
      let userCredential = null;
      try {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          this.formData.email,
          this.formData.password
        );
        console.log(userCredential);
      } catch (error) {
        this.register_in_submission = false;
        this.register_alert_bg_color = "bg-red-500";

        let errorMsg = error.message.split(" ").join(" "); // converts error message to string

        if (errorMsg.includes("email")) {
          this.register_alert_msg = "Email not accepted please change email.";
          return;
        }
        this.register_alert_msg =
          "An unexpected error occured. Please try again later.";

        return;
      }

      this.register_alert_bg_color = "bg-green-500";
      this.register_alert_msg = "Success! Your account has been created.";
    },
  },
};
</script>
