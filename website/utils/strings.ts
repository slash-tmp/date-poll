const urlRegex =
  /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/g;

/**
 * Replace each URL found in a string by a HTML anchor
 */
export function replaceUrlToHtmlAnchor(str: string) {
  return str.replaceAll(urlRegex, (match) => {
    return `<a href="${match}" target="_blank">${match}</a>`;
  });
}
