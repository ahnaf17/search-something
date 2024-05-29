const productResponseParser = (response: any) => ({
  id: response.id,
  title: response.title,
  price: response.price,
  thumbnail: response.thumbnail,
});

export default productResponseParser;
