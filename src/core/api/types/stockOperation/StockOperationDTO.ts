import { RecordPermission } from '../RecordPermission';
import { StockOperationItemDTO } from './StockOperationItemDTO';
import { StockOperationStatus } from './StockOperationStatus';

export interface StockOperationDTO {
  uuid: string | null | undefined;
  cancelReason: string | null | undefined;
  cancelledBy: number;
  cancelledByGivenName: string | null | undefined;
  cancelledByFamilyName: string | null | undefined;
  cancelledDate: Date;
  completedBy: number;
  completedByGivenName: string | null | undefined;
  completedByFamilyName: string | null | undefined;
  completedDate: Date;
  destinationUuid: string | null | undefined;
  destinationName: string | null | undefined;
  externalReference: string | null | undefined;
  atLocationUuid: string | null | undefined;
  atLocationName: string | null | undefined;
  operationDate: Date;
  submitted: boolean;
  submittedBy: string | null | undefined;
  submittedByGivenName: string | null | undefined;
  submittedByFamilyName: string | null | undefined;
  locked: boolean;
  operationNumber: string | null | undefined;
  operationOrder: number;
  remarks: string | null | undefined;
  sourceUuid: string | null | undefined;
  sourceName: string | null | undefined;
  status: StockOperationStatus;
  returnReason: string | null | undefined;
  rejectionReason: string | null | undefined;
  operationTypeUuid: string | null | undefined;
  operationType: string | null | undefined;
  operationTypeName: string | null | undefined;
  responsiblePerson: number;
  responsiblePersonUuid: string | null | undefined;
  responsiblePersonGivenName: string | null | undefined;
  responsiblePersonFamilyName: string | null | undefined;
  responsiblePersonOther: string | null | undefined;
  creator: number;
  dateCreated: Date;
  creatorGivenName: string | null | undefined;
  creatorFamilyName: string | null | undefined;
  permission: RecordPermission | null | undefined;
  reasonUuid: string | null | undefined;
  reasonName: string | null | undefined;
  approvalRequired?: boolean | null | undefined;
  stockOperationItems: StockOperationItemDTO[];

  submittedDate: Date;
  returnedByGivenName: string | null | undefined;
  returnedByFamilyName: string | null | undefined;
  returnedDate: Date;
  rejectedByGivenName: string | null | undefined;
  rejectedByFamilyName: string | null | undefined;
  rejectedDate: Date;
  dispatchedByGivenName: string | null | undefined;
  dispatchedByFamilyName: string | null | undefined;
  dispatchedDate: Date;
  requisitionStockOperationUuid: string;
}
