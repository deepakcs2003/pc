# Angular for Beginners in Hinglish

Angular ki basics aur setup se lekar advanced concepts tak main aapko step-by-step guide deta hoon. Ye information beginners ke liye bahut helpful hogi.

## Angular Kya Hai?

Angular ek popular JavaScript framework hai jo Google ne develop kiya hai. Yeh Single Page Applications (SPAs) banane ke liye use hota hai. Angular TypeScript par based hai, jo JavaScript ka ek superset hai.

## Installation aur Setup

1. **Node.js aur npm install karein**:
   - Sabse pehle aapko Node.js download karna hoga [Node.js official website](https://nodejs.org/) se
   - Installation ke baad check karein ki sab theek se install hua hai:
   ```
   node -v
   npm -v
   ```

2. **Angular CLI install karein**:
   ```
   npm install -g @angular/cli
   ```

3. **Check karein ki Angular CLI install hua hai**:
   ```
   ng version
   ```

## Pehla Angular Project Banayein

1. **New project create karein**:
   ```
   ng new my-first-app
   ```
   - Routing add karna hai? Yes/No select karein
   - CSS format choose karein (CSS, SCSS, etc.)

2. **Project folder mein jayein**:
   ```
   cd my-first-app
   ```

3. **Development server start karein**:
   ```
   ng serve
   ```
   - Ab aap browser mein `http://localhost:4200/` open karke apna app dekh sakte hain

## Angular ke Main Building Blocks

### 1. Components

Components Angular application ki sabse basic building blocks hain. Har component mein HTML template, TypeScript class, aur CSS styling hoti hai.

**Component create karne ke liye**:
```
ng generate component my-component
```
Ya shorthand:
```
ng g c my-component/name_of_componenet
```

**Component ka structure**:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent {
  title = 'Mera Pehla Component';
}
```

### 2. Templates

Templates HTML code hote hain jo UI define karte hain. Inme aap data binding, directives, aur events ka use kar sakte hain.

**Data binding ke types**:
- **String Interpolation**: `{{ variable }}`
- **Property Binding**: `[property]="value"`
- **Event Binding**: `(event)="function()"`
- **Two-way Binding**: `[(ngModel)]="variable"`

### 3. Directives

Directives DOM elements ko manipulate karne ke liye instructions hain.

**Main Directives**:
- **ngIf**: Conditional rendering
  ```html
  <div *ngIf="condition">Content</div>
  ```
- **ngFor**: Lists render karne ke liye
  ```html
  <li *ngFor="let item of items">{{ item }}</li>
  ```
- **ngStyle**: Dynamic styling
  ```html
  <div [ngStyle]="{'color': isActive ? 'red' : 'blue'}">Styled Text</div>
  ```
- **ngClass**: Dynamic classes
  ```html
  <div [ngClass]="{'active': isActive, 'disabled': !isActive}">Classy Text</div>
  ```

### 4. Services aur Dependency Injection

Services data aur functionality share karne ke liye use hote hain.

**Service create karne ke liye**:
```
ng generate service my-service
```

**Service ka example**:
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  getData() {
    return ['Item 1', 'Item 2', 'Item 3'];
  }
}
```

**Component mein service use karna**:
```typescript
import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponentComponent {
  data: string[] = [];

  constructor(private myService: MyServiceService) {
    this.data = this.myService.getData();
  }
}
```

### 5. Routing

Routing different views/pages navigate karne ke liye use hota hai.

**app-routing.module.ts mein routes define karein**:
```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**HTML mein routing use karne ke liye**:
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>

<router-outlet></router-outlet>
```

## Forms Handling

### Template-Driven Forms

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f)">
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" ngModel required>
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" ngModel required email>
  </div>
  <button type="submit" [disabled]="!f.valid">Submit</button>
</form>
```

### Reactive Forms

Module mein ReactiveFormsModule import karein:
```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule
  ]
})
```

Component mein form define karein:
```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class MyFormComponent implements OnInit {
  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}
```

HTML template:
```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" formControlName="name">
    <span *ngIf="!myForm.get('name').valid && myForm.get('name').touched">
      Please enter a valid name!
    </span>
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" formControlName="email">
  </div>
  <button type="submit" [disabled]="!myForm.valid">Submit</button>
</form>
```

## HTTP Requests

HttpClient ko import karein app module mein:
```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
```

Service mein HTTP request:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  fetchData() {
    return this.http.get('https://api-url.com/data');
  }

  sendData(data: any) {
    return this.http.post('https://api-url.com/data', data);
  }
}
```

Component mein use karein:
```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements OnInit {
  loadedData: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchData().subscribe(data => {
      this.loadedData = data;
    });
  }

  onSendData(data: any) {
    this.dataService.sendData(data).subscribe(response => {
      console.log(response);
    });
  }
}
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/
│   │   └── about/
│   ├── services/
│   │   └── data.service.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
│   └── images/
├── environments/
├── index.html
└── styles.css
```

## Deployment

1. **Production build banayein**:
   ```
   ng build --prod
   ```

2. **dist folder** ke contents ko web server par deploy karein (Apache, Nginx, etc.)

3. **Deployment platforms**:
   - Firebase Hosting
   - Netlify
   - Vercel
   - GitHub Pages

## Testing

Angular mein testing ke liye Jasmine aur Karma use hote hain:

```
ng test
```

Unit test example:
```typescript
import { TestBed } from '@angular/core/testing';
import { MyServiceService } from './my-service.service';

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    expect(service.getData().length).toEqual(3);
  });
});
```

Ye angular ki basic information hai beginners ke liye. Aap is notes ko apne .txt file mein save kar sakte hain further reference ke liye. Angular sikhne ke liye regular practice bahut zaroori hai.