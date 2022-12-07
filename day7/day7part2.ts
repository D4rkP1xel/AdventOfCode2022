import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day7/input.txt', { encoding: 'utf8' })
    const inputData: string[] = data.split('\n')
    let fileSystem: object = {}
    let path = ""
    let currentSize = 0
    for (let line = 1; line < inputData.length; line++) {
        let command: string = inputData[line]
        let objAccessed = fileSystem
        let currentPathSplit = path.split("/").slice(1)
        for (let p = 0; p < currentPathSplit.length; p++) { //if in root dir, this doesnt run
            //console.log(currentPathSplit[p])
            objAccessed = objAccessed[currentPathSplit[p]]
        }
        console.log("LINE " + (line + 1), command)
        if (command.includes("$ ls")) {
            let numLines = 0
            for (let i = line + 1; i < inputData.length; i++) {
                if (inputData[i][0] !== "$")
                    numLines++
                else
                    break
            }

            //console.log(objAccessed)
            for (let objPos = 0; objPos < numLines; objPos++) {
                let lineToRead = inputData[line + objPos + 1]
                if (inputData[line + objPos + 1].includes("dir")) //add dir object
                {
                    objAccessed[lineToRead.split(' ')[1]] = {}
                }
                else { //add file object
                    objAccessed[lineToRead.split(' ')[1]] = { size: parseInt(lineToRead.split(' ')[0]) }
                    currentSize+=parseInt(lineToRead.split(' ')[0])
                }

            }

            line += numLines //skip to next $ command
        }
        else if (command.includes("$ cd")) {
            let dir = command.slice(4).trim()
            if (dir !== "..") {
                //console.log(currentPathSplit)
                //console.log("BEFORE", objAccessed)
                objAccessed = objAccessed[dir]
                if (objAccessed === undefined) return console.log("ERROR")
                //console.log("AFTER", objAccessed)
                path += "/" + dir
                //console.log(path)
            }
            else { //cd ..
                if (path === "") return console.log("ERROR")
                path = path.slice(0, path.length - currentPathSplit[currentPathSplit.length - 1].length - 1)
            }
        }
    }
    //console.log(fileSystem)
    //console.log("PATH", path)
    let unusedSpace = 70000000 - currentSize
    let sumDirSize = 0
    let dirSizes:number[] = []

    for (let child in fileSystem) {
        searchDir(fileSystem[child])
    } console.log(sumDirSize)
    console.log(getLowest(dirSizes))

    function searchDir(dir: object) {
        let dirSize = 0
        for (let child in dir) {
            if (dir[child].size !== undefined) //is file
                dirSize += dir[child].size
            else
                dirSize += searchDir(dir[child])
        }
        if (dirSize <= 100000) {
            sumDirSize += dirSize
        }
        if(dirSize + unusedSpace >= 30000000)
            dirSizes[dirSizes.length] = dirSize
        return dirSize
    }

    function getLowest(array: number[]): number
    {
        let lowest: number = array[0]
        for(let i=1; i<array.length; i++)
        {
            if(array[i]<lowest)
            {
                lowest = array[i]
            }
        }
        return lowest
    }
}

app()