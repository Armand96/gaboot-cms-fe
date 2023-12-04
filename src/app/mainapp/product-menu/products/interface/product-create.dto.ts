export class ProductCreateDto {
    name: string = '';
    description: string = '';
    price: number = 0;
    stock: number = 0;
    dimension: string = '';
    weight: number = 0;
    weightUnit: number = 0;
    categoryId: number = 0;
    isActive: boolean = false;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}
