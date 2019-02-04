import React, { Component } from 'react'
import { TableRowUI } from 'components/presentational'
import { observer, inject } from 'mobx-react'
import { imageStore } from '../../stores';

@inject('mpStore') @observer
export class TableRowContainer extends Component {

  onChange = async (field, value) => {
    const { mpStore } = this.props
    if(field === 'image_url') await imageStore.postImageToServer(mpStore.id, value)
    else mpStore.setValue(field, value)
  }

  onBlur = (field, placeholder) => {
    const { mpStore } = this.props
    if (mpStore[field] === undefined || mpStore[field] === null || mpStore[field].length === 0) mpStore.setValue(field, '')
  }

  render() {
    const {
      style,
      title,
      field,
      placeholders,
      prepend,
      type,
      isHeader,
      link,
    } = this.props

    return <TableRowUI
      type={type}
      title={title}
      placeholders={placeholders}
      field={field}
      prepend={prepend}
      rowProps={style}
      onChange={this.onChange}
      onBlur={this.onBlur}
      isHeader={isHeader}
      link={link}
    />
  }
}
