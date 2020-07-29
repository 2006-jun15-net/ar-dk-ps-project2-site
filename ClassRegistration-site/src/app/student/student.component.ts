import { Component, OnInit } from '@angular/core';
import { Student } from '../student-model';
import { StudentService } from '../student.service'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
