const 
	fastify = require(`fastify`)({logger: false}),
	path = require(`node:path`)
;

fastify.register(require(`@fastify/static`), {
	root: path.join(__dirname, `../front/`),
});

fastify.get(`/`, (req, reply) => {
	reply.sendFile(`index.html`);
});

fastify.post('/input', (req, reply) => {
	reply.send({status: 200, auto: require(`../src/${(req.body.old) ? `3` : `5`}.js`)(req.body.input).join(``)});
});

fastify.get('/result', (req, reply) => {
	reply.send({status: 200, code: require(`node:fs`).readFileSync(`./code.txt`, `utf-8`), auto: require(`../src/5.js`)().join(``)});
});

fastify.listen({ port: 3000 }, (error, address) => {
	if (error) console.error;

	console.log(address);
});