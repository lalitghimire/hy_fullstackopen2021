interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercise = (
    dailyExerciseHours: number[],
    target: number
): Result => {
    const periodLength = dailyExerciseHours.length;

    const trainingDays = dailyExerciseHours.reduce((accumulator, day) => {
        if (day !== 0) {
            return accumulator + 1;
        } else return accumulator;
    }, 0);

    const total = dailyExerciseHours.reduce((avg, day) => avg + day, 0);
    const average = total / periodLength;

    let ratingDescription = '';
    let rating = 0;
    let success = false;

    // rating 3 if meets target and up
    //rating 2 if meets half the target
    //rating 1 below hald the average
    if (average >= target) {
        ratingDescription = `Excellent`;
        success = true;
        rating = 3;
    } else if (average < target && average > target / 2) {
        ratingDescription = `not too bad but could be better`;
        success = false;
        rating = 2;
    } else {
        ratingDescription = `you need to do more exercise`;
        success = false;
        rating = 1;
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 3));
