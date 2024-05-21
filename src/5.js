const {Token, Stack} = require(`../src/c.js`);

module.exports = (input) => {
	let 
		auto,
		i = 0,
		l = 1
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
						f[3]();
					break;
					case `id`:
						s.push(auto[++i]);
						f[7]();
					break;
					case `do`:
						s.push(auto[++i]);
						f[9]();
					break;
					case `tab`:
						s.push(auto[++i]);
						f[40]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			3: () => {
				switch(s.peek()?.type) {
					case `id`:
						s.push(auto[++i]);
						f[11]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			7: () => {
				switch(s.peek()?.type) {
					case `=`:
						s.push(auto[++i]);
						f[13]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			9: () => {
				switch(s.peek()?.type) {
					case `while`:
						s.push(auto[++i]);
						f[14]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			10: () => {
				switch(s.peek()?.type) {
					case `integer`:
					case `short`:
					case `long`:
						s.push(auto[++i]);
						f[15]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			11: () => {
				switch(s.peek()?.type) {
					case `as`:
						s.push(auto[++i]);
						f[10]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			13: () => {
				switch(s.peek()?.type) {
					case `lit`:
						s.push(auto[++i]);
						f[19]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			14: () => {
				switch(s.peek()?.type) {
					case `(`:
						let c = i;

						while (auto[i].type != `newline`) {
							i++;
						}

						const result = require(`../src/6.js`)(auto.slice(c, i));

						if (result != true) errors.push(result);

						s.pop(3);

						i++;
						l++;

						f[0]();

						// s.push(auto[i]);
						// f[20]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			15: () => {
				switch(s.peek()?.type) {
					case `newline`:
						f[33]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			16: () => {
				switch(s.peek()?.type) {
					case `id`:
						f[25]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			18: () => {
				switch(s.peek()?.type) {
					case `newline`:
						s.pop(4);

						i++;
						l++;

						f[0]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			19: () => {
				switch(s.peek()?.type) {
					case `newline`:
						s.pop(4);

						i++;
						l++;

						f[0]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
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
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			25: () => {
				switch(s.peek()?.type) {
					case `id`:
						s.pop(3);

						f[10]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			33: () => {
				switch(s.peek()?.type) {
					case `newline`:
						s.pop(5);

						i++;
						l++;

						f[0]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			40: () => {
				switch(s.peek()?.type) {
					case `id`:
						s.push(auto[++i]);
						f[41]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			41: () => {
				switch(s.peek()?.type) {
					case `=`:
						s.push(auto[++i]);
						f[42]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			42: () => {
				switch(s.peek()?.type) {
					case `id`:
					case `lit`:
						s.push(auto[++i]);
						f[43]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			43: () => {
				switch(s.peek()?.type) {
					case `+`:
					case `-`:
					case `*`:
					case `/`:
						s.push(auto[++i]);
						f[44]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			44: () => {
				switch(s.peek()?.type) {
					case `id`:
					case `lit`:
						s.push(auto[++i]);
						f[45]();
					break;
					default: errors.push(`at ${l}:${s.items.length}`);
				}
			},
			45: () => {
				switch(s.peek()?.type) {
					case `newline`:
						s.push(auto[++i]);

						l++;

						f[46]();
					break;
					default: errors.push(`at ${++l}:${s.items.length-6}`);
				}
			},
			46: () => {
				switch(s.peek()?.type) {
					case `tab`:
						f[40]();
					break;
					case `loop`:
						s.pop(8);
					return;
					default: errors.push(`at ${l}:${s.items.length-7}`);
				}
			},
		}
	;

	f[0]();

	if (errors.length != 0) return errors;
	return auto;
};