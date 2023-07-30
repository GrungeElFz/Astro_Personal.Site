---
title: "React vs Svelte (Q3 2023)"
description: "Essential Q3 2023 guide for React and Svelte with code examples."
pubDate: "July 1 2023"
heroImage: "/Blog-Post2_Banner.jpg"
---

_" Any reasonable developer in today's world would learn React because it's the status quo and that's where the jobs are,
but life is a lot more fun when you become unreasonable and go against the status quo to push web development forward for future generations "_

\- Fireship, June 30, 2023

---

In this discussion, we will explore and compare between React and Svelte, by examining their common patterns and design choices made by the framework creators.

I won't be making a definitive judgment on which framework is superior, since it's better to just leave the comment on the <a href="https://www.youtube.com/@Fireship" target="_blank" style="text-decoration: none;">Fireship</a> 🔥 YouTube channel.

## 1. Rendering

React.JS utilizes a runtime known as the _Virtual DOM_ to monitor and track changes in application data.
This allows React to update and render these changes in the actual DOM of the web browser.

![React Virtual DOM](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*anbYIevICliUs1WWeEPkiA.png)

The drawback is a certain amount of initial JavaScript code requirement.
For example, in a framework like Next.JS, the baseline size is ~70 kilobytes, even for a simple _"Hello World"_.

Svelte takes a unique approach by using a compiler to transform your code into vanilla JavaScript, eliminating the need for a separate runtime. As a result, a basic _"Hello World"_ in Svelte can be as small as ~3 kilobytes.

<blockquote style="font-size: smaller;">
      <a href="https://andreassujono.medium.com/react-virtual-dom-is-slow-try-million-js-105474a93db6" target="_blank">
        React Virtual DOM is SLOW, try Million.JS
      </a>
</blockquote>

## 2. State

An example of a simple Counter app implemented in both React and Svelte.

```jsx
// App.jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((c) => c + 1)}>Count is {count}</button>
  );
}

export default Counter;
```

In React, we create components using functions.

Inside these components, we can incorporate reactive state by utilizing the useState hook.
This hook allows us to obtain a reactive value and a setter function, enabling us to update the state.

```js
// App.svelte
<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Count is {count}
</button>
```

In Svelte, you work with a single component file.

The logic is defined within script tags, which simplifies the development process.
To create reactive state, simply declare a variable using the `let` keyword.
You can define a function that directly modifies the variable's value upon a click event.

<blockquote style="font-weight: 300;">
  The beauty of Svelte lies in its concise syntax – no imports or function calls are needed to initialize the state. It feels like working with vanilla JavaScript, keeping things simple and efficient.
</blockquote>

---

## 3. Props

In React, we pass props by defining them as function arguments, which are commonly destructured for convenience.

```jsx
// App.jsx
function ColoredBox({ color }) {
  return (<p>You picked: {color});
}
```

In Svelte, you can pass variables from the outside, by simply using the `export` keyword in front of them.

```js
// App.svelte
<script>
  export let color;
</script>

You picked: {color}
```

---

## 4. Children

In React, we have the ability to pass components as `props` and render them directly within the `JSX` code.

```jsx
// App.jsx
function NavBar(props) {
  return <nav>{props.children}</nav>;
}
```

Additionally, if we need to insert UI content inside a component, we can utilize the built-in `props.children` value.

```jsx
<Navbar>
  <a href="/">Hi, mom!</a>
  <a href="/heaven">Hi, dad!</a>
</Navbar>
```

In Svelte, there is a distinct system called `slots`.
The default `<slot />` element in Svelte is equivalent to the usage of `{props.children}` in React.

```js
// App.svelte
<slot name="header" />
<slot />
<slot name="footer" />
```

In addition, Svelte provides the capability to create named slots, enabling the insertion of UI at specific locations within the markup of the component.

---

## 5. Lifecycle

In React, we have the `useEffect` hook, which accepts a callback function as its first argument.
By providing an empty array as the second argument, we indicate that the effect should only run once and has no dependencies on specific data.

```jsx
// App.jsx
function Navbar() {
  useEffect(() => {
    const test = async () => {
      // Handle promise
    };
    test();
  }, []);
}
```

In Svelte, we can achieve a similar pattern using the `onMount` function.
Not only is it more readable, but it also has the advantage of being able to handle async functions, which is not directly supported in React.

<blockquote style="font-weight: 300;">
  This means that in React, you would need to define a separate async function outside of the main callback, creating more complexity.
</blockquote>

```js
// App.svelte
<script>
  onMount(async () =>{" "}
  {
    // Handle promise
  }
  );
</script>
```

---

## 6. Side Effects

In React, we can create a side effect using the `useEffect` hook.

By specifying the `count` variable in the dependencies array, we can make it update the document title whenever the `count` changes.

