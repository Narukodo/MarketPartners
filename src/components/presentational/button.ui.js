import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import { COLOURS } from 'utils'

const { secondary, grey2, white, primary } = COLOURS

const BaseButton = styled.button`
  display: inline-block;
  width: 175px;
  border-radius: 5px;
  font-size: 0.8em;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 30px;
  outline: none;
  cursor: ${props => props.enabled ? 'pointer': 'default'};
`

const FilledButton = BaseButton.extend`
  border-style: none;
  background-color: ${props => props.enabled ? primary : grey2 }
  color: ${white};
`

const OutlinedButton = BaseButton.extend`
  border: 1px solid ${grey2};
  background-color: ${white};
  color: ${secondary};
`

const SaveButton = styled.input`
display: inline-block;
width: 175px;
border-radius: 5px;
font-size: 0.8em;
font-weight: 600;
letter-spacing: 2px;
padding: 30px;
outline: none;
cursor: ${props => props.enabled ? 'pointer': 'default'};
border-style: none;
background-color: ${props => props.enabled ? primary : grey2 }
color: ${white};
`

export const Button = ({path, filled = false, children, enabled = true, style, onClick, type = 'button'}) => {
  const Button = filled ? FilledButton : OutlinedButton
  return (
    <Link to={path} style={{
      color: filled ? white: secondary,
      fontWeight: 600,
      textDecoration: 'none',
      pointerEvents: enabled ? 'auto':'none',
      margin: '1em'
    }}>
      {<Button enabled={enabled} style={style} onClick={onClick}>
          {children}
      </Button>}
    </Link>
  )
}