import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
//import * as moment from 'moment';

@Component({
    selector: 'smart-table-datepicker',
    templateUrl: './smart-table-datepicker.component.html',
    styleUrls: ['./smart-table-datepicker.component.scss']
})
export class SmartTableDatepickerComponent extends DefaultEditor implements OnInit {
    inputgroup: FormGroup;


    @Input() placeholder: string = 'Choose a Date/Time';

    @Input() min: Date; // Defaults to now(rounded down to the nearest 15 minute mark)

    @Input() max: Date; // Defaults to 1 month after the min

    //@Output() onEdited: EventEmitter<any> = new EventEmitter();

    stringValue;



    constructor(private fb: FormBuilder, private calendar: NgbCalendar, public ngbDateParserFormatter: NgbDateParserFormatter) {
        super();
        debugger;
    }


    inputModel: NgbDateStruct;

    ngOnInit() {
        /*
            this.inputgroup = this.fb.group({
              inputModel: new FormControl()
          })
          this.calendar.getToday()
          , { updateOn: 'blur' }
        */
          debugger;
        this.inputgroup = this.fb.group({
            'inputModel': new FormControl(null)
        });


        if (!this.min) {
            this.min = new Date();
            this.min.setMinutes(Math.floor(this.min.getMinutes() / 15) * 15);
        }

        if (!this.max) {
            this.max = new Date(this.min);
            this.max.setFullYear(this.min.getFullYear() + 1);
        }
        //debugger;
        if (this.cell.newValue != "") {
            if (this.cell.newValue) {
                //let cellValue = new Date(this.cell.newValue.replace(/-/g, '\/'));

                let cellValue = new Date(this.cell.newValue);
                let day = (cellValue.getDate());//.toString();
                let month = (cellValue.getMonth() + 1);//.toString();
                /*if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
    
                    let day= cellValue.getDate();
                    let month=(cellValue.getMonth()+1); */

                var cellValue1 = { day: day, month: month, year: cellValue.getUTCFullYear() };
                //var cellValue1 =cellValue.getUTCFullYear() + '-' + month + '-' + day;
                this.inputgroup.patchValue({ inputModel: cellValue1 });
                //this.cell.newValue = cellValue.getUTCFullYear() + '-' + month + '-' + day;
                /*this.inputModel.day=cellValue.getDate();
                this.inputModel.month=cellValue.getMonth()+1;
                this.inputModel.year=cellValue.getUTCFullYear();
                this.onSelectDate(this.inputModel);*/
            }
            else {
                let dt = new Date();
                if (this.cell.getValue() != "" && this.cell.getValue() != null && this.cell.getValue() != undefined) dt = new Date(this.cell.getValue().replace(/-/g, '\/'));

                let day = (dt.getDate());//.toString();
                let month = (dt.getMonth() + 1);//.toString();
                /*if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
                
               let day= dt.getDate();
               let month=(dt.getMonth()+1);*/

                //let cellValue = (dt.getUTCFullYear()) + '-' + month + '-' +  day;
                var cellValue = { day: day, month: month, year: dt.getUTCFullYear() };
                //var cellValue =dt.getUTCFullYear() + '-' + month + '-' + day;
                console.log(cellValue);
                this.inputgroup.patchValue({ inputModel: cellValue });
                /*this.inputModel.day=dt.getDate();
                this.inputModel.month=dt.getMonth()+1;
                this.inputModel.year=dt.getUTCFullYear();
                this.onSelectDate(this.inputModel);*/
                //this.cell.newValue = dt.getUTCFullYear() + '-' + month + '-' + day;
            }

        }


    }
    /*
    ParseDate(e:any) {
      //debugger;
      
      
      var startDate = e;
      let startYear = e.year;
      let startMonth = e.month; 
      let startDay = e.day;
      let s=this.ngbDateParserFormatter.format(e:any);
  //this.ngbDateParserFormatter.parse(startYear + "-" + startMonth.toString() + "-" + startDay)
      return this.ngbDateParserFormatter.format(e:any);
  
     //return this.ngbDateParserFormatter.format(e:any);
  }
  */

    onSelectDate(date: NgbDateStruct) {
        //this.sharedService.alert('d');
        debugger;
        if (date != null) {
            let s = date;
            let day = (s.day).toString();
            let month = (s.month).toString();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            this.cell.newValue = s.year + '-' + month + '-' + day;

            //this.inputgroup.setValue({ inputModel: date });



            //  this.model = date;   //needed for first time around due to ngModel not binding during ngOnInit call. Seems like a bug in ng2.
            // this.dateString = this.ngbDateParserFormatter.format(date));
        }
    }


    onChange(e:any) {
        debugger;

        if (this.inputgroup.get('inputModel').value) {
            let s = this.inputgroup.controls['inputModel'].value;
            let day = (s.day).toString();
            let month = (s.month).toString();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            this.cell.newValue = s.year + '-' + month + '-' + day;  //

        }
    }

}

@Component({
    template: `{{value | date:'MMMM dd, yyyy'}}`,
})
export class SmartTableDatepickerRenderComponent implements ViewCell, OnInit {
    @Input() value: string;
    @Input() rowData: any;

    constructor() { }

    ngOnInit() {

    }

}
