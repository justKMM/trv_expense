export interface ZohoTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  }
  
export interface ZohoUser {
  First_Name?: string;
  Last_Name?: string;
  Email: string;
  Display_Name: string;
  ZUID: string;
}
  
export interface ZohoAuthResponse {
  tokens: ZohoTokens;
  user: ZohoUser;
}