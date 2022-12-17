import { Component,ViewChild, ElementRef, AfterViewInit,SimpleChanges, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AnyARecord } from 'dns';
//import * as moment from 'moment';

@Component({
    selector: 'smart-table-datepicker',
    templateUrl: './smart-table-datepicker.component.html',
    styleUrls: ['./smart-table-datepicker.component.scss']
})
export class SmartTableDatepickerComponent extends DefaultEditor implements AfterViewInit  {
    dateForm: FormGroup;


    @Input() placeholder: string = 'Choose a Date/Time';

    @Input() min: Date; // Defaults to now(rounded down to the nearest 15 minute mark)

    @Input() max: Date; // Defaults to 1 month after the min

    //@Output() onEdited: EventEmitter<any> = new EventEmitter();

    stringValue;



    constructor(private fb: FormBuilder, private calendar: NgbCalendar, public ngbDateParserFormatter: NgbDateParserFormatter) {
       super();
       //debugger;
    }


    

    ngAfterViewInit () {

          debugger;


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

                var cellValue1 = { day: day, month: month, year: cellValue.getUTCFullYear() };

                this.dateForm.patchValue({ dateModel: cellValue1 });

            }
            else {
                let dt = new Date();
                if (this.cell.getValue() != "" && this.cell.getValue() != null && this.cell.getValue() != undefined) dt = new Date(this.cell.getValue().replace(/-/g, '\/'));

                let day = (dt.getDate());//.toString();
                let month = (dt.getMonth() + 1);//.toString();

                var cellValue = { day: day, month: month, year: dt.getUTCFullYear() };

                console.log(cellValue);
                this.dateForm.patchValue({ dateModel: cellValue });

            }

        }


    }


    onChange(e:any) {
        debugger;

        if (e) {
            let day = (e.day).toString();
            let month = (e.month).toString();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            this.cell.newValue = e.year + '-' + month + '-' + day;  //

        }
    }

}

@Component({
    template: `{{renderValue | date:'MMMM dd, yyyy'}}`,
})
export class SmartTableDatepickerRenderComponent implements OnInit,  ViewCell  {
    @Input() value: any;
    @Input() rowData: any;
    renderValue: any;
    constructor() {
        this.renderValue =   this.value ;
        //debugger;
     }
     ngOnInit() {
        debugger;
        this.renderValue =   this.value ;
    }
     ngOnChanges(changes: SimpleChanges): void {
        debugger;
        this.renderValue =   this.value ;
    }
    ngAfterViewInit () {

    }

}
