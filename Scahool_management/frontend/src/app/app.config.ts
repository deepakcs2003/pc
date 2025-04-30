import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  
import { HttpClientModule } from '@angular/common/http';  
import { appRoutes } from './app.routes';
import { AuthService } from './services/auth.service';

export const appConfig = {
  apiUrl: 'http://localhost:3000/api',
  providers: [
    provideRouter(appRoutes),  
    importProvidersFrom(HttpClientModule),  
    provideHttpClient(),  
    AuthService
  ]
};
