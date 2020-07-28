import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  async response<T>(uri: string): Promise<Observable<T>> {

    const accessToken = await this.oktaAuth.getAccessToken();

    this.oktaAuth.getUser().then(user => console.log(user));

    return this.http.get(uri, {

      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      withCredentials: true

    }).pipe(map<Object, T>(data => data as T));
  }
}
