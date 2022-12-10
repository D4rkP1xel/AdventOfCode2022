import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day10/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    let X = 1
    let cycles = 0
    let valuesArray:number[] = []
    for(let i = 0; i<inputData.length; i++)
    {
        let command = inputData[i]
        if(command === "noop")
        {
            for(let j=0; j<1; j++)
            {
                cycles++
                addValuesArray(cycles, X)
            }
            continue
        }
        if(command.includes("addx"))
        {
            for(let j=0; j<2; j++)
            {
                cycles++
                addValuesArray(cycles, X)
            }
            X+= parseInt(command.split(" ")[1])
            continue
        }
    }

    console.log(signalStrength())
    function addValuesArray(cycles:number, value:number)
    {
        if(cycles === 20 || (cycles>20 && (cycles-20)%40 === 0))
        {
            valuesArray.push(value*cycles)
        }
    }

    function signalStrength():number
    {
        let sum = 0
        for(let i = 0; i<valuesArray.length; i++)
        {
            sum+=valuesArray[i]
        }
        return sum
    }
}

app()