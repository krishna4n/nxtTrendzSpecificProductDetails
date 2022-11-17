import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

class ProductItemDetails extends Component {
  state = {productDetails: '', loadingStatus: 'LOADING', quantity: 1}

  jwtToken = Cookie.get('jwt_token')

  componentDidMount = () => {
    this.getApiData()
  }

  getApiData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const detailsData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        totalReviews: data.total_reviews,
      }

      console.log(detailsData)
      this.setState({
        loadingStatus: this.getLoadingStatus.success,
        productDetails: detailsData,
      })
    } else {
      this.setState({
        loadingStatus: this.getLoadingStatus.failed,
      })
      console.log('failed')
    }
  }

  getLoadingStatus = {
    success: 'SUCCESS',
    failed: 'FAILED',
    loading: 'LOADING',
  }

  loadingDetails = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  getProductDetails = () => {
    const {loadingStatus} = this.state

    switch (loadingStatus) {
      case this.getLoadingStatus.loading:
        console.log('loading')
        return this.loadingDetails()

      case this.getLoadingStatus.success:
        console.log('success')
        return this.submitSuccess()

      case this.getLoadingStatus.failed:
        console.log('failed')
        return this.failedView()

      default:
        return ''
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState({
        quantity: quantity - 1,
      })
    }
  }

  submitSuccess = () => {
    const {productDetails, quantity} = this.state

    const {
      imageUrl,
      title,
      availability,
      brand,
      description,
      price,
      rating,
      similarProducts,
      totalReviews,
    } = productDetails

    const similarProductsData = similarProducts.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      availability: each.availability,
      brand: each.brand,
      description: each.description,
      price: each.price,
      rating: each.rating,
      style: each.style,
      totalReviews: each.total_reviews,
    }))

    return (
      <>
        <div className="product-item-details-container">
          <img
            src={imageUrl}
            alt="similar product"
            className="item-details-image"
          />
          <div className="details-container">
            <h1 className="details-heading">{title}</h1>
            <p>{price}</p>
            <div className="details-rating-container">
              <button type="button" className="details-rating-button">
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="details-rating-image"
                />
              </button>
              <p>{totalReviews} reviews</p>
            </div>
            <p>{description}</p>
            <p>Available: {availability}</p>
            <p>Brand: {brand}</p>
            <hr />
            <div>
              <button
                type="button"
                className="add-count-button"
                onClick={this.onDecrement}
              >
                <BsDashSquare className="minus-button" />
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                className="add-count-button"
                onClick={this.onIncrement}
              >
                <BsPlusSquare className="minus-button" />
              </button>
            </div>
            <button type="button" className="add-to-cart">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-products-container">
          <h4>Similar Products</h4>
          <ul className="similar-product-container">
            {similarProductsData.map(each => (
              <SimilarProductItem similarProduct={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  failedView = () => (
    <div className="failed-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png "
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button type="button">Continue Shopping</button>
      </Link>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.getProductDetails()}
      </>
    )
  }
}

export default ProductItemDetails
