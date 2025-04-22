import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { AuthorCreateComponent } from './author-create/author-create.component';

const routes: Routes = [
  { path: '', component: DataDisplayComponent },
  { path: 'authors', component: DataDisplayComponent },
  { path: 'authors/create', component: AuthorCreateComponent },
  { path: 'authors/:id', component: AuthorDetailComponent} ,
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
