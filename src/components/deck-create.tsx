/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Modal, Form, Button, Icon, Message } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import { useInput, IFormInput } from '../utils/form-input/form-input'
import { ButtonLinkDiv, CreateButtonHover } from '../elements'
import { createQuoteBoard, getEditorExists, createEditor, deckEditorId, createQuoteBoardEditor } from '../utils/graphql'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
  isDeckModalOpen?: boolean
  setIsDeckModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

interface IDeckModalShowButtonProps {
  clickHandler: () => void
}

interface IModalForCreateDeckProps {
  error: string
  isShown: boolean
  handleSubmit: (event: React.SyntheticEvent<Element, Event>) => Promise<void>
  actionButtonElement?: JSX.Element
  indateHandler: (
    _event: React.SyntheticEvent<Element, Event>,
    {
      name,
      value,
    }: {
      name: string
      value: string
    }
  ) => void
  indate: string
  bindTitleProps: {
    value: string
    onChange: (event: IFormInput) => void
  }
  bindDescrProps: {
    value: string
    onChange: (event: IFormInput) => void
  }
  bindImprintProps: {
    value: string
    onChange: (event: IFormInput) => void
  }
  loading: boolean
  hide: (event: React.SyntheticEvent<Element, Event>) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateDeck = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore, isDeckModalOpen, setIsDeckModalOpen }: IProps): JSX.Element => {
    const { value: title, bind: bindTitle, reset: resetTitle } = useInput('')
    const { value: descr, bind: bindDescr, reset: resetDescr } = useInput('')
    const { value: imprint, bind: bindImprint, reset: resetImprint } = useInput('')

    // https://github.com/arfedulov/semantic-ui-calendar-react
    const [indate, setInDate] = useState('')
    const indateHandler = (_event: React.SyntheticEvent, { name, value }: { name: string; value: string }) => {
      if (name === 'indate') {
        setInDate(value)
      }
    }

    const [loading, setStateLoading] = useState(false)
    const [error, setStateError] = useState('')

    const [isOpen, setIsOpen] = useState(false)

    const isShown: boolean = isDeckModalOpen !== undefined ? isDeckModalOpen : isOpen
    const setIsShown: React.Dispatch<React.SetStateAction<boolean>> = setIsDeckModalOpen || setIsOpen

    const show = (): void => {
      setIsShown(true)
    }
    const hide = (event: React.SyntheticEvent): void => {
      event.preventDefault()
      setIsShown(false)
    }
    const hideAsync = () => {
      setIsShown(false)
    }

    const handleSubmit = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      event.stopPropagation()
      //console.log(`Submitting ${title} ${descr} ${imprint} ${indate}`);

      // user must be logged in (do not enable this component otherwise)
      if (!userStore.isLoggedIn) {
        setStateError('Please login first!')
        return
      }
      setStateError('')
      setStateLoading(true)

      try {
        const respCreateDeck = await API.graphql(
          graphqlOperation(createQuoteBoard, {
            input: {
              members: [],
              name: title,
              description: descr,
              pendingquotes: true,
              imprintdesign: imprint,
              inhandsdate: indate,
            },
          })
        )
        const createdDeckId = respCreateDeck.data.createQuoteBoard.id

        // create many-to-many user-to-quoteboard join record for owner
        const respEditorExists = await API.graphql(graphqlOperation(getEditorExists, { id: userStore.loginedUser.sub }))
        if (!(respEditorExists.data.getEditor && respEditorExists.data.getEditor.id)) {
          await API.graphql(
            graphqlOperation(createEditor, {
              input: {
                id: userStore.loginedUser.sub,
                username: userStore.loginedUser.username,
              },
            })
          )
        }
        await API.graphql(
          graphqlOperation(createQuoteBoardEditor, {
            input: {
              id: deckEditorId(createdDeckId, userStore.loginedUser.username),
              qboardID: createdDeckId,
              editorID: userStore.loginedUser.sub,
            },
          })
        )

        setStateLoading(false)
        resetTitle()
        resetDescr()
        resetImprint()
        setInDate('')
        hideAsync()
      } catch (err) {
        console.log(err)
        setStateError('Please check your input...')
        setStateLoading(false)
      }
    }
    const isControledModal: boolean = isDeckModalOpen !== undefined && setIsDeckModalOpen !== undefined
    return (
      <ModalForCreateDeck
        error={error}
        isShown={isShown}
        handleSubmit={handleSubmit}
        actionButtonElement={isControledModal === false ? <DeckModalShowButton clickHandler={show} /> : undefined}
        indateHandler={indateHandler}
        indate={indate}
        bindTitleProps={bindTitle}
        bindDescrProps={bindDescr}
        bindImprintProps={bindImprint}
        loading={loading}
        hide={hide}
      />
    )
  }
)

export default CreateDeck

export const DeckModalShowButton = ({ clickHandler }: IDeckModalShowButtonProps): JSX.Element => (
  <ButtonLinkDiv key="create" onClick={clickHandler}>
    <CreateButtonHover>
      <Icon name="plus circle" />
      Create
    </CreateButtonHover>
  </ButtonLinkDiv>
)

const ModalForCreateDeck = (props: IModalForCreateDeckProps): JSX.Element => {
  const {
    error,
    isShown,
    handleSubmit,
    actionButtonElement,
    indateHandler,
    indate,
    bindTitleProps,
    bindDescrProps,
    bindImprintProps,
    loading,
    hide,
  } = props

  return (
    <Modal
      as={Form}
      error={error !== null && error !== ''}
      open={isShown}
      size="small"
      onSubmit={handleSubmit}
      trigger={actionButtonElement !== undefined ? actionButtonElement : null}
    >
      <Modal.Header>New quote deck</Modal.Header>
      <Modal.Content>
        <Message error header="Error" content={error} />
        <DateInput
          required
          name="indate"
          value={indate}
          onChange={indateHandler}
          duration={10}
          dateFormat="YYYY-MM-DD"
          closable
          closeOnMouseLeave={false}
          label="In hands date"
          placeholder="Select..."
          iconPosition="left"
        />
        <Form.Input {...bindTitleProps} required label="Title" type="text" placeholder="Quote deck title" />
        <Form.TextArea {...bindDescrProps} required label="Description" placeholder="About..." />
        <Form.TextArea {...bindImprintProps} required label="Imprint design" placeholder="Details..." />
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Loading</Message.Header>
              Please wait...
            </Message.Content>
          </Message>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button type="submit" color="black" icon="plus circle" content="Create" />
        <Button onClick={hide} color="grey" content="Cancel" />
      </Modal.Actions>
    </Modal>
  )
}
