import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Item } from '../model/item';
import { ItemComponent } from '../item/item.component';
import { ItemServiceService } from '../item-service.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule, ItemComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {
  searchFilterForm = new FormGroup({
    majorClassification: new FormControl(''),
    mediumClassification: new FormControl(''),
    code: new FormControl(''),
    printName: new FormControl(''),
    displayName: new FormControl(''),
    name: new FormControl(''),
    kitchenPrintName: new FormControl('')
  })
  selectedItem: any;
  items: Item[ ];
  isExist: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemServiceService) {
    this.items = [];
  }

  ngOnInit(): void {
      this.itemService.getItems().subscribe(  
        (data: any) => {
          this.items = data;
        },
        (error: any) => {
          alert(error.message);
        }
      );
  }

  isEditted() {
    return this.router.url.includes('/item/');
  }

  addOrUpdateItem(item: Item) { 
    let subItem = {
      ...item
    }

    if (this.isEditted()) {
      let index = this.items.findIndex(i => i.code === subItem.code);
      
      if (index !== -1) {
        this.items.splice(index, 1, subItem);
      }
      
    } else {
      if(this.items.find(i => i.code === subItem.code)) {
        this.isExist = true;

        setTimeout(() => {
          this.isExist = false;
        }, 3000);
        return;
      }
      
      this.items.push(subItem);
    }
  }

  editItem(item: Item) {
    this.selectedItem = item;
    this.router.navigate(['item', item.code]);
  }

  removeItem(item: Item) {    
    let index = this.items.indexOf(item);
    this.items.splice(index, 1)
  }
}
