import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./service/employee.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class AppComponent implements OnInit {
  columnsToDisplay = ['id', 'firstName', 'lastName', 'hireDate', 'role'];
  expandedElement: EmployeeInterface | null;

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
