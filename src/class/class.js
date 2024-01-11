// @ts-check

import { sesame } from '../core/core.js';

/**
 * Add the specified class(es) to the {@link elements}.
 * It is executed by calling the {@link update}.
 *
 * @param {...string} classNames - The class(es) to add.
 * @returns {sesame} - The sesame instance.
 */
sesame.prototype.addClass = function (...classNames) {
    // @ts-ignore
    this.functions.push((el) => el.classList.add(...classNames));

    return this;
};

/**
 * Remove the specified class(es) from the {@link elements}.
 * It is executed by calling the {@link update}.
 *
 * @param {...string} classNames - The class(es) to remove.
 * @returns {sesame} - The sesame instance.
 */
sesame.prototype.removeClass = function (...classNames) {
    // @ts-ignore
    this.functions.push((el) => el.classList.remove(...classNames));

    return this;
};

/**
 * Toggle the specified class(es) on the {@link elements}.
 * It is executed by calling the {@link update}.
 *
 * @param {...string} classNames - The class(es) to toggle.
 * @returns {sesame} - The sesame instance.
 */
sesame.prototype.toggleClass = function (...classNames) {
    // @ts-ignore
    this.functions.push((el) => {
        classNames.forEach((className) => {
            el.classList.toggle(className);
        });
    });

    return this;
};
