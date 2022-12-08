import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day8/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n').map((l) => { return l.trim() })
    let numVisibleTrees = 0

    for (let row = 0; row < inputData.length; row++) {

        for (let column = 0; column < inputData[row].length; column++) {
            if (row === 0 || row === inputData.length - 1 || column === 0 || column === inputData[row].length - 1) { //edges
                numVisibleTrees++
                continue
            }
            let columnString = inputData.map((rowNum) => { return rowNum[column] })

            if (checkTree(inputData[row], columnString, row, column) === true) {

                numVisibleTrees++
            }

        }
    }
    console.log(numVisibleTrees)

    function checkTree(row: string, column: string[], rowNum: number, columnNum: number): boolean {
        let isVisible = 4  //4 means visible on 4 sides
        for (let i = 0; i < columnNum; i++) //left
        {
            if (parseInt(row[i]) >= parseInt(row[columnNum])) {
                isVisible--
                break
            }
        }
        for (let i = row.length - 1; i > columnNum; i--) //right
        {
            if (parseInt(row[i]) >= parseInt(row[columnNum])) {
                isVisible--  
                break
            }
        }
        for (let i = 0; i < rowNum; i++) //up
        {
            if (parseInt(column[i]) >= parseInt(column[rowNum])) {
                isVisible--
                break
            }
        }
        for (let i = column.length - 1; i > rowNum; i--) //down
        {
            if (parseInt(column[i]) >= parseInt(column[rowNum])) {
                isVisible--
                break
            }
        }
        return isVisible === 0 ? false : true
    }
}

app()