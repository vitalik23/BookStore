import { StatusTypeEnum } from "src/app/enums/status.enum";
import { CurrencyTypeEnum } from "../../../enums/currency-type";
import { PrintingTypeEnum } from "../../../enums/printing-type";
import { PrintingEdition } from "../../printing-edition/models/printing-edition.model";
import { UserProfile } from "../../user/models/user-profile.model";

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
    printingEdition: PrintingEdition;
    user?: UserProfile;
    orderItems?: OrderItemModel;
    currency: CurrencyTypeEnum;

}