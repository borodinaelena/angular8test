import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult = '';
  rowData = {};
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
  firstCustomer = {};

  constructor(
    private customersService: CustomersService,
    private dialog: MatDialog,
    private modalService: NgbModal) {

    this.customersService.getList()
      .subscribe(res => {
        this.firstCustomer = res[0];
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
  update(content, row) {
    this.rowData = row;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    // this.customersService.update(JSON.stringify(this.firstCustomer))
    // .subscribe(res=>{
    //   console.log(res)
    // })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
