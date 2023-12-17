import { assertEquals } from 'std/testing/asserts';
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd';

import { DOMParser } from 'dom';

import { sesame as z } from '../core/core.js';
import '../class/class.js';

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

describe('Class manipulation', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
    });

    describe('Add class', () => {
        it('a class', () => {
            const cloneDoc = document.cloneNode(true);

            z('.class-A').addClass('class-X').update();
            const got = document.documentElement.outerHTML;

            cloneDoc.querySelectorAll('.class-A').forEach((el) => {
                el.classList.add('class-X');
            });
            const want = cloneDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });

        it('classes', () => {
            const cloneDoc = document.cloneNode(true);

            z('.class-A').addClass('class-Y', 'class-Z').update();
            const got = document.documentElement.outerHTML;

            cloneDoc.querySelectorAll('.class-A').forEach((el) => {
                el.classList.add('class-Y', 'class-Z');
            });
            const want = cloneDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });
    });

    describe('Remove class', () => {
        it('a class', () => {
            const cloneDoc = document.cloneNode(true);

            z('.class-B').removeClass('class-C').update();
            const got = document.documentElement.outerHTML;

            cloneDoc.querySelectorAll('.class-B').forEach((el) => {
                el.classList.remove('class-C');
            });
            const want = cloneDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });

        it('classes', () => {
            const cloneDoc = document.cloneNode(true);

            z('.class-B').removeClass('class-B', 'class-C').update();
            const got = document.documentElement.outerHTML;

            cloneDoc.querySelectorAll('.class-B').forEach((el) => {
                el.classList.remove('class-B', 'class-C');
            });
            const want = cloneDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });
    });

    describe('Toggle class', () => {
        describe('Add', () => {
            it('a class', () => {
                const cloneDoc = document.cloneNode(true);

                z('.class-A').toggleClass('class-X').update();
                const got = document.documentElement.outerHTML;

                cloneDoc.querySelectorAll('.class-A').forEach((el) => {
                    el.classList.toggle('class-X');
                });
                const want = cloneDoc.documentElement.outerHTML;

                assertEquals(got, want);
            });

            it('classes', () => {
                const cloneDoc = document.cloneNode(true);

                z('.class-A').toggleClass('class-Y', 'class-Z').update();
                const got = document.documentElement.outerHTML;

                cloneDoc.querySelectorAll('.class-A').forEach((el) => {
                    el.classList.toggle('class-Y');
                    el.classList.toggle('class-Z');
                });
                const want = cloneDoc.documentElement.outerHTML;

                assertEquals(got, want);
            });
        });

        describe('Remove', () => {
            it('a class', () => {
                const cloneDoc = document.cloneNode(true);

                z('.class-B').toggleClass('class-C').update();
                const got = document.documentElement.outerHTML;

                cloneDoc.querySelectorAll('.class-B').forEach((el) => {
                    el.classList.toggle('class-C');
                });
                const want = cloneDoc.documentElement.outerHTML;

                assertEquals(got, want);
            });

            it('classes', () => {
                const cloneDoc = document.cloneNode(true);

                z('.class-B').toggleClass('class-B', 'class-C').update();
                const got = document.documentElement.outerHTML;

                cloneDoc.querySelectorAll('.class-B').forEach((el) => {
                    el.classList.toggle('class-B');
                    el.classList.toggle('class-C');
                });
                const want = cloneDoc.documentElement.outerHTML;

                assertEquals(got, want);
            });
        });
    });

    afterEach(() => {
        globalThis.document = undefined;
    });
});
