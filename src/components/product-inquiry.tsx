import React from 'react'
import { withPrefix } from 'gatsby'
import { API } from 'aws-amplify'
import {inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Modal, Form, Button, Header } from 'semantic-ui-react'
import { useInput } from '../utils/form-input/form-input'
import { ResultElement } from '../types'
import { IQuoteItem, createVisitorInquiry } from '../utils/graphql'

interface IProps {
  pitem?: ResultElement
  qitem?: IQuoteItem
  open: boolean
  onclose: () => void
  userStore: any
}

const ProductInquiry = compose<any,any>(inject('userStore'), observer)(
  (props: IProps) => {
  const userStore = props.userStore;
  const prodName = props.pitem ? props.pitem.Name : (props.qitem ? props.qitem.productName : '')

  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:descr, bind:bindDescr, reset:resetDescr } = useInput('');

  const hide = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.onclose();
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    // close the modal right away
    hide(event);

    const subjItem = props.pitem ? `product details ${props.pitem.Id}` : `quote item ${props.qitem ? props.qitem.id : ''}`
    const msgLink = props.pitem ? withPrefix(`/?product=${props.pitem.Id}`) : withPrefix(`/app/admin/quoteitem/${props.qitem ? props.qitem.id : ''}`)

    // SNS to site admin: IAM without authentication or Cognito as users-group
    try {
      await API.graphql({
        query: createVisitorInquiry,
        variables: { input: {
          sender: email,
          subject: `Product inquiry form in ${subjItem}`,
          message: `${descr} \n ${msgLink}`,
        }},
        authMode: userStore.isLoggedIn ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM'
      });
      resetEmail();
      resetDescr();
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  return (
    <Modal
      as={Form}
      open={props.open}
      size="small"
      style={{ maxWidth: 500 }}
      onSubmit={handleSubmit}
    >
      <Modal.Header>Product inquiry</Modal.Header>
      <Modal.Content>
        <Header as="h3">{prodName || ''}</Header>
        <Form.Input {...bindEmail} required label="Email" type="email" />
        <Form.TextArea {...bindDescr} required label="Your question" />
      </Modal.Content>
      <Modal.Actions>
        <Button type="submit" color="black" content="Send" />
        <Button onClick={hide} color="grey" content="Cancel" />
      </Modal.Actions>
    </Modal>
  )
})

export default ProductInquiry