```jsx
// App.jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count is ${count}`;
  }, []);
}
```

In Svelte, we utilize a distinct mechanism known as _reactive declarations_.
It uses the `$:` syntax, which triggers the code to re-run whenever there are changes in any of the dependent data.

```js
// App.svelte
<script>
  let count;
  
  $: document.title = `Count is ${count}`;
</script>
```

In the above code, the Svelte compiler recognizes the dependency on the count value.
It automatically updates the `document.title` whenever the count value changes.

<blockquote style="font-weight: 300;">
  In React, it's common to mistakenly configure the dependencies array, leading to unexpected results that can be challenging to debug.
  <br>
  <br>
  This approach in Svelte is not only more concise, but it also tends to be more reliable.
</blockquote>

## 7. Computed State

In React, you can easily achieve computed state by defining a variable that depends on some state.

<blockquote style="font-weight: 300;">
  However, the code will run every time the component is re-rendered, which can impact performance.
</blockquote>

```jsx
// App.jsx
function Counter() {
  const [count, setCount] = useState(0);

  const doubled = count * 2;

  useEffect(() => {
    document.title = `Count is ${count}`;
  }. [count]);
}
```

To optimize the computational power in React, it is recommended to wrap the code that computes state with `useMemo`.
By explicitly specifying the dependencies, React can cache or memorize the computed value between renders.

```jsx
// App.jsx
function Counter() {
  const [count, setCount] = useState(0);

  const doubled = useMemo(() => count * 2);

  useEffect(() => {
    document.title = `Count is ${count}`;
  }. [count]);
}
```

In Svelte, there's no need to explicitly use memoization techniques like in React.
By utilizing the same reactive declaration, we can define a new variable.

```svelte
<!-- App.svelte -->
<script>
let count;

$: doubled = count * 2;
$: document.title = `Count is ${count}`
</script>
```

Svelte automatically understands that this code should only run when the count changes.
This streamlined approach eliminates the need to explicitly handle memoization.

---

## 8. Conditional Logic

In React, using _an if statement_ directly within a function component is not possible.
Since a function component must return a JavaScript expression representing a single value, we can utilize _a ternary operator_ to represent basic _if-else_ conditions.

<blockquote style="font-weight: 300;">
  This allows us to condense the logic into a single line of code.
</blockquote>

```jsx
// App.jsx
function Counter() {
  const [count, setCount] = useState(0);

  return <>{count > 100 ? <p>Big</p> : <p>Medium</p>}</>;
}
```

Svelte, leveraging its compiler, offers the flexibility to incorporate various templating features.
This includes the ability to create if-else statements directly within the HTML code, similar to traditional JavaScript syntax.

<blockquote style="font-weight: 300;">
  Although, it may require slightly more code, but this approach enhances readability and clarity in Svelte templates.
</blockquote>

```js
// App.svelte
<script>
  let count = 0;
</script>

{#if count > 100}
  <p>Big</p>
{:else}
  <p>Medium</p>
{/if}
```

The advantage of readability becomes even more evident when dealing with complex conditions, such as an _if - else if statement_.

```jsx
// App.jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>{count > 100 ? <p>Big</p> : count > 50 ? <p>Medium</p> : <p>Small</p>}</>
  );
}
```

<blockquote style="font-weight: 300;">
  In React, it is common to encounter <i>nested ternary operators</i>, resulting in code that can become difficult to maintain.
</blockquote>

```js
// App.svelte
<script>
  let count = 0;
</script>

