import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { FaGamepad } from "react-icons/fa";
import { useContext } from "react";
import { GameContext } from "./GameProvider";
import { useNavigate } from "react-router-dom";
export default function Home(){
    const {setPlayer_1, setPlayer_2} = useContext(GameContext)
    const navigate = useNavigate()

    const handleSubmit = (form) => {
        const formData = new FormData(form)
        const namePlayer1 = formData.get('player_1')
        const namePlayer2 = formData.get('player_2')
        setPlayer_1(prev => ({
            ...prev,
            name: namePlayer1
        }))
        setPlayer_2(prev => ({
            ...prev,
            name: namePlayer2
        }))
        navigate('/game')
    }

    return (       
        <Container maxW={"container.xl"} >
            <Flex h={'100vh'} flexDir={'column'}>
                <Box py={'2.5'}>
                    <ColorModeSwitcher ml={'auto'} display={'flex'}/>
                </Box>
                    <Flex flexDir={'column'} justifyContent={'center'} h={'inherit'} my={'auto'}>
                        <Heading as={'h1'} fontSize={['2xl', null, '3xl', '5xl']} textAlign={'center'} mb={'4'}>Welcome to Tic-Tac-Toe Pink</Heading>
                        <form onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit(e.target)
                            }}>
                            <FormControl border={"1px"} borderColor={'pink.800'} borderRadius={6} p={'2.5'} >
                                <FormLabel>Укажите ники игроков</FormLabel>
                                <>
                                    <FormLabel>Игрок 1</FormLabel>
                                    <Input isRequired name="player_1" placeholder="Введите имя (игрок 1)" mb={'2.5'}/>
                                </>
                                <>
                                    <FormLabel>Игрок 2</FormLabel>
                                    <Input isRequired name="player_2" placeholder="Введите имя (игрок 2)" mb={'2.5'}/>
                                </>
                                <Button type={"submit"} rightIcon={<FaGamepad />} w={'inherit'} colorScheme='pink' variant='outline'>Start</Button>
                            </FormControl>
                        </form>
                    </Flex>
            </Flex>
        </Container>
    )
}
