let numberOfVillagers = 391

const randomVillager = () => {
  return Math.ceil( Math.random() * numberOfVillagers )
}

const updateGame = (gameBoard, matchedVillager) => {
  let {board, singles, matches} = gameBoard
  board = [...board]
  singles = [...singles]
  matches = [...matches]
  while(board.includes(matchedVillager)){
    let index = board.findIndex(villager => villager === matchedVillager)
    board.splice(index, 1, null)
  }
  matches = matches.filter(villager => villager !== matchedVillager)

  let newMatch = singles[Math.floor(Math.random() * singles.length)]
  matches.push(newMatch)

  singles = singles.filter(villager => villager !== newMatch)

  let newSingle = randomVillager()
  while(matches.includes(newSingle) || singles.includes(newSingle)){
    newSingle = randomVillager()
  }

  singles.push(newSingle)

  if(Math.floor(Math.random())){
    let index = board.findIndex(villager => villager === null)
    board.splice(index, 1, newMatch)
    index = board.findIndex(villager => villager === null)
    board.splice(index, 1, newSingle)
  }else{
    let index = board.findIndex(villager => villager === null)
    board.splice(index, 1, newSingle)
    index = board.findIndex(villager => villager === null)
    board.splice(index, 1, newMatch)
  }
  let retValue = {
    matches: matches, //array of 10 numbers that have a match
    singles: singles, //array of 5 numbers that don't have a match
    board: board, //array of 25 numbers
  }
  return retValue
}

const generateGame = () => {
  let singles = []
  let matches = []
  while(singles.length < 5){
    let villager = randomVillager()
    if(!singles.includes(villager)){
      singles.push(villager)
    }
  }
  while(matches.length < 10){
    let villager = randomVillager()
    if(!matches.includes(villager) && !singles.includes(villager)){
      matches.push(villager)
    }
  }
  let board = [...matches, ...matches, ...singles]
  for(let i = board.length-1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = board[i]
    board[i] = board[j]
    board[j] = temp
  }
  return {
    matches: matches, //array of 10 numbers that have a match
    singles: singles, //array of 5 numbers that don't have a match
    board: board, //array of 25 numbers
  }
}

export {generateGame, updateGame}
