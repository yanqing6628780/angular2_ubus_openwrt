import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'samPasswordEye',
    template: `
        <nz-input [nzType]="type" [(ngModel)]="value" (ngModelChange)="emitVal()" [nzSize]="size">
            <ng-template #suffix>
                <i class="anticon" [ngClass]="icon" (click)="toggle()"></i>
            </ng-template>
        </nz-input>
    `
})
export class SamPasswordEyeComponent {
    @Input() value: any
    @Output() valueChange = new EventEmitter()
    @Input() size: string
    @Input() name: string
    private icon = 'anticon-eye'
    private type = 'password'
    private defType = 'password'
    constructor() {
        this.size = this.size ? this.size : 'large'
    }
    emitVal() {
        this.valueChange.emit(this.value)
    }
    toggle() {
        this.type = this.type === this.defType ? 'text' : this.defType
        this.icon = this.type === this.defType ? 'anticon-eye' : 'anticon-eye-o'
    }
}
