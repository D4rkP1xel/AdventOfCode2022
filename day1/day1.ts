import {readFile} from 'fs/promises'

async function app()
{
    const data = await readFile('./day1/input.txt', { encoding: 'utf8' })
    const array:string[] = data.split('\n')
    let newArrPos = -1
    let newArr:number[] = [] 
    let biggestNum = 0
    for(let i = 0; i<array.length; i++)
    {
        if(array[i].trim() == '')
        {
            newArrPos++
        }
        else if(newArr[newArrPos] == undefined)
        {
            newArr[newArrPos] = parseInt(array[i].trim())
        }
        else
        {
            newArr[newArrPos] += parseInt(array[i].trim())
        }
         
    }
    for(let y=0; y<newArr.length; y++)
    {
        if(newArr[y] > biggestNum)
        {
            biggestNum = newArr[y]
        }
    }
    console.log(biggestNum)
}

app()

