import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-tax',
  templateUrl: './sales-tax.component.html',
  styleUrls: ['./sales-tax.component.css']
})
export class SalesTaxComponent {

  title = 'sales-tax';
  fileContent: any = '';
  // configurable tax %
  salesTax: number = 10;
  importedTax: number = 5;
  checkoutItems: any = []
  total: any = 0;
  totalSalesTax: any = 0;

  itemTypeMap = [
    'imported'
  ]

  exemptItems = [
    'book',
    'chocolate',
    'pills',
  ]

  //methods
  parseContent() {
    this.total = 0;
    this.totalSalesTax = 0;
    const receiptItems: any = [];
    // split by lines first
    const items = this.fileContent.split('\n');

    items.forEach((i: any) => {
      const temp = i.split(' at');
    });

    this.checkoutItems = [...receiptItems]
  }


  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = (x) => {
      self.fileContent = fileReader.result;
      this.parseContent()
    }
    if (file) {
      fileReader.readAsText(file);
    }

  }

}
