import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
const brandPrimary = defineStyle({
    color: "blue.500",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'blue.300',
    }
})


const disable_font = defineStyle({
    fontFamily: "",
    textAlign: "center",
})

export const headingTheme = defineStyleConfig({
    variants: {
        brand: brandPrimary,
        "disable_font": disable_font
    },
})