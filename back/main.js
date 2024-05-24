const 
	fastify = require(`fastify`)({logger: true}),
	path = require(`node:path`)
;

fastify.register(require(`@fastify/static`), {
	root: path.join(__dirname, `../front/`),
});

fastify.get(`/`, (req, reply) => {
	reply.sendFile(`index.html`);
});

fastify.post('/input', (req, reply) => {
	const result = require(`../src/${(req.body.old) ? `3` : `5`}.js`)(req.body.input);

	reply.send({status: 200, auto: result.auto.join(``), notation: result.notation.join(``), matrix: result.matrix.join(`\n`)});
});

fastify.get('/result', (req, reply) => {
	const result = require(`../src/5.js`)();

	reply.send({status: 200, code: require(`node:fs`).readFileSync(`./code.txt`, `utf-8`), auto: result.auto.join(``), notation: result.notation.join(``), matrix: result.matrix.join(`\n`)});
});

fastify.listen({ port: 3000 }, (error, address) => {
	if (error) console.error;

	console.log(address);
});