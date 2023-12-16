import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import { assertEquals, assertInstanceOf, assertStrictEquals } from 'https://deno.land/std/testing/asserts.ts';

import { sesame as z } from './core.js';

// The document to use for testing.
const doc = new DOMParser().parseFromString(
    `
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
`,
    'text/html',
);

Deno.test('Create an instance without the new keyword.', () => {
    globalThis.document = doc.cloneNode(true);

    const instance = z('parameter');
    assertInstanceOf(instance, z);

    globalThis.document = undefined;
});

Deno.test('Create an instance with the new keyword.', () => {
    globalThis.document = doc.cloneNode(true);

    const instance = new z('parameter');
    assertInstanceOf(instance, z);

    globalThis.document = undefined;
});

Deno.test('Select an element by ID.', () => {
    globalThis.document = doc.cloneNode(true);

    const got = z('#id-1');
    const want = document.getElementById('id-1');

    assertEquals(got.elements.length, 1);
    assertStrictEquals(got.elements[0], want);

    globalThis.document = undefined;
});

Deno.test('Select elements by class.', () => {
    globalThis.document = doc.cloneNode(true);

    const got = z('.class-A');
    const want = document.getElementsByClassName('class-A');

    assertEquals(got.elements.length, want.length);
    want.forEach((el, idx) => {
        assertStrictEquals(got.elements[idx], el);
    });

    globalThis.document = undefined;
});

Deno.test('Select elements by CSS Selectors.', () => {
    globalThis.document = doc.cloneNode(true);

    const got = z('*[id]');
    const want = document.querySelectorAll('*[id]');

    assertEquals(got.elements.length, want.length);
    want.forEach((el, idx) => {
        assertStrictEquals(got.elements[idx], el);
    });

    globalThis.document = undefined;
});
