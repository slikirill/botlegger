export interface SaleInvoice {
    id: string;
    visitorId: string;
    openedAt: number;
    closedAt: number;
    state: string;
    total: number;
}
