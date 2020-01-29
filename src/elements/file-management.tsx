/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Button, Confirm, Label, Icon, Grid, Header, Image } from 'semantic-ui-react'

export type TFile = {
  size: number
  name: string
  lastModifide: string
  type: string
}

export type TRenderFucnForUploadButton = (file: TFile, clearPreviewFunc: (() => void) | undefined) => JSX.Element

interface IImagePickerProps {
  renderFucnForUploadButton?: TRenderFucnForUploadButton
}

export const ImagePicker = ({ renderFucnForUploadButton }: IImagePickerProps): JSX.Element => {
  const [imageFile, setImageFile] = useState()
  const [imageSrc, setImageSrc] = useState()
  const componentViewMarginTop = '15px'

  const clearPreviewhandler = (): void => {
    setImageSrc(null)
    setImageFile(null)
  }

  const onPick = (event: React.SyntheticEvent | any): void => {
    const { files } = event.target
    if (files !== undefined && files[0] !== undefined) {
      const reader: FileReader = new FileReader()

      reader.onload = (eventIn: any) => {
        setImageSrc(eventIn.target.result)
        setImageFile(files[0])
      }

      reader.readAsDataURL(files[0])
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: imageSrc === null ? '0px' : componentViewMarginTop }}>
      {imageSrc !== null && (
        <>
          <Header as="h5">Preview Image</Header>
          <Image size="medium" src={imageSrc} style={{ display: 'inline-block' }} />
        </>
      )}
      <input
        id="imagePicker"
        type="file"
        onChange={onPick}
        accept="image/*"
        style={{
          width: '1px',
          height: '1px',
          opacity: 0,
          position: 'absolute',
          overflow: 'hidden',
          zIndex: -1,
        }}
      />
      <Label
        htmlFor="imagePicker"
        as="label"
        color="yellow"
        size="medium"
        horizontal
        style={{
          cursor: 'pointer',
          width: '80%',
          marginTop: componentViewMarginTop,
        }}
      >
        <Icon name="image outline" />
        Select image
      </Label>
      {imageFile !== null && imageSrc !== null && (
        <Icon
          name="delete"
          color="red"
          size="large"
          onClick={(): void => {
            clearPreviewhandler()
          }}
          style={{ cursor: 'pointer' }}
        />
      )}
      {imageFile !== null && imageSrc !== null && typeof renderFucnForUploadButton === 'function' && (
        <div style={{ marginTop: componentViewMarginTop }}>
          {renderFucnForUploadButton(imageFile, clearPreviewhandler)}
        </div>
      )}
    </div>
  )
}

interface IAlbumPickerProps {
  imagesKey: (string | null)[]
  handleMultipleUpload?: (files: TFile[]) => void
  deleteSelected?: (imagesKey: string[]) => void
  imageUrlCreater?: (imageKey: string) => string
  countColumnsInAlbum:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
}

export const AlbumPicker = ({
  imagesKey,
  handleMultipleUpload,
  deleteSelected,
  imageUrlCreater,
  countColumnsInAlbum,
}: IAlbumPickerProps): JSX.Element => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const componentViewMarginTop: string = '15px'
  const [selectedImages, setSelectedImages]: any = useState([])

  const onPick = (event: React.SyntheticEvent | any): void => {
    const { files } = event.target
    if (files === undefined || !files.length) {
      return
    }
    if (typeof handleMultipleUpload === 'function') {
      handleMultipleUpload(files)
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: componentViewMarginTop }}>
      {imagesKey.length !== 0 && (
        <Grid columns={imagesKey.length === 1 ? 1 : countColumnsInAlbum < 1 ? 1 : countColumnsInAlbum}>
          {imagesKey.map((imageKey: string | null): JSX.Element | null => {
            if (imageKey === null) {
              return null
            }
            return (
              <Grid.Column key={imageKey}>
                <Image
                  size="large"
                  src={typeof imageUrlCreater === 'function' ? imageUrlCreater(imageKey) : imageKey}
                  label={
                    selectedImages.includes(imageKey)
                      ? { as: 'label', color: 'red', corner: 'right', icon: 'delete' }
                      : undefined
                  }
                  style={{ display: 'inline-block', cursor: 'pointer' }}
                  onClick={(): void => {
                    if (typeof deleteSelected !== 'function') {
                      return
                    }
                    const index: number = selectedImages.findIndex((id: string): boolean => id === imageKey)
                    if (index === -1) {
                      setSelectedImages((prevState: string[]) => [...prevState, imageKey])
                      return
                    }
                    selectedImages.splice(index, 1)
                    setSelectedImages([...selectedImages])
                  }}
                />
              </Grid.Column>
            )
          })}
        </Grid>
      )}
      <input
        id="albumPicker"
        type="file"
        multiple
        onChange={onPick}
        accept="image/*"
        style={{
          width: '1px',
          height: '1px',
          opacity: 0,
          position: 'absolute',
          overflow: 'hidden',
          zIndex: -1,
        }}
      />
      <Label
        htmlFor="albumPicker"
        as="label"
        color="green"
        size="medium"
        horizontal
        style={{
          cursor: 'pointer',
          width: '80%',
          marginTop: componentViewMarginTop,
        }}
      >
        <Icon name="images" />
        Upload images
      </Label>
      {selectedImages.length !== 0 && typeof deleteSelected === 'function' && (
        <>
          <Button
            color="red"
            size="big"
            style={{ marginTop: componentViewMarginTop }}
            onClick={() => {
              setConfirmOpen(true)
            }}
          >
            <Icon name="delete" />
            Delete selected images
          </Button>
          <Confirm
            header="Confirmation required"
            content="Delete selected images?"
            confirmButton="Yes"
            open={confirmOpen}
            onCancel={() => {
              setConfirmOpen(false)
            }}
            onConfirm={() => {
              setConfirmOpen(false)
              deleteSelected(selectedImages)
              setSelectedImages([])
            }}
          />
        </>
      )}
    </div>
  )
}
