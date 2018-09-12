import React from 'react';
import { Header, Table } from 'semantic-ui-react'
import { capitalize } from '../constants/utils.js'

export function table(fields,values,onclick) {
  return (
    <Table collapsing>
      <Table.Header>
        <Table.Row>
          { fields.map( label =>
            <Table.HeaderCell key={label}>{capitalize(label)}</Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {values.map( record =>
          <Table.Row key={record[fields[0]]} onClick={e => onclick(record)}>
            { fields.map( field => <Table.Cell key={record[field]}>{record[field]}</Table.Cell>) }
          </Table.Row>
        )}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
        <Table.HeaderCell colSpan={fields.length}>
          <Header as="h5">
            {"Count: " + values.length}
          </Header>
        </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}
