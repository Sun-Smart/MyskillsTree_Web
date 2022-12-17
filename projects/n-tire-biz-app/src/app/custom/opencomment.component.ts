import { Component, OnInit, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { DynamicDialogConfig } from 'primeng/dynamicDialog';

import { DynamicDialogRef } from 'primeng/dynamicDialog';

@Component({

    selector: 'opencomment-App',
    template: `  
    <form [formGroup]="commentForm" (ngSubmit)="onSubmit()" [ngClass]="theme" style="width: 340px;">
    <br>
    <app-comment  id="comments" formControlName="comments" [label]="'Comments'" (commentemitter)="receiveComment($event)">
    </app-comment>
    <a class="alert-success" [routerLink]='' (click)="onSubmit()" style="margin-left: 73%;"><i class="fa fa-database" ></i> Submit</a>   
     <a class="nav-link active right" style="position: absolute;bottom: 89%;left: 71%;"  [routerLink]=''  (click)="onClose()"   ><i class="fa fa-close"></i> Close</a>
    </form>            `,

})

export class opencommentComponent implements OnInit {
    data: any;

    commentForm: FormGroup;
    commentsets: any;
    constructor(public dynamicconfig: DynamicDialogConfig, public dialogRef: DynamicDialogRef, private fb: FormBuilder) {
        debugger;
        this.data = dynamicconfig.data;

        this.commentForm = this.fb.group({
            comments: this.data.comments
        });

    }

    async ngOnInit() {

    }
    onClose() {
        this.dialogRef.close();
    }
    receiveComment($event) {
        debugger;

        this.commentsets = $event;
    }
    onSubmit() {
        debugger;
        this.dialogRef.close(JSON.stringify(this.commentsets));
    }
}
