const {Token, Stack} = require(`../src/c.js`);

module.exports = (input) => {
	let
		auto,
		l = 1,
		errors = []
	;
	
	if (input) {auto = require(`../src/1.js`)(input)} else {auto = require(`../src/1.js`)()};

	for (let i = 0; i < auto.length; i++) {
		const el = auto[i];
		
		switch (el.type) {
			case `newline`:
				l++;
			break;
			case `dim`:
				const dim = [`dim`, `id`, `as`, `integer`];
	
				for (let t = 0; t <= dim.length-1; t++) {
					if (!auto[i+t] || auto[i+t].type != dim[t]) errors.push(`${l},${t}: must be "${dim[t]}"\n`);
				}
	
				i += dim.length-1;
			break;
			case `do`:
				const doWhile = [`do`, `while`, `(`, `id`, null, `lit`, `or`, `id`, null, `id`, `)`];
	
				for (let t = 0; t <= doWhile.length-1; t++) {
					if ((t == 4 || t == 8)) {
						switch (auto[i+t].type) {
							case `<`:
							case `>`:
								break;
							default: errors.push(`${l},${i+t}: must be < or >`);
						}
					} else {
						if (!auto[i+t] || auto[i+t].type != doWhile[t]) errors.push(`${l},${t}: must be "${doWhile[t]}"\n`);
					}
				}
	
				i += doWhile.length-1;
			break;
			case `id`:
				const id = [`id`, `=`, `lit`];
	
				for (let t = 0; t <= id.length-1; t++) {
					if (!auto[i+t] || auto[i+t].type != id[t]) errors.push(`${l},${t}: must be "${id[t]}"\n`);
				}
	
				i += id.length-1;
			break;
			case `tab`:
				const tab = [`tab`, `id`, `=`, `id`, null, `id`, null, `loop`];
	
				for (let t = 0; t <= tab.length-1; t++) {
					switch (t) {
						case 4:
							switch (auto[i+t].type) {
								case `+`:
								case `-`:
								case `*`:
								case `/`:
									break;
								default: errors.push(`${l},${t}: must be either +,-,*,/`);
							}
						break;
						case 6:
						break;
						default: if (!auto[i+t] || auto[i+t].type != tab[t]) errors.push(`${l},${t}: must be "${tab[t]}"\n`);
					}
				}
	
				i += tab.length-1;
			break;
			default: console.log(`${i}: ${auto[i]}`);
		}
	}

	if (errors.length != 0) return errors;
	return auto;
};