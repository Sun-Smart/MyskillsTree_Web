import { Component, OnInit, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef } from 'primeng/dynamicDialog';

@Component({  
  
    selector: 'openfile-App',  
    template: `  
    <a class="nav-link active right"  [routerLink]=''  (click)="onClose()"   ><i class="fa fa-close"></i> Close</a>
    <iframe [src]="url" width="800px" height="800px"></iframe> 
                `,  
  
})  
  
export class openfileComponent implements OnInit {  
    data: any;
    url:any;
    constructor(public dynamicconfig: DynamicDialogConfig,private sanitizer: DomSanitizer,public dialogRef: DynamicDialogRef)
    {
        debugger;
        this.data = dynamicconfig.data;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
    }
    async ngOnInit() {

    }
    onClose()
    {
      this.dialogRef.close();
    }
}  
