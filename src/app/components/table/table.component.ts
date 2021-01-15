import { Component } from '@angular/core';
import { CustomersService } from '../../services/customers.services';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  constructor(
    private customersService: CustomersService) {

    this.customersService.getList()
      .subscribe(res => {
       console.log(res)
      })
  }
}
