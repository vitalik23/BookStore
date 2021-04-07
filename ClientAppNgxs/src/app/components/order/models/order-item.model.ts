import { CurrencyTypeEnum } from "src/app/enums/currency-type.enum";
import { PrintingTypeEnum } from "src/app/enums/printing-type.enum";
import { StatusTypeEnum } from "src/app/enums/status-type.enum";
import { PrintingEditionModel } from "../../printing-edition/models/printing-edition.model";
import { UserModel } from "../../user/models/user.model";

export class OrderItemModel{
    id: number;
    amount: number;
    totalAmount?: number;
    count: number;
    createDate?: Date;
    description?: string;
    type?: PrintingTypeEnum;
    printingEditionId: number;
    userId?: number;
    orderId?: number;
    status?: StatusTypeEnum;
    printingEdition: PrintingEditionModel;
    user?: UserModel;
    orderItems?: OrderItemModel;
    currency: CurrencyTypeEnum;
}