import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day15/input2.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    interface position {
        x: number,
        y: number
    }
    const rowToCheck = 10 //2000000
    let beacons: position[] = []
    let positions = []
    for (let i = 0; i < inputData.length; i++) {
        let line = inputData[i].split(" ")
        let beaconPosition: position = { x: parseInt(line[8].slice(2, line[8].length - 1)), y: parseInt(line[9].slice(2, line[9].length)) }
        beacons.push(beaconPosition)
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
            addToArray({xMin, xMax})
            // for (let k = xMin; k <= xMax; k++) {
                
            //     insertEmptyPositionsRow({ x: k, y: rowToCheck })
            // }

            
        }
    }
    console.log(positions)
    function addToArray(elem)
    {

        if(positions.length === 0)
        {
           positions[0] = {xMin: elem.xMin, xMax: elem.xMax}
           return
        }
    
        for(let i=0; i<positions.length; i++)
        {
            if(elem.xMin>=positions[i].xMin && elem.xMax<=positions[i].xMax)
            {
                return
            }
            if(positions[i].xMin>=elem.xMin && positions[i].xMax<=elem.xMax)
            {
                positions.splice(i, 1)
            }
            // if(elem.xMin>=positions[i][0])
            // {
            //     positions[i][1] = 
            // }
        }
        positions[positions.length] = {xMin: elem.xMin, xMax: elem.xMax}
    }
    
    
}







async function start() {
    const start = Date.now();
    await app()
    const end = Date.now()
    console.log(`Execution time: ${end - start} ms`)
}
start()