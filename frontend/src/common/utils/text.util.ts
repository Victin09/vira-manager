export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const getInitials = (text: string): string => {
  let initials: string
  if (text.includes(' ')) {
    const names = text.split(' ')
    initials = names[0].substring(0, 1).toUpperCase()

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
  } else {
    initials = text.charAt(0).toUpperCase()
  }
  return initials
}
