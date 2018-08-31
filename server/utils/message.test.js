const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = "test@jeb.com";
        const text = "This is my test text.";
        const res = generateMessage(from, text);

        expect(res).toInclude({from, text});
        expect(res.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = "Admin";
        const latitude = 1;
        const longitude = 20;
        const url = 'https://www.google.com/maps?q=1,20';
        const res = generateLocationMessage(from, latitude, longitude);

        expect(res).toInclude({from, url});
        expect(res.createdAt).toBeA('number');
    });
});