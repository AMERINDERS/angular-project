import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AuthorService } from './author.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorCreateComponent } from './author-create/author-create.component';

@NgModule({
  declarations: [
    AppComponent,
    DataDisplayComponent,
    AuthorDetailComponent,
    AuthorCreateComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
    provideClientHydration(withEventReplay()),
    AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
