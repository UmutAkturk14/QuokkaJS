# **QuokkaJS TypeScript Style Guide**

This document outlines the coding standards and best practices for the **QuokkaJS** project. These standards are enforced using ESLint with the configuration provided in `.eslintrc.js`. All contributors are expected to adhere to these guidelines to ensure consistency, readability, and maintainability of the codebase.

---

## **1. General Guidelines**

- **TypeScript**: This is a TypeScript-only project. JavaScript files are ignored.
    
- **ES Modules**: Use `import`/`export` syntax for module management.
    
- **Modern JavaScript**: Use ECMAScript 2020 features (e.g., optional chaining, nullish coalescing).
    
- **Readability**: Write clean, self-documenting code. Use meaningful variable and function names.
    
- **Consistency**: Follow the conventions outlined in this document.
    

---

## **2. Type Annotations**

Explicit type annotations are required for all variables, parameters, and return types. This improves code readability and helps catch type-related errors early.

### **2.1 Variables**

Always specify the type for variables.

```typescript
// Bad
const message = "Hello, World!";

// Good
const message: string = "Hello, World!";
```

### **2.2 Functions**

Always specify the return type and parameter types for functions.

```typescript
// Bad
function add(a, b) {
  return a + b;
}

// Good
function add(a: number, b: number): number {
  return a + b;
}
```

### **2.3 Arrow Functions**

Arrow functions must also have explicit return and parameter types.

```typescript
// Bad
const multiply = (a, b) => a * b;

// Good
const multiply = (a: number, b: number): number => a * b;
```

### **2.4 Class Properties**

Class properties must have explicit type annotations.

```typescript
// Bad
class User {
  name = "John";
}

// Good
class User {
  name: string = "John";
}
```

---

## **3. Module Boundaries**

Explicit types are required for all exported functions and methods.

### **3.1 Exported Functions**

Exported functions must have explicit return and parameter types.

```typescript
// Bad
export function greet(name) {
  return `Hello, ${name}`;
}

// Good
export function greet(name: string): string {
  return `Hello, ${name}`;
}
```

### **3.2 Exported Classes**

Exported classes must have explicit types for properties and methods.

```typescript
// Bad
export class Calculator {
  add(a, b) {
    return a + b;
  }
}

// Good
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}
```

---

## **4. Destructuring**

Explicit types are required for destructured variables.

### **4.1 Object Destructuring**

```typescript
// Bad
const { name, age } = user;

// Good
const { name, age }: { name: string; age: number } = user;
```

### **4.2 Array Destructuring**

```typescript
// Bad
const [first, second] = array;

// Good
const [first, second]: [number, number] = array;
```

---

## **5. Disallowed Practices**

The following practices are explicitly disallowed:

### **5.1 `any` Type**

The use of `any` is prohibited. Always use explicit types.

```typescript
// Bad
function logValue(value: any) {
  console.log(value);
}

// Good
function logValue(value: unknown) {
  console.log(value);
}
```

### **5.2 Non-Null Assertions**

Non-null assertions (`!`) are not allowed. Use proper type guards or optional chaining instead.

```typescript
// Bad
const name = user!.name;

// Good
const name = user?.name;
```

---

## **6. Code Formatting**

- Use **2 spaces** for indentation.
    
- Use **single quotes** for strings.
    
- Use **trailing commas** in multi-line objects and arrays.
    
- Use **semicolons** at the end of statements.
    

### **Example**

```typescript
const user: { name: string; age: number } = {
  name: 'John',
  age: 30,
};

function greet(name: string): string {
  return `Hello, ${name}`;
}
```

---

## **7. Linting and Validation**

The project uses ESLint to enforce these standards. Run the following commands to check and fix your code:

### **7.1 Check for Errors**

```bash
npm run lint
```

### **7.2 Automatically Fix Issues**

```bash
npm run lint:fix
```

---

## **8. Ignored Files**

- All `.js` files are ignored by ESLint, as this is a TypeScript-only project.
    
- Ignored files are specified in `.eslintrc.js` under `ignorePatterns`.
    

---

## **9. Best Practices**

- **Keep Functions Small**: Functions should do one thing and do it well.
    
- **Avoid Side Effects**: Write pure functions whenever possible.
    
- **Use Descriptive Names**: Variable and function names should clearly describe their purpose.
    
- **Write Tests**: Ensure all code is covered by unit tests.
    

---

## **10. References**

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
    
- [ESLint Documentation](https://eslint.org/docs/)
    
- [@typescript-eslint Plugin Documentation](https://typescript-eslint.io/)
    

### **ESLint Configuration**

The project uses the following ESLint configuration to enforce coding standards. You can find the full configuration in the `.eslintrc.js` file in the root of the repository.


---

By following these coding standards, you’ll contribute to a clean, maintainable, and consistent codebase for QuokkaJS. Let’s build something amazing together! 🚀