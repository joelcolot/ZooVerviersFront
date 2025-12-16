export interface ToysListing {
    id :number,
    speciesName :string,
    name :string,
    description :string,
    imagePath :string |null,
    minimumAmountperDonation : number,
    wishedTotalAmount :number,
    startDate :string,
    enddate :string | null,
    status :number,
    totalAmountSoFar :number,
}