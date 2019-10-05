import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/core/models/student';
import { StudentService } from 'src/app/core/services/student.service';
import { Router } from '@angular/router';

@Component({
    selector: 'student-list',
    templateUrl: 'student-list.component.html',
    styleUrls: ['student-list.component.css']
})
export class StudentListComponent implements OnInit{

    students : Student[] = [];

    constructor(
        private studentService: StudentService,
        private router: Router
        ){}

    ngOnInit(){
        this.studentService.getStudents()
        .subscribe(
            students => {
                this.students = students;
            },
            error => {

            },
            () => {
                
            }
        )
    }

    addStudent(){
        console.log("Starting to add student");
        this.router.navigateByUrl('add');
    }
    
}