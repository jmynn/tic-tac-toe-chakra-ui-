import { baseTheme, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
        primary: baseTheme.colors.pink
    }
})