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
