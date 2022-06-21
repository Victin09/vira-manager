export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getInitials = (text: string): string => {
  let initials: string;
  if (text.includes(" ")) {
    const names = text.split(" ");
    initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
  } else {
    initials = text.charAt(0).toUpperCase() + text.charAt(1).toUpperCase();
  }
  return initials;
};

export const formatObjectToString = ({
  name,
  email,
}: {
  name: string;
  email: string;
}): string => {
  //   return `<div className="d-flex flex-column">
  //   <span>${name}</span>
  //   <span>${email}</span>
  //  </div>`;
  return name;
};
