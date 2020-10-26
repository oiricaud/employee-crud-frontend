import { Component } from '@angular/core';
import {EmployeeService} from "./service/employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  displayedColumns: string[] = ['position', 'firstName', 'weight', 'symbol'];

  dataSource = ELEMENT_DATA;
  title = 'employee-crud-frontend';
  constructor(private employeeService: EmployeeService) {
    this.getEmployees();
    console.table(ELEMENT_DATA);
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(result => {
      // Read the result field from the JSON response.
      console.table(result.employees);
      console.log('employees ' + JSON.stringify(result.employees));
      return result.employees;
    });
  }
}

export interface PeriodicElement {
  firstName: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, firstName: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];
