#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.services.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.services.js'
import { getKeyValue, saveKeyValue, TOKEN_DICT } from './services/storage.services.js'

const saveToken = async (token) => {
    if (!token.length) {
        console.log('Не передан токен')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICT.token, token);
        printSuccess('Token saved')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        console.log('Не передан city')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICT.city, city);
        printSuccess('City saved')
    } catch (e) {
        printError(e.message)
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICT.city)
        const weath = await getWeather(city)
        printWeather(weath, weath.weather[0].icon)
    } catch (e) {
        if (e?.response?.status == 404) {
            printError("City not found")
        } else if (e?.response?.status == 401) {
            printError("Token")
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    // console.log(process.env)
    // console.log(args)
    // console.log(process.argv)
    if (args.h) {
        return printHelp()
    }
    if (args.c) {
        return saveCity(args.c);
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForcast()
}

initCLI()