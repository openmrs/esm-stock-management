import React, { useEffect, useMemo, useState } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { useStockItem } from '../../../stock-items.resource';
import PrintableBincardTransactionHeader from './printable-bincard-transaction-header.component';
import PrintableStockcardTransactionHeader from './printable-stockcard-transaction-header.component';
import PrintableTransactionFooter from './printable-transaction-footer.component';
import styles from './printable-transaction.scss';
import StockOperationReference from '../../../../stock-operations/add-stock-operation/stock-operation-reference.component';
import { formatDisplayDate } from '../../../../core/utils/datetimeUtils';
import { ArrowLeft } from '@carbon/react/icons';
import { usePatient } from '../../../../stock-lookups/stock-lookups.resource';
import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';

type Props = {
  title: string;
  columns: any;
  items: any;
};

const TransactionsStockcardPrintout: React.FC<Props> = ({ columns, items, title }) => {
  console.warn('ITEMS: ' + JSON.stringify(items, null, 2));

  const [mappedData, setMappedData] = useState([]);
  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      const patientPromises = items
        .filter((item) => item.patientUuid) // Only fetch for items with patientUuid
        .map(async (item) => {
          const customePresentation = 'custom:(uuid,display,identifiers,links)';
          const url = `${restBaseUrl}/patient/${item.patientUuid}?v=${customePresentation}`;
          const response = await openmrsFetch(url); // Assume `openmrsFetch` is a fetch utility
          return { uuid: item.patientUuid, data: response.data };
        });

      const resolvedPatients = await Promise.all(patientPromises);

      // Map patient UUIDs to their data
      const patientMap = {};
      resolvedPatients.forEach((patient) => {
        patientMap[patient.uuid] = patient.data;
      });

      setPatientData(patientMap); // Save patient data in state
    };

    fetchPatients();
  }, [items]);

  console.warn('PATIENTS: ' + JSON.stringify(patientData, null, 2));

  useEffect(() => {
    // Map items with patient data
    const data = items.map((stockItemTransaction) => {
      const patient = stockItemTransaction.patientUuid ? patientData[stockItemTransaction.patientUuid] : null;

      return {
        ...stockItemTransaction,
        id: stockItemTransaction?.uuid,
        key: `key-${stockItemTransaction?.uuid}`,
        uuid: `${stockItemTransaction?.uuid}`,
        date: formatDisplayDate(stockItemTransaction?.dateCreated),
        location:
          stockItemTransaction.operationSourcePartyName && stockItemTransaction.operationDestinationPartyName ? (
            stockItemTransaction.operationSourcePartyName === stockItemTransaction?.partyName ? (
              stockItemTransaction.quantity > 0 ? (
                <>
                  <span className="transaction-location">{stockItemTransaction.operationSourcePartyName}</span>
                  <ArrowLeft size={16} /> {stockItemTransaction.operationDestinationPartyName}
                </>
              ) : (
                <>
                  <span className="transaction-location">{stockItemTransaction.operationSourcePartyName}</span>
                  <ArrowLeft size={16} /> {stockItemTransaction.operationDestinationPartyName}
                </>
              )
            ) : stockItemTransaction.operationDestinationPartyName === stockItemTransaction?.partyName ? (
              stockItemTransaction.quantity > 0 ? (
                <>
                  <span className="transaction-location">{stockItemTransaction.operationDestinationPartyName}</span>
                  <ArrowLeft size={16} /> {stockItemTransaction.operationSourcePartyName}
                </>
              ) : (
                <>
                  <span className="transaction-location">{stockItemTransaction.operationDestinationPartyName}</span>
                  <ArrowLeft size={16} /> {stockItemTransaction.operationSourcePartyName}
                </>
              )
            ) : (
              stockItemTransaction?.partyName
            )
          ) : (
            stockItemTransaction?.partyName
          ),
        transaction: stockItemTransaction?.isPatientTransaction
          ? 'Patient Dispense'
          : stockItemTransaction.stockOperationTypeName,
        quantity: `${stockItemTransaction?.quantity?.toLocaleString()} ${stockItemTransaction?.packagingUomName ?? ''}`,
        batch: stockItemTransaction.stockBatchNo
          ? `${stockItemTransaction.stockBatchNo}${
              stockItemTransaction.expiration ? ` (${formatDisplayDate(stockItemTransaction.expiration)})` : ''
            }`
          : '',
        out:
          stockItemTransaction?.quantity < 0
            ? `${(-1 * stockItemTransaction?.quantity)?.toLocaleString()} ${
                stockItemTransaction?.packagingUomName ?? ''
              } of ${stockItemTransaction.packagingUomFactor}`
            : '',
        totalout:
          stockItemTransaction?.quantity < 0
            ? `${-1 * stockItemTransaction?.quantity * Number(stockItemTransaction.packagingUomFactor)}`
            : '',
        patientId: stockItemTransaction?.patientId ?? '',
        patientUuid: stockItemTransaction?.patientUuid ?? '',
        patientName: patient?.display ?? '', // Use patient display name if available
        patientIdentifier: '',
      };
    });

    setMappedData(data);
  }, [items, patientData]);

  console.warn('MAPPED ITEMS: ' + JSON.stringify(mappedData, null, 2));

  return (
    <div>
      <PrintableStockcardTransactionHeader itemName={title} />

      <div className={styles.itemsContainer}>
        <div className={styles.tableContainer}>
          <DataTable data-floating-menu-container rows={mappedData} headers={columns} useZebraStyles>
            {({ rows, headers, getHeaderProps, getTableProps, onInputChange }) => (
              <div>
                <TableContainer>
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ fontSize: '8px' }}>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </DataTable>
        </div>
      </div>

      <PrintableTransactionFooter title={''} />
    </div>
  );
};

export default TransactionsStockcardPrintout;
