// info logger
const info = (...params) => {
    console.log(...params)
}

//error logger
const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info,
    error,
}
