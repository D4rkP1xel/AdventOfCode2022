import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day13/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    let num = 0
    let finalArray = [[[2]], [[6]]]

    for (let i = 0; i < inputData.length; i += 3) {
        compareArrays(JSON.parse(inputData[i]), JSON.parse(inputData[i + 1])) === 1 ? num += i / 3 + 1 : null
        insertIntoFinalArray(JSON.parse(inputData[i]))
        insertIntoFinalArray(JSON.parse(inputData[i + 1]))
    }
    console.log(num)

    function compareArrays(element1, element2): number {
        if (element2 == null) return -1
        if (element1 === element2) return 0
        if (element1 instanceof Array && element2 instanceof Array) {
            if (element2.length === 0 && element1.length > 0) return -1
            if (element1.length === 0 && element2.length > 0) return 1

            for (let k = 0; k < element1.length; k++) {
                let cmp = compareArrays(element1[k], element2[k])
                if (cmp === -1) {
                    return -1
                }
                if (cmp === 1) {

                    return 1
                }
            }
            if (element2.length > element1.length) return 1
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

    function insertIntoFinalArray(element) {
        for (let i = finalArray.length - 1; i >= 0; i--) {
            if (compareArrays(element, finalArray[i]) === -1) {
                for (let k = finalArray.length - 1; k > i; k--) {
                    finalArray[k + 1] = finalArray[k]
                }
                finalArray[i + 1] = element
                return
            }
            if (i === 0) {
                finalArray.unshift(element)
            }
        }

    }
    console.log((finalArray.map((n)=>JSON.stringify(n)).indexOf(JSON.stringify([[2]]))+1) * (finalArray.map((n)=>JSON.stringify(n)).indexOf(JSON.stringify([[6]]))+1))

}
app()