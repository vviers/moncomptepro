// properties of OidcClients are defined here: https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata
// properties id, client_description, created_at, updated_at are non-standard properties
interface OidcClient {
  id: number;
  client_description: string;
  created_at: Date;
  updated_at: Date;
  client_name: string;
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
  post_logout_redirect_uris: string[];
  scope: string;
  client_uri: string;
}
