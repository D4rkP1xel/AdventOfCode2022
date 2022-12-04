import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day4/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n')
    let sum = 0
    for(let pair = 0; pair<inputData.length; pair++)
    {
        let sections = inputData[pair].split(',')
        let firstPairSections = sections[0].split('-')
        let secondPairSections = sections[1].split('-')
        if((parseInt(firstPairSections[0])>=parseInt(secondPairSections[0]) && parseInt(firstPairSections[1])<=parseInt(secondPairSections[1])) || (parseInt(secondPairSections[0])>=parseInt(firstPairSections[0]) && parseInt(secondPairSections[1])<=parseInt(firstPairSections[1]))) //6-6 4-6
        {
                sum++
        }
    }
    console.log(sum)
}

app()