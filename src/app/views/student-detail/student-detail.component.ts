import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/core/services/student.service';
import { Student } from 'src/app/core/models/student';
import { ActivatedRoute } from '@angular/router';
import { first, flatMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
    selector: 'student-detail',
    templateUrl: 'student-detail.component.html'
})
export class StudentDetailComponent implements OnInit {

    studentForm: FormGroup

    constructor(
        formBuilder: FormBuilder,
        private studentService: StudentService,
        private activatedRoute: ActivatedRoute
    ) {
        this.studentForm = formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            class: ['', [Validators.required]]
        })
    }

    ngOnInit() {

        this
            .activatedRoute
            .params
            .pipe(
                first(),
                flatMap(
                    params => {
                        if(params.studentId){
                            console.log("params", params);
                            return this.studentService
                            .getStudentById(params.studentId)
                        }else{
                            
                            throwError({
                                error: 'This will be required to add new student'
                            })
                        }
                    }
                )
            )
            .subscribe(
                student => {
                    console.log("student", student)
                    this.studentForm.setValue(student);
                },
                error => {
                    console.error(error);
                },
                () => {
                    console.log('completed')
                }
            )

        //
    }

    addStudent() {
        this.studentService
            .addStudent(
                this.studentForm.value
            )
            .subscribe(
                student => {
                    console.log(student);
                }
            )
    }

}