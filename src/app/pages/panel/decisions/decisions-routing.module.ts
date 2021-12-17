import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecisionsPage } from './decisions.page';

const routes: Routes = [
  {
    path: '',
    component: DecisionsPage
  },
  {
    path: 'form',
    loadChildren: () => import('./decisions-form/decisions-form.module').then( m => m.DecisionsFormPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecisionsPageRoutingModule {}
