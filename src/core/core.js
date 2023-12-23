// @ts-check

/**
 * Create an instance of sesame.
 *
 * @constructor
 * @param {string} parameter - The parameter used to select elements.
 * Switches the method to retrieve the element based on the initial letter of the parameter:
 *   - '#' : Uses document.getElementById()
 *   - '.' : Uses document.getElementsByClassName()
 *   - '*' : Uses document.querySelectorAll()
 * @returns {sesame} - The sesame instance.
 */
const sesame = function (parameter) {
    // Create an instance without the new keyword.
    if (!(this instanceof sesame)) {
        return new sesame(parameter);
    }

    // @ts-ignore
    this.elements = [];
    // @ts-ignore
    this.functions = [];

    if (typeof parameter === 'string') {
        if (parameter.startsWith('#')) {
            const element = document.getElementById(parameter.slice(1));
            if (element) this.elements = [element];
        } else if (parameter.startsWith('.')) {
            this.elements = Array.from(document.getElementsByClassName(parameter.slice(1)));
        } else if (parameter.startsWith('*')) {
            this.elements = Array.from(document.querySelectorAll(parameter.slice(1)));
        }
    }

    return this;
};

/**
 * The array of selected elements.
 *
 * @type {Array<any>}
 */
sesame.prototype.elements = undefined;

/**
 * The functions that manipulate the DOM calling in the method chaining.
 *
 * @type {Array<Function>}
 */
sesame.prototype.functions = undefined;

/**
 * Update the DOM.
 */
sesame.prototype.update = function () {
    this.elements.forEach((el) => {
        this.functions.forEach((func) => {
            func(el);
        });
    });
};

export { sesame };
