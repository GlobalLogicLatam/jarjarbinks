var device = require('./device.js')();

describe('device', function() { 	
	it('should be created', function() {
		expect(device.create()).toBe(true);
	});
});