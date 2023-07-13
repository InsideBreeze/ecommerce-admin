/* eslint-disable */
import type { ConditionalValue } from '../types'
import type { Pretty } from '../types/helpers'

type ButtonVariant = {
  visual: "solid" | "outline" | "destructive"
}

type ButtonVariantMap = {
  [key in keyof ButtonVariant]: Array<ButtonVariant[key]>
}

export type ButtonVariantProps = {
  [key in keyof ButtonVariant]?: ConditionalValue<ButtonVariant[key]>
}

interface ButtonRecipe {
  __type: ButtonVariantProps
  (props?: ButtonVariantProps): string
  variantMap: ButtonVariantMap
  variantKeys: Array<keyof ButtonVariant>
  splitVariantProps<Props extends ButtonVariantProps>(props: Props): [ButtonVariantProps, Pretty<Omit<Props, keyof ButtonVariantProps>>]
}

/** styles for buttons */
export declare const button: ButtonRecipe