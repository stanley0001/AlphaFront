export interface dashData{
    amountCollectedToday: Number,
    amountDisbursedToday: Number,
    collectionToday: string,
    disbursementToday: string,
    expectedToday: string,
    applicationsToday: [
      {
        applicationId: Number,
        applicationStatus: string,
        applicationTime: Date,
        creditLimit: string,
        customerId: string,
        customerIdNumber: string,
        customerMobileNumber: string,
        destinationAccount: string,
        disbursementType: string,
        loanAmount: string,
        loanInterest: string,
        loanNumber: Number,
        loanTerm: string,
        productCode: string
      }
    ],
    totalDefaults: string,
    totalLeads: string
  }