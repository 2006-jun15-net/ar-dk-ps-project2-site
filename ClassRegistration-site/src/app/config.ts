export const API_ORIGIN = "https://ar-dk-ps-project2.azurewebsites.net";

export function API_HEADERS(accessToken) {

	return {
		headers: {
			Authorization: 'Bearer ' + accessToken
		},
		withCredentials: true
	}
}
