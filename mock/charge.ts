const charges = [
  { chargeId: "0", customerName: '祝攀', customerMobile: '18108190650', charge: '100.00',reason:"开户充值",status:"充值" },
  { chargeId: "0", customerName: 'panda', customerMobile: '18280141220', charge: '10.00',reason:"今日消费",status:"消费" },
];

export default {
  'GET /api/v1/charge/queryList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: charges },
      errorCode: 0,
    });
  },
  'PUT /api/v1/detail/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
