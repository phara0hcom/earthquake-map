import dayjs from 'dayjs';
import { Feature, Point } from 'geojson';
import React, { useEffect, useState } from 'react';

import {
  FeatureProperties,
  OrderByQuery,
  QueryResponse
} from '../../api/earthquakeData';
import { SetClickState } from '../../hooks/useClickState';
import { MapFilterObj, SetMapFilter } from '../../hooks/useMapFilter';
import { ViewportObj } from '../../hooks/useMapViewport';

import ButtonComp from '../buttons/ButtonComp';
import TextLink from '../buttons/TextLink';
import MagnitudeComp from '../MagnitudeComp';
import Modal from '../UI/Modal';
import DataTable, { TableDataArr } from './DataTable';

import classes from './QueryTable.module.scss';

type QueryTableProps = {
  setClickState: SetClickState;
  showTable: boolean;
  geoData: QueryResponse | null;
  setViewport: React.Dispatch<React.SetStateAction<ViewportObj>>;
  closeTable: () => void;
  orderBy: OrderByQuery;
  setMapFilter: SetMapFilter;
};

type QueryFeature = Array<Feature<Point, FeatureProperties>>;

const QueryTable: React.FC<QueryTableProps> = ({
  setClickState,
  showTable,
  geoData,
  setViewport,
  closeTable,
  orderBy,
  setMapFilter
}) => {
  const [tableState, setTableState] = useState({
    tableData: null,
    allData: null
  } as {
    tableData: null | TableDataArr;
    allData: null | QueryFeature;
  });

  const makeTableData = (features: QueryFeature): TableDataArr => {
    return features.slice(0, 100).map((row) => ({
      ...row.properties,
      name: `${row.properties.code}${row.properties.time}`,
      time: dayjs(row.properties.time).format('YYYY-MM-DD HH:mm:ss'),
      magnitude: <MagnitudeComp mag={row.properties.mag} />,
      onMap: (
        <ButtonComp
          id={`tableMap${row.properties.code}${row.properties.time}`}
          className={classes.smallBtn}
          onClick={(): void => {
            closeTable();
            setClickState({
              clickedFeature: row,
              lng: row.geometry.coordinates[0],
              lat: row.geometry.coordinates[1]
            });
            setViewport((prev) => ({
              longitude: row.geometry.coordinates[0],
              latitude: row.geometry.coordinates[1],
              zoom: prev.zoom < 5 ? 5 : prev.zoom
            }));
          }}
        >
          Show on Map
        </ButtonComp>
      ),
      details: (
        <TextLink url={row.properties.url} target="_new">
          More details
        </TextLink>
      )
    }));
  };

  useEffect(() => {
    if (geoData?.features) {
      const allData = geoData?.features;
      const tableData = makeTableData(allData);
      setTableState({
        allData,
        tableData
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoData]);

  const sortByFunc = (
    prevMapFilter: MapFilterObj,
    column: 'time' | 'magnitude'
  ): OrderByQuery => {
    const orderByColumn = prevMapFilter.sortBy.split('-')[0] as
      | 'time'
      | 'magnitude';
    const asc = prevMapFilter.sortBy.split('-')[1];

    if (orderByColumn === column && asc) {
      return orderByColumn;
    }

    if (orderByColumn === column) {
      return `${orderByColumn}-asc` as 'time-asc' | 'magnitude-asc';
    }

    return column;
  };

  const orderByColumn = orderBy.split('-')[0];
  const asc = orderBy.split('-')[1];
  return (
    <Modal
      className={classes.tableModal}
      show={showTable}
      clickToClose={closeTable}
    >
      <DataTable
        tableName="queryTable"
        headers={[
          {
            name: 'Date',
            keyName: 'time',
            onClick: (): void =>
              setMapFilter((prev) => ({
                ...prev,
                sortBy: sortByFunc(prev, 'time')
              })),
            isOrdered: orderByColumn === 'time',
            asc: !!asc
          },
          {
            name: 'Magnitude',
            keyName: 'magnitude',
            onClick: (): void =>
              setMapFilter((prev) => ({
                ...prev,
                sortBy: sortByFunc(prev, 'magnitude')
              })),
            isOrdered: orderByColumn === 'magnitude',
            asc: !!asc
          },
          { name: 'Location', keyName: 'place' },
          { name: 'On Map', keyName: 'onMap' },
          { name: 'Details', keyName: 'details' }
        ]}
        data={tableState.tableData}
      />
    </Modal>
  );
};

export default QueryTable;
