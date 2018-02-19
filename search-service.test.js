const searchService = require("./search-service")

test("Can run a search", function() {
	const query = "The Archers Omnibus";
	const results = searchService.fetchProgrammes(query);
	expect(results).not.toBe(undefined);
	expect(results[0].programme.pid).toBe("b006qnkc");
})

test("Can search with a prefix", function() {
	const query = "The Arch";
	const results = searchService.fetchProgrammes(query)
	expect(results.length).toBe(3);
})

test("Can search with all in lower case", function(){
	const query = "the archers omnibus";
	const results = searchService.fetchProgrammes(query);
	expect(results[0].programme.pid).toBe("b006qnkc");
})

test("Can search with all in upper case", function(){
	const query = "THE ARCHERS OMNIBUS";
	const results = searchService.fetchProgrammes(query);
	expect(results[0].programme.pid).toBe("b006qnkc");
})

test("Can search ignoring 'The'", function() {
	const query = "Archers Omnibus";
	const results = searchService.fetchProgrammes(query);
	expect(results[0].programme.pid).toBe("b006qnkc");
})