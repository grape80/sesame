// @ts-check

import { sesame } from '../core/core.js';

/**
 * Get the text content of the {@link elements} if the {@param text} is not provided.
 *
 * Set the text content to the {@link elements} if the {@param text} is provided.
 * It is executed by calling the {@link update}.
 *
 * @param {string} [text] - The text content to set.
 * @returns {string[]|sesame} - The text content of the {@link elements} or the sesame instance.
 */
sesame.prototype.text = function (text) {
    if (text === undefined) {
        return this.elements.map((el) => el.textContent);
    }

    // @ts-ignore
    this.functions.push((el) => {
        el.textContent = text;
    });

    return this;
};

/**
 * Get the attributes of the {@link elements} if the {@param attrMap} is not provided.
 *
 * Set the attributes to the {@link elements} if the {@param attrMap} is provided.
 * It is executed by calling the {@link update}.
 *
 * @param {Map<string, string>} [attrMap] - The attributes to set.
 * @returns {Array<Map<string, string>>|sesame} - The attributes of the {@link elements} or the sesame instance.
 */
sesame.prototype.attrs = function (attrMap) {
    if (attrMap === undefined) {
        return this.elements.map((el) => {
            return new Map(
                // @ts-ignore
                el.getAttributeNames().map((name) => {
                    return [name, el.getAttribute(name)];
                }),
            );
        });
    }

    // @ts-ignore
    this.functions.push((el) => {
        attrMap.forEach((value, key) => {
            el.setAttribute(key, value);
        });
    });

    return this;
};

/**
 * Get the children of the {@link elements}.
 * @returns {sesame} - The sesame instance.
 */
sesame.prototype.children = function () {
    this.elements = this.elements.reduce((acc, el) => {
        return acc.concat(el.children);
    }, new Array());

    return this;
};
