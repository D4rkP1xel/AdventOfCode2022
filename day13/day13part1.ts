import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day13/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    let num = 0
    for (let i = 0; i < inputData.length; i += 3) {
        compareArrays(JSON.parse(inputData[i]), JSON.parse(inputData[i + 1])) === 1 ? num+=i/3+1 : null
    }
    console.log(num)

    function compareArrays(element1, element2): number {
        if (element2 == null) return -1
        if(element1 === element2) return 0
        if (element1 instanceof Array && element2 instanceof Array) {
            if (element2.length === 0 && element1.length > 0) return -1
            if (element1.length === 0 && element2.length > 0) return 1
            
            for (let k = 0; k < element1.length; k++) {
                let cmp = compareArrays(element1[k], element2[k])
                if(cmp === -1)
                {
                   return -1
                } 
                if(cmp === 1)
                {
                    
                    return 1
                }
            }
            if(element2.length > element1.length) return 1
            return 0
            
        }

        if ((element1 instanceof Array && !(element2 instanceof Array)) || (element2 instanceof Array && !(element1 instanceof Array))) {
            let elementAux1 = element1 instanceof Array ? element1 : [element1]
            let elementAux2 = element2 instanceof Array ? element2 : [element2]
            
            return compareArrays(elementAux1, elementAux2)
        }
        
        if (element1 > element2) return -1
        return 1
    }

    

}
app()