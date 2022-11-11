export const Helper = array => {
  return array.map(({ largeImageURL, id, webformatURL, user }) => ({
    largeImageURL,
    id,
    webformatURL,
    user,
  }));
};
