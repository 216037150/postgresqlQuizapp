import { validatePlayerName } from "../UtilFiles/validatePlayerName.js";
import jest from 'jest-mock';

describe('playerName validation with error throwing', () => {
    test('should throw errors', () => {
        const emptName = '';
        const digitName = '123';
        const speciName = '!@'
        expect(() => validatePlayerName(emptName)).toThrow('Please enter your name');
        expect(() => validatePlayerName(digitName)).toThrow('Invalid input: Please enter a valid name, not a number.');
        expect(() => validatePlayerName(speciName)).toThrow('Invalid input: Please do not use special characters.');
    });
});
