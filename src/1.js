const {Token, Stack} = require(`./c.js`);

const 
	compile = (word) => {
		if (tokens.hasOwnProperty(word)) return tokens[word];

		if (word.match(/[A-Za-z]+/i) && word.length <= 8) return new Token(`id`, word);
		if (word.match(/\n/i)) return new Token(`newline`, word);
		if (word.match(/[0-9]+/i)) return new Token(`lit`, word);
		if (word.match(/\t/i)) return new Token(`tab`, word);
		if (word.match(/,/i)) return new Token(`comma`, word);

		errors.push(`invalid: ${word}`);
		// throw new Error(`invalid: ${word}`);
	},
	errors = [],
	regex = /(\n)|(\t)|(,)|([A-Za-z0-9=\*\-<>+\/]+)|([\(\)])/gim;
	file = require(`node:fs`).readFileSync(require(`node:path`).join(process.cwd(), `./code.txt`), `utf-8`).toLowerCase().replace(/\n\s*\n/g, `\n`),
	words = file.match(regex),
	tokens = Object.assign(...[`dim`, `as`, `integer`, `short`, `long`, `do`, `while`, `or`, `loop`, `+`, `-`, `*`, `/`, `=`, `<`, `>`, `(`, `)`].map(value => ({[value]: new Token(value)}))),
	auto = words.map((word) => compile(word))
;

module.exports = (input) => {
	if (input) auto = input.toLowerCase().replace(/\n\s*\n/g, `\n`).match(regex).map((word) => compile(word));

	// if (errors.length != 0) return { auto: errors, notation: [], matrix: []};
	// return {auto: auto, notation: result.notation, matrix: result.matrix};

	if (errors.length != 0) return errors;
	return auto;
};