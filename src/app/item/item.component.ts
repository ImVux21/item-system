import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../model/item';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Error } from '../model/error';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnChanges, OnInit {
  newItemForm: FormGroup;
  // mapping data
  item: Item = new Item('', '', '', '', '', '', '');
  errorMessagesList: Error[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.newItemForm = new FormGroup({
      majorClassification: new FormControl('', Validators.maxLength(20)),
      mediumClassification: new FormControl('', Validators.maxLength(20)),
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(5)
      ]),
      printName: new FormControl('', Validators.maxLength(20)),
      displayName: new FormControl('', Validators.maxLength(20)),
      name: new FormControl('', Validators.maxLength(20)),
      kitchenPrintName: new FormControl('', Validators.maxLength(20))
    });

    this.errorMessagesList.push(new Error('Major Classification', 'majorClassification', ''));
    this.errorMessagesList.push(new Error('Medium Classification', 'mediumClassification', ''));
    this.errorMessagesList.push(new Error('Code', 'code', ''));
    this.errorMessagesList.push(new Error('Print Name', 'printName', ''));
    this.errorMessagesList.push(new Error('Display Name', 'displayName', ''));
    this.errorMessagesList.push(new Error('Name', 'name', ''));
    this.errorMessagesList.push(new Error('Kitchen Print Name', 'kitchenPrintName', ''));
  }

  get majorClassification() {
    return this.newItemForm.get('majorClassification');
  }

  get mediumClassification() {
    return this.newItemForm.get('mediumClassification');
  }

  get code() {
    return this.newItemForm.get('code');
  }

  get printName() {
    return this.newItemForm.get('printName');
  }

  get displayName() {
    return this.newItemForm.get('displayName');
  }

  get name() {
    return this.newItemForm.get('name');
  }

  get kitchenPrintName() {
    return this.newItemForm.get('kitchenPrintName');
  }

  ngOnChanges() {
    if (this.inputItem) {
      this.newItemForm.patchValue(this.inputItem); // Patch inputItem to form
    }
  }

  ngOnInit(): void {
  }

  getErrorMessage(): Error[] {
    let invalidMaxlength: string = 'maximum length is 20 characters';
    let invalidRequired: string = 'is required';
    let invalidCode: string = 'maximum length is 5 characters';

    if (this.majorClassification?.invalid) {
      this.errorMessagesList[0].setErrorMessage(invalidMaxlength);
    }

    if (this.mediumClassification?.invalid) {
      this.errorMessagesList[1].setErrorMessage(invalidMaxlength);
    }

    if (this.code?.invalid) {
      this.errorMessagesList[2].setErrorMessage(invalidCode + ' and ' + invalidRequired);
    }

    if (this.printName?.invalid) {
      this.errorMessagesList[3].setErrorMessage(invalidMaxlength);
    }

    if (this.displayName?.invalid) {
      this.errorMessagesList[4].setErrorMessage(invalidMaxlength);
    }

    if (this.name?.invalid) {
      this.errorMessagesList[5].setErrorMessage(invalidMaxlength);
    }

    if (this.kitchenPrintName?.invalid) {
      this.errorMessagesList[6].setErrorMessage(invalidMaxlength);
    }

    return this.errorMessagesList;
  }

  isEditted() {
    return this.router.url.includes('/item/');
  }

  validateForm() {
    this.errorMessagesList = this.getErrorMessage();
    if (this.errorMessagesList.find((error) => error.errorMessage !== '')) {
      setTimeout(() => {
        this.errorMessagesList = [];

        this.errorMessagesList.push(new Error('Major Classification', 'majorClassification', ''));
        this.errorMessagesList.push(new Error('Medium Classification', 'mediumClassification', ''));
        this.errorMessagesList.push(new Error('Code', 'code', ''));
        this.errorMessagesList.push(new Error('Print Name', 'printName', ''));
        this.errorMessagesList.push(new Error('Display Name', 'displayName', ''));
        this.errorMessagesList.push(new Error('Name', 'name', ''));
        this.errorMessagesList.push(new Error('Kitchen Print Name', 'kitchenPrintName', ''));
      }, 3000);

      return true;  
    }

    return false;
  }

  saveOrUpdate() {
    if (this.validateForm()) {
      return;
    }

    this.item = this.newItemForm.value;    
    this.addOrUpdateItemEvent.emit(this.item);
    this.newItemForm.reset();
  }

  backToAdd() {
    this.router.navigate(['/item']);
    this.newItemForm.reset();
  }

  @Output() addOrUpdateItemEvent = new EventEmitter<Item>;
  @Input() inputItem!: any;

}
