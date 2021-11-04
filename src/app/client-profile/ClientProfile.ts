export interface ClientProfile{
    client: {
      accountBalance: Number,
      address: string,
      altPhoneNumber: string,
      createdAt: string,
      createdBy: string,
      dob: string,
      documentNumber: string,
      email: string,
      externalId: string,
      externalStartDate: string,
      firstName: string,
      id: Number,
      lastName: string,
      occupation: string,
      phoneNumber: string,
      status: true,
      updatedAt: string
    },
    communications: [
      {
        date: string,
        id: Number,
        message: string,
        messageType: string,
        recipient: string,
        status: string
      }
    ],
    subscriptions: [
      {
        createdAt: string,
        creditLimit: Number,
        creditStatusDate: string,
        customerDocumentNumber: string,
        customerId: string,
        customerPhoneNumber: string,
        id: Number,
        interestRate: Number,
        productCode: string,
        status: true,
        term: Number,
        timeSpan: string,
        updatedAt: string
      }
    ],
    user: {
      active: true,
      createdAt: string,
      documentNumber: string,
      email: string,
      firstName: string,
      id: Number,
      lastName: string,
      otherName: string,
      phone: string,
      roleId: string,
      updatedAt: string,
      userName: string
    }
  }