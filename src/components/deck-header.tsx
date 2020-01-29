import React from 'react'
import { navigate } from 'gatsby'
import { SaveHeader, StyledButton, StyledButtonMargin } from '../elements'

interface IProps {
  deckId: string
  productsActive: boolean
  membersActive?: boolean
}

const DeckSettingsHeader = ({ deckId, productsActive, membersActive }: IProps) => (
  <SaveHeader>
    <StyledButton
      size="medium"
      basic={!productsActive || membersActive}
      onClick={() => navigate(`/app/decks/${deckId}`)}
    >
      Products
    </StyledButton>
    <StyledButton
      size="medium"
      basic={productsActive || membersActive}
      onClick={() => navigate(`/app/decks/settings/${deckId}`)}
    >
      Settings
    </StyledButton>
    <StyledButtonMargin size="medium" color="black" onClick={() => navigate(`/app/decks/members/${deckId}`)}>
      <span />
      Members
    </StyledButtonMargin>
  </SaveHeader>
)

export default DeckSettingsHeader
