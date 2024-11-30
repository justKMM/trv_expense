import { defineEventHandler, readBody, createError } from 'h3'
import type { ZohoTokens, ZohoUser, ZohoAuthResponse } from '~/types/zoho'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const response_body = await readBody(event)

  try {
    // Log the parameters
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: config.public.clientId,
      client_secret: config.private.clientSecret,
      redirect_uri: config.public.redirectUri,
      code: response_body.code
    })

    // Validation
    if (!response_body.code) {
      throw createError({
        statusCode: 400,
        message: 'Authorization code is required'
      })
    }
    
    if (!config.private.clientSecret) {
      throw createError({
        statusCode: 500,
        message: 'Client secret is not configured'
      })
    }

    // Step 1: Get Token
    const tokenResponse = await $fetch<ZohoTokens>('https://accounts.zoho.eu/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })

    console.log('Token response:', {
      hasAccessToken: !!tokenResponse.access_token,
      tokenType: tokenResponse.token_type
    })

    if (!tokenResponse?.access_token) {
      throw createError({
        statusCode: 400,
        message: 'No access token in response'
      })
    } 

    // Step 2: Get User Info
    console.log('Fetching user info...')
    const userInfo = await $fetch<ZohoUser>('https://accounts.zoho.eu/oauth/user/info', {
      headers: {
        'Authorization': `${tokenResponse.token_type} ${tokenResponse.access_token}`
      }
    })

    return {
      tokens: tokenResponse,
      user: userInfo
    }

  } catch (error: any) {
    const errorDetails = {
      status: error.status,
      message: error.message,
      response: error.data,
      rawError: error,
      tokenResponse: error.response?.data // Capture the raw response if available
    }
    console.error('Detailed auth error:', JSON.stringify(errorDetails, null, 2))
    throw createError({
      statusCode: error.status || 500,
      message: `Authentication failed: ${error.message}`,
      data: errorDetails
    })
  }
})