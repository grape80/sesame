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
    <div id="id-1" class="class-A"></div>
    <div id="id-2" class="class-A"></div>
    <div id="id-3" class="class-B"></div>
</body>
</html>
`,
    'text/html',
);

describe('Constructor', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
    });

    describe('Create an instance', () => {
        it('without the new keyword', () => {
            const instance = z('parameter');
            assertInstanceOf(instance, z);
        });

        it('with the new keyword', () => {
            const instance = new z('parameter');
            assertInstanceOf(instance, z);
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
                const got = z('#id-0');

                assertEquals(got.elements.length, 0);
                assertStrictEquals(got.elements[0], undefined);
            });
        });

        describe('By class', () => {
            it('exist', () => {
                const got = z('.class-A');
                const want = document.getElementsByClassName('class-A');

                assertEquals(got.elements.length, want.length);
                want.forEach((el, idx) => {
                    assertStrictEquals(got.elements[idx], el);
                });
            });
            it('not exist', () => {
                const got = z('.class-C');

                assertEquals(got.elements.length, 0);
                assertStrictEquals(got.elements[0], undefined);
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
                const got = z('*.class-C');

                assertEquals(got.elements.length, 0);
                assertStrictEquals(got.elements[0], undefined);
            });
        });
    });

    afterEach(() => {
        globalThis.document = undefined;
    });
});
