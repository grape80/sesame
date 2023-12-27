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
 * @param {Document} [context=document] - The context used to select elements.
 * @returns {sesame} - The sesame instance.
 */
const sesame = function (parameter, context) {
    // Create an instance without the new keyword.
    if (!(this instanceof sesame)) {
        return new sesame(parameter, context);
    }

    // @ts-ignore
    this.elements = [];
    // @ts-ignore
    this.functions = [];

    if (typeof parameter === 'string') {
        const doc = context || document;
        if (parameter.startsWith('#')) {
            const element = doc.getElementById(parameter.slice(1));
            if (element) this.elements = [element];
        } else if (parameter.startsWith('.')) {
            this.elements = Array.from(doc.getElementsByClassName(parameter.slice(1)));
        } else if (parameter.startsWith('*')) {
            this.elements = Array.from(doc.querySelectorAll(parameter.slice(1)));
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
