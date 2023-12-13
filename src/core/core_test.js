import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { assertInstanceOf, assertEquals, assertStrictEquals } from "https://deno.land/std/testing/asserts.ts";

import { sesame as z } from "./core.js";

// Save the original document.
const orgDoc = globalThis.document;

// The document to use for testing.
const doc = new DOMParser().parseFromString(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Test</title>
</head>
<body>
  <div id="id-1" class="class-A"></div>
  <div id="id-2" class="class-A"></div>
  <div id="id-3" class="class-B"></div>
</body>
</html>
`, 'text/html');


Deno.test("Creating an instance without the new keyword", () => {
  const instance = z('parameter');
  assertInstanceOf(instance, z);
});

Deno.test("Creating an instance with the new keyword", () => {
  const instance = new z('parameter');
  assertInstanceOf(instance, z);
});

Deno.test("Selecting an element by id", () => {
  globalThis.document = doc;

  const got = z('#id-1');
  const want = document.getElementById('id-1');

  assertEquals(got.elements.length, 1);
  assertStrictEquals(got.elements[0], want);

  globalThis.document = orgDoc;
});

Deno.test("Selecting elements by class", () => {
  globalThis.document = doc;

  const got = z('.class-A');
  const want = document.getElementsByClassName('class-A');

  assertEquals(got.elements.length, want.length);
  want.forEach((el, idx) => {
    assertStrictEquals(got.elements[idx], el);
  });

  globalThis.document = orgDoc;
});

Deno.test("Selecting elements by querySelectorAll", () => {
  globalThis.document = doc;

  const got = z('*[id]');
  const want = document.querySelectorAll('*[id]');

  assertEquals(got.elements.length, want.length);
  want.forEach((el, idx) => {
    assertStrictEquals(got.elements[idx], el);
  });

  globalThis.document = orgDoc;
});