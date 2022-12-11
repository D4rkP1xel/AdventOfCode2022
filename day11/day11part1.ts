import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day11/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    interface monkey{
        number: number,
        items: number[],
        operation: string[],
        divisible: number,
        true: number,
        false: number,
        inspections: number
    }
    let monkeys: monkey[]= []
    let monkeyNum = 0
    for(let i=0; i<inputData.length; i+=7)
    {
        monkeys[monkeyNum] = 
        {
            number: parseInt(inputData[i].split(" ")[1].slice(0,1)),
            items: inputData[i+1].split(" ").slice(2).map(item=>parseInt(item.split(",")[0])),
            operation: inputData[i+2].split(" ").slice(4),
            divisible: parseInt(inputData[i+3].split(" ")[3]),
            true: parseInt(inputData[i+4].split(" ")[5]),
            false: parseInt(inputData[i+5].split(" ")[5]),
            inspections: 0
        }
        monkeyNum++
    }

    for(let r=0; r<20; r++)
    {
        for(let m=0; m<monkeys.length; m++)
        {
            for(let i = 0; i<monkeys[m].items.length; i++)
            {
                monkeys[m].inspections++
                let item = monkeys[m].items[i]
                let worry =item
                if(monkeys[m].operation[0] === '*')
                {
                    if(monkeys[m].operation[1] === "old")
                        worry*=worry
                    else
                        worry*=parseInt(monkeys[m].operation[1])
                }
                else // +
                {
                    if(monkeys[m].operation[1] === "old")
                        worry+=worry
                    else
                        worry+=parseInt(monkeys[m].operation[1])
                }
                worry = Math.trunc(worry/3)
                if(worry%monkeys[m].divisible === 0) //true
                    monkeys[monkeys[m].true].items.push(worry)
                else
                    monkeys[monkeys[m].false].items.push(worry)
            }
            monkeys[m].items = []
        }
    }
    console.log(monkeys)
    let biggestInspections:number[] = []
    for(let m=0; m<monkeys.length; m++)
    {
       
        if(biggestInspections.length !== 2)
        {
            biggestInspections[biggestInspections.length] = monkeys[m].inspections
            continue
        }
        biggestInspections.sort((a,b)=>a-b)
        for(let i=0; i<biggestInspections.length; i++)
        {
            if(monkeys[m].inspections > biggestInspections[i])
            {
                biggestInspections[i] = monkeys[m].inspections
                break
            }
        }

    } console.log(biggestInspections)
}

app()