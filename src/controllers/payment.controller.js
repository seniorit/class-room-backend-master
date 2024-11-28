const httpStatus = require('http-status')
const envVars = require('../config/config')
const stripe = require('stripe')(envVars.stripe.secretKey)
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const {
  createdMessage,
  updatedMessage,
  deletedMessage
} = require('../utils/defaultMessages')
const { classBaseService, userProfileService } = require('../services')

const create = async (req, res) => {
  let status = httpStatus.CREATED
  const result = { success: true, message: createdMessage, data: null }
  try {
    const { classBase, userId } = req.body

    const classBaseParams = await classBaseParamsFn(classBase)
    const userProfileParams = await userProfileParamsFn(userId)

    if (!classBaseParams) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Class Base not found')
    }

    if (!userProfileParams) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User Profile not found')
    }

    const { postalCode, firstname ,address: userAddres } = userProfileParams

    const { name, description, price, id: idProduct } = classBaseParams

    const lineItem = {
      price_data: {
        product_data: {
          name: name,
          description: description
        },
        currency: 'usd',
        unit_amount: price * 100
      },
      quantity: 1
    }

    // Crear la sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: [lineItem],
      mode: 'payment',
      customer_email:'sagevzla@gmail.com',
      payment_method_types: ['card'],
      client_reference_id: `660f238cf0e07e4b88736241`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US']
      },
      metadata: {
        userId: `${userId}`,
        orderId: '6735',
      },
      success_url: `http://localhost:3200`,
      cancel_url: `http://localhost:3200/cancel.html`
    })

    result.data = {
      client_reference_id: session.client_reference_id,
      customer_email:session.customer_email,
      amount_total: session.amount_total,
      customer_update:session.customer_update,
      object: session.object,
      metadata: session.metadata,
      id: session.id,
      url: session.url,
    }
  } catch (error) {
    status = error.statusCode
    result.message = error.message
    result.success = false
  }
  res.status(status).json(result)
}

const classBaseParamsFn = async classBaseId => {
  const classBase = await classBaseService.getClassBaseById(classBaseId)
  return classBase
}

const userProfileParamsFn = async userId => {
  const userProfile = await userProfileService.getUserProfileByUserId(userId)
  return userProfile
}

module.exports = {
  create
}

function stage () {
  result.data = {
    id: session.id,
    object: session.object,
    amount_subtotal: session.amount_subtotal,
    amount_total: session.amount_total,
    cancel_url: 'http://localhost:3200/cancel.html',
    client_reference_id:
      session.client_reference_id ?? '660f238cf0e07e4b8873624',
    created: session.created,
    expires_at: session.expires_at,
    currency: session.currency,
    custom_fields: [{ user: session.user ?? '660f238cf0e07e4b8873624' }],
    mode: session.mode,
    type: session.type ?? 'account_onboarding',
    payment_method_types: [
      {
        card: session.card,
        cashapp: session.cashapp
      }
    ],
    url: session.url
  }
}
