// @ts-check

/**
 * Creates an instance of sesame.
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

    if (typeof parameter === 'string') {
        if (parameter.startsWith('#')) {
            this.elements = [document.getElementById(parameter.slice(1))];
        } else if (parameter.startsWith('.')) {
            this.elements = Array.from(document.getElementsByClassName(parameter.slice(1)));
        } else if (parameter.startsWith('*')) {
            this.elements = Array.from(document.querySelectorAll(parameter.slice(1)));
        }
    }

    return this;
};

/**
 * The elements obtained when creating an instance.
 * 
 * @type {Array<any>}
 */
sesame.prototype.elements = [];

export { sesame };
