import { splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const buttonFn = createRecipe('button', {
  "visual": "solid"
}, [])

const variantKeys = [
  "visual"
]

function splitVariantProps(props) {
  return splitProps(props, variantKeys)
}

export const button = Object.assign(buttonFn, {
  __recipe__: true,
  variantKeys,
  variantMap: {
  "visual": [
    "solid",
    "outline",
    "destructive"
  ]
},
  splitVariantProps,
})