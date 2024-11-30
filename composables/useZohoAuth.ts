export const useZohoAuth = () => {
  const config = useRuntimeConfig();

  const redirectToZoho = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.public.clientId,
      redirect_uri: config.public.redirectUri,
      scope: 'AaaServer.profile.READ',
      prompt: 'consent',
      access_type: 'offline'
    });
  
    window.location.href = `https://accounts.zoho.eu/oauth/v2/auth?${params.toString()}`
  };

  // Handle OAuth callback
  const handleCallback = async (code: string) => {
    try {
      const response = await $fetch('/api/auth/zoho', {
        method: 'POST',
        body: { code }
      });
      return response;
    }
    catch (error) {
      console.error('Error handling Zoho OAuth Callback:', error);
    }
  }

  return {
    redirectToZoho,
    handleCallback,
  };
}
