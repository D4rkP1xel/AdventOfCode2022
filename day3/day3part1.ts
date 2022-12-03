import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day3/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n')
    let sum = 0
    for(let rucksackPos= 0; rucksackPos < inputData.length; rucksackPos++)
    {
        let rucksack = inputData[rucksackPos]
        let rucksackHashtable = {} //for the first compartment
        for(let firstCompartmentPos = 0; firstCompartmentPos<rucksack.length/2; firstCompartmentPos++)
        {
            rucksackHashtable = addPair(rucksackHashtable, rucksack[firstCompartmentPos])
        }
        for(let secondCompartmentPos = rucksack.length/2; secondCompartmentPos<rucksack.length; secondCompartmentPos++)
        {
            if(rucksackHashtable.hasOwnProperty(`${rucksack[secondCompartmentPos]}`))
            {
                if(rucksack[secondCompartmentPos].toUpperCase() === rucksack[secondCompartmentPos]) //is uppercase
                    sum+=rucksack[secondCompartmentPos].charCodeAt(0)-38
                else    //is lowercase
                    sum+=rucksack[secondCompartmentPos].charCodeAt(0)-96
                break
            }
        }
    }
    console.log(sum)
}

function addPair(table:object, letter:string):object
{
    if(table.hasOwnProperty(`${letter}`))
        table[`${letter}`]++
    else
        table[`${letter}`] = 1
    
    return table
}
app()