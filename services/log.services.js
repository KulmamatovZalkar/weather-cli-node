import chalk from "chalk"
import dedent from "dedent-js";
const printError = (error) => {
    console.log(`${chalk.bgRed('ERROR')} ${error}`)
}

const printSuccess = (success) => {
    console.log(`${chalk.bgGreen('SUCCESS')} ${success}`)
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan('HELP')} 
        Without parametrs - output weather
        -s [CITY] for select city
        -h for output help
        -t [API_KEY] for save token`
    )
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow('SUCCESS')} Weather in ${res.name}
        ${icon} ${res.weather[0].description}
        Teprature: ${res.main.temp} (feel like ${res.main.feels_like})`
    )
}

export { printError, printSuccess, printHelp, printWeather }