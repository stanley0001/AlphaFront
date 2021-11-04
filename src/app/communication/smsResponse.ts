export interface smsResponse 
    {
      bulkId: string,
      messages: [
        {
          messageId: string,
          status: {
            action: string,
            description: string,
            groupId: 0,
            groupName: string,
            id: 0,
            name: string
          },
          to: string
        }
      ]
    }

