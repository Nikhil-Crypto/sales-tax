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
      receiptItems.push(this.calculateTax(temp))
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

  calculateTax(item: any) {
    const originalName = item[0];
    const originalPrice = Number(item[1]);
    let taxPercentage = 0;
    // check if exempt item
    const exemptMatch = this.exemptItems.filter((item) => {
      return originalName.toLowerCase().includes(item.toLowerCase());
    });
    if (exemptMatch.length == 0) {
      taxPercentage += 10;
    }
    // check if imported
    const importedMatch = this.itemTypeMap.filter((item) => {
      return originalName.toLowerCase().includes(item.toLowerCase());
    });
    if (importedMatch.length) {
      taxPercentage += 5;
    }
    const temp = (taxPercentage * originalPrice) / 100;
    const roundedTax = Math.ceil(temp / 0.05) * 0.05;
    const itemTotal = originalPrice + roundedTax;
    this.totalSalesTax += roundedTax;
    this.total += itemTotal;
    const obj = {
      name: item[0],
      price: itemTotal
    }
    return obj;
  }

}
