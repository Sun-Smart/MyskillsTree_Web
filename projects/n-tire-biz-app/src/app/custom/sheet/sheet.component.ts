
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, Input, forwardRef, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SheetComponent),
      multi: true
    }
  ]
})
export class SheetComponent implements ControlValueAccessor {
  @Input('url') url;
  @Input('src') src;
  onChange: any = () => {
    debugger;
    //this.data=this.url;
    this.onFileChange(this.url);
  };
  onTouched: any = () => { };

  constructor(private http: HttpClient) { }

  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  writeValue(value) {
    debugger;
    console.log(value);
    if (value) {
      //this.data = value;
      this.url = value;
      this.onFileChange(value);
    }
  }

  ngOnInit() {
    debugger;
    setTimeout(() => {
      this.onGetData(this.src);
    }, 5000);

  }

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  async onGetData(src: any) {
    debugger;

    /* wire up file reader */
    /*const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');*/

    debugger;
    let data = await src.arrayBuffer();
    var wb = XLSX.read(data, { type: "array" });
    this.data = <AOA>(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
    console.log(this.data);
    console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));

  }

  onFileChange(url: any) {
    debugger;
    if (this.url != undefined) {
      /* wire up file reader */
      /*const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');*/
      this.http.get(this.url, {
        responseType: 'arraybuffer'
      }).subscribe(data => {
        debugger;
        var wb = XLSX.read(data, { type: "array" });
        this.data = <AOA>(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        console.log(this.data);
        console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
      }, function (err) {
        //console.log(err);
      });
    }
    /*
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          // read workbook 
          const bstr: string = e;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    
          // grab first sheet 
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    
          // save data 
          this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
          console.log(this.data);
        };
        reader.readAsBinaryString(url);
        */
  }


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}