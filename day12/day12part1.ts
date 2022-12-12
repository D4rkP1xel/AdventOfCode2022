import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day12/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    interface position {
        x: number,
        y: number
    }
    interface tableRow {
        position: position,
        shortest: number,
        previousPos: position
    }
    let map:number[][] = []
    let table:tableRow[] = []
    let currentPosition:position
    let startPosition:position
    let finishPosition:position
    for (let y = 0; y < inputData.length; y++) {
        map[y] = []
        for (let x = 0; x < inputData[y].length; x++) {
            if (inputData[y][x] === "S") {
                map[y][x] = "a".charCodeAt(0)-96
                table[table.length] = {position:{x: x ,y: y}, shortest: 0, previousPos: null}
                startPosition = {x: x ,y: y}
                currentPosition = {x: x ,y: y}
                continue
            }
            if (inputData[y][x] === "E") {
                map[y][x] = "z".charCodeAt(0)-96
                table[table.length] = {position:{x: x ,y: y}, shortest: Infinity, previousPos: null}
                finishPosition = {x: x ,y: y}
                continue
            }
            map[y][x] = inputData[y][x].charCodeAt(0)-96
            table[table.length] = {position:{x: x ,y: y}, shortest: Infinity, previousPos: null}
        }
    }
    let isFinishVisited = false
    let num = 0
    while(num < 12)
    {
        num++
        console.log(num)
        let up:position = {x: currentPosition.x, y: currentPosition.y-1}
        let down:position = {x: currentPosition.x, y: currentPosition.y+1}
        let left:position = {x: currentPosition.x-1, y: currentPosition.y}
        let right:position = {x: currentPosition.x+1, y: currentPosition.y}
        let currentTablePos = findPosInTable(currentPosition)
        let upTablePos = findPosInTable(up)
        let downTablePos = findPosInTable(down)
        let leftTablePos = findPosInTable(left)
        let rightTablePos = findPosInTable(right)
        let lowestDistance = {position:{x: null, y:null}, distance:Infinity}
        if(upTablePos != null && map[up.y][up.x] - map[currentPosition.y][currentPosition.x]<=1 && !(up.x === startPosition.x && up.y === startPosition.y))
        {
            
            let distance = table[currentTablePos].shortest+1
            if(distance < table[upTablePos].shortest)
            {
                table[upTablePos].shortest = distance
                table[upTablePos].previousPos = currentPosition
                if(distance<lowestDistance.distance)
                {
                    lowestDistance.position = up
                    lowestDistance.distance = distance
                }
            }   
        }
        if(downTablePos != null && map[down.y][down.x] - map[currentPosition.y][currentPosition.x]<=1 && !(down.x === startPosition.x && down.y === startPosition.y))
        {
            let distance = table[currentTablePos].shortest+1
            if(distance < table[downTablePos].shortest)
            {
                table[downTablePos].shortest = distance
                table[downTablePos].previousPos = currentPosition
                if(distance<lowestDistance.distance)
                {
                    lowestDistance.position = down
                    lowestDistance.distance = distance
                }
            }   
        }
        if(leftTablePos != null && map[left.y][left.x] - map[currentPosition.y][currentPosition.x]<=1 && !(left.x === startPosition.x && left.y === startPosition.y))
        {
            let distance = table[currentTablePos].shortest+1
            if(distance < table[leftTablePos].shortest)
            {
                table[leftTablePos].shortest = distance
                table[leftTablePos].previousPos = currentPosition
                if(distance<lowestDistance.distance)
                {
                    lowestDistance.position = left
                    lowestDistance.distance = distance
                }
            }   
        }
        if(rightTablePos != null && map[right.y][right.x] - map[currentPosition.y][currentPosition.x]<=1 && !(right.x === startPosition.x && right.y === startPosition.y))
        {
            
            let distance = table[currentTablePos].shortest+1
        
            if(distance < table[rightTablePos].shortest)
            {
                table[rightTablePos].shortest = distance
                table[rightTablePos].previousPos = currentPosition
                if(distance<lowestDistance.distance)
                {
                    lowestDistance.position = right
                    lowestDistance.distance = distance
                }
            }   
        }
        console.log(currentPosition, up, down, left, right)
        if(currentPosition.x === finishPosition.x && currentPosition.y === finishPosition.y) isFinishVisited=true
        currentPosition = lowestDistance.position
        
    }
    
    function findPosInTable(position:position)
    {
        for(let i=0; i<table.length; i++)
        {
            if(table[i].position.x === position.x && table[i].position.y === position.y)
            {
                return i
            }
        }
        return null
    }
}

app()