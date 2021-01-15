import { Component } from '@angular/core';
import { CustomersService } from '../../services/customers.services';
export interface Customer {
  name: string;
  secondName: string;
  fullName: string;
  locationAbb: string;
  location: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  displayedColumns: string[] = ['name', 'secondName', 'fullName', 'locationAbb', 'location'];
  dataSource = [];
  public provinces = {
    "NL": "Newfoundland and Labrador",
    "PE": "Prince Edward Island",
    "NS": "Nova Scotia",
    "NB": "New Brunswick",
    "QC": "Quebec",
    "ON": "Ontario",
    "MB": "Manitoba",
    "SK": "Saskatchewan",
    "AB": "Alberta",
    "BC": "British Columbia",
    "YT": "Yukon",
    "NT": "Northwest Territories",
    "NU": "Nunavut"
  }

  constructor(
    private customersService: CustomersService) {

    this.customersService.getList()
      .subscribe(res => {
        res.map(i => {
          const name = i.name.split(' ');
          this.dataSource.push({
            name: name[0],
            secondName: name[1],
            fullName: i.name,
            locationAbb: i.location,
            location: this.provinces[i.location],
            active: i.active
          })
        })
      })

  }
}
