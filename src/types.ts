export interface IItem {
    id: number,
    item: string,
    description: string,
    image: string 
}

export interface IRoom {
     id: number,
    roomName: string,
    roomPath: string,
    unsolvedInstruction:string,
    solvedInstruction: string,
    hint: string,
    unsolvedImage: string,
    solvedImage: string,
    itemToSolve: number,
    itemToAdd: number
}