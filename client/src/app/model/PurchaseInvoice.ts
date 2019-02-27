export interface PurchaseInvoice {
    id: string;
    supplierId: string;
    date: number | Date;
    total: number;
    profiled: Boolean;
}
