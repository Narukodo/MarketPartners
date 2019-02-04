import React, { Component } from 'react'
import styled from 'styled-components'
import { TableRow, TableContainer, Button } from '../components'
import { observer, inject } from 'mobx-react'
import { get } from 'lodash'


const Container = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100%;
  padding: 3em;
`

const HeaderInput = styled.input`
  font-size: 2.5em;
  border-width: 0px;
  outline: none;
  font-family: Brown;
  color: #344e63;
  font-weight: 600;
  &::-webkit-input-placeholder {
    color: #bbb;
  }
`

@inject('mpStore') @observer
export class InfoComponent extends Component {
  componentDidMount (){
    this.props.mpStore.reset()
    const { id } = get(this.props, 'match.params')
    id && this.props.mpStore.getReferralInfo(id)
  }

  componentWillUnmount() {
    this.props.mpStore.reset()
  }


  render() {
    const { mpStore } = this.props
    const { id: isNew } = get(this.props, 'match.params')
    return (
      // <form onSubmit={event => {
      //   this.handleSubmit(event)
      //   }}>
        <Container>
          <TableContainer>
            <HeaderInput value={mpStore.mkt_partner_name} type='text' placeholder='Untitled' onChange={event => mpStore.setValue('mkt_partner_name', event.target.value)}/>
            <TableRow
              type={['image']}
              title='Logo'
              field={['image_url']}
              placeholders={['https://storage.googleapis.com/setter-assets/image_upload%403x.jpg']}
              style={{borderTop: '0px none #fff'}}
              handleSubmit={this.handleSubmit}/>
            <TableRow
              type={isNew ? ['fixed'] : ['text']}
              title='Redirect URL'
              field={['redirect_url']}
              prepend='https://setter.com/'
              placeholders={['marketpartner']}
              link={!!isNew}/>
            <TableRow
              type={['text']}
              title='Landing Page'
              field={['landing_page_url']}
              placeholders={['https://landing.page.url/marketpartner']}
              link={!!isNew}/>
            <TableRow
              type={['text']}
              title='Internal Note'
              field={['internal_note']}
              placeholders={['Note']}/>
            <TableRow
              type={['text']}
              title='App Description'
              field={['app_description']}
              placeholders={['Description']}/>
            <TableRow
              type={['text', 'text', 'text']}
              title='Main Contact'
              field={['referral_name', 'phone_number', 'email']}
              placeholders={['Name','Phone', 'Email']}/>
            <TableRow
              type={['text']}
              title='Reporting Email'
              field={['reporting_email']}
              placeholders={['Email']} />
            <TableRow
              type={['number']}
              title='Credit'
              field={['credit_amount']}
              placeholders={['Amount']} />
            <TableRow
              type={['text']}
              title='First Message'
              field={['init_message']}
              placeholders={['Message']} />
            <TableRow
              type={['fixed']}
              title='Submission URL'
              field={['chat_url']}
              placeholders={[mpStore.chat_url]}
              />
            <TableRow
              type={['fixed']}
              title='Referral ID'
              field={['id']}
              placeholders={[mpStore.id]}
              />
          </TableContainer>
          <div style={{
            alignSelf: 'flex-end'
          }}>
            <Button path='/' onClick={mpStore.reset}>CANCEL</Button>
            <Button path='/save' filled refresh enabled={mpStore.canSave} onClick={mpStore.save} type='submit'>SAVE</Button>
          </div>
        </Container>
        // </form>
    )
  }
}
