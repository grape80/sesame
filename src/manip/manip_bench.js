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
    <!--
    <div id="id-1" data-id="data-id-1">text-1</div>
    <div id="id-2" data-id="data-id-2">text-2</div>
    ...
    -->
</body>
</html>
`,
    'text/html',
);

(() => {
    const fragment = doc.createDocumentFragment();

    for (let i = 1; i <= 1_000; i++) {
        const div = doc.createElement('div');
        div.id = 'id-' + i;
        div.setAttribute('data-id', 'data-id-' + i);
        div.textContent = 'text-' + i;
        fragment.appendChild(div);
    }

    doc.body.appendChild(fragment);
})();

Deno.bench('Vanilla: Attributes manipulation - Get', { group: 'attributes-get', baseline: true }, (b) => {
    globalThis.document = doc.cloneNode(true);

    b.start();

    Array.from(document.querySelectorAll('[id]')).map((el) => {
        return new Map(
            el.getAttributeNames().map((name) => {
                return [name, el.getAttribute(name)];
            }),
        );
    });

    b.end();

    globalThis.document = undefined;
});

Deno.bench('Sesame : Attributes manipulation - Get', { group: 'attributes-get' }, (b) => {
    globalThis.document = doc.cloneNode(true);

    b.start();

    z('*[id]').attrs();

    b.end();

    globalThis.document = undefined;
});
