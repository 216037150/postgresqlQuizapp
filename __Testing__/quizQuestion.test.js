import jest from 'jest-mock';
import { questions } from '../UtilFiles/quizQuestions.js';


//Testing a question is an array
// This array must contain an object with questions and options properties
describe('[questions] must be an array', () => {
    test('should have a questions property', () => {
      expect(questions).toBeDefined();
    });
  
    test('[questions] property should be an array', () => {
      expect(Array.isArray(questions)).toBe(true);
    });
  
    test('each question should have question and options properties', () => {
      questions.forEach((question) => {
        expect(question).toHaveProperty('question');
        expect(question).toHaveProperty('options');
      });
    });
  
    test('each question should have a string question', () => {
      questions.forEach((question) => {
        expect(typeof question.question).toBe('string');
      });
    });
  
    test('each question should have exactly four options', () => {
      questions.forEach((question) => {
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options).toHaveLength(4);
      });
    });
  
    test('questions array should contain valid structure (Object)', () => {
      expect(questions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            question: expect.any(String),
            options: expect.arrayContaining([expect.any(String)]),
          }),
        ])
      );
    });
  });
  
  
  // Test quiz question
  describe('Question Structure', () => {
    test('questions should have a question and options properties', () => {
      questions.forEach(question => {
        expect(typeof question.question).toBe('string');
        expect(Array.isArray(question.options)).toBe(true);
      });
    });
  
    test('questions should have exactly four options', () => {
      questions.forEach(question => {
        expect(question.options.length).toBe(4);
      });
    });
  });
  
  
  