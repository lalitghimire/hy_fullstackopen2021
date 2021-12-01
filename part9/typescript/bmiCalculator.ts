// height in metre and weight in kilogram

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / (height / 100) ** 2

    if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi < 25) {
        return 'Normal (healthy weight)'
    } else {
        return 'Overweight'
    }
}

console.log(calculateBmi(180, 74))
