export class ProductCreateDto {
    name: string = '';
    description: string = '';
    price: number = 0;
    stock: number = 0;
    dimension: string = '';
    weight: number = 0;
    weight_unit: number = 0;
    category_id: string = "";
    is_active: boolean = false;
    created_at: Date = new Date();
    updated_at: Date = new Date();
}
