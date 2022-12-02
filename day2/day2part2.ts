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
    let score = you === 'X' ? 0 : you === 'Y' ? 3 : 6
    if (enemyElf === 'A') { //rock
        if (you === 'X')  //scissors
        {
            return score + 3
        }
        if (you === 'Y')  //rock
        {
            return score + 1
        }
        if (you === 'Z')  //paper
        {
            return score + 2
        }
    }
    if (enemyElf === 'B') { // paper
        if (you === 'X')  //rock
        {
            return score + 1
        }
        if (you === 'Y')  //paper
        {
            return score + 2
        }
        if (you === 'Z')  //scissors
        {
            return score + 3
        }
    }
    if (enemyElf === 'C') {//scissors
        if (you === 'X')  //paper
        {
            return score + 2
        }
        if (you === 'Y')  //scissors
        {
            return score + 3
        }
        if (you === 'Z')    //rock
            return score + 1 
    }
    return 0
}


app()