// Helpers for product attributes encoded as {Text}${priceCentsIncrement}.
import { IDropDownMenuItems } from '../elements/interface'

export const attrText = (attrPrc: string | null): string | null => (attrPrc ? attrPrc.split('$')[0] : null)

export const attrDropdownOption = (attrPrc: string | null): IDropDownMenuItems | null => {
  if (!attrPrc) return null
  const attrTxt = attrText(attrPrc)
  return attrTxt ? { key: attrPrc, text: attrTxt, value: attrPrc } : null
}

export const attsPriceCentsIncr = (attrPrc: string | null): number => {
  let pincr = 0
  if (attrPrc) {
    try {
      pincr = parseInt(attrPrc.split('$')[1], 10)
    } catch {
      return 0
    }
  }
  return pincr
}

export const attsPriceCentsIncrTotal = (attrsMap: Map<string, string | null>): number => {
  let pincr = 0
  if (attrsMap.size > 0) {
    attrsMap.forEach(avalue => {
      pincr += attsPriceCentsIncr(avalue)
      return null
    })
  }
  return pincr
}
