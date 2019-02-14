export interface Item {
    name: string;
    type: string;
    category: string | null;
    tare: string;
    quantity: number;
    unit: string;
    image: string;
    menuItem: boolean;
    averageCost: number;
    sellingPrice: number;
    creatorId: string;
    id: string;
}
