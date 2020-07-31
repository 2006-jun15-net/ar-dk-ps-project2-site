import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/models';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {

  public courses!: Course[];
  public viewReviews: boolean = false;

  public pageNumber: number = 0;
  public pageSize: number = 1;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void { }

  findAll() {

    this.courseService.getAll(this.pageNumber, this.pageSize).subscribe(

      value => this.courses = value,
      error => console.log(error)
    );
  }

  searchByName(name: string) {

    this.courseService.getByCourseName(name, this.pageNumber, this.pageSize).subscribe(

      value => this.courses = value,
      error => console.log(error)
    )
  }
}
