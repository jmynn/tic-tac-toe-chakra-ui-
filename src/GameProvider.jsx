import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useMemo, useState } from 'react'
import { FaRegMoon, FaRegStar } from "react-icons/fa";
import ToastNextPlayer from './ToastNextPlayer';

export const GameContext = createContext(null)
const clearArea = [0, 0, 0, 0, 0, 0, 0, 0, 0]

export default function GameProvider({ children }) {
	const [player_1, setPlayer_1] = useState({
		id: 1,
		name: '',
        score: 0,
        icon: <FaRegMoon />
	})
    
	const [player_2, setPlayer_2] = useState({
		id: 11,
		name: '',
        score: 0,
        icon: <FaRegStar />
	})

    const [currentPlayer, setCurrentPlayer] = useState(player_1.id)

	const [playingArea, setPlayingArea] = useState(clearArea)

    const toast = useToast()

	const check = useCallback((arr) => {
        let cp = currentPlayer === player_1.id ? player_2.id : player_1.id
		let winSumRaw = currentPlayer * 3

		let f0t3 = arr[0] + arr[1] + arr[2]
		let f3t5 = arr[3] + arr[4] + arr[5]
		let f6t8 = arr[6] + arr[7] + arr[8]

		let f0t6 = arr[0] + arr[3] + arr[6]
		let f1t7 = arr[1] + arr[4] + arr[7]
		let f2t8 = arr[2] + arr[5] + arr[8]

		let f2t6 = arr[2] + arr[4] + arr[6]
		let f0t8 = arr[0] + arr[4] + arr[8]

		for (const val of [f0t3, f3t5, f6t8, f0t6, f1t7, f2t8, f2t6, f0t8]) {
			if (val === winSumRaw) {
                const [[winner, setWinner]] = [[player_1, setPlayer_1], [player_2, setPlayer_2]].filter(obj => obj[0].id === currentPlayer)
				setWinner(prev => ({
                    ...prev,
                    score: prev.score + 1
                }))
                setPlayingArea(clearArea)
                setCurrentPlayer(winner.id)
                toast({
                    title: `Победил игрок ${winner.name}`,
                    description: "Игра окончена. Поле очищено. Счет обновлен.",
                    status: 'success',
                    duration: 2000,
                })
				return
			} 
		}
        if(arr.indexOf(0) === -1){
            setCurrentPlayer(cp)
            setPlayingArea(clearArea)
            toast({
                title: `Никто не выиграл!`,
                description: "Игра окончена. Поле очищено. Счет обновлен.",
                status: 'warning',
                duration: 4000,
            })
            return
        }
        setCurrentPlayer(cp)
        toast({
            position: 'bottom-right',
            duration: 3000,
            render: () => (
              <ToastNextPlayer bg={'pink.500'} currentPlayer={cp} player_1={player_1} player_2={player_2}>Следующий ход игрока -</ToastNextPlayer>
            ),
        })

	}, [currentPlayer, toast])

	const gameUtils = useMemo(() => ({
			player_1,
			setPlayer_1,
			player_2,
			setPlayer_2,
			playingArea,
			setPlayingArea,
			check,
            currentPlayer, setCurrentPlayer, toast
	}),[player_1, player_2, playingArea, check, currentPlayer, toast])
	
    return (
		<GameContext.Provider value={gameUtils}>
			{children}
		</GameContext.Provider>
	)
}
