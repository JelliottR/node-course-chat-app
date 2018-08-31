const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const x = 123;
        const y = false;

        expect(isRealString(x)).toBe(false);
        expect(isRealString(y)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const x = "             ";

        expect(isRealString(x)).toBe(false);
    });

    it('should allow string with no-space characters', () => {
        const x = "     this is some characters         ";

        expect(isRealString(x)).toBe(true);
    });
});