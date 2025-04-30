Install Bootstrap and Tailwind Separately into Angular App (Full Text Version)

1. Open your terminal  
Go to your Angular project:

```
cd my-angular-app
```

---

Install Bootstrap Only

1. Install Bootstrap

```
npm install bootstrap
```

2. Edit your `src/styles.css`

Open `src/styles.css` and add this at the top:

```css
@import 'bootstrap/dist/css/bootstrap.min.css';
```

3. Update your `angular.json`

Open `angular.json`, find the `"build"` options under `"architect"`, and ensure your styles section looks like this:

```json
"styles": [
  "src/styles.css"
],
```

4. Run your Angular app

```
ng serve
```

Now Bootstrap is ready to use in your Angular app.

---

Install Tailwind CSS Only

1. Install Tailwind CSS, PostCSS, and Autoprefixer

```
npm install -D tailwindcss postcss autoprefixer
```

2. Initialize Tailwind CSS

```
npx tailwindcss init
```
This will create a file called `tailwind.config.js`.

3. Edit your `src/styles.css`

Add the following (if not already added):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Update your `angular.json`

Make sure the styles section looks like this:

```json
"styles": [
  "src/styles.css"
],
```

5. Run your Angular app

```
ng serve
```

Now Tailwind is ready to use in your Angular app.

---

Example Usage

Bootstrap Example:

```html
<button class="btn btn-primary">
  Bootstrap Button
</button>
```

Tailwind Example:

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Tailwind Button
</button>
```

---

Checklist for Bootstrap

| Step                  | Done? |
|-----------------------|-------|
| Installed Bootstrap   | ✅     |
| Imported in styles.css| ✅     |
| Updated angular.json  | ✅     |
| Started the app       | ✅     |

Checklist for Tailwind

| Step                  | Done? |
|-----------------------|-------|
| Installed Tailwind    | ✅     |
| Initialized Tailwind  | ✅     |
| Added Tailwind to styles.css | ✅ |
| Updated angular.json  | ✅     |
| Started the app       | ✅     |

"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
npm install jquery
npm install bootstrap
npm install jquery
