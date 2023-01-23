import { Component, OnInit, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { DynamicDialogConfig } from 'primeng/dynamicDialog';

import { DynamicDialogRef } from 'primeng/dynamicDialog';

@Component({

    selector: 'opencomment-App',
    template: `  
    <form [formGroup]="commentForm" (ngSubmit)="onSubmit()" [ngClass]="theme">
    <div class = "row  popup-comment-header">
    <div class = "col-4">
    <h6>Comments</h6>
    </div>
    <div class = "col-4"></div>
    <div class = "col-4" style="text-align:end;">
    <button class = "popup-add-button" style="padding: 2px 14px !important;">
    <a style="color:#fff !important" (click)="onSubmit()"> Submit</a>   
    </button>
   
    <img (click)="onClose()" src="assets/mainmenuicons/icons_close.png" style="width: 20px;" />
    </div>
    </div>

    <div class = "col-12" style="margin-top:2rem;">
    <app-comment  id="comments" formControlName="comments" [label]="'Comments'" (commentemitter)="receiveComment($event)">
    </app-comment>
    </div>
  
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
