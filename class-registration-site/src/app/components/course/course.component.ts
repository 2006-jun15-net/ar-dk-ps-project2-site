import { Component, OnInit } from '@angular/core';

import { Section } from '../../models/models';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
// TODO Should probably be called 'Enrollment Component'
export class CourseComponent {

  sections!: Section[];

  constructor(private courseService: CourseService) { }

  searchByName(name: string) {

    this.courseService.getSectionsByCourseName(name).then(

      service => service.subscribe(

        value => {
          console.log(value); this.sections = value;
        },
        error => console.log(error)
      )
    )
  }

  searchByInstructor(name: string) {

    this.courseService.getSectionsByInstructorName(name).then(

      service => service.subscribe(

        value => this.sections = value,
        error => console.log(error)
      )
    )
  }

  searchByCourseId(id: number) {

    this.courseService.getSectionsByCourseId(id).then(

      service => service.subscribe(

        value => this.sections = [value],
        error => console.log(error)
      )
    );
  }

  enrollInCourse(sectId: number) {

    this.courseService.enrollStudent(sectId, localStorage['studentId']).then(

      service => service.subscribe(

        _ => { },
        error => console.log(error)
      )
    );

    alert("Successfully Enrolled");
  }
}
