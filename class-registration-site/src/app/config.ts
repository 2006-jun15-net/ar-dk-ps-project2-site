export const API_ORIGIN = "http://localhost:47144"; //"https://ar-dk-ps-project2.azurewebsites.net";

export function API_HEADERS(accessToken: any) {

	return {
		headers: {
			Authorization: 'Bearer ' + accessToken
		},
		withCredentials: true
	}
}

export const AUTH = {

	issuer: 'https://dev-638266.okta.com/oauth2/default',
	redirectUri: location.origin + '/implicit/callback',
	clientId: '0oan3a2afYLWJgufo4x6',
	scopes: ['openid', 'profile', 'email'],
	pkce: true,
}
