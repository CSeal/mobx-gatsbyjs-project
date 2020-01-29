import React, { useState } from 'react'
import Slider from 'react-slick'
import { Header, Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { IDeck } from '../utils/graphql'
import CreateDeck, {DeckModalShowButton} from './deck-create'
import { ButtonLinkDiv, ButtonLink } from '../elements'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'

const StyledSlickSlider = styled(Slider)`
  margin-bottom: 20px;

  .slick-dots li{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #757474;
    background-color: #fff;
  }

  .slick-dots li button:before {
    content: '';
  }

  .slick-dots li.slick-active {
    background-color: #757474;
  }
`

interface IQuoteBoardsSliderProps {
  deckStore: any
  userStore: any
}

const QuoteBoardsSlider = compose<any, any>(inject('deckStore'), inject('userStore'), observer)
(({ deckStore, userStore }:IQuoteBoardsSliderProps):JSX.Element | null => {
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false)
  const deckModalOpen = ():void => {
    setIsDeckModalOpen(true)
  }
  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    variableWidth: false,
    adaptiveHeight: true,// prevents taller elements for longer titles in init view ONLY
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    // keep in mind max-width of ButtonLinkDiv
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };

  if (deckStore.decks.length < 4) {
    settings.slidesToShow = deckStore.decks.length + 1;
  }
  if(!userStore.isLoggedIn) {
    return null
  }
  return (
    <Segment>
      <Header as='h3' textAlign='center'>Quotes</Header>
      <StyledSlickSlider {...settings}>
        <DeckModalShowButton clickHandler={deckModalOpen}/>
        {
          deckStore.decks.map(
            (deck: IDeck) =>
            <ButtonLinkDiv key={deck.id}>
              <ButtonLink to={`/app/decks/${deck.id}`}>
                {deck.pendingquotes ? (<Icon name="clock" />) : (<Icon name="check circle" />)}
                {deck.name.length > 25 ? deck.name.substring(0, 21)+'...' : deck.name}
              </ButtonLink>
            </ButtonLinkDiv>
          )
        }
        </StyledSlickSlider>
      <CreateDeck
        isDeckModalOpen={isDeckModalOpen}
        setIsDeckModalOpen={setIsDeckModalOpen}
      />
    </Segment>
  )
})

export default QuoteBoardsSlider