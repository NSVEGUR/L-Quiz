#!/usr/bin/env node

import chalk from "chalk";
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import inquirer from "inquirer";


const sleep = (ms = 2000) => new Promise((resolve, reject) => { setTimeout(resolve, ms) });
const logLine = () => {
	console.log('\n');
}


let playerName;
let language;

async function welcome() {
	const welcomeSpinner = createSpinner('Starting l-Quiz....', {
		color: 'cyan'
	}).start();
	await sleep();
	welcomeSpinner.success({ text: 'Welcome to: ' });
	const title = figlet.textSync('L - QUIZ', {
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: true,
	});
	logLine();
	console.log(gradient.vice.multiline(title));
	logLine();
	const author = chalkAnimation.karaoke('A Programming Language Quiz CLI app Created By Nagasai Vegur', 2);
	await sleep();
	author.stop();
	logLine();
}

async function askname() {
	const answer = await inquirer.prompt({
		name: 'playerName',
		type: 'input',
		message: 'Enter your sweet name please 😜: ',
		default() {
			return 'Player';
		}
	});
	playerName = answer.playerName;
}

async function askLanguage() {
	const answer = await inquirer.prompt({
		name: 'language',
		type: 'list',
		message: `Choose a language of your wish 👻 :`,
		choices: [
			'C',
			'JavaScript',
			'Python',
			'Dart',
			'C++',
			'Java'
		],
	});
	language = answer.language;
}

async function askQuestion(questionStats, playerStats) {
	const answer = await inquirer.prompt({
		name: 'selected',
		type: 'list',
		message: questionStats.question,
		choices: questionStats.choices,
	});
	await handle(questionStats.answer == answer.selected, {
		...playerStats,
		answer: questionStats.answer
	});
	playerStats.marks += 1;
	return playerStats;
}

async function handle(isCorrect, playerStats) {
	const checkSpinner = createSpinner('Checking Your Answer', {
		color: 'cyan',
	}).start();
	await sleep();
	if (isCorrect) {
		logLine();
		checkSpinner.success({ text: playerStats.marks != 4 ? getRandomSuccessText(playerStats.name) : `Hurrayy! you are soooo goood at ${playerStats.language}💥, Congratulations for 5/5 🎉.` });
		logLine();
		if (playerStats.marks == 4) {
			console.log(chalk.cyan(`See you soon ${playerStats.name} 👋🏻!`));
			logLine();
			process.exit(0);
		}
	} else {
		logLine();
		checkSpinner.error({ text: `Ohh Nooo!🤒, you loose the quiz with ${playerStats.marks}/5.\n` });
		console.log(chalk.cyan(`The answer was: ${chalk.green(playerStats.answer)} . Better Luck Next time ${playerStats.name} 🙃\n`));
		process.exit(1);
	}
}

const getRandomSuccessText = (name) => {
	const arrSucccessStrs = [
		`Good work ${name}, lets move to the next question 😉`,
		`Awesome! job, you\'re getting it right ${name}🥳`,
		`Superb! ${name}, try the next one 🤓`,
		`Damnn!, it was correctt 🤩`,
		`Well done ${name}, read the next question 😎`,
	];
	return arrSucccessStrs[Math.floor(Math.random() * arrSucccessStrs.length)];
}

class Language {
	constructor() {
		this.playerStats = {
			name: playerName,
			language: language,
			marks: 0,
			answer: ''
		}
	}
	async welcomeMessage() {
		logLine();
		const welcomeMsg = chalkAnimation.karaoke(`Welcome to ${language} Language-Quiz`, 1);
		await sleep();
		welcomeMsg.stop();
		logLine();
	}
}

class C extends Language {
	constructor() {
		super();
	}

