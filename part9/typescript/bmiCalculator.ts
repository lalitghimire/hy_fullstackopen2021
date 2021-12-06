// height in metre and weight in kilogram
interface BmiValues {
    height: number;
    weight: number;
}

// check for arguments
const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

// parse arguments for web exercise
const parseWebArguments = (inputheight: any, inputweight: any) => {
    if (!isNaN(Number(inputheight)) && !isNaN(Number(inputweight))) {
        return {
            height: Number(inputheight),
            weight: Number(inputweight),
        };
    } else {
        throw new Error();
    }
};

// main function
const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / (height / 100) ** 2;

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else {
        return 'Overweight';
    }
};

//console.log(calculateBmi(180, 74));

// arguments from command line
try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage =
        'Something bad happened. Discard this msg if not using command line arguments';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateBmi, parseWebArguments };
