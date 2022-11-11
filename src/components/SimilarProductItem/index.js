import './index.css'

const SimilarProductItem = props => {
  const {similarProduct} = props
  const {imageUrl, title, brand, price, rating} = similarProduct

  console.log(similarProduct)
  return (
    <li>
      <img
        src={imageUrl}
        alt="similar_products"
        className="details-similar-image"
      />
      <h4>{title}</h4>
      <p>{brand}</p>
      <div className="similar-item-rating-container">
        <p>{price}</p>
        <button type="button" className="similar-products-rating-container">
          {rating}
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png "
            alt="star"
            className="details-rating-image"
          />
        </button>
      </div>
    </li>
  )
}

export default SimilarProductItem
