function exampleService(){
	var self = this;

	Object.assign(self, {
		showExample: showExample
	});
	
	return self;

	function showExample(exampleText){
		console.log("from service: " + exampleText);	
	}	
}

module.exports = exampleService
