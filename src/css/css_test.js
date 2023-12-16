import { assertEquals, assertInstanceOf, assertStrictEquals } from 'std/testing/asserts';

import { DOMParser } from 'dom';

import { sesame as z } from '/core/core.js';
import '/css/css.js';

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
    <div id="id-3" class="class-B class-C"></div>
    <div id="id-4" class="class-B class-C"></div>
</body>
</html>
`,
    'text/html',
);

Deno.test('Add a class.', () => {
    globalThis.document = doc.cloneNode(true);

    const cloneDoc = document.cloneNode(true);

    // got
    z('.class-A').addClass('class-X').update();
    cloneDoc.querySelectorAll('.class-A').forEach((el) => {
        el.classList.add('class-X');
    });
    assertEquals(document.documentElement.outerHTML, cloneDoc.documentElement.outerHTML);

    globalThis.document = undefined;
});

Deno.test('Add the classes.', () => {
    globalThis.document = doc.cloneNode(true);

    const cloneDoc = document.cloneNode(true);

    // got
    z('.class-A').addClass('class-Y', 'class-Z').update();
    // want
    cloneDoc.querySelectorAll('.class-A').forEach((el) => {
        el.classList.add('class-Y', 'class-Z');
    });
    assertEquals(document.documentElement.outerHTML, cloneDoc.documentElement.outerHTML);

    globalThis.document = undefined;
});

Deno.test('Remove a class.', () => {
    globalThis.document = doc.cloneNode(true);

    const cloneDoc = document.cloneNode(true);

    // got
    z('.class-B').removeClass('class-C').update();
    // want
    cloneDoc.querySelectorAll('.class-B').forEach((el) => {
        el.classList.remove('class-C');
    });
    assertEquals(document.documentElement.outerHTML, cloneDoc.documentElement.outerHTML);

    globalThis.document = undefined;
});

Deno.test('Remove the classes.', () => {
    globalThis.document = doc.cloneNode(true);

    const cloneDoc = document.cloneNode(true);

    // got
    z('.class-B').removeClass('class-B', 'class-C').update();
    // want
    cloneDoc.querySelectorAll('.class-B').forEach((el) => {
        el.classList.remove('class-B', 'class-C');
    });
    assertEquals(document.documentElement.outerHTML, cloneDoc.documentElement.outerHTML);

    globalThis.document = undefined;
});
