import { WINNER_COMBOS } from '../constants'

export const checkWinner = (boardToCheck) => {
    for (let comb of WINNER_COMBOS) {
      const [a, b, c] = comb
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
}

export const checkEndGame = (newBoard) => {
    return newBoard.every((item) => item != null)
}
