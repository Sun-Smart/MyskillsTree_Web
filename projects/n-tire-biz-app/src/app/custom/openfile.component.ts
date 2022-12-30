import { Component, OnInit, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef } from 'primeng/dynamicDialog';

@Component({

    selector: 'openfile-App',
    template: `  
    <div class="row">
    <div class="col-12">
        <button>
        <a class="nav-link active right" style="margin-left: 86%;" [routerLink]=''  (click)="onClose()"   ><i class="fa fa-close"></i> Close</a>
        </button>
    </div>
    <div>
    <iframe [src]="url" frameBorder="0" width="700px!important" height="750px!important">
    </iframe>
    </div>
    </div>`,

})

export class openfileComponent implements OnInit {
    data: any;
    url: any;
    constructor(public dynamicconfig: DynamicDialogConfig, private sanitizer: DomSanitizer, public dialogRef: DynamicDialogRef) {
        debugger;
        this.data = dynamicconfig.data;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
    }
    async ngOnInit() {

    }
    onClose() {
        this.dialogRef.close();
    }
}