{#if count > 100}
  <p>Big</p>
{:else if count > 500}
  <p>Medium</p>
{:else}
  <p>Small</p>
{/if}
```

<blockquote style="font-weight: 300;">
  Comparing to Svelte.
</blockquote>

---

## 9. Loops

In React, the most common approach for iterating and rendering a list is to use the `map` function on an array.

<blockquote style="font-weight: 300;">
  To optimize the list rendering performance, it is recommended to assign a unique key prop to each child component within the loop.
</blockquote>

```jsx
// App.jsx
function Counter() {
  const items = [
    { id: 1, name: "foo" },
    { id: 2, name: "bar" },
    { id: 3, name: "baz" },
  ];

  return (
    <>
      {items.map((item) => {
        <div key={item.id}>{item.name}</div>;
      })}
    </>
  );
}
```

In Svelte, we can loop over an array of data using the each block.
It creates a template variable for each item, enabling us to access its data within the tags.

```js
<script>
  const items = [
    { id: 1, name: "foo" },
    { id: 2, name: "bar" },
    { id: 3, name: "baz" },
  ]
</script>

{#each items as item {item.id}}
  <p>{item.name}</p>
{/each}
```

<blockquote style="font-weight: 300;">
  To make it a keyed loop, we can specify the key value inside parentheses within the each block, ensuring efficient rendering and updates.
</blockquote>

---

## 10. Shared State

In React, there is no built-in primitive mechanism to easily share a single reactive value across the entire component tree.

<blockquote style="font-weight: 300;">
  Typically, we need to bring in a state management solution like
  <a href="https://redux.js.org" target="_blank" style="text-decoration: none;">Redux</a>,
  <a href="https://mobx-state-tree.js.org" target="_blank" style="text-decoration: none;">MobX</a>,
  or <a href="https://jotai.org" target="_blank" style="text-decoration: none;">Jotai</a>.
</blockquote>

![Shared State](/Blog-Post2_1.jpg)

In the case of <a href="https://jotai.org" target="_blank" style="text-decoration: none;">Jotai</a>, we can create an atom to represent a value.

```jsx
// Jotai
import { atom } from "jotai";

export const countAtom = atom(0);
```

Then, we can utilize the `useAtom` hook to access that value.
This approach allows us to use shared state across multiple locations by decoupling it from individual components.

```jsx
// App.jsx
import { useAtom } from "jotai";
import { countAtom } from "./atom";

function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Count is {count}</button>
    </>
  );
}
```

On the contrary, Svelte offers a built-in mechanism called `stores`.

<blockquote style="font-weight: 300;">
  <code>stores</code> bears resemblance to observables in libraries such as <a href="https://rxjs.dev" target="_blank" style="text-decoration: none;">RX.JS</a>.
</blockquote>

In Svelte, we can create a writable store to represent a value.

```js
// store.js
import { writable } from "svelte/store";

export const countStore = writable(0);
```

We can subscribe to the value of that store within any component, whether it's in the templates or in the JavaScript code.
To achieve this, we simply prepend the `$` in front of the store name.

```js
// App.svelte
<script>
  import { countStore } from "./store";
</script>

<button on:click={() => countStore.update(c => c + 1)}>
  Count is {$countStore}
</button>
```

Additionally, it automatically handles the task of unsubscribing from data when there are no more listeners,
which can be crucial when working with real-time data sources like <a href="https://firebase.google.com/docs/firestore" target="_blank" style="text-decoration: none;">Firestore</a>.

<blockquote style="font-weight: 300;">
  " As a Svelte user myself, I can't even begin to tell you how much complexity and code this one little mechanism
  will eliminate from your code base it allows you to use reactive data throughout the entire application with surgical precision and zero boilerplate.
  <br>
  <br>
  Thanks to the magic of Svelte compiler. "
  <br>
  <br>
  - Fireship, June 30, 2023
</blockquote>

---

## 11. Promises

React introduces a new experimental hook called `use` which allows unwrapping promises directly within a component.
It functions similarly to the `await` keyword, resolving the promise value into a variable.

However, it's also important to handle loading states and potential errors.
One approach is to wrap the component with `Suspense`, which displays a loading spinner as a fallback while the promise is being resolved. Additionally, the entire setup can be enclosed within an error boundary to handle and display an error page if the promise is rejected.

<blockquote style="font-weight: 300;">
  This code may appear intimidating and requires a deep understanding of React to comprehend its functionality.
</blockquote>

```jsx
// App.jsx
function ComponentWithAsyncData() {
  const number = use(Promise.resolve(100));

  return (
    <p>{number}</p>
  );
}

function App() {
  return {
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<LoadindSpinner />}>
        <ComponentWithAsyncData />
      </Suspense>
    </ErrorBoundary>
  }
}
```

In Svelte, we have the capability to directly unwrap promises within a template using the `await` keyword.
While awaiting the resolution of the promise, a loading spinner can be displayed. Once the promise resolves, the main UI is shown.

```js
// App.svelte
<script>
  import { LoadingSpinner, ErrorPage } from "$components";

  const promise = Promise.resolve(100);
</script>

{#await promise}
  <LoadingSpinner />
{:then number}
  <p>The number is {number}</p>
{:catch error}
  <ErrorPage {error} />
{/await}
```

<blockquote style="font-weight: 300;">
  Conversely, if there is an error, the error UI is displayed.
  <br>
  This approach is easily understandable for JavaScript developers familiar with promises.
</blockquote>

---

### Don't forget to show some love and support! 🔥

![Fireship.io](https://premium-storefronts.s3.amazonaws.com/storefronts/fireshipio-swag/assets/bg_home_banner.png)

> Thank you to Fireship for providing the valuable information used in this blog post.

Check out <a href="https://fireship.io" target="_blank" style="text-decoration: none;">Fireship.io</a> for more amazing content and resources. 👇

- [Beyond Fireship](https://www.youtube.com/@beyondfireship)
- [SvelteKit Course](https://fireship.io/courses/sveltekit)
- [Next.JS 13 Course](https://fireship.io/courses/nextjs)
