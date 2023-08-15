import { Box, Flex, Heading } from "@chakra-ui/react";

export default function ToastNextPlayer({ bg, currentPlayer, player_1, player_2, children }){
    return (
        <Box borderRadius={6} bg={bg}  textAlign={'center'} w={'auto'}>
            <Heading size={'sm'} color={'pink.50'} py={'2'} px={'2.5'}>
                <Flex alignItems={'center'} justifyContent={'center'}>
                    {children}&nbsp;{currentPlayer === 1 ? player_1.icon : player_2.icon}
                </Flex>
            </Heading>
        </Box>
    )
}
