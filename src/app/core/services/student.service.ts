import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class StudentService {

    constructor(
        private firestore: AngularFirestore
    ) { }

    private students: Student[] = [
        {
            id: 'knoxpo1',
            name: 'Knoxpo',
            class: '1st year'
        },
        {
            id: 'knoxpo2',
            name: 'Knoxpo',
            class: '1st year'
        },
        {
            id: 'knoxpo3',
            name: 'Knoxpo',
            class: '1st year'
        }
    ];

    getStudents(): Observable<Student[]> {

        return this.firestore
        .collection('students')
        .get()
        .pipe(
            map(
                querySnaphot => {
                   return  querySnaphot.docs
                        .map(
                            doc => {
                                return {
                                    id: doc.id,
                                    ...doc.data()
                                } as Student
                            }
                        )
                }
            )
        );
    }

    addStudent(student: Student): Observable<Student> {

        return from(
            this.firestore
            .collection('students')
            .add({
                name: student.name,
                class: student.class
            })
        )
        .pipe(
            map(
                documentReference => {
                    student.id = documentReference.id
                    return student                    
                }
            )
        )


    }

    getStudentById(studentId: string): Observable<Student> {

        /*
        const foundStudent = this.students.find(
            student => student.id == studentId
        )

        if (foundStudent) {
            return of(foundStudent)
        } else {
            return Observable.throw({
                error: `Student of id: ${studentId} not found`
            })
        }
        */

        return this.firestore
        .collection('students')
        .doc(studentId)
        .get()
        .pipe(
            map(
                documentSnapshot => {
                    return {
                        id: documentSnapshot.id,
                        ...documentSnapshot.data()
                    } as Student
                }
            )
        )

    }

}