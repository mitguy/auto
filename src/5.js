const {Token, Stack} = require(`../src/c.js`);

module.exports = (input) => {
	let 
		auto,
		i = 0,
		l = 1,
		c = 1,
		result
	;

	if (input) {auto = require(`../src/1.js`)(input)} else {auto = require(`../src/1.js`)()};

	const 
		errors = [],
		s = new Stack(),
		f = {
			0: () => {
				s.push(auto[i]);

				switch(s.peek()?.type) {
					case `dim`:
						s.push(auto[++i]);

						c++;

						f[3]();
					break;
					case `id`:
						s.push(auto[++i]);

						c++;

						f[7]();
					break;
					case `do`:
						s.push(auto[++i]);
						f[9]();
					break;
					// case `tab`:
					// 	s.push(auto[++i]);
					// 	f[40]();
					// break;
					default: errors.push(`0 at ${l}:${c}`);
				}
			},
			3: () => {
				switch(s.peek()?.type) {
					case `id`:
						s.push(auto[++i]);
						
						c++;

						f[11]();
					break;
					default: errors.push(`3: must be "id" at ${l}:${c}`);
				}
			},
			7: () => {
				switch(s.peek()?.type) {
					case `=`:
						s.push(auto[++i]);

						c++;
						
						f[13]();
					break;
					default: errors.push(`7: must be "=" at ${l}:${c}`);
				}
			},
			9: () => {
				switch(s.peek()?.type) {
					case `while`:
						s.push(auto[++i]);

						c++;
						
						f[14]();
					break;
					default: errors.push(`9: must be "while" at ${l}:${c}`);
				}
			},
			10: () => {
				switch(s.peek()?.type) {
					case `integer`:
					case `short`:
					case `long`:
						s.push(auto[++i]);

						c++;
						
						f[15]();
					break;
					default: errors.push(`10: must be either "integer", "long" or "short" at ${l}:${c}`);
				}
			},
			11: () => {
				switch(s.peek()?.type) {
					case `as`:
						s.push(auto[++i]);

						c++;

						f[10]();
					break;
					default: errors.push(`11: must be "as" at ${l}:${c}`);
				}
			},
			13: () => {
				switch(s.peek()?.type) {
					case `lit`:
						s.push(auto[++i]);

						c++;

						f[19]();
					break;
					default: errors.push(`13: must be "lit" at ${l}:${c}`);
				}
			},
			14: () => {
				switch(s.peek()?.type) {
					case `(`:
						let e = i;

						while (auto[i].type != `newline`) {
							i++;
						}

						result = require(`../src/6.js`)(auto.slice(e, i));

						if (result.state != true) errors.push(result.errors);

						s.pop(++c);

						i++;
						l++;
						c=1;

						s.push(auto[i]);

						f[46]();

						// s.push(auto[i]);
						// f[20]();
					break;
					default: errors.push(`14: must be "(" at ${l}:${c}`);
				}
			},
			15: () => {
				switch(s.peek()?.type) {
					case `newline`:
						c++;

						f[33]();
					break;
					default: errors.push(`15: must be newline at ${l}:${c}`);
				}
			},
			16: () => {
				switch(s.peek()?.type) {
					case `id`:
						f[25]();
					break;
					default: errors.push(`16: must be "id" at ${l}:${c}`);
				}
			},
			18: () => {
				switch(s.peek()?.type) {
					case `newline`:
						s.pop(++c);

						i++;
						l++;

						f[0]();
					break;
					default: errors.push(`18: must be newline at ${l}:${c}`);
				}
			},
			19: () => {
				switch(s.peek()?.type) {
					case `newline`:
						s.pop(++c);

						i++;
						l++;
						c=1;

						f[0]();
					break;
					default: errors.push(`19: must be newline at ${l}:${c}`);
				}
			},
			20: () => {
				switch(s.peek()?.type) {
					case `(`:
					case `id`:
					case `<`:
					case `>`:
					case `lit`:
					case `or`:
					case `)`:
						s.push(auto[++i]);
						f[20]();
					break;
					case `newline`:
						s.pop(26);

						i++;
						l++;

						f[0]();
					break;
					default: errors.push(`20 at ${l}:${c}`);
				}
			},
			25: () => {
				switch(s.peek()?.type) {
					case `id`:
						s.pop(++c);

						f[10]();
					break;
					default: errors.push(`25: must be "id" at ${l}:${c}`);
				}
			},
			33: () => {
				switch(s.peek()?.type) {
					case `newline`:
						s.pop(++c);

						i++;
						l++;
						c=1;

						f[0]();
					break;
					default: errors.push(`33: must be newline at ${l}:${c}`);
				}
			},
			40: () => {
				switch(s.peek()?.type) {
					case `id`:
						s.push(auto[++i]);

						c++;

						f[41]();
					break;
					default: errors.push(`40: must be "id" at ${l}:${c}`);
				}
			},
			41: () => {
				switch(s.peek()?.type) {
					case `=`:
						s.push(auto[++i]);

						c++;

						f[42]();
					break;
					default: errors.push(`41: must be "=" at ${l}:${c}`);
				}
			},
			42: () => {
				switch(s.peek()?.type) {
					case `id`:
					case `lit`:
						s.push(auto[++i]);

						c++;

						f[43]();
					break;
					default: errors.push(`42: must be either "id" or "lit" at ${l}:${c}`);
				}
			},
			43: () => {
				switch(s.peek()?.type) {
					case `+`:
					case `-`:
					case `*`:
					case `/`:
						s.push(auto[++i]);

						c++;

						f[44]();
					break;
					default: errors.push(`43: must be a sign at ${l}:${c}`);
				}
			},
			44: () => {
				switch(s.peek()?.type) {
					case `id`:
					case `lit`:
						s.push(auto[++i]);

						c++;

						f[45]();
					break;
					default: errors.push(`44: must be either "id" or "lit" at ${l}:${c}`);
				}
			},
			45: () => {
				switch(s.peek()?.type) {
					case `newline`:
						s.push(auto[++i]);

						l++;
						c++;
						c=1;

						f[47]();
					break;
					default: errors.push(`45: must be newline at ${++l}:${c}`);
				}
			},
			46: () => {
				switch(s.peek()?.type) {
					case `tab`:
						s.push(auto[++i]);

						c++;

						f[46]();
					break;
					case `id`:
						c++;

						f[40]();
					break;
					default: errors.push(`46: must be "id" or can be "tab" at ${l}:${c}`);
				}
			},
			47: () => {
				switch(s.peek()?.type) {
					case `tab`:
						f[46]();
					break;
					case `loop`:
						s.pop(++c);

						c=1;
					return;
					default: errors.push(`47: must be "loop" at ${l}:${c=1}`);
				}
			},
		}
	;

	f[0]();

	if (errors.length != 0) return {state: false, errors};
	return {state: true, auto, notation: result.notation, matrix: result.matrix};
};