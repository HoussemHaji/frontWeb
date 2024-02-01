import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
