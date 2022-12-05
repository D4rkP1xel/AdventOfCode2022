import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day5/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n')
    let boxes: string[][] = [];
    for (var a = 0; a < 9; a++) { // create matrix
        boxes[a] = [];
        for (var j = 0; j < 8; j++) {
            boxes[a][j] = null;
        }
    }
    for (let i = 7; i >= 0; i--) { //fill boxes
        for(let k=0; k<9; k++)
        {
            let letter = inputData[i].slice(1+k*4, 2+k*4)
            if(letter !== " ")
                boxes[k][7-i] = letter
        }
        
    }
    for(let i=10; i<inputData.length; i++)
    {
        const line = inputData[i]
        let amount = parseInt(line.split(" ")[1])
        let initialBox = parseInt(line.split(" ")[3])
        let destinationBox = parseInt(line.split(" ")[5])
        let lastInitialBoxPos: number = boxes[initialBox-1].filter((letter)=>{if(letter !== null)return letter}).length === 0 ? -1 : null
        let lastDestinationBoxPos: number = boxes[destinationBox-1].filter((letter)=>{if(letter !== null)return letter}).length === 0  ? -1 : null
        for(let cratePos =boxes[initialBox-1].length-1; cratePos>=0; cratePos--)
        {
            if(lastInitialBoxPos === null && boxes[initialBox-1][cratePos] !== null)
            {
                lastInitialBoxPos = cratePos
                break
            }
        }
        for(let cratePos =boxes[destinationBox-1].length-1; cratePos>=0; cratePos--)
        {
            if(lastDestinationBoxPos === null && boxes[destinationBox-1][cratePos] !== null)
            {
                lastDestinationBoxPos = cratePos
                break
            }
        }
        let cratesToMove: string[] = boxes[initialBox-1].slice(lastInitialBoxPos-amount+1, lastInitialBoxPos+1)
        
        while(cratesToMove.length > 0)
        {
            boxes[destinationBox-1][lastDestinationBoxPos+1] = cratesToMove[0]
            boxes[initialBox-1][lastInitialBoxPos] = null
            lastInitialBoxPos--
            lastDestinationBoxPos++
            cratesToMove.shift()
        }
        
           
    }
    for(let numBoxes=0; numBoxes<boxes.length; numBoxes++)
    {
        for(let numCrates=boxes[numBoxes].length-1; numCrates>=0; numCrates--)
        {
            if(boxes[numBoxes][numCrates] !== null)
            {
                console.log(boxes[numBoxes][numCrates])
                break
            }
        }
    }
}
app()