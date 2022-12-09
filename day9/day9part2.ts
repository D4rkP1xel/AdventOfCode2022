import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day9/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    interface position {
        x: number,
        y: number
    }
    let tailPositionsVisited: position[] = [{ x: 0, y: 0 }]
    let currentHeadPosition: position = { x: 0, y: 0 }
    let currentTailPositions: position[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 } ,{ x: 0, y: 0 } ,{ x: 0, y: 0 }]
    let sum = 0


    for (let line = 0; line < inputData.length; line++) {
        let direction = inputData[line].split(" ")[0]
        let steps = parseInt(inputData[line].split(" ")[1])
        moveHead(currentHeadPosition, currentTailPositions, direction, steps)
        
    }
    console.log(currentHeadPosition, currentTailPositions)
    console.log(tailPositionsVisited.length)

    function moveHead(headPos: position, tailPos: position[], direction: string, steps: number): void {
        if (direction === "U") {
            for (let i = 0; i < steps; i++) {
                headPos.y++
                for(let t = 0; t<tailPos.length; t++)
                {
                    if(t===0)
                    {
                        moveTail(headPos, tailPos[0], t)
                        continue
                    }
                    moveTail(tailPos[t-1], tailPos[t], t)
                }
                
            }
            return
        }
        if (direction === "D") {
            for (let i = 0; i < steps; i++) {
                headPos.y--
                for(let t = 0; t<tailPos.length; t++)
                {
                    if(t===0)
                    {
                        moveTail(headPos, tailPos[0], t)
                        continue
                    }
                    moveTail(tailPos[t-1], tailPos[t], t)
                }
            }
            return
        }
        if (direction === "L") {
            for (let i = 0; i < steps; i++) {
                headPos.x--
                for(let t = 0; t<tailPos.length; t++)
                {
                    if(t===0)
                    {
                        moveTail(headPos, tailPos[0], t)
                        continue
                    }
                    moveTail(tailPos[t-1], tailPos[t], t)
                }
            }
            return
        }
        if (direction === "R") {
            for (let i = 0; i < steps; i++) {
                headPos.x++
                for(let t = 0; t<tailPos.length; t++)
                {
                    if(t===0)
                    {
                        moveTail(headPos, tailPos[0], t)
                        continue
                    }
                    moveTail(tailPos[t-1], tailPos[t], t)
                }

            }
            return
        }
        return console.log("\n\n\nERROR\n\n\n")
    }
    function moveTail(headPos: position, tailPos: position, tailNum: number) {

        if ((tailPos.x === headPos.x && tailPos.y === headPos.y) ||
            (headPos.x === tailPos.x && Math.abs(headPos.y - tailPos.y) === 1) ||
            (headPos.y === tailPos.y && Math.abs(headPos.x - tailPos.x) === 1) ||
            (Math.abs(headPos.y - tailPos.y) === 1 && Math.abs(headPos.x - tailPos.x) === 1)
        ) return //tail doesn't need to move

        if (tailPos.x - headPos.x === -2 && tailPos.y - headPos.y === 2) //left/top side
        {
            tailPos.x++
            tailPos.y--
            if(tailNum === currentTailPositions.length-1) addToPositionsVisited(tailPos)
            return
        }

        if (tailPos.x - headPos.x === 2 && tailPos.y - headPos.y === 2) //right/top side
        {
            tailPos.x--
            tailPos.y--
            if(tailNum === currentTailPositions.length-1) addToPositionsVisited(tailPos)
            return
        }
        if (tailPos.x - headPos.x === -2 && tailPos.y - headPos.y === -2) //left/bottom side
        {
            tailPos.x++
            tailPos.y++
            if(tailNum === currentTailPositions.length-1) addToPositionsVisited(tailPos)
            return
        }
        if (tailPos.x - headPos.x === 2 && tailPos.y - headPos.y === -2) //right/bottom side
        {
            tailPos.x--
            tailPos.y++
            if(tailNum === currentTailPositions.length-1) addToPositionsVisited(tailPos)
            return
        }
        if (tailPos.x - headPos.x === -2) //left side
        {
            tailPos.x++
            tailPos.y = headPos.y

            if(tailNum === currentTailPositions.length-1) addToPositionsVisited(tailPos)

            return
        }
        if (tailPos.x - headPos.x === 2) //right side
        {
            tailPos.x--
            tailPos.y = headPos.y
            if(tailNum === currentTailPositions.length-1) addToPositionsVisited(tailPos)

            return
        }
        if (tailPos.y - headPos.y === -2) //bottom side
        {
            tailPos.y++
            tailPos.x = headPos.x
            if(tailNum === currentTailPositions.length-1) addToPositionsVisited(tailPos)
            return
        }
        if (tailPos.y - headPos.y === 2) //up side
        {
            tailPos.y--
            tailPos.x = headPos.x
            if(tailNum === currentTailPositions.length-1) addToPositionsVisited(tailPos)
            return
        }
        //went double diagonal
        throw("yo")
    }


    function addToPositionsVisited(tailPos: position) {

        for (let i = 0; i < tailPositionsVisited.length; i++) {
            if ((tailPositionsVisited[i].x === tailPos.x) && (tailPositionsVisited[i].y === tailPos.y)) {
                return
            }
        }
        tailPositionsVisited.push({ x: tailPos.x, y: tailPos.y })
    }
}

app()