// server/api/zoho/token.js
import { defineEventHandler, readBody, sendError } from 'h3';
import fetch from 'node-fetch';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
  // Parse the request body to get the authorization code
  const body = await readBody(event);
  const { code } = body;

  // Check if the authorization code is present
  if (!code) {
    return sendError(event, new Error('Authorization code is required'));
  }

  // Load configuration values from environment variables
  const config = useRuntimeConfig();
  const clientId = config.clientId;
  const clientSecret = config.clientSecret;
  const redirectUri = config.redirectUri;

  console.log('Client ID:', clientId);
  console.log('Client Secret:', clientSecret);
  console.log('Redirect URI:', redirectUri);


  const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';

  // Construct the URL search parameters for the request body
  const urlSearchParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret
  });

  try {
    // Make a POST request to the Zoho token endpoint
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlSearchParams
    });

    // Check if the response status is not OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from Zoho:', errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.error}`);
    }

    // Parse and log the response data
    const data = await response.json();
    console.log('Token API server response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching token:', error);
    return sendError(event, error);
  }
});
