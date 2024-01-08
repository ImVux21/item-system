import { Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { ManagementComponent } from './management/management.component';

export const routes: Routes = [
    {
        path: 'item/:code',
        component: ItemComponent,
        title: 'Edit Item'
    },
    {
        path: '',
        redirectTo: '/item',
        pathMatch: 'full'
    },
    {
        path: 'item',
        component: ItemComponent,
        title: 'Add Item'
    }
];
