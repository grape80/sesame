import { assertEquals } from 'std/testing/asserts';
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd';

import { DOMParser } from 'dom';

import { sesame as z } from '../core/core.js';
import '../manip/manip.js';

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
    <div id="id-1" data-id="data-id-1">text-A</div>
    <div id="id-2" data-id="data-id-2">text-B</div>
    <div id="id-3" data-id="data-id-3">text-C</div>
</body>
</html>
`,
    'text/html',
);

describe('Text manipulation', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
    });

    describe('Get text from element', () => {
        it('single', () => {
            const cloneDoc = document.cloneNode(true);

            const got = z('#id-1').text().join();
            const want = cloneDoc.getElementById('id-1').textContent;

            assertEquals(got, want);
        });

        it('multiple', () => {
            const cloneDoc = document.cloneNode(true);

            const got = z('*[id]').text().join();
            const want = Array.from(cloneDoc.querySelectorAll('[id]')).map((el) => el.textContent).join();

            assertEquals(got, want);
        });
    });

    describe('Set text to element', () => {
        it('single', () => {
            const cloneDoc = document.cloneNode(true);

            z('#id-1').text('text-1').update();
            const got = document.documentElement.outerHTML;

            cloneDoc.getElementById('id-1').textContent = 'text-1';
            const want = cloneDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });

        it('multiple', () => {
            const cloneDoc = document.cloneNode(true);

            z('*[id]').text('text-M').update();
            const got = document.documentElement.outerHTML;

            cloneDoc.querySelectorAll('[id]').forEach((el) => {
                el.textContent = 'text-M';
            });
            const want = cloneDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });
    });

    afterEach(() => {
        globalThis.document = undefined;
    });
});
