import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ErrorDialogComponent } from './error-dialog/errordialog.component';

import { PostService } from './services/post.service';
import { ErrorDialogService } from './error-dialog/errordialog.service';

import { HttpErrorInterceptor} from './core/interceptor/http-error-interceptor';
import { PostsComponent } from './posts/posts.component';
import {fakeBackendProvider} from './core/interceptor/fake-backend-interceptor';
import {ItemFilterPipe} from './filters/item-filter.pipe';

import { ModalComponent } from './directives/modal/modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
    declarations: [
      AppComponent,
    ErrorDialogComponent,
    PostsComponent,
      ItemFilterPipe,
      ModalComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    PostService,
    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider,
    ModalService
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
