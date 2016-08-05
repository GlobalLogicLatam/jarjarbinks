function serializeObject(){
	//Convert formdata to json
	$.fn.serializeObject = function()
	{
		var json = {};
		var array = this.serializeArray();
		array.forEach(function(item) {
			if (json[item.name] !== undefined) {
				if (!json[item.name].push) {
					json[item.name] = [json[item.name]];
				}
				json[item.name].push(item.value || '');
			} else {
				json[item.name] = item.value || '';
			}
		});
		return json;
	};
}

module.exports = serializeObject
