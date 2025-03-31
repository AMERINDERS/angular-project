import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDisplayComponent } from './data-display/data-display.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';

const routes: Routes = [
  { path: '', component: DataDisplayComponent },
  { path: 'author/:id', component: AuthorDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
