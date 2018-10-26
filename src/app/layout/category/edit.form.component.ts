import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../shared/product.model';

@Component({
    selector: 'kendo-grid-edit-form',
    styles: [
      'input[type=text] { width: 100%; }'
    ],
    templateUrl:'./edit.form.component.html'
})
export class GridEditFormComponent {
    public min: Date = new Date(1917, 0, 1);
    public sizes: Array<{ text:string, value:number}> = [
        { text: "Kids 45", value: 45 },
        { text: "Mens 30", value: 30 },
        { text: "Kids 40", value: 40 }
    ];
    public active = false;
    public editForm: FormGroup = new FormGroup({
        'productId': new FormControl(),
        'productName': new FormControl('', Validators.required),
        'productCode':new FormControl('', Validators.required),
        'tag' : new FormControl('', Validators.required),
        'firstOrderedOn': new FormControl('', Validators.required),
        'categoryName': new FormControl('', Validators.required),
        'supplierName': new FormControl('', Validators.required),
        'price': new FormControl(0),
        'quantityPurchased': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
        'quantityInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
        'colorsPurchased': new FormControl('', Validators.required),
        'sizes': new FormControl('', Validators.required)
    });

    @Input() public isNew = false;

    @Input() public set model(product: Product) {
        this.editForm.reset(product);

        this.active = product !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Product> = new EventEmitter();
    @Output() edit: EventEmitter<Product> = new EventEmitter();

    public onSave(e): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onEdit(e): void{
        e.preventDefault();
        this.edit.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }
}
