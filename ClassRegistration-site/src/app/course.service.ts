import { Injectable } from '@angular/core';
import { FetchDataService } from './fetch-data.service'
import { API_ORIGIN } from './config';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private fetchService: FetchDataService) { }

  async getCourses(studentId: number) {

    const response = await this.fetchService.response(`${API_ORIGIN}/api/student`)
  }
}
