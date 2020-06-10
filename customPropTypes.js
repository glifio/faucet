export const ADDRESS_PROPTYPE = (props, propName, componentName) => {
  if (!validateAddressString(props[propName]))
    return new Error(
      `Invalid prop: ${propName} supplied to ${componentName}. Validation failed.`
    )

  return null
}
