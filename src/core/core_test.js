import { assertEquals, assertInstanceOf, assertStrictEquals } from 'std/testing/asserts';
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd';

import { DOMParser } from 'dom';

import { sesame as z } from '../core/core.js';

// The document to use for testing.
const resp = await fetch(new URL('./testdata/doc.html', import.meta.url));
const doc = new DOMParser().parseFromString(
    await resp.text(),
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
        describe('by ID', () => {
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

        describe('by class', () => {
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

        describe('by CSS selector', () => {
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
