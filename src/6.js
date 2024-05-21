const {Token, Stack} = require(`../src/c.js`);

module.exports = (input) => {
	const 
		errors = [],
		result = [],
		s = new Stack(),
		f = (o) => {
			switch (o.type) {
				case `(`:
					return 0;
				case `)`:
					return 1;
				case `or`:
					return 2;
				case `and`:
					return 3;
				case `<`:
				case `>`:
					return 5;
				case `+`:
				case `-`:
					return 6;
				case `*`:
				case `/`:
					return 7;
				default: throw new Error(o);
			}
		}
	;

	for (let i = 0; i < input.length; i++) {		
		switch (input[i].type) {
			case `id`:
			case `lit`:
				result.push(input[i]);
			break;
			case `(`:
				s.push(input[i]);
			break;
			case `)`:
				while (s.peek().type != `(`) {
					result.push(s.pop());
				}
			case `or`:
			case `and`:
			case `<`:
			case `>`:
			case `+`:
			case `-`:
			case `*`:
			case `/`:
				while (f(s.peek()) >= f(input[i])) {
					result.push(s.pop());
				}

				s.push(input[i]);
			break;
			default: throw new Error(input[i]);
		}
	}

	if (errors.length != 0) return errors;
	return true;
};