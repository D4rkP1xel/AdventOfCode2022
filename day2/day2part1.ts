import { readFile } from 'fs/promises'

async function app() {
    const data = await readFile('./day2/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n')
    let totalScore = 0
    for (let inputLine = 0; inputLine < inputData.length; inputLine++) {

        let line = inputData[inputLine].trim().split(" ")
        totalScore += playMatch(line[0], line[1])
    }
    console.log(totalScore)
}


function playMatch(enemyElf: string, you: string): number  //A-rock B-paper C-scissors    X-rock y-paper z-scissors
{
    let score = you === 'X' ? 1 : you === 'Y' ? 2 : 3
    if (enemyElf === 'A') {
        if (you === 'X')  //rock-rock = tie
        {
            return score + 3
        }
        if (you === 'Y')  //rock-paper = win
        {
            return score + 6
        }
        if (you === 'Z')  //rock-scissors = loss
        {
            return score + 0
        }
    }
    if (enemyElf === 'B') {
        if (you === 'X')  //paper-rock = loss
        {
            return score + 0
        }
        if (you === 'Y')  //paper-paper = tie
        {
            return score + 3
        }
        if (you === 'Z')  //paper-scissors = win
        {
            return score + 6
        }
    }
    if (enemyElf === 'C') {
        if (you === 'X')  //scissors-rock = win
        {
            return score + 6
        }
        if (you === 'Y')  //scissors-paper = loss
        {
            return score + 0
        }
        if (you === 'Z')
            return score + 3  //scissors-scissors = tie
    }
    return 0
}


app()