Angular Project Setup:
1: if no angular install then do it using 
command : npm i -g @angular/cli

2:create one folder with name
command : ng new project_name

additional imp :
command : in app.config.ts
add provideHttpClient(withfetch())

3:to start project
command : ng serve

4:to create component
command : ng g c component_name(it create u 4 files)

5:to add route in code
command : 
{
path : "eg:add-user",
component : component_name
}




Sure! Here's a simplified list of the **essential Angular commands** with a brief explanation of **why** you would use each one:

---

## 🚀 **Basic Angular Commands**

1. **`ng new my-website`**
   - **Why**: Initializes a new Angular project with default settings.

2. **`ng serve`**
   - **Why**: Starts the development server and runs the app locally at `http://localhost:4200`.

3. **`ng generate component component-name`**
   - **Why**: Creates a new Angular component (UI building block).

4. **`ng generate service service-name`**
   - **Why**: Creates a new service to handle logic, such as data fetching.

5. **`ng generate module module-name`**
   - **Why**: Creates a new module to organize related components, services, etc.

6. **`ng build`**
   - **Why**: Builds the project for development and prepares it for deployment.

7. **`ng build --prod`**
   - **Why**: Builds an optimized production version of the app.

8. **`ng test`**
   - **Why**: Runs unit tests to ensure your code works as expected.

9. **`ng update`**
   - **Why**: Updates Angular and its dependencies to the latest version.

10. **`ng lint`**
    - **Why**: Checks your code for potential errors and bad practices.

---

These are the key commands that help you build, develop, and manage an Angular application efficiently. Let me know if you need further clarification on any command!