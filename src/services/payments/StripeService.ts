import {CustomResponse, PoemCheckOutCardsInput, StripeKeys} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
// import Stripe from 'stripe';

import * as Stripe from 'stripe'

// import * as db from '../../sequelize/models/index'
import * as moment from 'moment'
import * as _ from 'lodash'
// import {securityQuestionModel} from '../../mongoose/models'

@Injectable()
export class StripeService {
  private stripe
  constructor(private logger: AbstractLogger) {
    this.stripe = new Stripe('sk_test_YhDlloBiKqj08XVDnr7H0hXK00v37XYsXn')
  }

  public registerCustomer(email: string, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // resolve("abcd")
      this.stripe.customers
        .create({
          name: name,
          // description,
          email: email
          // source // obtained with Stripe.js
        })
        .then((result) => {
          // resolve(JSON.stringify(result))
          resolve(result.id)
          // The balance object for the connected account
        })
        .catch((err) => {
          reject(JSON.stringify(err))
          // Error
        })
    })
  }

  public getCustomerFromStripe(stripeCustomerId): Promise<string> {
    return new Promise((resolve) => {
      this.stripe.customers
        .retrieve(stripeCustomerId)
        .then((result) => {
          this.logger.info(result)
          console.dir(result)
          // resolve(JSON.stringify(result))
          resolve(result.id)
          // The balance object for the connected account
        })
        .catch((err) => {
          resolve(JSON.stringify(err))
          // Error
        })
    })
  }

  public registerCustomerCreditCard(
    number: string,
    expMonth: number,
    expYear: number,
    cvc: string,
    customerId: string
  ): Promise<StripeKeys> {
    return new Promise((resolve, reject) => {
      this._registerCreditCard(number, expMonth, expYear, cvc)
        .then((result) => {
          this._addPaymentMethod(customerId, result, true)
            .then((_result) => {
              this.logger.info(_result)
              // StripeKeys
              resolve({token: result, source: _result})
              // resolve(JSON.stringify(_result))
            })
            .catch((err) => {
              resolve({token: '', source: ''})
              // Error
            })
        })
        .catch((err) => {
          resolve({token: '', source: ''})
          // Error
        })
    })
  }

  public registerCustomerBankAccount(
    country: string,
    currency: string,
    accountHolderName: string,
    accountHolderType: string,
    routingNumber: string,
    accountNumber: string,
    customerId: string
  ): Promise<StripeKeys> {
    return new Promise((resolve) => {
      this._registerBankAcount(country, accountHolderName, accountHolderType, routingNumber, accountNumber)
        .then((result) => {
          this._addPaymentMethod(customerId, result, true)
            .then((_result) => {
              this.logger.info(_result)
              // StripeKeys
              resolve({token: result, source: _result})
              // resolve(JSON.stringify(_result))
            })
            .catch((err) => {
              resolve({token: '', source: ''})
              // Error
            })
        })
        .catch((err) => {
          resolve({token: '', source: ''})
          // Error
        })
    })

    // return new Promise((resolve) => {
    //   this.stripe.tokens.create({
    //     bank_account: {
    //       country: country,
    //       currency: currency,
    //       account_holder_name: accountHolderName,
    //       account_holder_type: accountHolderType,
    //       routing_number: routingNumber,
    //       account_number: accountNumber
    //     },
    //     customer: customerId
    //   })
    //   .then((result) => {
    //     resolve(JSON.stringify(result))
    //     // The balance object for the connected account
    //   })
    //   .catch((err) => {
    //     resolve({token: '', source: ''})
    //     // resolve(JSON.stringify(err))
    //     // Error
    //   });
    // })
  }

  public chargeCustomerOnStripe(amount: string, description: string, customerId: string): Promise<string> {
    return new Promise((resolve) => {
      this.stripe.charges
        .create({
          amount: amount,
          currency: 'usd',
          //source: payload.source,
          description: description,
          customer: customerId
        })
        .then((result) => {
          this.logger.info(result)
          console.dir(result)
          resolve(result.id)
          // resolve(JSON.stringify(result))
          // The balance object for the connected account
        })
        .catch((err) => {
          // resolve({token: '', source: ''})
          resolve(JSON.stringify(err))
          // Error
        })
    })
  }

  public chargeCustomerSourceOnStripe(
    amount: string,
    description: string,
    source: string,
    customerId: string
  ): Promise<string> {
    return new Promise((resolve) => {
      this.stripe.charges
        .create({
          amount: amount,
          currency: 'usd',
          source: source,
          customer: customerId,
          description: description
        })
        .then((result) => {
          this.logger.info(result)
          console.dir(result)
          resolve(JSON.stringify(result))
          // The balance object for the connected account
        })
        .catch((err) => {
          this.logger.error(err)
          console.dir(err)
          // resolve({token: '', source: ''})
          resolve(JSON.stringify(err))
          // Error
        })
    })
  }

  private async _registerCreditCard(number: string, expMonth: number, expYear: number, cvc: string) {
    try {
      let token = await this.stripe.tokens.create({card: {number, expMonth, expYear, cvc}})

      return token.id
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  private async _registerBankAcount(
    country: string,
    accountHolderName: string,
    accountHolderType: string,
    routingNumber: string,
    accountNumber: string
  ) {
    try {
      let bankData = {country, accountHolderName, accountHolderType, routingNumber, accountNumber, currency: 'usd'}
      let token = await this.stripe.tokens.create({bank_account: bankData})

      return token.id
    } catch (err) {
      console.log(err)
    }
  }

  private async _addPaymentMethod(customerID, cardToken, isDefault) {
    try {
      this.logger.info('--> _addPaymentMethod: cardToken: ' + cardToken)
      let source = await this.stripe.customers.createSource(customerID, {source: cardToken})
      this.logger.info('--> _addPaymentMethod: source: ' + source.id)
      if (isDefault) {
        await this.stripe.customers.update(customerID, {default_source: source.id})
      }

      return source.id
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
