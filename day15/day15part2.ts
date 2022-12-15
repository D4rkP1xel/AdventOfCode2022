import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day15/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    interface position {
        x: number,
        y: number
    }

    let beacons: position[] = []
    
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
        for(let n=0; n<=distance; n++) //didnt check up and down!!!
        {
            // if(i===6){

            // console.log(sensorPosition.x - distance - 1 + n, sensorPosition.y + n, '\n', 
            // sensorPosition.x - distance - 1 + n, sensorPosition.y - n, '\n', 
            // sensorPosition.x + distance + 1 - n, sensorPosition.y + n ,'\n', 
            // sensorPosition.x + distance + 1 - n, sensorPosition.y - n, '\n')
            // }
            if(sensorPosition.x - distance - 1 + n >=0 && 
                sensorPosition.x - distance - 1 + n <=4000000 && 
                sensorPosition.y + n >=0 &&
                sensorPosition.y + n <=4000000)checkPos(sensorPosition.x - distance - 1 + n, sensorPosition.y + n, i) //left up
            if(n>0 && sensorPosition.x - distance - 1 + n >=0 && 
                sensorPosition.x - distance - 1 + n <=4000000 && 
                sensorPosition.y - n >=0 &&
                sensorPosition.y - n <=4000000)checkPos(sensorPosition.x - distance - 1 + n, sensorPosition.y - n, i) //left down
            if(sensorPosition.x + distance + 1 - n >=0 && 
                sensorPosition.x + distance + 1 - n <=4000000 &&
                sensorPosition.y + n >=0 &&
                sensorPosition.y + n <=4000000)checkPos(sensorPosition.x + distance + 1 - n, sensorPosition.y + n, i) //right up
            if(n>0 && sensorPosition.x + distance + 1 - n >=0 && 
                sensorPosition.x + distance + 1 - n <=4000000 &&
                sensorPosition.y - n >= 0 &&
                sensorPosition.y - n <=4000000)checkPos(sensorPosition.x + distance + 1 - n, sensorPosition.y - n, i) //right down
        }
        if(sensorPosition.x >= 0 && sensorPosition.x <=4000000 && sensorPosition.y + distance + 1 >= 0 && sensorPosition.y + distance + 1 <= 4000000)checkPos(sensorPosition.x, sensorPosition.y + distance + 1, i)
        if(sensorPosition.x >= 0 && sensorPosition.x <=4000000 && sensorPosition.y - distance - 1 >= 0 && sensorPosition.y - distance - 1 <= 4000000)checkPos(sensorPosition.x, sensorPosition.y - distance - 1, i)
    }
  
    function checkPos(xPos:number, rowToCheck:number, iteration)
    {
        
        let positions = []
        for (let i = 0; i < inputData.length; i++) {
            if(i === iteration) continue
            let line = inputData[i].split(" ")
            let sensorPosition: position = { x: parseInt(line[2].slice(2, line[2].length - 1)), y: parseInt(line[3].slice(2, line[3].length - 1)) }
            let beaconPosition: position = { x: parseInt(line[8].slice(2, line[8].length - 1)), y: parseInt(line[9].slice(2, line[9].length)) }
            let distance: number = Math.abs(beaconPosition.y - sensorPosition.y) + Math.abs(beaconPosition.x - sensorPosition.x)
            if (sensorPosition.y <= rowToCheck + distance && sensorPosition.y >= rowToCheck - distance) {
 
                let yDiff = Math.abs(rowToCheck - sensorPosition.y)
                let xMin = sensorPosition.x - distance + yDiff
                let xMax = sensorPosition.x + distance - yDiff
                
                let param = xMin<=xMax ? {xMin: xMin, xMax: xMax} : {xMin:xMax, xMax:xMin}
                positions = addToArray(param, positions)
                
            }

        }
    
        positions.sort((a, b) => a.xMin - b.xMin)
        
        for(let h=0; h<positions.length; h++)
        {
            if(xPos>=positions[h].xMin && xPos<=positions[h].xMax) // is already occupied
            {
                //if(rowToCheck === 11) console.log(xPos)
                return null
            }
        }
        console.log(xPos, rowToCheck)
        
    }
    function addToArray(elem, positions)
    {

        if(positions.length === 0)
        {
           positions[0] = {xMin: elem.xMin, xMax: elem.xMax}
           return positions
        }
   
        // for(let i=0; i<positions.length; i++)
        // {
        //     if(elem.xMin>=positions[i].xMin && elem.xMax<=positions[i].xMax)
        //     {
        //         return positions
        //     }  
        // }
        positions.push({xMin: elem.xMin, xMax: elem.xMax})
        return positions
    }
    
    
}







async function start() {
    const start = Date.now();
    await app()
    const end = Date.now()
    console.log(`Execution time: ${end - start} ms`)
}
start()