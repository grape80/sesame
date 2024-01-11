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
                el.getAttributeNames().map((n) => {
                    return [n, el.getAttribute(n)];
                }),
            );
        });
    }

    // @ts-ignore
    this.functions.push((el) => {
        attrMap.forEach((v, k) => {
            el.setAttribute(k, v);
        });
    });

    return this;
};

/**
 * Get the children of the {@link elements}.
 * Filters the children by the {@param cssSelector} if it is provided.
 *
 * @param {string} [cssSelector] - The CSS selector to filter the children.
 * @returns {sesame} - The sesame instance.
 */
sesame.prototype.children = function (cssSelector) {
    if (cssSelector === undefined) {
        this.elements = this.elements.flatMap((el) => el.children);

        return this;
    }

    if (typeof cssSelector === 'string') {
        this.elements = this.elements.flatMap((el) => {
            return Array.from(el.children).filter((c) => c.matches(cssSelector));
        });

        return this;
    }

    return this;
};
