function formToJson(){
	//Convert formdata to json
	$.fn.formToJson = function(){
		var array = this.serializeArray();
		var json = {};
		array.forEach(function(item) {
			json[item.name] = item.value;
		});		
		return json;
	}
}

module.exports = formToJson
