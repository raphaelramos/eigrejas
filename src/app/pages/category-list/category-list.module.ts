import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CategoryListPageRoutingModule } from './category-list-routing.module';

import { CategoryListPage } from './category-list.page';
import { DynamicBgModule } from '../../shared/dynamic-bg.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CategoryListPageRoutingModule,
    DynamicBgModule
  ],
  declarations: [CategoryListPage]
})
export class CategoryListPageModule {}
