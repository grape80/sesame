import { assertEquals, assertStrictEquals } from 'std/testing/asserts';
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
    <div id="id-4" data-id="data-id-4">
        <p>para-A</p>
    </div>
    <div id="id-5" data-id="data-id-5">
        <p>para-B</p>
        <p>para-C</p>
        <p>para-D</p>
    </div>
</body>
</html>
`,
    'text/html',
);

// The document for comparison.
let compDoc = undefined;

describe('Text manipulation', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
        compDoc = document.cloneNode(true);
    });

    afterEach(() => {
        globalThis.document = undefined;
        compDoc = undefined;
    });

    describe('Get text from element', () => {
        it('single', () => {
            const got = z('#id-1').text();
            const want = [document.getElementById('id-1').textContent];

            assertEquals(got, want);
        });

        it('multiple', () => {
            const got = z('*[id]').text();
            const want = Array.from(document.querySelectorAll('[id]')).map((el) => el.textContent);

            assertEquals(got, want);
        });
    });

    describe('Set text to element', () => {
        it('single', () => {
            z('#id-1').text('text-1').update();
            const got = document.documentElement.outerHTML;

            compDoc.getElementById('id-1').textContent = 'text-1';
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });

        it('multiple', () => {
            z('*[id]').text('text-M').update();
            const got = document.documentElement.outerHTML;

            compDoc.querySelectorAll('[id]').forEach((el) => el.textContent = 'text-M');
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });
    });
});

describe('Attribute manipulation', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
        compDoc = document.cloneNode(true);
    });

    afterEach(() => {
        globalThis.document = undefined;
        compDoc = undefined;
    });

    describe('Get attributes from element', () => {
        it('single', () => {
            const got = z('#id-1').attrs();

            const elem = document.getElementById('id-1');
            const want = [
                new Map(
                    elem.getAttributeNames().map((n) => {
                        return [n, elem.getAttribute(n)];
                    }),
                ),
            ];

            assertEquals(got, want);
        });

        it('multiple', () => {
            const got = z('*[id]').attrs();

            const els = document.querySelectorAll('[id]');
            const want = Array.from(els).map((el) => {
                return new Map(
                    el.getAttributeNames().map((n) => {
                        return [n, el.getAttribute(n)];
                    }),
                );
            });

            assertEquals(got, want);
        });
    });

    describe('Set attributes to element', () => {
        it('single', () => {
            const attrMap = new Map();
            attrMap.set('data-no', 'data-no-1');

            z('#id-1').attrs(attrMap).update();
            const got = document.documentElement.outerHTML;

            compDoc.getElementById('id-1').setAttribute('data-no', 'data-no-1');
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });

        it('multiple', () => {
            const attrMap = new Map();
            attrMap.set('data-no', 'data-no-M');

            z('*[id]').attrs(attrMap).update();
            const got = document.documentElement.outerHTML;

            compDoc.querySelectorAll('[id]').forEach((el) => el.setAttribute('data-no', 'data-no-M'));
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });
    });
});

describe('Data manipulation', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
        compDoc = document.cloneNode(true);
    });

    afterEach(() => {
        globalThis.document = undefined;
        compDoc = undefined;
    });

    describe('Get data from element', () => {
        it('single', () => {
            const got = z('#id-1').data();

            const elem = document.getElementById('id-1');
            const want = [
                new Map(Object.entries(elem.dataset)),
            ];

            assertEquals(got, want);
        });

        it('multiple', () => {
            const got = z('*[id]').data();

            const els = document.querySelectorAll('[id]');
            const want = Array.from(els).map((el) => {
                return new Map(Object.entries(el.dataset));
            });

            assertEquals(got, want);
        });
    });

    describe('Set data to element', () => {
        it('single', () => {
            const dataMap = new Map();
            dataMap.set('no', 'data-no-1');

            z('#id-1').data(dataMap).update();
            const got = document.documentElement.outerHTML;

            compDoc.getElementById('id-1').dataset['no'] = 'data-no-1';
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });

        it('multiple', () => {
            const dataMap = new Map();
            dataMap.set('no', 'data-no-M');

            z('*[id]').data(dataMap).update();
            const got = document.documentElement.outerHTML;

            compDoc.querySelectorAll('[id]').forEach((el) => el.dataset['no'] = 'data-no-M');
            const want = compDoc.documentElement.outerHTML;

            assertEquals(got, want);
        });
    });
});

describe('Elements manipulation', () => {
    beforeEach(() => {
        globalThis.document = doc.cloneNode(true);
        compDoc = document.cloneNode(true);
    });

    afterEach(() => {
        globalThis.document = undefined;
        compDoc = undefined;
    });

    describe('Get children', () => {
        it('single', () => {
            const got = z('#id-4').children();
            const want = Array.from(document.getElementById('id-4').children);

            assertEquals(got.elements.length, want.length);
            want.forEach((el, idx) => {
                assertStrictEquals(got.elements[idx], el);
            });
        });

        it('multiple', () => {
            const got = z('*[id]').children();

            const els = document.querySelectorAll('[id]');
            const want = Array.from(els).flatMap((el) => el.children);

            assertEquals(got.elements.length, want.length);
            want.forEach((el, idx) => {
                assertStrictEquals(got.elements[idx], el);
            });
        });
    });
});
