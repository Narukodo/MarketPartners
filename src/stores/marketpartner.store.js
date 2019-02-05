import { extendObservable, action, computed, configure, observable } from 'mobx'
import { MarketPartnerAPI } from 'api'
import { isNumber } from 'utils'
import { pick, fill, zipObject, omit } from 'lodash'
import { isEmail } from 'validator'
import { consolidateStreamedStyles } from 'styled-components';

configure({ enforceActions: true })

class MarketPartnerStore {
  a = 2;
  // _validator(field, value) {
  //   const properties = this._permittedParams[field]
  //   switch(properties){
  //     case 'number':
  //       const parsedValue = (isNumber(value)) ? parseFloat(value) : value
  //       if(typeof parsedValue === 'number' && parsedValue >= properties.min && parsedValue <= properties.max) {
  //         return parsedValue
  //       }
  //       this._permittedParams[field].erro
  //       break;
  //     case 'string':
  //     case 'email':
  //     case 'url':
  //   }
  // }

  constructor () {

    this._requiredParams = {
      mkt_partner_name: {type: 'string', maxLength: 0, errorMsg: ''},
      redirect_url: {type: 'string', errorMsg: ''},
      credit_amount: {type: 'number', min: 0, max: 250, errorMsg: ''},
      init_message: {type: 'string', errorMsg: ''},
    }

    this._permittedParams = {
      id: {type: 'number', min: 0, max: 123, errorMsg: ''},
      image_url: {type: 'string', errorMsg: ''},
      landing_page_url: {type: 'string', errorMsg: ''},
      app_description: {type: 'string', errorMsg: ''},
      referral_name: {type: 'string', errorMsg: ''},
      phone_number: {type: 'string', errorMsg: ''},
      email: {type: 'email', errorMsg: ''},
      reporting_email: {type: 'email', errorMsg: ''},
      chat_url: {type: 'string', errorMsg: ''},
      internal_note: {type: 'string', errorMsg: ''},
      ...this._requiredParams
    }

    this._init()
  }

  _init() {
    const params = Object.keys(this._permittedParams)
    const undefinedPermittedParams = zipObject(params, fill(Array(params.length), ''))
    extendObservable(this, {...undefinedPermittedParams, tableData: [], isUp: true})
  }

  _pickPermittedParams(object) {
    const params = Object.keys(this._permittedParams)
    return pick(object, params)
  }

  _tableFormatSerializer(
    {id, mkt_partner_name, image_url, redirect_url, landing_page_url,
    internal_note, app_description, referral_name,
    email, phone_number, reporting_email, credit_amount,
    init_message}) {
    return ({ id, columns: [
      mkt_partner_name,
      (!!image_url).toString(),
      redirect_url,
      landing_page_url,
      internal_note,
      app_description,
      [referral_name, email, phone_number].filter(Boolean).join(',\n'),
      reporting_email,
      credit_amount,
      init_message
    ]})
  }

  @computed get canSave() {
    return !!this.mkt_partner_name && !!this.redirect_url && !!this.credit_amount && !!this.init_message
  }

  @computed get getTableData() {
    return [...this.tableData].map(this._tableFormatSerializer)
  }

  @action save = async () => {
    const create = !this.id && this.canSave
    const update = this.canSave

    const body = this._pickPermittedParams(this)

    if(!body.redirect_url.includes('http')) body.redirect_url = `https://setter.com/${body.redirect_url}`
    const bodySerialized = {...body, id: `${this.a}`}
    this.a += 1

    if(create) {
      try {
        this.tableData.push(bodySerialized)
      } catch (e){
        this.tableData.push(bodySerialized)
      }
      this.getAllReferralInfo()
    } else if(update) {
      try {
        const toUpdate = this.tableData.findIndex(item => item.mkt_partner_name === bodySerialized.mkt_partner_name);
        this.tableData[toUpdate] = bodySerialized
      } catch (e) {
        const toUpdate = this.tableData.findIndex(item => item.mkt_partner_name === bodySerialized.mkt_partner_name);
        this.tableData[toUpdate] = bodySerialized
      }
    }
  }

  @action reset = () => {
    Object.keys(this._permittedParams).forEach(key => this.setValue(key, ''))
  }

  @action setValue = ((field, value) => {
    const parsedValue = (isNumber(value)) ? parseFloat(value) : value
    if(field === 'credit_amount' && value > 250) return
    this[field] = parsedValue
  })

  @action clearTable = () => this.tableData.clear()

  @action populateTable = items => items.forEach(item => this.tableData.push(item))

  @action getAllReferralInfo = async () => {
    // this.clearTable()
    try {
      if(!this.tableData || this.tableData.length === 0){
        const referrals = [{
          id: '1',
          mkt_partner_name: 'Test',
          redirect_url: 'http://test.setter.com/test',
          landing_page_url: 'http://hello.setter.com/test',
          internal_note: 'This is for ops team use only',
          app_description: 'description of the referral in the app',
          phone_number: 'under contact',
          reporting_email: 'test@test.com',
          credit_amount: 123,
          init_message: 'The introductory message the partner will use to greet their client'
        }];
        this.populateTable(referrals)
        return referrals
      }
      return this.tableData
      // const referrals = await MarketPartnerAPI.all()
    } catch (e) {
      if(!this.tableData || this.tableData.length === 0){
        const referrals = [{
          id: '1',
          mkt_partner_name: 'Test',
          redirect_url: 'http://test.setter.com/test',
          landing_page_url: 'http://hello.setter.com/test',
          internal_note: 'This is for ops team use only',
          app_description: 'description of the referral in the app',
          phone_number: 'under contact',
          reporting_email: 'test@test.com',
          credit_amount: 123,
          init_message: 'The introductory message the partner will use to greet their client'
        }];
        this.populateTable(referrals)
      }
      return this.tableData
      // this.setValue('isUp', false)
    }
  }

  @action getReferralInfo = async (id) => {
    // const referral = await MarketPartnerAPI.get(id)
    console.log(this.tableData.findIndex(item => {
      console.log(item.id, id)
      return item.id === id
    }));
    const referral = this.tableData[this.tableData.findIndex(item => item.id === id)]
    console.log(referral)
    if (referral)
    {
      Object.keys(referral).forEach(key => this.setValue(key, referral[key]))
      this.setValue('id', referral.id)
      this.setValue('chat_url', `https://welcome.setter.com/${referral.id}`)
      this.setValue('redirect_url', referral.redirect_url)
      this.setValue('landing_page_url', referral.landing_page_url)
      return referral
    }
  }
}

export default new MarketPartnerStore()
