const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = "test@jeb.com";
        const text = "This is my test text.";
        const res = generateMessage(from, text);

        expect(res).toInclude({from, text});
        expect(res.createdAt).toBeA('number');
    });
});