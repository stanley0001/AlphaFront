export interface ModifiedProduct{
    charges: [
      {
        active: true,
        createdAt: string,
        daysAfterCommerce: Number,
        fixedRate: true,
        id: Number,
        interval: Number,
        intervalUnit: string,
        invocationCount: Number,
        name: string,
        productId: string,
        rate: Number,
        updatedAt: string
      }
    ],
    product: {
      active: true,
      code: string,
      dailyInterest: true,
      id: Number,
      interest: Number,
      interestUpfront: true,
      maxLimit: Number,
      minLimit: Number,
      name: string,
      rollOver: true,
      term: Number,
      timeSpan: string,
      topUp: true,
      transactionType: string
    }
  }