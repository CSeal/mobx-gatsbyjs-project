import React, { useState } from 'react'
import { withPrefix } from 'gatsby'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Icon, Popup, Input, Button } from 'semantic-ui-react'

interface IProps {
  prodLink: string
  baseUrl: string
}

const ProductLinkFlyout = ({ prodLink, baseUrl }: IProps): JSX.Element => {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <Popup
      size="small"
      position="top center"
      pinned
      open={popupOpen}
      trigger={<Icon size="large" name="paper plane outline" color="grey" onClick={() => setPopupOpen(!popupOpen)} />}
    >
      <Popup.Content>
        <Input type="text" value={withPrefix(prodLink)} action>
          <input />
          <CopyToClipboard
            text={`${baseUrl}${withPrefix(prodLink)}`}
            onCopy={(_text: string, result: boolean) => {
              if (result) setPopupOpen(false)
            }}
          >
            <Button size="small" color="black">
              <Icon name="copy" style={{ paddingRight: '20px' }} />
              Copy
            </Button>
          </CopyToClipboard>
        </Input>
      </Popup.Content>
    </Popup>
  )
}

export default ProductLinkFlyout
