import { assertEquals, assertInstanceOf, assertStrictEquals } from 'std/testing/asserts';
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd';

import { DOMParser } from 'dom';

import { sesame as z } from '../core/core.js';

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
    <div id="id-3" class="class-2"></div>
</body>
</html>
`,
    'text/html',
);

describe('Constructor', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
    });

    afterEach(() => {
        globalThis.document = undefined;
    });

    describe('Create an instance', () => {
        it('without the new keyword', () => {
            const got = z('parameter');
            const want = z;

            assertInstanceOf(got, want);
        });

        it('with the new keyword', () => {
            const got = new z('parameter');
            const want = z;

            assertInstanceOf(got, want);
        });
    });

    describe('Select elements', () => {
        describe('By id', () => {
            it('exist', () => {
                const got = z('#id-1');
                const want = document.getElementById('id-1');

                assertEquals(got.elements.length, 1);
                assertStrictEquals(got.elements[0], want);
            });

            it('not exist', () => {
                const got = z('#not-exist');
                const want = undefined;

                assertEquals(got.elements.length, 0);
                assertStrictEquals(got.elements[0], want);
            });
        });

        describe('By class', () => {
            it('exist', () => {
                const got = z('.class-1');
                const want = document.getElementsByClassName('class-1');

                assertEquals(got.elements.length, want.length);
                want.forEach((el, idx) => {
                    assertStrictEquals(got.elements[idx], el);
                });
            });

            it('not exist', () => {
                const got = z('.not-exist');
                const want = undefined;

                assertEquals(got.elements.length, 0);
                assertStrictEquals(got.elements[0], want);
            });
        });

        describe('By css selector', () => {
            it('exist', () => {
                const got = z('*[id]');
                const want = document.querySelectorAll('[id]');

                assertEquals(got.elements.length, want.length);
                want.forEach((el, idx) => {
                    assertStrictEquals(got.elements[idx], el);
                });
            });

            it('not exist', () => {
                const got = z('*.not-exist');
                const want = undefined;

                assertEquals(got.elements.length, 0);
                assertStrictEquals(got.elements[0], want);
            });
        });
    });
});
