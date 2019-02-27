export interface SaleInvoice {
    id: string;
    visitorId: string;
    openedAt: Date;
    closedAt: Date;
    state: string;
    total: number;
}
