import { ToyStatus } from "@core/enums/toys-status";

export interface ToysListing {
    id :number,
    speciesName :string,
    name :string,
    description :string,
    imagePath :string |null,
    minimumAmountperDonation : number,
    wishedTotalAmount :number,
    startDate :string,
    endDate :string | null,
    status :ToyStatus,
    totalAmountSoFar :number,
}