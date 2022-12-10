import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day10/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    let X = 1
    let cycles = 0
    let valuesArray:string[] = []

    for(let i = 0; i<inputData.length; i++)
    {
        let command = inputData[i]
        if(command === "noop")
        {
            for(let j=0; j<1; j++)
            {
              
                draw(cycles, X)  
                cycles++
            }
            continue
        }
        if(command.includes("addx"))
        {
            for(let j=0; j<2; j++)
            {
                
                draw(cycles, X)
                cycles++
            }
            X+= parseInt(command.split(" ")[1])
            continue
        }
    }
    drawConsole()
    function draw(cycles:number, value:number)
    {
        let spriteArray:number[] = [value-1, value, value+1]
        
        if(spriteArray.includes(cycles%40))
            valuesArray.push("#")
        else
            valuesArray.push(".")
    }

    function drawConsole()
    {
        for(let i = 0; i<6; i++)
        {
            let arr = valuesArray.slice(i*40, i*40+40)
            for(let l=0; l<arr.length; l++)
            {
                process.stdout.write(arr[l])
            }
            process.stdout.write("\n")
        }
    }
}

app()