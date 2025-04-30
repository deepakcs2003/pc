# Angular Components for Beginners (Hinglish)

Mujhe Angular ke components ke bare mein bilkul basics se samjho. Agar aap ek beginner hai, toh yeh guide aapke liye perfect hai:

## Component Kya Hota Hai?

Component ek building block hai jo aapke web page ka ek hissa control karta hai. Imagine karo ki ek webpage ek puzzle hai, aur har component ek alag puzzle piece. For example:
- Header component
- Footer component
- Navigation component
- Product card component

## Component Kaise Banaye (Basic Steps):

### Step 1: Angular Install Karo

Sabse pehle Angular CLI install karna hoga:

```bash
npm install -g @angular/cli
```

### Step 2: Angular Project Create Karo (Agar Nahi Hai)

Agar aapke paas project nahi hai, to create karo:

```bash
ng new my-first-project
cd my-first-project
```

### Step 3: Component Generate Karo

Ab ek simple command se component create kar sakte ho:

```bash
ng generate component my-first-component
# Ya short form me
ng g c my-first-component
```

### Step 4: Component Ko Samjho

Angular ne 4 files create ki hongi:

1. **my-first-component.component.ts**: Yeh main file hai jisme component ka logic likha jata hai
2. **my-first-component.component.html**: Isme HTML code likha jata hai
3. **my-first-component.component.css**: Isme styling karte hai
4. **my-first-component.component.spec.ts**: Testing ke liye file

### Step 5: Component Ko Simple Banao

TypeScript file (my-first-component.component.ts) ko open karo. Uska structure kuch aisa dikhega:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.css']
})
export class MyFirstComponentComponent {
  // Yahan aap apne variables aur functions likh sakte ho
}
```

Isme kuch basic information add karo:

```typescript
export class MyFirstComponentComponent {
  welcomeMessage = 'Namaste, Angular seekhne vale!';
  buttonClicks = 0;
  
  increaseCount() {
    this.buttonClicks++;
  }
}
```

### Step 6: HTML Template Mein Basic UI Banao

HTML file (my-first-component.component.html) ko edit karo:

```html
<div class="container">
  <h2>{{ welcomeMessage }}</h2>
  <p>Button kitni baar click hua: {{ buttonClicks }}</p>
  <button (click)="increaseCount()">Mujhe Click Karo</button>
</div>
```

### Step 7: Basic Styling Add Karo

CSS file (my-first-component.component.css) mein simple styling:

```css
.container {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
  margin: 10px;
}

h2 {
  color: #2c3e50;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
```

### Step 8: Component Ko Use Karo

Ab, aapke component ko app.component.html file mein use kar sakte hain:

```html
<h1>Mera First Angular Application</h1>
<app-my-first-component></app-my-first-component>
```

### Step 9: App Ko Run Karo

Terminal mein command type karo:

```bash
ng serve --open
```

Yeh automatically browser mein aapka app open kar dega, aur aap apna component dekh paoge!

## Component Ke Basic Concepts:

1. **Interpolation**: `{{ variableName }}` - TS se data HTML mein show karna
2. **Event Binding**: `(click)="functionName()"` - User actions handle karna
3. **Property Binding**: `[property]="value"` - HTML elements ki properties ko TS se link karna
4. **Two-way Binding**: `[(ngModel)]="variableName"` - Data ko update karna dono directions mein

## Next Step Ke Liye Tips:

1. Parent-child components ke bare mein padho
2. Services ka use seekho (data share karne ke liye)
3. Routing seekho (multiple pages banane ke liye)

Is basic guide se aap Angular components ke saath kaam karna start kar sakte hai. Koi specific concept clear karna hai to pooch sakte hai!



# Using Your Angular Component (Hinglish)

Chaliye ab samajhte hain ki aapke create kiye gaye component ko aap apne Angular application mein use kaise kar sakte hain:

## Component Ko Use Karne Ke Steps:

### Step 1: Component Import Hona Confirm Karo

Jab bhi aap `ng generate component` command use karte hain, Angular automatically aapke component ko main module (usually `app.module.ts`) mein import kar deta hai. Phir bhi check kar lijiye:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MyFirstComponentComponent } from './my-first-component/my-first-component.component';  // Auto-imported

@NgModule({
  declarations: [
    AppComponent,
    MyFirstComponentComponent  // Component already declared
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 2: Component Selector Ka Use Karo

Ab aap is component ko kisi bhi template mein use kar sakte hain, for example `app.component.html` mein:

```html
<!-- app.component.html -->
<div>
  <h1>Mera Angular Application</h1>
  
  <!-- Yahan par aapka component add kiya gaya hai -->
  <app-my-first-component></app-my-first-component>
  
  <!-- Aap multiple instances bhi use kar sakte hain -->
  <app-my-first-component></app-my-first-component>
</div>
```

### Step 3: Component Ko Pass Karo Data (Optional)

Agar aap apne component ko dynamic data pass karna chahte hain, to `@Input()` decorator ka use kar sakte hain:

1. Pehle component mein `@Input()` add karo:

```typescript
// my-first-component.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.css']
})
export class MyFirstComponentComponent {
  @Input() title: string = 'Default Title';
  @Input() userName: string = 'Guest';
  
