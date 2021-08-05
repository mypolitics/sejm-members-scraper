import {useMemo, useCallback} from 'react';
import {useTable, useSortBy, useBlockLayout} from 'react-table';
import styled from 'styled-components';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

const Styles = styled.div`
  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 1px solid black;
      }
    }
  }
`;

export default function Home() {
  const defaultColumn = useMemo(
      () => ({
         width: 150,
       }),
      []
  );
  const data = useMemo(
      () => {
          const raw = require('../data.json');

          return raw.members;
      },
      []
  );
  const columns = useMemo(
      () => [
        {
          Header: 'Imię i nazwisko',
          accessor: 'name',
        },
        {
          Header: 'Data wyboru',
          accessor: 'electionDate',
        },
        {
          Header: 'Lista',
          accessor: 'list',
        },
        {
          Header: 'Region',
          accessor: 'region',
        },
        {
          Header: 'Liczba głosów',
          accessor: 'votes',
        },
        {
          Header: 'Data ślubowania',
          accessor: 'pledge',
        },
        {
          Header: 'Staż',
          accessor: 'experience',
        },
        {
          Header: 'Partia',
          accessor: 'party',
        },
        {
          Header: 'Data urodzenia',
          accessor: 'dateOfBirth',
        },
        {
          Header: 'Wykształcenie',
          accessor: 'education',
        },
        {
          Header: 'Szkoła',
          accessor: 'school',
        },
        {
          Header: 'Zawód',
          accessor: 'job',
        }
      ],
      []
  );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useBlockLayout,
        useSortBy
    )

    const RenderRow = useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            return (
                <div
                    {...row.getRowProps({
                        style,
                    })}
                    className="tr"
                >
                    {row.cells.map((cell, id) => {
                        return (
                            <div key={id} {...cell.getCellProps()} className="td">
                                {cell.render('Cell')}
                            </div>
                        )
                    })}
                </div>
            )
        },
        [prepareRow, rows]
    )

  return (
      <Styles>
          <div {...getTableProps()} className="table">
              <div className="th">
              {headerGroups.map((headerGroup, id) => (
                  <div key={id} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, _id) => (
                          <div key={_id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                              {column.render('Header')}
                              {/* Add a sort direction indicator */}
                              <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
                          </div>
                      ))}
                  </div>
              ))}
              </div>
              <div style={{height: '100vh'}} {...getTableBodyProps()}>
                  <AutoSizer>
                      {({width, height}) => (
                          <FixedSizeList
                              height={height}
                              itemCount={rows.length}
                              itemSize={360}
                              width={width}
                          >
                              {RenderRow}
                          </FixedSizeList>
                      )}
                  </AutoSizer>
              </div>
          </div>
      </Styles>
  )
}
