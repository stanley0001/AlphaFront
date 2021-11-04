export interface LoanAccount{
    account: {
      accountBalance: Number,
      accountId: Number,
      amount: Number,
      applicationId: Number,
      customerId: string,
      dueDate: Date,
      loanref: string,
      otherRef: string,
      payableAmount: Number,
      startDate: Date,
      status: string
    },
    transactions: [
      {
        accountNumber: string,
        finalBalance: string,
        initialBalance: string,
        loanRef: string,
        otherRef: string,
        otherResponses: string,
        transactionId: Number,
        amount: Number,
        transactionTime: Date,
        transactionType: string
      }
    ]
  }