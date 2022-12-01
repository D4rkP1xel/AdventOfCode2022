import {readFile} from 'fs/promises'

async function app2()
{
    const data = await readFile('./day1/input.txt', { encoding: 'utf8' })
    const array:string[] = data.split('\n')
    let newArrPos = -1
    let newArr:number[] = [] 
    let biggestNumArr:number[]= [0, 0, 0]

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
        let bigArrayObj = findSmallestNumber(biggestNumArr)
        if(newArr[y] > bigArrayObj.smallest)
        {
            biggestNumArr[bigArrayObj.smallestPos] = newArr[y]
        }
    }
    console.log(biggestNumArr[0], biggestNumArr[1], biggestNumArr[2], getTotal(biggestNumArr))
}

function findSmallestNumber(arr: number[]) : {smallest:number; smallestPos: number;}
{
    let smallestPos = 0
    let smallest = arr[smallestPos]
    for(let pos = 0; pos < arr.length; pos++)
    {
        if(smallest > arr[pos])
        {
            smallest=arr[pos]
            smallestPos = pos
        }
    }
    return {smallest, smallestPos}
}

function getTotal(arr:number[]):number
{
    let sum = 0
    for(let i = 0; i<arr.length; i++)
    {
        sum+=arr[i]
    }
    return sum
}
app2()

