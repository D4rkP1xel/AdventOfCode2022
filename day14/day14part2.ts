import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day14/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    let rocks:any = []
    let highestRockY = -1
    for(let i=0; i<inputData.length; i++)
    {
        let line = inputData[i].split("->")
        
        for(let k = 0; k<line.length-1; k++)
        {
            let xPos = parseInt(line[k].split(",")[0])
            let yPos = parseInt(line[k].split(",")[1])
            let nextXPos = parseInt(line[k+1].split(",")[0])
            let nextYPos = parseInt(line[k+1].split(",")[1])
            if(yPos>highestRockY)highestRockY=yPos
            rocks.push([xPos, yPos])
            if(k===line.length-2)rocks.push([nextXPos,nextYPos])
            if(xPos === nextXPos) //x is the same, iterate Y
            {
                if(nextYPos > yPos)
                {
                    if(nextYPos>highestRockY)highestRockY=nextYPos
                    for(let f = yPos+1; f<nextYPos; f++)
                    {
                        rocks.push([xPos, f])
                    }
                }
                else
                {
                    for(let f = nextYPos+1; f <yPos; f++)
                    {
                        rocks.push([xPos, f])
                    }
                }
                continue
            }
            if(yPos === nextYPos) //y is the same, iterate X
            {
                if(nextXPos > xPos)
                {
                    for(let f = xPos+1; f<nextXPos; f++)
                    {
                        rocks.push([f, yPos])
                    }
                }
                else
                {
                    for(let f = nextXPos+1; f <xPos; f++)
                    {
                        rocks.push([f, yPos])
                    }
                }
                continue
            }
        }
    }
   
    const sandSpawnPos = [500, 0]
    let numSandBlocks = 0
    let hasPassedLimit = false
    while(!hasPassedLimit)
    {
        let sandPos = sandSpawnPos
        while(1)
        {
            let newSandPos = moveSand(sandPos)
            //console.log(rocks)
            if(newSandPos === null)
            {
                rocks.push(sandSpawnPos)
                numSandBlocks++
                hasPassedLimit=true
                break
            }
            if(newSandPos[1] === sandPos[1]) //didnt move
            {
                rocks.push(newSandPos)
                
                numSandBlocks++
                break
            }
            if(newSandPos[1]===highestRockY+1)
            {
                rocks.push(newSandPos)
                numSandBlocks++
                break
            }
            sandPos = newSandPos
        }
        //console.log(sandBlocks.length)
       //console.log(sandBlocks)
    }
    console.log(numSandBlocks)
    function moveSand(sandPos):number[]
    {
        const x = sandPos[0]
        const y = sandPos[1]

        let down:boolean = null
        let left:boolean = null
        let right:boolean = null
        for(let i=0; i<rocks.length; i++)
        {
            if(rocks[i][0] === x && rocks[i][1] === y+1) //cant go down
            {
                down = false
                if(left!==null && right!==null)break
            }
            if(rocks[i][0] === x-1 && rocks[i][1] === y+1) //cant go left
            {
                left = false
                if(down!==null && right!==null)break
            }
            if(rocks[i][0] === x+1 && rocks[i][1] === y+1) //cant go right
            {
                right = false
                if(down!==null && left!==null)break
            }
        }
        if(x===500 && y===0 && down === false && left===false && right === false)
        {
            return null
        }
        if(down===null) //it can go down
        {
            return [x, y+1]
        }
        if(left===null) //it can go left
        {
            return [x-1, y+1]
        }
        if(right===null) //it can go right
        {
            return [x+1, y+1]
        }
        return [x,y]
    }
}

app()