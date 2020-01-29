import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { Header, Loader, Message, Segment, Form, Dimmer, Button, Image } from 'semantic-ui-react'
import { getSliderItem, updateSliderItem } from '../../utils/graphql'
import { GetSliderItemQuery } from '../../API'
import { ImagePicker, TFile, TRenderFucnForUploadButton } from '../../elements/file-management'
import { sliderImgUrlCreater } from '../../utils/urls'

const imageFix1 = (_allMatches: string, fix1: string) => {
  const numberIndex = Number(fix1)
  return `image-${numberIndex > 1 ? 1 : numberIndex + 1}`
}

const loadingStatusForComponent = (
  component: JSX.Element,
  loadingcomp: boolean,
  loadingContent = 'loading'
): JSX.Element => (
  <Segment style={{ textAlign: 'center' }}>
    <Dimmer active={loadingcomp} disabled={!loadingcomp}>
      <Loader content={loadingContent} />
    </Dimmer>
    {component}
  </Segment>
)

type TStoregeRespones = {
  key: string
}

interface IProps {
  sliderItemId: string
}

const AdminSliderItem = ({ sliderItemId }: IProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [sliderItem, setSliderItem] = useState<GetSliderItemQuery['getSliderItem'] | null>(null)

  const [updating, setUpdating] = useState(false)
  const [formError, setFormError] = useState('')
  const [status, setStatus] = useState(sliderItem ? sliderItem.status : '')
  const [imageLoading, setImageLoading] = useState(false)
  const [imgPath, setImgPath] = useState<string>(sliderItem ? sliderItem.image : '')
  const [seoalt, setSeoalt] = useState<string>(sliderItem ? sliderItem.seoalt : '')
  const [linkUri, setLinkUri] = useState<string>(sliderItem ? sliderItem.uri : '')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeInput = (_event: React.SyntheticEvent, data: any): void => {
    if (data && data.id) {
      if (data.id === 'inputalt') {
        setSeoalt(data.value)
      }
      if (data && data.id && data.id === 'inputuri') {
        setLinkUri(data.value)
      }
      if (data.id === 'statusswitch') {
        if (data.checked) {
          setStatus('enabled')
        } else {
          setStatus('disabled')
        }
      }
    }
  }

  useEffect(() => {
    async function querySliderItem() {
      try {
        const resp = await API.graphql(graphqlOperation(getSliderItem, { id: sliderItemId }))
        if (resp.data.getSliderItem) {
          setSliderItem(resp.data.getSliderItem)
          setSeoalt(resp.data.getSliderItem.seoalt)
          setImgPath(resp.data.getSliderItem.image)
          setLinkUri(resp.data.getSliderItem.uri)
          setStatus(resp.data.getSliderItem.status)
        } else {
          setError(true)
        }
      } catch (err) {
        console.log('error: ', err)
        setError(true)
      }
      setLoading(false)
    }
    querySliderItem()
  }, [imgPath])

  const handleSubmit = async (): Promise<void> => {
    if (status === 'enabled' && imgPath.split('/')[0] !== 'public') {
      setFormError('Please provide a valid image before enabling this slider item!')
      return
    }
    if (linkUri.charAt(0) !== '/') {
      setFormError('Relative link must start with /')
      return
    }
    setFormError('')
    setUpdating(true)
    try {
      const resp = await API.graphql(
        graphqlOperation(updateSliderItem, {
          input: {
            id: sliderItemId,
            seoalt: seoalt.toLowerCase(),
            uri: linkUri,
            status,
          },
        })
      )
      if (resp.data.updateSliderItem) {
        navigate('/app/admin/slideritems')
      } else {
        setFormError('Update operation failed... Please refresh and try again.')
      }
    } catch (err) {
      console.log('error: ', err)
      setFormError('Update operation failed... Please refresh and try again.')
    }
    setUpdating(false)
  }

  const handleUpload = async (file: TFile): Promise<void> => {
    if (file && sliderItem) {
      const extension = file.name.slice(file.name.lastIndexOf('.') + 1)
      const imgPathExists = imgPath !== '' && imgPath.split('/')[0] === 'public'
      try {
        if (extension === '') {
          throw new Error('Unable to identify image file type')
        }
        const { type: mimeType } = file
        const checkKeyPattern = /image-(\d+)/i
        const removePublicPattern = /^(public\/)*/i
        const key: string =
          imgPath !== '' && checkKeyPattern.test(imgPath)
            ? imgPath.replace(checkKeyPattern, imageFix1)
            : `slider/${sliderItem.id}_image-1.${extension}`
        if (imgPathExists) {
          // delete previous image in S3
          await Storage.remove(imgPath.replace(removePublicPattern, ''))
        }
        const resp: TStoregeRespones = await Storage.put(key.replace(removePublicPattern, ''), file, {
          contentType: mimeType,
        })
        await API.graphql(
          graphqlOperation(updateSliderItem, {
            input: {
              id: sliderItemId,
              image: `public/${resp.key}`,
            },
          })
        )
        setImgPath(`public/${resp.key}`)
      } catch (err) {
        console.log('error: ', err)
        setFormError('Failed to update image')
      }
    }
  }

  const renderButtonFuncForImgUpload: TRenderFucnForUploadButton = (file, clearPreviewFunc) => (
    <Button
      onClick={async () => {
        try {
          setImageLoading(true)
          await handleUpload(file)
          if (typeof clearPreviewFunc === 'function') {
            clearPreviewFunc()
          }
        } catch (err) {
          console.log(err.message)
        } finally {
          setImageLoading(false)
        }
      }}
      content="Update image"
      color="green"
      style={{
        dispaly: 'block',
      }}
      size="medium"
    />
  )

  return (
    <Segment>
      <Header as="h3">Edit slider item</Header>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <>
          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>Some admin operations failed... Try reloading this page.</p>
            </Message>
          )}
          {!loading &&
            sliderItem &&
            loadingStatusForComponent(
              <>
                {imgPath !== '' && imgPath.split('/')[0] === 'public' && (
                  <Image src={sliderImgUrlCreater(imgPath)} size="large" style={{ display: 'inline' }} />
                )}
                <ImagePicker renderFucnForUploadButton={renderButtonFuncForImgUpload} />
              </>,
              imageLoading,
              'Image is updating'
            )}
          {!loading && !error && sliderItem && (
            <Form warning error={formError !== ''} onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
              <Message error header="Error" content={formError} />
              {sliderItem.image.split('/')[0] !== 'public' && (
                <Message warning header="Important" content="Please upload an image for this item" />
              )}
              <Form.Input
                required
                label="SEO-friendly alt tag"
                type="text"
                placeholder="Specify image alt..."
                id="inputalt"
                value={seoalt}
                onChange={onChangeInput}
              />
              <Form.Input
                required
                label="Relative link e.g. /some-shop"
                type="text"
                placeholder="Start with /..."
                id="inputuri"
                value={linkUri}
                onChange={onChangeInput}
              />
              <Form.Checkbox
                label="ENABLED"
                toggle
                id="statusswitch"
                checked={status === 'enabled'}
                onChange={onChangeInput}
              />
              <Form.Button loading={updating} color="black" content="Update" />
            </Form>
          )}
        </>
      )}
    </Segment>
  )
}

export default AdminSliderItem
