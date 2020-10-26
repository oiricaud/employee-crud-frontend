import {Employee} from "../model/Employee";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  })
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let myError: string = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      myError = 'An error occurred' + error.error.message;
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      myError = 'Backend returned code ' + JSON.stringify(error.status) + ', body was: ' +  error.error;
      console.error(
        `Backend returned code ${JSON.stringify(error.status)}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.' + myError);
  }

  getAllEmployees(): any {
    return this.http.get(environment.baseUrl + '/api/employees', httpOptions).pipe(catchError(this.handleError));

  }
  createEmployee( loggedInEmployee: Employee,newEmployee: Employee): Observable<Employee> {
    const employees: Employee[] = [];
    employees.push(loggedInEmployee);
    employees.push(newEmployee);
    return this.http.post<Employee>(environment.baseUrl + 'employees/add', employees, httpOptions).pipe(catchError(this.handleError));
  }

}

