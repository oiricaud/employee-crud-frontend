import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./service/employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'hireDate', 'role', 'jokes'];

  dataSource = EMPLOYEE_DATA;
  title = 'employee-crud-frontend';
  constructor(private employeeService: EmployeeService) {
    console.table(EMPLOYEE_DATA);
  }
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.employeeService.getAllEmployees().subscribe(result => {
      // Read the result field from the JSON response.
      console.table(EMPLOYEE_DATA);
      console.table(result.employees.length);
      for (let i = 0; i < result.employees.length; i++) {
        EMPLOYEE_DATA.push(result.employees[i]);
      }
      this.dataSource = [...this.dataSource]; // refreshes table
    });
  }
}

export interface EmployeeInterface {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  role: string;
  jokes: [any]
}
let EMPLOYEE_DATA: EmployeeInterface[] = [];
