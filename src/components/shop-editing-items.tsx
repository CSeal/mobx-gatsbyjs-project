import React from 'react'
import { navigate } from 'gatsby'
import { Segment, Card, Icon } from 'semantic-ui-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { quoteCardImgUrlCreater, onGetImageError } from '../utils/urls'
import { GetShopQuery } from '../API'
import { GlobalStylesSearch, StyledCard, CardCornerIcon } from '../elements'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface IProps {
  shop: GetShopQuery['getShop']
}

const ShopEditingItems = ({ shop }: IProps) => (
  <>
    <GlobalStylesSearch />
    {shop && shop.sitems && shop.sitems.items && shop.sitems.items.length > 0 ? (
      <Card.Group style={{ justifyContent: 'center' }}>
        {shop.sitems.items.map(sitem => {
          if (!sitem) return null
          return (
            <StyledCard key={sitem.id} onClick={() => navigate(`/app/shops/item/${sitem.id}`)}>
              {sitem.access === 'private' && (
                <CardCornerIcon>
                  <Icon size="large" name="privacy" />
                </CardCornerIcon>
              )}
              <div className="productcard-prev-img-holder">
                <LazyLoadImage
                  className="productcard-prev-img"
                  delayTime={50}
                  delayMethod="debounce"
                  alt={sitem.productName || ' '}
                  threshold={800}
                  effect="blur"
                  src={quoteCardImgUrlCreater(sitem.productImage, 'large' as 'large')}
                  onError={onGetImageError}
                />
              </div>
              <Card.Content>
                <Card.Header>{sitem.productName || ''}</Card.Header>
              </Card.Content>
            </StyledCard>
          )
        })}
      </Card.Group>
    ) : (
      <Segment>
        <p>No products in this shop yet.</p>
      </Segment>
    )}
  </>
)

export default ShopEditingItems