	async question1() {
		const questionStats = {
			question: `Which is the First operating system designed using C programming language?`,
			choices: [
				'DOS',
				'Windows',
				'UNIX',
				'Mac',
			],
			answer: 'UNIX'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question2() {
		const questionStats = {
			question: `Which header file can be used to define input/output function prototypes and macros?`,
			choices: [
				'math.h',
				'memory.h',
				'stdio.h',
				'dos.h',
			],
			answer: 'stdio.h'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question3() {
		const questionStats = {
			question: `Which of the following functions can be used to increase the size of dynamically allocated array?`,
			choices: [
				'realloc()',
				'calloc()',
				'malloc()',
				'memadjust()',
			],
			answer: 'realloc()'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question4() {
		const questionStats = {
			question: `What is the output of the below code snippet?\n
			#include<stdio.h>\n
			main()\n 
			{\n
				 unsigned x = 5, y=&x, *p = y+0; \n
			
				 printf("%u",*p);\n
			}\n`,
			choices: [
				'Address of x',
				'Address of y',
				'Address of p',
				'5',
			],
			answer: 5
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question5() {
		const questionStats = {
			question: `What is the output of the below code snippet?\n
			#include<stdio.h>\n
			int main()\n
			{\n
			int a = 10, b = 25;\n
			a = b++ + a++;\n
			b = ++b + ++a;\n
			printf("%d %d \\n", a, b);\n
			}\n`,
			choices: [
				'36 34',
				'35 62',
				'36 63',
				'30 28',
			],
			answer: '36 63'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async startQuiz() {
		await this.welcomeMessage();
		await this.question1();
		await this.question2();
		await this.question3();
		await this.question4();
		await this.question5();
	}
}
class JavaScript extends Language {
	constructor() {
		super();
	}

	async question1() {
		const questionStats = {
			question: `Inside which HTML element do we put the JavaScript?`,
			choices: [
				'<script>',
				'<scripting>',
				'<head>',
				'<tail>',
			],
			answer: '<script>'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question2() {
		const questionStats = {
			question: `Which is the correct JavaScript syntax to change the HTML content given below?\n
			<p id=”test”>Hello World!</p>`,
			choices: [
				'document.getElementById(“test”).innerHTML = “Hello DataFlair!”;',
				'document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;',
				'document.getElementById(test).innerHTML = “Hello DataFlair!”;',
				'document.getElementByTagName(“p”)[0].innerHTML = “Hello DataFlair!”;',
			],
			answer: 'document.getElementById(“test”).innerHTML = “Hello DataFlair!”;'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question3() {
		const questionStats = {
			question: `What my log in the console for below line?\n
			console.log(0.1 + 0.2 == 0.3);`,
			choices: [
				'error',
				'invalid',
				'true',
				'false',
			],
			answer: 'false'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question4() {
		const questionStats = {
			question: `What do you think will be the output of this line: \n
			console.log("This is a string." instanceof String);`,
			choices: [
				'true',
				'false',
				'error',
				'invalid',
			],
			answer: 'false'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question5() {
		const questionStats = {
			question: `Guess the output: \n
			console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());`,
			choices: [
				'baaa',
				'error',
				'banana',
				'bananaa',
			],
			answer: 'banana'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async startQuiz() {
		await this.welcomeMessage();
		await this.question1();
		await this.question2();
		await this.question3();
		await this.question4();
		await this.question5();
	}
}
class Python extends Language {
	constructor() {
		super();
	}

	async question1() {
		const questionStats = {
			question: `What is the output for : 'python ' [-3]?`,
			choices: [
				'o',
				't',
				'h',
				'Negetive index error',
			],
			answer: 'h'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question2() {
		const questionStats = {
			question: `How can we check whether the object is instance of class or not. Let us consider an object O which is instance of class B.`,
			choices: [
				'B.isinstance(O)',
				'O.isinstance(B)',
				'isinstance(O,B)',
				'isinstance(B,O)',
			],
			answer: 'isinstance(O,B)'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question3() {
		const questionStats = {
			question: `Which is invalid in python for z = 5 ?`,
			choices: [
				'z=z++',
				'z=++z',
				'z+=1',
				'z-=1',
			],
			answer: 'z=z++'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question4() {
		const questionStats = {
			question: `Which module in Python supports regular expressions?`,
			choices: [
				're',
				'regex',
				'pyregex',
				'None of the above',
			],
			answer: 5
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question5() {
		const questionStats = {
			question: `Pylab is a package that combine _______,________&______ into a single namespace.`,
			choices: [
				'Scipy, Numpy & matplotlib',
				'Numpy, matplotlib & pandas',
				'Numpy, scipy & pandas',
				'Scipy, pandas & matplotlib',
			],
			answer: 'Scipy, Numpy & matplotlib'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async startQuiz() {
		await this.welcomeMessage();
		await this.question1();
		await this.question2();
		await this.question3();
		await this.question4();
		await this.question5();
	}
}
class Dart extends Language {
	constructor() {
		super();
	}

	async question1() {
		const questionStats = {
			question: `Which of the following statements does not use string interpolation correctly?`,
			choices: [
				`print('Your name in upper case is $"me".toUpperCase');`,
				`print("Your name in upper case is ${'me'.toUpperCase()}");`,
				`print('Your name in upper case is ${"me".toUpperCase()}');`,
				`print('Your name in upper case is $"me".toUpperCase()}');`,
			],
			answer: `print('Your name in upper case is $"me".toUpperCase');`
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question2() {
		const questionStats = {
			question: `Which function declaration is correct?`,
			choices: [
				'int multiply(a, b) => { return a * b; }',
				'int multiply(int a, int b) => return a * b;',
				'int multiply(int a, int b) => a * b;',
				'int multiply(int a, int b) => a * b',
			],
			answer: 'int multiply(int a, int b) => a * b;'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question3() {
		const questionStats = {
			question: `What is the type of this map?
			var seasons = { 'spring': 1, 2: 'summer' };`,
			choices: [
				'Map<Object, Object>',
				'Map<String, int>',
				'Map<String, dynamic>',
				'Map<dynamic, dynamic>',
			],
			answer: 'Map<Object, Object>'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question4() {
		const questionStats = {
			question: `Which statement calls function fullName correctly? Given fullName is defined as:\n
			String fullName(String first, String last, [String middle]) {\n
				return middle == null? '$first $last': '$first $middle $last';\n
			}\n`,
			choices: [
				`var a = fullName('First', 'Last', ['Middle']);`,
				`var a = fullName('First', 'Last', null);`,
				`var a = fullName('First', 'Last', middle: 'Middle');`,
				`var a = fullName('First', 'Last', 'Middle': 'Middle');`,
			],
			answer: `var a = fullName('First', 'Last', null);`
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question5() {
		const questionStats = {
			question: `What is the name of the command you use to verify you have setup your flutter environment correctly?`,
			choices: [
				'flutter run',
				'flutter doctor',
				'flutter surgeon',
				'dart export',
			],
			answer: 'flutter doctor'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async startQuiz() {
		await this.welcomeMessage();
		await this.question1();
		await this.question2();
		await this.question3();
		await this.question4();
		await this.question5();
	}
}
class Cpp extends Language {
	constructor() {
		super();
	}

	async question1() {
		const questionStats = {
			question: `Choose the pure virtual function definition from the following`,
			choices: [
				'virtual void f()=0 { }',
				'void virtual f()=0 { }',
				'virtual void f() {} = 0;',
				'None of the above.',
			],
			answer: 'None of the above.'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question2() {
		const questionStats = {
			question: `Which of the following is the correct identifier?`,
			choices: [
				'$var_name',
				'VAR_123',
				'varname@',
				'None of the above',
			],
			answer: 'VAR_123'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question3() {
		const questionStats = {
			question: `Among the following, which shows the Multiple inheritances?`,
			choices: [
				'X,Y->Z',
				'X->Y->Z',
				'X->Y;X->Z',
				'None of the above',
			],
			answer: 'X,Y->Z'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question4() {
		const questionStats = {
			question: `In C++, for what purpose the "rank()" is used?`,
			choices: [
				'It returns the size of each dimension',
				'It returns the maximum number of elements that can be stored in the array',
				'It returns the dimension of the specified array',
				'None of the above',
			],
			answer: 'It returns the dimension of the specified array'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question5() {
		const questionStats = {
			question: `Which of the following is true about templates.\n
			1. Template is a feature of C++ that allows us to write one code for different data types.\n
			2. We can write one function that can be used for all data types including user defined types. Like sort(), max(), min(), ..etc.\n
      3. We can write one class or struct that can be used for all data types including user defined types. Like Linked List, Stack, Queue ..etc.\n
      4. Template is an example of compile time polymorphism.\n
			`,
			choices: [
				'1 and 2',
				'1, 2 and 3',
				'1, 2 and 4',
				'1, 2, 3 and 4',
			],
			answer: '1, 2, 3 and 4'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async startQuiz() {
		await this.welcomeMessage();
		await this.question1();
		await this.question2();
		await this.question3();
		await this.question4();
		await this.question5();
	}
}
class Java extends Language {
	constructor() {
		super();
	}

	async question1() {
		const questionStats = {
			question: `What is the default value of byte variable?`,
			choices: [
				'0',
				'0.0',
				'null',
				'undefined',
			],
			answer: '0'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question2() {
		const questionStats = {
			question: `What is Set Interface?`,
			choices: [
				'Set is a collection of element which contains elements along with their key.',
				'Set is a collection of element which contains hashcode of elements.',
				'Set is a collection of element which cannot contain duplicate elements.',
				'Set is a collection of element which can contain duplicate elements.',
			],
			answer: 'Set is a collection of element which cannot contain duplicate elements.'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question3() {
		const questionStats = {
			question: `What happens when thread's sleep() method is called?`,
			choices: [
				'Thread returns to the ready state.',
				'Thread returns to the waiting state.',
				'Thread starts running.',
				'None of the above.',
			],
			answer: 'Thread returns to the waiting state.'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question4() {
		const questionStats = {
			question: `What of the following is the default value of an instance variable?`,
			choices: [
				'null',
				'0',
				'Depends upon the type of variable',
				'Not assigned',
			],
			answer: 'Depends upon the type of variable'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async question5() {
		const questionStats = {
			question: `Which of the following is true about super class?`,
			choices: [
				'Variables, methods and constructors which are declared private can be accessed only by the members of the super class.',
				'Variables, methods and constructors which are declared protected can be accessed by any subclass of the super class.',
				'Variables, methods and constructors which are declared public in the superclass can be accessed by any class.',
				'All of the above.',
			],
			answer: 'All of the above.'
		}
		return this.playerStats = await askQuestion(questionStats, this.playerStats);
	}
	async startQuiz() {
		await this.welcomeMessage();
		await this.question1();
		await this.question2();
		await this.question3();
		await this.question4();
		await this.question5();
	}
}


async function startQuiz() {
	switch (language) {
		case 'C': {
			const quiz = new C();
			await quiz.startQuiz();
		} break;
		case 'JavaScript': {
			const quiz = new JavaScript();
			await quiz.startQuiz();
		} break;
		case 'Python': {
			const quiz = new Python();
			await quiz.startQuiz();
		} break;
		case 'Dart': {
			const quiz = new Dart();
			await quiz.startQuiz();
		} break;
		case 'C++': {
			const quiz = new Cpp();
			await quiz.startQuiz();
		} break;
		case 'Java': {
			const quiz = new Java();
			await quiz.startQuiz();
		} break;
		default: {
			process.exit(1);
		};
	}
	const quiz = new C();
	await quiz.startQuiz();
}

await welcome();
await askname();
await askLanguage();
await startQuiz();
process.exit(0);