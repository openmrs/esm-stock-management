import { StockOperationDTO } from "../StockOperationDTO";
import { RecordPermission } from "../../RecordPermission";
export const mockStockOperationDTO: StockOperationDTO = {
  receivedItems: [],
  uuid: "123e4567-e89b-12d3-a456-426614174000",
  cancelReason: null,
  cancelledBy: 101,
  cancelledByGivenName: null,
  cancelledByFamilyName: null,
  cancelledDate: new Date("2024-08-14T00:00:00Z"),
  completedBy: 102,
  completedByGivenName: "John",
  completedByFamilyName: "Doe",
  completedDate: new Date("2024-08-14T01:00:00Z"),
  destinationUuid: "456e7890-a12b-34c5-d678-901234567890",
  destinationName: "Main Warehouse",
  externalReference: "EXT-REF-001",
  atLocationUuid: "789e0123-b45c-67d8-e901-234567890123",
  atLocationName: "Secondary Warehouse",
  operationDate: new Date("2024-08-14T02:00:00Z"),
  submitted: true,
  submittedBy: "102",
  submittedByGivenName: "John",
  submittedByFamilyName: "Doe",
  locked: false,
  operationNumber: "OP-00199",
  operationOrder: 1,
  remarks: "No remarks",
  sourceUuid: "123e4567-e89b-12d3-a456-426614174001",
  sourceName: "Source Warehouse",
  status: "COMPLETED",
  returnReason: null,
  rejectionReason: null,
  operationTypeUuid: "op-type-uuid-123",
  operationType: "TRANSFER",
  operationTypeName: "Stock Transfer",
  responsiblePerson: 103,
  responsiblePersonUuid: "resp-uuid-123",
  responsiblePersonGivenName: "Jane",
  responsiblePersonFamilyName: "Smith",
  responsiblePersonOther: "Middle Name",
  creator: 104,
  dateCreated: new Date("2024-08-14T03:00:00Z"),
  creatorGivenName: "Alice",
  creatorFamilyName: "Johnson",
  permission: {
    canView: true,
    canEdit: true,
    canApprove: true,
    canReceiveItems: true,
    canDisplayReceivedItems: true,
    isRequisitionAndCanIssueStock: false,
    canUpdateBatchInformation: false,
  },
  reasonUuid: "reason-uuid-123",
  reasonName: "Stock Adjustment",
  approvalRequired: true,
  stockOperationItems: [
    {
      itemIndex: 1,
      id: "item-id-123",
      uuid: "item-uuid-123",
      stockItemUuid: "stock-item-uuid-123",
      stockItemName: "Item 1",
      stockItemPackagingUOMUuid: "packaging-uom-uuid-123",
      stockItemPackagingUOMName: "Box",
      stockBatchUuid: "batch-uuid-123",
      batchNo: "BATCH-001",
      expiration: new Date("2025-12-31"),
      quantity: 100,
      purchasePrice: 50.0,
      edit: true,
      hasExpiration: true,
      packagingUnits: [
        {
          uuid: "packaging-uom-uuid-001",
          id: "123",
          factor: 10,
          packagingUomName: "Box",
        },
      ],
      quantityReceived: 95,
      quantityReceivedPackagingUOMName: "Box",
      quantityReceivedPackagingUOMUuid: "packaging-uom-uuid-001",
      quantityRequested: 100,
      quantityRequestedPackagingUOMUuid: "packaging-uom-uuid-001",
      quantityRequestedPackagingUOMName: "Box",
      commonName: "Item Common Name",
      acronym: "ICN",
    },
  ],

  submittedDate: new Date("2024-08-14T04:00:00Z"),
  returnedByGivenName: null,
  returnedByFamilyName: null,
  returnedDate: new Date("2024-08-14T05:00:00Z"),
  rejectedByGivenName: null,
  rejectedByFamilyName: null,
  rejectedDate: new Date("2024-08-14T06:00:00Z"),
  dispatchedByGivenName: null,
  dispatchedByFamilyName: null,
  dispatchedDate: new Date("2024-08-14T07:00:00Z"),
  requisitionStockOperationUuid: "requisition-uuid-123",
};
