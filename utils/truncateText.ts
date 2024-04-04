// This function truncates a given string if it exceeds 25 characters
export const truncateText = (str: string) => {
  // Check if the length of the string is less than 25 characters
  if (str.length < 25) {
    // If it is, return the original string unchanged
    return str;
  } else {
    // If the length is 25 or greater, truncate the string to the first 25 characters
    // and append "..." to indicate that the text has been truncated
    return str.substring(0, 25) + "...";
  }
};
