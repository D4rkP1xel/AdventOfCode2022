import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day16/input2.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    interface tunnel{
        name: string,
        tunnels: string[],
        flowRate: number
    }
    let tunnels = new Map()
    for(let i=0; i<inputData.length; i++)
    {
        let line = inputData[i].split(" ")
        let valves:string[]
        if(inputData[i].split(",").length === 1) //one valve
        {
            valves = [inputData[i].split("valve")[1]]
        }
        else
        {
            valves = inputData[i].split("valves")[1].split(",").map((valve)=>valve.trim())  
        }
        tunnels.set(line[1], {tunnels: [...valves], flowRate: parseInt(line[4].split("=")[1])})
    }
    console.log(tunnels)
    let currentValve = "AA"
    
    function calculatePressure( valve: tunnel, minutes:number, pressure:number, currentValves: tunnel[])
    {
        minutes--
        
        if(minutes === 0)
        for(let i = 0; i<valve.tunnels.length; i++)
        {
            let canGo = true
            for(let k=0; k<currentValves.length; k++)
            {
                if(currentValves[k].name === valve.tunnels[i]) //
                {
                    canGo = false
                    break
                }
            }
            if(canGo) continue
            if(valve.tunnels[i])
            calculatePressure(valve.tunnels[i], )
        }
    }
}



async function start() {
    const start = Date.now();
    await app()
    const end = Date.now()
    console.log(`Execution time: ${end - start} ms`)
}
start()