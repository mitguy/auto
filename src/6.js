const {Token, Stack} = require(`../src/c.js`);

module.exports = (input) => {
	const 
		e = [],
		n = [],
		m = [],
		s = new Stack(),
		f = (o) => {
			switch (o?.type) {
				case undefined:
					return 0;
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
				default: throw new Error(`expression: at ${o}`);
			}
		},
		rpn = () => {
			for (let i = 0; i <= input.length; i++) {
				switch (input[i]?.type) {
					case undefined:
						// test without <
						if (!!s.items.find(t => t.type == `(`) && !!!s.items.find(t => t.type == `)`)) e.push(`expression: brackets`);
					break;
					case `id`:
					case `lit`:
						n.push(input[i]);
					break;
					case `(`:
						s.push(input[i]);
					break;
					case `)`:
						for (let c = 0; c <= input.length; c++) {
							if (c == input.length && !(s.peek()?.type == `(`)) {
								e.push(`expression: brackets`);
							};
							
							if (s.peek()?.type != `(`) n.push(s.pop());
						}
		
						s.pop();
					break;
					case `or`:
					case `and`:
					case `<`:
					case `>`:
					case `+`:
					case `-`:
					case `*`:
					case `/`:
						while (f(s.peek()) >= f(input[i])) {
							n.push(s.pop());
						}
		
						s.push(input[i]);
					break;
					default: throw new Error(`expression: at ${input[i]}`);
				}
			}
		},
		matrix = () => {
			let 
				cn = n.slice(),
				c = 0
			;

			for (let i = 0; i < cn.length; i++) {
				switch (cn[i]?.type) {
					case `or`:
					case `and`:
					case `<`:
					case `>`:
					case `+`:
					case `-`:
					case `*`:
					case `/`:
						const t = new Token(`M${++c}`, `${/M[0-9+]/.test(cn[i-2].type) ? cn[i-2].type : cn[i-2]} ${cn[i]} ${/M[0-9+]/.test(cn[i-1].type) ? cn[i-1].type : cn[i-1]}`);

						m.push(t);

						if (c % 2 != 0) cn.splice(i-2, i+1, t)
						else cn.splice(i-2, i, t);

						i = 0;
					break;
				}
			}
		}
	;

	rpn();

	matrix();

	if (e.length != 0) return {state: false, errors: e, notation: [], matrix: []};
	return {state: true, notation: n, matrix: m};
};