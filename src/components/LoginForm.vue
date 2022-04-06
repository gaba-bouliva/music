<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <!-- alert msg -->
      <div
        v-show="login_show_alert"
        :class="login_alert_bg_color"
        class="mb-3 py-5 text-white font-bold text-center"
      >
        {{ login_alert_msg }}
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      login_show_alert: false,
      login_in_submission: false,
      login_alert_bg_color: "bg-blue-500",
      login_alert_msg: "",
    };
  },

  methods: {
    async onSubmit() {
      this.login_show_alert = true;
      this.login_in_submission = true;
      this.login_alert_bg_color = "bg-blue-500";
      this.login_alert_msg = "Please wait! Your credentials are processed...";

      const auth = getAuth();
      let userCredential;

      try {
        userCredential = await signInWithEmailAndPassword(
          auth,
          this.formData.email,
          this.formData.password
        );
        console.log(userCredential);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_bg_color = "bg-red-500";

        let errorMsg = error.message.split(" ").join(" "); // converts error message to string
        if (
          errorMsg.includes("user") ||
          errorMsg.includes("email") ||
          errorMsg.includes("password")
        ) {
          this.login_alert_msg = "Wrong email or password! Try agin.";
        } else {
          this.login_alert_msg =
            "An unexpected error occured. Please try again later.";
        }

        return;
      }

      this.login_alert_bg_color = "bg-green-500";
      this.login_alert_msg = "Success! Your account has been created.";
    },
  },
};
</script>
