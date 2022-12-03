import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day3/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n')
    let sum = 0
    for (let rucksackPos = 0; rucksackPos < inputData.length; rucksackPos += 3) {
        let rucksacks = [inputData[rucksackPos], inputData[rucksackPos + 1], inputData[rucksackPos + 2]]
        let firstRucksack: string[] = []
        let secondRucksack: string[] = []
        for (let firstRucksackPos = 0; firstRucksackPos < rucksacks[0].length; firstRucksackPos++) {
            firstRucksack = addPair(firstRucksack, rucksacks[0][firstRucksackPos])
        }
        for (let secondRucksackPos = 0; secondRucksackPos < rucksacks[1].length; secondRucksackPos++) {
            secondRucksack = addPair(secondRucksack, rucksacks[1][secondRucksackPos])
        }
        let commonLetters: string[] = removePairs(firstRucksack, secondRucksack)

        if (commonLetters.length === 1) {
            if (commonLetters[0].toUpperCase() == commonLetters[0]) //is uppercase
                sum += commonLetters[0].charCodeAt(0) - 38
            else    //is lowercase
                sum += commonLetters[0].charCodeAt(0) - 96
        }
        else {
            let thirdRucksack: string[] = []
            for (let thirdRucksackPos = 0; thirdRucksackPos < rucksacks[2].length; thirdRucksackPos++) {
                thirdRucksack = addPair(thirdRucksack, rucksacks[2][thirdRucksackPos])
            }

            commonLetters = removePairs(commonLetters, thirdRucksack)
            console.log(commonLetters)
            if (commonLetters.length === 1) {
                if (commonLetters[0].toUpperCase() == commonLetters[0]) //is uppercase
                    sum += commonLetters[0].charCodeAt(0) - 38
                else    //is lowercase
                    sum += commonLetters[0].charCodeAt(0) - 96
            }
        }

    }
    console.log(sum)
}

function addPair(rucksack: string[], letter: string): string[] {
    if (rucksack.includes(`${letter}`))
        return rucksack

    rucksack[rucksack.length] = `${letter}`
    return rucksack
}
function removePairs(commonLettersArray: string[], rucksack: string[]): string[] {

    let commonLettersAux = []
    for (let i = 0; i < commonLettersArray.length; i++) {
        //console.log(commonLettersAux)
        //console.log("checking", commonLettersArray[i])
        const index = rucksack.indexOf(commonLettersArray[i])
        if (index > -1) {
            //console.log("removing", commonLettersArray[i])
            const indexAux = commonLettersAux.indexOf(commonLettersArray[i])
            if (indexAux < 0)
                commonLettersAux[commonLettersAux.length] = commonLettersArray[i]
        }
    }
    return commonLettersAux
}
app()