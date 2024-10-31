const  questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        correct: 1
    },
      {
          question: "What does HTML stand for?",
          options: [ "Hyper Text Markup Language", "Hot Mail", "How To Make Lasagna", "High Text Machine Language" ],
          correctAnswer: 0
      },
      {
          question: "What year was JavaScript created?",
          options: ["1995", "2000", "1989", "1998" ],
          correct: 0
      },
      {
          question: "Which company developed the Java programming language?",
          options: ["Microsoft", "Apple", "Sun Microsystems", "IBM" ],
          correct: 2
      },
      {
          question: "CSS stands for:",
          options: [ "Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets",  "Colorful Style Sheets" ],
          correct: 0
      },
      {
          question: "What is the correct way to link a CSS file in HTML?",
          options: [ "<link src='style.css'>", "<stylesheet>style.css</stylesheet>", "<link rel='stylesheet' href='style.css'>", "<css href='style.css'>" ],
          correct: 2
      },
      {
          question: "Which HTML tag is used to define an internal style sheet?",
          options: [ "<style>",  "<css>", "<script>",  "<design>" ],
          correct: 0
      },
      {
          question: "What does SQL stand for?",
          options: [ "Structured Query Language", "Stylish Question Language", "Statement Query Language", "Strong Query Language" ],
          correct: 0
      },
      {
          question: "Which tag is used to create a line break in HTML?",
          options: [ "<lb>", "<br>", "<break>", "<newline>" ],
          correct: 1
      }
    ];

    export{ questions }
  