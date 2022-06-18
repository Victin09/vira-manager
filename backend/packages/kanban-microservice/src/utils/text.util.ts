export const getInitials = (text: string): string => {
  let initials: string;
  if (text.includes(' ')) {
    const names = text.split(' ');
    initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
  } else {
    initials = text.charAt(0).toUpperCase() + text.charAt(1).toUpperCase();
  }
  return initials;
};
