import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day15/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    interface position {
        x: number,
        y: number
    }
    const rowToCheck = 2000000
    let beacons: position[] = []
    let positions = []
    for (let i = 0; i < inputData.length; i++) {
        let line = inputData[i].split(" ")
        let beaconPosition: position = { x: parseInt(line[8].slice(2, line[8].length - 1)), y: parseInt(line[9].slice(2, line[9].length)) }
        let canAdd = true
        for(let k=0; k<beacons.length; k++)
        {
            if(beacons[k].x === beaconPosition.x && beacons[k].y === beaconPosition.y)
            {
                canAdd = false
                break
            }
        }
        if(canAdd) beacons.push(beaconPosition)
    }
    for (let i = 0; i < inputData.length; i++) {
        let line = inputData[i].split(" ")
        let sensorPosition: position = { x: parseInt(line[2].slice(2, line[2].length - 1)), y: parseInt(line[3].slice(2, line[3].length - 1)) }
        let beaconPosition: position = { x: parseInt(line[8].slice(2, line[8].length - 1)), y: parseInt(line[9].slice(2, line[9].length)) }
        let distance: number = Math.abs(beaconPosition.y - sensorPosition.y) + Math.abs(beaconPosition.x - sensorPosition.x)
        if (sensorPosition.y >= rowToCheck - (distance*2) && sensorPosition.y <= rowToCheck + (distance*2)) {
 
            let yDiff = Math.abs(rowToCheck - sensorPosition.y)
            let xMin = sensorPosition.x - distance + yDiff
            let xMax = sensorPosition.x + distance - yDiff
            let param = xMin<=xMax ? {xMin: xMin, xMax: xMax} : {xMin:xMax, xMax:xMin}
            addToArray(param)
            // for (let k = xMin; k <= xMax; k++) {
                
            //     insertEmptyPositionsRow({ x: k, y: rowToCheck })
            // }

            
        }
    }
    
    function addToArray(elem)
    {

        if(positions.length === 0)
        {
           positions[0] = {xMin: elem.xMin, xMax: elem.xMax}
           return
        }
        let aux=positions
        for(let i=0; i<positions.length; i++)
        {
            if(elem.xMin>=positions[i].xMin && elem.xMax<=positions[i].xMax)
            {
                return
            }  
        }
        positions.push({xMin: elem.xMin, xMax: elem.xMax})
    }
    positions.sort((a, b) => a.xMin - b.xMin)
    console.log(positions)

    let num = 0
    let lastPos = positions[0].xMin - 1
    for(let i = 0; i<positions.length; i++)
    {
        if(positions[i].xMax <= lastPos) continue
        if(positions[i].xMin > lastPos) 
        {
            num+=positions[i].xMax - positions[i].xMin
            if(positions[i].xMin <= 0 && positions[i].xMax >= 0) num++  
            num-= beaconsNum(positions[i].xMin, positions[i].xMax)
            lastPos = positions[i].xMax
            continue
        }
            num+= positions[i].xMax - lastPos
            num-= beaconsNum(lastPos+1, positions[i].xMax)
            lastPos = positions[i].xMax
    }   
    console.log(beacons)
    function beaconsNum(xMin, xMax)
    {
        let sum = 0
        for(let i=0; i<beacons.length; i++)
        {
            if(beacons[i].y === rowToCheck && beacons[i].x >=xMin && beacons[i].x <=xMax)
            {
                sum++
            }
        }
        return sum
    }
    console.log(num)
}







async function start() {
    const start = Date.now();
    await app()
    const end = Date.now()
    console.log(`Execution time: ${end - start} ms`)
}
start()