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
    <div id="id-1" class="class-1"></div>
    <div id="id-2" class="class-1"></div>
    <div id="id-3" class="class-2 class-3"></div>
    <div id="id-4" class="class-2 class-3"></div>
</body>
</html>
`,
    'text/html',
);

// The document for comparison.
let compDoc = undefined;

describe('Class manipulation', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
        compDoc = document.cloneNode(true);
    });

    afterEach(() => {
        globalThis.document = undefined;
        compDoc = undefined;
    });

    describe('Add class', () => {
        it('single', () => {
            z('.class-1').addClass('class-X').update();
            const got = document.documentElement.outerHTML;

            compDoc.querySelectorAll('.class-1').forEach((el) => el.classList.add('class-X'));
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });

        it('multiple', () => {
            z('.class-1').addClass('class-Y', 'class-Z').update();
            const got = document.documentElement.outerHTML;

            compDoc.querySelectorAll('.class-1').forEach((el) => el.classList.add('class-Y', 'class-Z'));
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });
    });

    describe('Remove class', () => {
        it('single', () => {
            z('.class-2').removeClass('class-3').update();
            const got = document.documentElement.outerHTML;

            compDoc.querySelectorAll('.class-2').forEach((el) => el.classList.remove('class-3'));
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });

        it('multiple', () => {
            z('.class-2').removeClass('class-2', 'class-3').update();
            const got = document.documentElement.outerHTML;

            compDoc.querySelectorAll('.class-2').forEach((el) => el.classList.remove('class-2', 'class-3'));
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });
    });

    describe('Toggle class', () => {
        describe('Add', () => {
            it('single', () => {
                z('.class-1').toggleClass('class-X').update();
                const got = document.documentElement.outerHTML;

                compDoc.querySelectorAll('.class-1').forEach((el) => el.classList.toggle('class-X'));
                const want = compDoc.documentElement.outerHTML;

                assertEquals(got, want);
            });

            it('multiple', () => {
                z('.class-1').toggleClass('class-Y', 'class-Z').update();
                const got = document.documentElement.outerHTML;

                compDoc.querySelectorAll('.class-1').forEach((el) => {
                    el.classList.toggle('class-Y');
                    el.classList.toggle('class-Z');
                });
                const want = compDoc.documentElement.outerHTML;

                assertEquals(got, want);
            });
        });

        describe('Remove', () => {
            it('single', () => {
                z('.class-2').toggleClass('class-3').update();
                const got = document.documentElement.outerHTML;

                compDoc.querySelectorAll('.class-2').forEach((el) => el.classList.toggle('class-3'));
                const want = compDoc.documentElement.outerHTML;

                assertEquals(got, want);
            });

            it('multiple', () => {
                z('.class-2').toggleClass('class-2', 'class-3').update();
                const got = document.documentElement.outerHTML;

                compDoc.querySelectorAll('.class-2').forEach((el) => {
                    el.classList.toggle('class-2');
                    el.classList.toggle('class-3');
                });
                const want = compDoc.documentElement.outerHTML;

                assertEquals(got, want);
            });
        });
    });
});
