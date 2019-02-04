import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { MdLaunch } from 'react-icons/lib/md'
import { COLOURS } from 'utils'

const { grey1, grey2, secondary } = COLOURS

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  padding-left: ${props => props.prepend || (!props.prepend && props.index === 0) ? '0px' : '10px'};
  border-width: 0px;
  font-size: 16px;
  outline: none;
  resize: none;
  width: auto;
  &::-webkit-input-placeholder {
    color: ${grey2};
  }
`

const ImageInput = styled.input.attrs({
  type: 'file'
})`
  position: relative;
  border-style: none;
  opacity: 0;
  z-index: 2;
`

const ImageInputWrapper = styled.div`
  position: relative;
`

const Dummy = styled.div`
  position: absolute;
  height: 23px;
  width: 23px;
  top: 0px;
  left: 0px;
  z-index: 1;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid ${grey1};
  width: 100%;
  height: 3em;
`

const Header = styled.span`
  padding: 10px;
  width: 150px;
  font-size: 14px;
  color: ${grey2};
  flex: 0 0 auto;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-left: ${props => props.index > 0 && `1px solid ${grey1}`};
  height: 100%;
  width: 100%;
  color: ${props => props.fixed ? grey2 : secondary};
`

export const TableRowUI = inject('mpStore')(observer(({
    title,
    field,
    placeholders,
    rowProps,
    prepend,
    onChange,
    type,
    onBlur,
    mpStore,
    link
  }) => (
    <Row style={rowProps}>
      {title && <Header>{title}</Header>}
      {placeholders && placeholders.map((placeholder, index) => {
        switch(type[index]){
          case 'fixed':
            return (
              <InputContainer prepend={prepend} key={index} fixed>
                {!link && prepend}
                {mpStore[field[index]] || placeholder}
                {link && <a href={`${mpStore[field[index]]}`} ><MdLaunch style={{fontSize: 23, alignSelf: 'center', color: 'bbbbbd'}} /></a>}
              </InputContainer>
            )
          case 'image':
            return (
              <InputContainer prepend={prepend} key={index}>
                {prepend}
                <ImageInputWrapper>
                  <ImageInput onChange={event => onChange(field[index], event.target.files[0])}/>
                  <Dummy>
                    <img src={placeholder} style={{height: 23, width: 23}} alt='failed to load'/>
                  </Dummy>
                </ImageInputWrapper>
              </InputContainer>)
          case 'text':
          case 'number':
            return (
            <InputContainer prepend={prepend} key={index} index={index}>
              {!link && prepend}
              <TextInput
                placeholder={placeholder}
                value={mpStore[field[index]]}
                style={{ color: secondary}}
                onChange={event => onChange(field[index], event.target.value)}
                onPaste={event => onChange(field[index], event.target.value)}
                onBlur={() => onBlur(field[index], placeholder)}
                index={index}
                prepend={prepend}
                type={type[index]}
                inputmode={type[index]}
              />
              {link && <a href={mpStore[field[index]]} ><MdLaunch style={{fontSize: 23, alignSelf: 'center', color: 'bbbbbd'}} /></a>}
            </InputContainer>)
          default:
            return <div />
        }})}
    </Row>
  )));
