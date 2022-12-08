import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day8/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    let highestNumTrees = 0

    for (let row = 0; row < inputData.length; row++) {
        for (let column = 0; column < inputData[row].length; column++) {
            let columnString = inputData.map((rowNum) => { return rowNum[column] })
            let numTrees = checkTree(inputData[row], columnString, row, column) 
            if (numTrees > highestNumTrees) {
                highestNumTrees = numTrees
            }
        }
    }
    
    console.log(highestNumTrees)
    function checkTree(row: string, column: string[], rowNum: number, columnNum: number): number {
        let numTreesUp = 0
        let numTreesDown = 0  
        let numTreesLeft = 0  
        let numTreesRight = 0    
        
        for (let i = columnNum-1; i > -1; i--) //left
        {
            numTreesLeft++
            if (parseInt(row[i]) >= parseInt(row[columnNum])) {
                    break
            }
        }
        for (let i = columnNum+1; i < row.length; i++) //right
        {
            numTreesRight++
            if (parseInt(row[i]) >= parseInt(row[columnNum])) {
                    break
            }
        }
     
        for (let i = rowNum-1; i > -1; i--) //up
        {
            numTreesUp++
            if (parseInt(column[i]) >= parseInt(column[rowNum])) {
                    break
            }
        }
     
        for (let i = rowNum+1; i < column.length; i++) //down
        {
            numTreesDown++
            if (parseInt(column[i]) >= parseInt(column[rowNum])) {
                    break
            }
        }
   
        return numTreesDown * numTreesLeft * numTreesRight * numTreesUp
    }
}

app()