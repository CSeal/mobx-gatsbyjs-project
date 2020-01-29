import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import CreateDeck, { DeckModalShowButton } from './deck-create'

const DecksDropDown = styled(Dropdown)`
  div.text {
    display: block;
    margin: 0em 0em 0.28571429rem 0em;
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.92857143em;
    font-weight: bold;
    text-transform: none;
  }
  &&::after {
    margin: -0.2em 0em 0em 0.2em;
    content: '*';
    color: #db2828;
    display: inline-block;
    vertical-align: top;
  }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default compose<any, any>(
  inject('deckStore'),
  observer
)(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any): JSX.Element => {
    const [isOpen, setOpen] = useState(false)
    const [isDeckModalOpen, setIsDeckModalOpen] = useState(false)
    const deckModalOpen = (): void => {
      setIsDeckModalOpen(true)
    }
    const dropDownToggle = (): void => {
      setOpen(!isOpen)
    }

    const dropDownBlur = (): void => {
      setOpen(false)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dropDownChange = (...rest: any[]): void => {
      props.onChange(...rest)
      setOpen(false)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedDeck = props.deckStore.decks.find((deck: any): boolean => deck.id === props.value) || false
    const dropDownTitle: string = selectedDeck === false ? 'Select Deck' : `Selected Deck: ${selectedDeck.name}`

    return (
      <>
        <DecksDropDown text={dropDownTitle} scrolling open={isOpen} onClick={dropDownToggle} onBlur={dropDownBlur}>
          <Dropdown.Menu>
            <Dropdown.Item>
              <DeckModalShowButton clickHandler={deckModalOpen} />
            </Dropdown.Item>
            {isOpen &&
              props.deckStore.decks.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (deck: any): JSX.Element => (
                  <Dropdown.Item
                    key={deck.id}
                    onClick={dropDownChange}
                    text={deck.name}
                    icon={deck.pendingquotes ? 'clock' : 'check circle'}
                    value={deck.id}
                    active={props.value === deck.id}
                  />
                )
              )}
          </Dropdown.Menu>
        </DecksDropDown>
        <CreateDeck isDeckModalOpen={isDeckModalOpen} setIsDeckModalOpen={setIsDeckModalOpen} />
      </>
    )
  }
)
