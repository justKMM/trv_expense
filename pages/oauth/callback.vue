<template>
  <div>
    <p v-if="authCode">Authorization Code: {{ authCode }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
definePageMeta({
  layout: false
});

export default {
  data() {
    return {
      authCode: null,
      error: null
    };
  },
  async mounted() {
    const query = this.$route.query;
    if (query.code) {
      this.authCode = query.code;
      try {
        await this.exchangeAuthCodeForToken(query.code);
      } catch (err) {
        this.error = err.message;
      }
    } else {
      this.error = 'Authorization code not found';
    }
  },
  methods: {
    async exchangeAuthCodeForToken(code) {
      try {
        const response = await fetch('/api/zoho/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Log the raw response
        const data = await response.json();
        console.log('Token API response:', data);
        
        // Log the access token directly
        console.log('Access Token:', data.access_token);
        // TODO: Store the access token securely (e.g., in Vuex store, or a secure cookie)
      } catch (error) {
        console.error('Error fetching OAuth token:', error);
        throw error;
      }
    }
  }
}
</script>
