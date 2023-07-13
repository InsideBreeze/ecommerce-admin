import { defineRecipe } from "@pandacss/dev"

export var buttonRecipe = defineRecipe({
    name: "button",
    description: "styles for buttons",
    base: {
        w: "auto",
        rounded: "md",
        h: 10,
        fontSize: "sm",
        px: 4,
        py: "5px",
        fontWeight: "medium",
        _hover: {
            opacity: "75%",
            cursor: "pointer"
        },
        _disabled: {
            opacity: "75%",
            pointerEvents: "none"
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    variants: {
        visual: {
            solid: { bg: "black", color: "white" },
            outline: { border: "1px solid token(colors.gray.200)" },
            destructive: { bg: "red", color: "white" }
        },
    },
    defaultVariants: {
        visual: "solid"
    }
})
