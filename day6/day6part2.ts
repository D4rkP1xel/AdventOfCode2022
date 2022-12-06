import { readFile } from 'fs/promises'

async function app() {
    const data: string = await readFile('./day6/input.txt', { encoding: 'utf8' })
    let exit = false
    for(let c = 0; c<data.length; c++)
    {
        if(c+3 < data.length)
        {
            let letters: string = data.slice(c, c+14)
            let continueVar = false
            for(let i = 0; i<letters.length-1; i++)
            {
                for(let j=i+1; j<letters.length; j++)
                {
                    if(letters[i] === letters[j])
                    {
                        continueVar = true
                        break
                    }
                }
                if(continueVar) continue
                if(i===letters.length-2)
                {
                    console.log(c+14, letters)
                    exit = true
                }
            }
            if(exit) break
        }
    }
    
}

app()