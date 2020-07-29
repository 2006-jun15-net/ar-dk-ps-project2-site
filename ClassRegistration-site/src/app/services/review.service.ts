import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/models';
import { API_ORIGIN, API_HEADERS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  async getByCourse(courseId: number): Promise<Observable<Review[]>> {

    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get<Review[]>(`${API_ORIGIN}/api/Reviews/${courseId}`, API_HEADERS(accessToken));
  }
}
