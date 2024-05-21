const {Token, Stack} = require(`../src/c.js`);

const 
	compile = (word) => {
		if (tokens.hasOwnProperty(word)) return tokens[word];

		if (word.match(/[A-Za-z]+/i) && word.length <= 8) return new Token(`id`, word);
		if (word.match(/\n/i)) return new Token(`newline`, word);
		if (word.match(/[0-9]+/i)) return new Token(`lit`, word);
		if (word.match(/\t/i)) return new Token(`tab`, word);
		if (word.match(/,/i)) return new Token(`comma`, word);

		throw new Error(`invalid: ${word}`);
	},
	regex = /(\n)|(\t)|(,)|([A-Za-z0-9=\*\-<>+\/]+)|([\(\)])/gim;
	file = require(`node:fs`).readFileSync(require(`node:path`).join(__dirname, `../code.txt`), `utf-8`).toLowerCase().replace(/\n\s*\n/g, `\n`),
	words = file.match(regex),
	tokens = Object.assign(...[`dim`, `as`, `integer`, `short`, `long`, `do`, `while`, `or`, `loop`, `+`, `-`, `*`, `/`, `=`, `<`, `>`, `(`, `)`].map(value => ({[value]: new Token(value)}))),
	auto = words.map((word) => compile(word))
;

module.exports = (input) => {
	if (input) return input.toLowerCase().replace(/\n\s*\n/g, `\n`).match(regex).map((word) => compile(word));

	return auto;
};