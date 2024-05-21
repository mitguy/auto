class Token {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}

	toString() {
		switch (this.value) {
			case `\n`:
			case `\t`:
				return this.value;
			case undefined:
				switch (this.type) {
					case `<`:
					case `>`:
						return `<<"${this.type}">> `;
					default:
						return `<<${this.type}>> `;
				}
			default:
				return `<<${this.type}, "${this.value}">> `;
		}
	}
}

class Stack {
	constructor() {
		this.items = [];
	};

	push(element) {
		this.items.push(element);
	};

	pop(amount) {
		if (this.items.length == 0) return;

        if (amount) {
            for (let j = 0; j < amount; j++) this.items.pop();
            return;
        };

        return this.items.pop();
	};
	
	peek() {
		return this.items[this.items.length - 1];
	};

	isEmpty() {
		return this.items.length == 0;
	};

	toString() {
		return this.items.toString();
	}
};

module.exports = {Token, Stack};