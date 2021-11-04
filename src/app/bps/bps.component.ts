import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsCsvData } from './ClientCsvData';

@Component({
  selector: 'app-bps',
  templateUrl: './bps.component.html',
  styleUrls: ['./bps.component.css']
})
export class BpsComponent implements OnInit {
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay:any;
  constructor() { }

  ngOnInit(): void {
  }










  uploadListener($event: any): void {

  let text = [];
  let files = $event.srcElement.files;

  if (this.isValidCSVFile(files[0])) {

    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

      let headersRow = this.getHeaderArray(csvRecordsArray);

      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
    };

    reader.onerror = function () {
      console.log('error is occured while reading file!');
    };

  } else {
    alert("Please import valid .csv file.");
    this.fileReset();
  }
}
//get data from csv
getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
  let csvArr = [];

  for (let i = 1; i < csvRecordsArray.length; i++) {
    let curruntRecord = (csvRecordsArray[i]).split(',');
    if (curruntRecord.length == headerLength) {
      let csvRecord: ClientsCsvData = new ClientsCsvData();
      csvRecord.firstName = curruntRecord[1].trim();
      csvRecord.lastName = curruntRecord[2].trim();
      csvRecord.occupation = curruntRecord[3].trim();
      csvRecord.email = curruntRecord[4].trim();
      csvRecord.phoneNumber = curruntRecord[5].trim();
      csvRecord.externalId = curruntRecord[6].trim();
      csvRecord.address = curruntRecord[7].trim();
      csvRecord.accountBalance = curruntRecord[8].trim();
      csvRecord.altPhoneNumber = curruntRecord[9].trim();
      csvRecord.documentNumber = curruntRecord[10].trim();
      csvRecord.dob = curruntRecord[11].trim();
      csvRecord.externalStartDate = curruntRecord[1].trim();
      
      csvArr.push(csvRecord);
    }
  }
  return csvArr;
}
//check etension
isValidCSVFile(file: any) {
  return file.name.endsWith(".csv");
}

getHeaderArray(csvRecordsArr: any) {
  let headers = (csvRecordsArr[0]).split(',');
  let headerArray = [];
  for (let j = 0; j < headers.length; j++) {
    headerArray.push(headers[j]);
  }
  return headerArray;
}

fileReset() {
  this.csvReader.nativeElement.value = "";
  this.records = [];
  this.jsondatadisplay = '';
}

getJsonData(){
  this.jsondatadisplay = JSON.stringify(this.records);
}
}