  welcomeMessage = 'Namaste, Angular seekhne vale!';
  buttonClicks = 0;
  
  increaseCount() {
    this.buttonClicks++;
  }
}
```

2. Ab HTML template mein use karo:

```html
<!-- my-first-component.component.html -->
<div class="container">
  <h2>{{ title }}</h2>
  <p>Hello {{ userName }}! {{ welcomeMessage }}</p>
  <p>Button kitni baar click hua: {{ buttonClicks }}</p>
  <button (click)="increaseCount()">Mujhe Click Karo</button>
</div>
```

3. Parent component se data pass karo:

```html
<!-- app.component.html -->
<div>
  <h1>Mera Angular Application</h1>
  
  <app-my-first-component 
    title="Welcome Page" 
    userName="Rahul">
  </app-my-first-component>
  
  <app-my-first-component 
    title="Profile Section" 
    userName="Priya">
  </app-my-first-component>
</div>
```

### Step 4: Child Se Parent Ko Data Bhejne Ke Liye (Optional)

Agar child component se parent component ko kuch information bhejni hai (like button click event), to `@Output()` decorator use kar sakte hain:

1. Child component mein `@Output()` add karo:

```typescript
// my-first-component.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.css']
})
export class MyFirstComponentComponent {
  @Input() title: string = 'Default Title';
  @Input() userName: string = 'Guest';
  @Output() buttonClicked = new EventEmitter<number>();
  
  welcomeMessage = 'Namaste, Angular seekhne vale!';
  buttonClicks = 0;
  
  increaseCount() {
    this.buttonClicks++;
    this.buttonClicked.emit(this.buttonClicks); // Event emit kiya
  }
}
```

2. Parent component mein event ko handle karo:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalClicks = 0;
  
  handleButtonClick(count: number) {
    console.log(`Button clicked ${count} times`);
    this.totalClicks += 1;
  }
}
```

3. HTML mein event binding karo:

```html
<!-- app.component.html -->
<div>
  <h1>Mera Angular Application</h1>
  <p>Total clicks across all components: {{ totalClicks }}</p>
  
  <app-my-first-component 
    title="Welcome Page" 
    userName="Rahul"
    (buttonClicked)="handleButtonClick($event)">
  </app-my-first-component>
  
  <app-my-first-component 
    title="Profile Section" 
    userName="Priya"
    (buttonClicked)="handleButtonClick($event)">
  </app-my-first-component>
</div>
```

### Step 5: Styling Control (Optional)

Aap decide kar sakte hain ki component ka styling sirf component tak limit rahe ya parent component ko bhi affect kare:

```typescript
@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Default styling behavior
})
```

## Component Lifecycle Hooks (Optional)

Components ke different stages hote hain jisse aap control kar sakte hain:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-first-component',
  templateUrl: './my-first-component.component.html',
  styleUrls: ['./my-first-component.component.css']
})
export class MyFirstComponentComponent implements OnInit, OnDestroy {
  
  ngOnInit() {
    console.log('Component initialized');
    // Data fetch karne ke liye perfect jagah
  }
  
  ngOnDestroy() {
    console.log('Component destroyed');
    // Cleanup tasks ke liye perfect
  }
}
```

Ab aap Angular components ko apne application mein effectively use kar sakte hain! Koi specific question hai component ke use karne ke bare mein?