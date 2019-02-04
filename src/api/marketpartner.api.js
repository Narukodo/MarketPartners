import requests from './api'

const MarketPartnerAPI = {
  create: async (properties) =>
    requests.post('market_partners/', properties),
  update: async (mktPartnerId, properties) =>
    requests.put(`market_partners/${mktPartnerId}`, properties),
  get: async mktPartnerId =>
    requests.get(`market_partners/${mktPartnerId}`),
  all: async () =>
    requests.get(`market_partners/`),
};

export default MarketPartnerAPI;
