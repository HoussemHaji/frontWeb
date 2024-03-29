import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './components/posts/posts.component';
import { SignupComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { CommentComponent } from './components/comment/comment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetPassworrdComponent } from './components/forget-passworrd/forget-passworrd.component';
import { SearchComponent } from './components/search/search.component';
import { AuthInterceptor, authInterceptorProviders } from './interceprtors/intreceptor.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostsComponent,
    SignupComponent,
    NavbarComponent,
    SinglePostComponent,
    CommentComponent,
    ProfileComponent,
    HomeComponent,
    CategoriesComponent,
    CreatePostComponent,
    ForgetPassworrdComponent,
    SearchComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(), authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
