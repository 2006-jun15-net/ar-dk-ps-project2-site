import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import {Course} from '../../models/course';
import { StudentDetails } from '../../models/StudentDetails';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  //creating a course array that holds courses
  courses:Course[];

  //creating a detials array to hold a student's information
  details: StudentDetails;
  
  

  //declaring a varible to hold amount owed
  amount: number = 0;


  //last name of a student.
  name: string = '';

  
  //semester variable
  semester:string = '';

  //discount variable
  discount:number = 0;

  //final amount
  finalAmount:number = 0;

  //variable to hold total credits
  totalCredits:number = 0;

  constructor(private _studentService: StudentService) { }

  //getting courses of a particular student
  getCourses(){
    return this._studentService.getCourses(this.details.studentId)
         .subscribe(data => this.courses = data);
  }

  //getting student details
  getStudentDetails(){
    return this._studentService.getStudentDetails(this.name)
           .subscribe(data => this.details = data)

  }

  //getting amount owed
  getAmount(){
    return this._studentService.getAmount(this.details.studentId, this.semester)
           .subscribe(data => this.amount = data)
  }


  //getting the discount.
  getDiscount(){
    return this._studentService.getDiscount(this.details.studentId)
           .subscribe(data => this.discount = data)
  }

  //final Amount to be paid after discount
  getFinalAmount(){

    if(this.amount < this.discount){
      this.finalAmount = 0
      return this.finalAmount;
    }
    
    this.finalAmount = this.amount- this.discount
    return this.finalAmount;
            
  }


  //getting credits
  getTotalCredits(){
    return this._studentService.getTotalCredits(this.details.studentId, this.semester)
           .subscribe(data => this.totalCredits = data )
  }

  ngOnInit(): void {
    
    
  }

  

}
