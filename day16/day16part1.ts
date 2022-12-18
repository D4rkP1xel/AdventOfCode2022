import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day16/input2.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    interface tunnel {
        name: string,
        tunnels: string[],
        flowRate: number
    }
    let tunnels = new Map()
    for (let i = 0; i < inputData.length; i++) {
        let line = inputData[i].split(" ")
        let valves: string[]
        if (inputData[i].split(",").length === 1) //one valve
        {
            valves = [inputData[i].split("valve")[1].trim()]
        }
        else {
            valves = inputData[i].split("valves")[1].split(",").map((valve)=>valve.trim())
        }
        tunnels.set(line[1], { name: line[1] ,tunnels: [...valves], flowRate: parseInt(line[4].split("=")[1]) })
    }
    //console.log(tunnels)
    let pressureValues: number = 0
    tunnelSearch(tunnels.get("DD"), 0, 0, [{name: "AA", tunnels: [ 'DD', 'II', 'BB' ], flowRate: 0 }], "AA")
    console.log(pressureValues)
    //AADDCCBBAAIIJJIIAADDEEFFGGHHGGFFEEDDCC SUPOSTO 1651
    //AADDAABBAAIIJJIIAADDEEFFGGHHGGFFEEDDCC 1653
    function tunnelSearch(valve: tunnel, minutes: number, pressure: number, currentValves: tunnel[], path: string) {

        
        pressure += calculatePressure(currentValves)
        minutes++ //walking there
        if(path === "AADDCC") console.log(minutes, currentValves, pressure)
        //if(minutes === 29) console.log(currentValves)
        if (minutes === 30) {
            pressure > pressureValues ? pressureValues = pressure : null
            return
        }
        if(currentValves.length === inputData.length)
        {
            //console.log(currentValves)
            
            pressure += (30 - minutes) * calculatePressure(currentValves)
            //if(pressure === 1651) console.log(path)
            //if(pressure === 1653) console.log(path)
            pressure > pressureValues ? pressureValues = pressure : null
            return
        }
        let canOpen = true
            for (let k = 0; k < currentValves.length; k++) {
                if (currentValves[k].name === valve.name) //tunnel was already explored
                {
                    canOpen = false
                    break
                }
            }
        for (let i = 0; i < valve.tunnels.length; i++) //search each tunnel
        {
            if (tunnels.get(valve.tunnels[i]).flowRate > 0 && canOpen) //open valve or ignore it
            {
                //minutes++ 
                //opening valve
                if (minutes+1 === 30) {
                    pressure > pressureValues ? pressureValues = pressure : null
                    return
                }
                tunnelSearch(tunnels.get(valve.tunnels[i]), minutes+1, pressure + calculatePressure(currentValves), [...currentValves, valve], path + valve.name)
                tunnelSearch(tunnels.get(valve.tunnels[i]), minutes, pressure, currentValves, path + valve.name)
            }
            else if(canOpen){ //not in current valves yet and is flowrate 0
                
                tunnelSearch(tunnels.get(valve.tunnels[i]), minutes, pressure, [...currentValves, valve], path + valve.name)
            }
            else //cant open
            {
                
                tunnelSearch(tunnels.get(valve.tunnels[i]), minutes, pressure, currentValves, path + valve.name)
            }

        }
    }

    function calculatePressure(currentValves: tunnel[]): number {
        let sum = 0
        
        for (let i = 0; i < currentValves.length; i++) {
            sum += currentValves[i].flowRate
        }
        
        return sum
    }
}



async function start() {
    const start = Date.now();
    await app()
    const end = Date.now()
    console.log(`Execution time: ${end - start} ms`)
}
start()