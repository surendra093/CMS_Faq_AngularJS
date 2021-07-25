import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { FaqsComponent } from './faqs/faqs.component';


const routes: Routes = [
  { path: 'categories', component: CategoriesComponent,data : {  
    title: 'Categories Page'} },
  { path: 'faqs', component: FaqsComponent ,data : {  
    title: 'FAQs Page'}},
  { path: '',   redirectTo: '/faqs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
