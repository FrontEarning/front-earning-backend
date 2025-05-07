export type FrontEarningProgram = {
  version: "0.1.0";
  name: "front_earning_program";
  instructions: [
    {
      name: "initConfig";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "config";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "discountBps";
          type: "u16";
        },
        {
          name: "settleWaitSecs";
          type: "i64";
        }
      ];
    },
    {
      name: "depositLiquidity";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "token";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "executePayment";
      accounts: [
        {
          name: "buyer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "payment";
          isMut: true;
          isSigner: false;
        },
        {
          name: "token";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "settle";
      accounts: [
        {
          name: "seller";
          isMut: true;
          isSigner: true;
        },
        {
          name: "payment";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "Payment";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seller";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "status";
            type: {
              defined: "PaymentStatus";
            };
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "settledAt";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "Config";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "discountBps";
            type: "u16";
          },
          {
            name: "settleWaitSecs";
            type: "i64";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "PaymentStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Initialized";
          },
          {
            name: "Funded";
          },
          {
            name: "Settled";
          }
        ];
      };
    }
  ];
};

export const IDL: FrontEarningProgram = {
  version: "0.1.0",
  name: "front_earning_program",
  instructions: [
    {
      name: "initConfig",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "config",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "discountBps",
          type: "u16",
        },
        {
          name: "settleWaitSecs",
          type: "i64",
        },
      ],
    },
    {
      name: "depositLiquidity",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "token",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "executePayment",
      accounts: [
        {
          name: "buyer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "payment",
          isMut: true,
          isSigner: false,
        },
        {
          name: "token",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "settle",
      accounts: [
        {
          name: "seller",
          isMut: true,
          isSigner: true,
        },
        {
          name: "payment",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Payment",
      type: {
        kind: "struct",
        fields: [
          {
            name: "seller",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "status",
            type: {
              defined: "PaymentStatus",
            },
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "settledAt",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "Config",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "discountBps",
            type: "u16",
          },
          {
            name: "settleWaitSecs",
            type: "i64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "PaymentStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Initialized",
          },
          {
            name: "Funded",
          },
          {
            name: "Settled",
          },
        ],
      },
    },
  ],
};
