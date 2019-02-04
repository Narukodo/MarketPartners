import React, { Component } from "react";
import { Button } from "../components";
import { truncate } from "../utils";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom'
import { COLOURS } from 'utils'

const { secondary } = COLOURS

const RoundTable = styled.table`
  border-style: 1px solid #bbb;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`;

const Container = styled.div`
  padding: 2em;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`
const Row = styled.tr`
  border-bottom: 1px solid #bbb;
`;

const Cell = styled.td`
  border-left: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  padding: 20px 10px;
  font-size: 12px;
  color: #344e63;
  min-width: 150px;
  max-width: 350px;
  &:first-child {
    border-left: 0px none #fff;
    font-weight: 700;
    letter-spacing: 1px;
  }
`;

const HeaderCell = styled.th`
  background-color: #eee;
  color: #000;
  font-size: 12px;
  font-weight: lighter;
  text-align: left;
  padding: 10px;
  min-width: 150px;
  max-width: 350px;
  &:not(:first-child) {
    border-left: 1px solid #bbb;
  }
`;

const Header = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline
  margin: 30px 0px;
  color: #344e63;
  font-weight: bold;
`;

@inject('mpStore') @observer
export class TableComponent extends Component {
  
  componentDidMount() {
    this.props.mpStore.getAllReferralInfo();
  }

  render() {
    const { mpStore } = this.props
    return (
      <Container>
      <Header>Referrals<Button path={'/new'} onClick={mpStore.reset} filled enabled={true} style={{
        fontSize: 12,
        padding: 20,
        width: 100
      }}>Add</Button></Header>
      {!mpStore.isUp && <p>Cannot get market partners</p>}
        <TableContainer>
          <RoundTable>
            <thead
              style={{
                height: 50
              }}
            >
              <Row>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Logo</HeaderCell>
                <HeaderCell>Redirect URL</HeaderCell>
                <HeaderCell>Landing Page</HeaderCell>
                <HeaderCell>Internal Note</HeaderCell>
                <HeaderCell>App Description</HeaderCell>
                <HeaderCell>Contact</HeaderCell>
                <HeaderCell>Reporting Email</HeaderCell>
                <HeaderCell>Credit</HeaderCell>
                <HeaderCell>First Message</HeaderCell>
              </Row>
            </thead>
            <tbody>
              {
                mpStore.getTableData.map((rowData, rowIndex) => (
                    <tr key={rowData.id}>
                      {rowData.columns.map((cell, index) => {
                        if(index === 0) {
                          return (
                              <Cell key={index}>
                                <Link to={`/update/${mpStore.tableData[rowIndex].id}`} style={{
                                  textDecoration: 'none',
                                  fontSize: '12px',
                                  color: secondary,
                                  fontWeight: 700,
                                  letterSpacing: '1px'
                                }}>
                                  {truncate(cell, 15)}
                                </Link>
                              </Cell>
                            )
                          } else if (typeof cell === 'string' && cell.includes('http')) {
                            return (
                              <Cell key={index}>
                                <a href={cell} style={{
                                  textDecoration: 'none',
                                  color: '#4a90e2'
                                }}>{truncate(cell, 15)}</a>
                              </Cell>
                            )
                          } else {
                            return <Cell key={index}>{truncate(cell, 15)}</Cell>
                          }
                        })
                      }
                    </tr>
                ))
              }
            </tbody>
          </RoundTable>
        </TableContainer>
      </Container>
    );
  }
}
