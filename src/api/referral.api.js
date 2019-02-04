import requests from './api'

const ReferralApi = {
  create: async (properties) =>
    requests.post('referral/', properties),
};

export default ReferralApi;
