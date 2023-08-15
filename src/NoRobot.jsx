import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import { useCallback, useContext } from 'react'
import { GameContext } from './GameProvider'
export default function NoRobot() {
    const {player_1, player_2, playingArea, setPlayingArea, check, currentPlayer, setCurrentPlayer, toast} = useContext(GameContext)
    const handleClick = useCallback((target) => {
        const point = Number(target.dataset.point)
        const n = point - 1
        if(playingArea[n] !== 0) {
            toast({
                title: 'Данная ячейка была занята другим игроком!',
                description: "Попробуйте выбрать другую.",
                status: 'error',
                duration: 2000,
            })
            return
        }
        const copy = [...playingArea]
        copy[n] = currentPlayer
        setPlayingArea([...copy])
        check([...copy])

    }, [check, currentPlayer, playingArea, toast])

	return (
		<Box w={'100vw'} > 
			<Flex flexDir={'column'} alignItems={'center'}	h={'100vh'}>
				<Box flex={'0 0 auto'} w={'100vw'} py={'2.5'} px={'2'}>
                    <Flex justifyContent={'space-between'}>
                       
                        <Box>
                            <Heading size={'md'} >
                                <Flex alignItems={'center'}>
                                    {player_1.icon}&nbsp;Очки игрока {player_1.name} - {player_1.score}
                                </Flex>
                            </Heading>
                            
                            <Heading size={'md'} >
                                <Flex alignItems={'center'}>
                                    {player_2.icon}&nbsp;Очки игрока {player_2.name} - {player_2.score}
                                </Flex>
                            </Heading>
                        </Box>
                    </Flex>
                </Box>
				<Flex flex={'1 1 auto'}>
                    <SimpleGrid columns={3} border={'1px'} borderColor={'pink.600'} m={'auto'} _hover={{cursor: 'pointer'}} className='tap' onClick={(e) => {
                        e.stopPropagation()
                        handleClick(e.target)
                    }}>
                        {
                            playingArea.map((sq, i) => (
                                <Box h={'20'} data-point={i+1} key={i} w={'20'} border={'1px'} borderColor={'pink.600'} bg={'transparent'} transition={'all ease .3s'} _hover={{bg: 'pink.100', transition: 'all ease .3s'}} m={'auto'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                        {
                                            sq === 0 ? '' : sq === 1 ? player_1.icon : player_2.icon
                                        }
                                </Box>
                            ))
                        }
                    </SimpleGrid>
				</Flex>
			</Flex>
		</Box>
	)
}
