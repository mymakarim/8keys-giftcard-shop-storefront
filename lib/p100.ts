// P100 Cryptocurrency Payment Integration
// Documentation: https://p-100.github.io/partner-api-docs/general
// Only deposit functionality needed for gift card purchases

export interface P100Config {
  apiKey: string;
  merchantId: string;
  webhookSecret: string;
  apiUrl: string;
  environment: 'sandbox' | 'production';
}

export interface P100PaymentRequest {
  amount: number;
  currency: string; // USD, EUR, etc.
  orderId: string;
  description: string;
  customerEmail?: string;
  redirectUrl?: string;
  webhookUrl?: string;
  metadata?: Record<string, any>;
}

export interface P100PaymentResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed' | 'expired';
  amount: number;
  currency: string;
  cryptoAmount: number;
  cryptoCurrency: string;
  paymentUrl: string;
  qrCode: string;
  address: string;
  expiresAt: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface P100WebhookPayload {
  event_type: 'payment.completed' | 'payment.failed' | 'payment.expired' | 'sepa_transfer.completed' | 'sepa_transfer.failed' | 'sepa_transfer.processing' | 'card.3ds' | 'card.activation';
  payment_id: string;
  order_id?: string;
  status: string;
  amount: number;
  currency: string;
  customer_email?: string;
  customer_id?: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
  // SEPA transfer specific fields
  transfer_id?: string;
  source_external_user_id?: string;
  destination_external_user_id?: string;
  destination_iban?: string;
  receiver_first_name?: string;
  receiver_last_name?: string;
  receiver_type?: 'NATURAL' | 'LEGAL';
  transfer_title?: string;
  error?: {
    description: string;
    status: string;
  };
  // Virtual card specific fields
  card_id?: string;
  external_user_id?: string;
  code?: string;
}

// SEPA Transfer interfaces
export interface P100SepaTransferRequest {
  sourceExternalUserId: string;
  currency: string;
  amount: string;
  receiverFirstName?: string;
  receiverLastName?: string;
  companyName?: string;
  receiverType: 'NATURAL' | 'LEGAL';
  destinationIban: string;
  transferTitle: string;
}

export interface P100SepaTransferResponse {
  transferId: string;
}

export interface P100SepaTransferDetails {
  id: string;
  type: string;
  amount: number;
  transferTitle: string;
  destinationIban: string;
  receiverFirstName?: string;
  receiverLastName?: string;
  status: string;
  currency: string;
  fee: number;
  createdAt: string;
  user: {
    externalUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    documentType: string;
    documentNumber: string;
    pesel?: string;
    birthCountry?: string;
    birthDate?: string;
  };
}

// Virtual Card interfaces
export interface P100VirtualCardRequest {
  externalUserId: string;
  label: string;
  pin: string;
}

export interface P100VirtualCardResponse {
  cardId: string;
  cardNumber: string;
  cvv: string;
  exp: string;
}

export interface P100VirtualCard {
  cardId: string;
  status: 'ACTIVE' | 'LOCKED_BY_USER' | 'BLOCKED' | 'SUSPENDED' | 'DELETED';
  label: string;
  cardLastDigits: string;
}

export interface P100VirtualCardDetails {
  status: 'ACTIVE' | 'LOCKED_BY_USER' | 'BLOCKED' | 'SUSPENDED' | 'DELETED';
  cardNumber: string;
  cvv: string;
  exp: string;
}

export interface P100VirtualCardLimits {
  monthlyTrxAll: number;
  dailyTrxAll: number;
  monthlyTrxAtm: number;
  dailyTrxAtm: number;
  monthlyTrxEcom: number;
  dailyTrxEcom: number;
}

export interface P100UpdateCardPinRequest {
  externalUserId: string;
  cardId: string;
  pin: string;
}

export interface P100BlockCardRequest {
  externalUserId: string;
  cardId: string;
}

export interface P100UpdateCardLimitsRequest {
  externalUserId: string;
  cardId: string;
  monthlyTrxAll: number;
  dailyTrxAll: number;
  monthlyTrxAtm: number;
  dailyTrxAtm: number;
  monthlyTrxEcom: number;
  dailyTrxEcom: number;
}

export interface P100DeleteCardRequest {
  externalUserId: string;
  cardId: string;
}

export interface P100UserBalanceResponse {
  userId: string;
  poaRequired: string;
  fiatBalances: Array<{
    id: string;
    amount: string;
    name: string;
    rate: number;
    iban: string;
    status: 'ACTIVE' | 'WAITING_TO_BE_ACTIVATED';
  }>;
  cryptoBalances: Array<{
    id: string;
    amount: string;
    name: string;
    wallet: string;
    rate: number;
    networkConfig: Record<string, any>;
  }>;
}

export interface P100UserExistsError {
  errorCode: 'P411';
  errorName: 'user-exists';
}

export interface P100UserNotFoundError {
  errorCode: 'P412';
  errorName: 'invalid-user';
}

export interface P100ForbiddenCountryCardError {
  errorCode: 'P451';
  errorName: 'forbidden-country-card';
}

export interface P100UserSuspendedError {
  errorCode: 'P455';
  errorName: 'user-suspended';
}

export interface P100InvalidCardError {
  errorCode: 'P434';
  errorName: 'invalid-card';
}

class P100Service {
  private config: P100Config;

  constructor(config: P100Config) {
    this.config = config;
  }

  // Add public getters for apiKey and apiUrl
  get apiKey() {
    return this.config.apiKey;
  }
  get apiUrl() {
    return this.config.apiUrl;
  }

  /**
   * Helper method to construct API URLs without double slashes
   */
  private getApiUrl(endpoint: string): string {
    const baseUrl = this.config.apiUrl.endsWith('/') 
      ? this.config.apiUrl.slice(0, -1) 
      : this.config.apiUrl;
    return `${baseUrl}${endpoint}`;
  }

  /**
   * Create a new payment request using real P100 API
   * This is the main API you need for gift card purchases
   */
  async createPayment(request: P100PaymentRequest): Promise<P100PaymentResponse> {
    try {
      console.log('Creating P100 payment:', {
        amount: request.amount,
        currency: request.currency,
        orderId: request.orderId,
        description: request.description
      });

      // Use the deployed webhook URL
      const webhookUrl = request.webhookUrl || 'https://webhook.88808880.xyz/p100';
      const redirectUrl = request.redirectUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`;

      const response = await fetch(`${this.config.apiUrl}/payments`, {
        method: 'POST',
        headers: {
          'x-api-key': this.config.apiKey, // P100 uses x-api-key header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: request.amount,
          currency: request.currency,
          order_id: request.orderId,
          description: request.description,
          customer_email: request.customerEmail,
          redirect_url: redirectUrl,
          webhook_url: webhookUrl,
          metadata: {
            ...request.metadata,
            merchant_id: this.config.merchantId,
            environment: this.config.environment,
            orderId: request.orderId, // Ensure orderId is in metadata for webhook processing
            customerEmail: request.customerEmail
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('P100 API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`P100 API Error: ${errorData.message || response.statusText}`);
      }

      const paymentData = await response.json();
      console.log('P100 payment created successfully:', {
        id: paymentData.id,
        status: paymentData.status,
        amount: paymentData.amount,
        currency: paymentData.currency,
        webhookUrl: webhookUrl
      });

      return {
        id: paymentData.id,
        status: paymentData.status,
        amount: paymentData.amount,
        currency: paymentData.currency,
        cryptoAmount: paymentData.crypto_amount || 0,
        cryptoCurrency: paymentData.crypto_currency || 'USDC',
        paymentUrl: paymentData.payment_url,
        qrCode: paymentData.qr_code,
        address: paymentData.address,
        expiresAt: paymentData.expires_at,
        createdAt: paymentData.created_at,
        metadata: paymentData.metadata
      };
    } catch (error) {
      console.error('Error creating P100 payment:', error);
      throw error;
    }
  }

  /**
   * Get payment status using real P100 API
   * Use this to check if customer has completed payment
   */
  async getPayment(paymentId: string): Promise<P100PaymentResponse> {
    try {
      console.log('Fetching P100 payment status:', paymentId);

      const response = await fetch(`${this.config.apiUrl}/payments/${paymentId}`, {
        headers: {
          'x-api-key': this.config.apiKey,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 API Error: ${errorData.message || response.statusText}`);
      }

      const paymentData = await response.json();
      console.log('P100 payment status:', {
        id: paymentData.id,
        status: paymentData.status,
        amount: paymentData.amount
      });

      return {
        id: paymentData.id,
        status: paymentData.status,
        amount: paymentData.amount,
        currency: paymentData.currency,
        cryptoAmount: paymentData.crypto_amount || 0,
        cryptoCurrency: paymentData.crypto_currency || 'USDC',
        paymentUrl: paymentData.payment_url,
        qrCode: paymentData.qr_code,
        address: paymentData.address,
        expiresAt: paymentData.expires_at,
        createdAt: paymentData.created_at,
        metadata: paymentData.metadata
      };
    } catch (error) {
      console.error('Error fetching P100 payment:', error);
      throw error;
    }
  }

  /**
   * Verify webhook signature for security
   */
  verifyWebhook(payload: string, signature: string): boolean {
    try {
      // P100 webhook signature verification
      // This ensures webhooks are actually from P100
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', this.config.webhookSecret)
        .update(payload)
        .digest('hex');
      
      return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      );
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  }

  /**
   * Process webhook payload from P100
   * This handles payment confirmations automatically
   * Updated to match the webhook server format
   */
  async processWebhook(payload: P100WebhookPayload): Promise<void> {
    try {
      console.log('Processing P100 webhook:', {
        event_type: payload.event_type,
        payment_id: payload.payment_id,
        transfer_id: payload.transfer_id,
        card_id: payload.card_id,
        order_id: payload.order_id,
        status: payload.status
      });

      switch (payload.event_type) {
        case 'payment.completed':
          await this.handlePaymentCompleted(payload);
          break;
        case 'payment.failed':
          await this.handlePaymentFailed(payload);
          break;
        case 'payment.expired':
          await this.handlePaymentExpired(payload);
          break;
        case 'sepa_transfer.completed':
          await this.handleSepaTransferCompleted(payload);
          break;
        case 'sepa_transfer.failed':
          await this.handleSepaTransferFailed(payload);
          break;
        case 'sepa_transfer.processing':
          await this.handleSepaTransferProcessing(payload);
          break;
        case 'card.3ds':
          await this.handleCard3DS(payload);
          break;
        case 'card.activation':
          await this.handleCardActivation(payload);
          break;
        default:
          console.log(`Unhandled webhook event: ${payload.event_type}`);
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  }

  /**
   * Handle successful payment - deliver gift cards
   * Updated to work with webhook server
   */
  private async handlePaymentCompleted(payment: P100WebhookPayload): Promise<void> {
    try {
      const orderId = payment.order_id || payment.metadata?.orderId;
      if (!orderId) {
        throw new Error('Order ID not found in payment data');
      }

      console.log(`Payment completed for order: ${orderId}, delivering gift cards...`);

      // Call the webhook server to process the payment
      const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz';
      
      const response = await fetch(`${webhookServerUrl}/purchase-gift-card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          customer: {
            email: payment.customer_email,
            id: payment.customer_id || `p100-${payment.payment_id}`
          },
          products: payment.metadata?.products || [],
          totalAmount: payment.amount,
          cryptoAmount: payment.amount,
          cryptoCurrency: payment.currency,
          paymentIntentId: payment.payment_id,
          paymentMethod: 'crypto',
          paymentData: {
            p100_payment_id: payment.payment_id,
            payment_method: payment.payment_method,
            created_at: payment.created_at,
            updated_at: payment.updated_at
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Webhook server error:', errorData);
        throw new Error('Failed to deliver gift cards via webhook server');
      }

      const result = await response.json();
      console.log(`Gift cards delivered successfully for order: ${orderId}`, result);
    } catch (error) {
      console.error('Error handling payment completion:', error);
      throw error;
    }
  }

  /**
   * Handle failed payment
   */
  private async handlePaymentFailed(payment: P100WebhookPayload): Promise<void> {
    try {
      const orderId = payment.order_id || payment.metadata?.orderId;
      if (orderId) {
        console.log(`Payment failed for order: ${orderId}`);
        
        // Update order status via webhook server
        const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz';
        
        try {
          await fetch(`${webhookServerUrl}/update-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId,
              status: 'failed'
            }),
          });
        } catch (error) {
          console.error('Failed to update order status:', error);
        }
      }
    } catch (error) {
      console.error('Error handling payment failure:', error);
    }
  }

  /**
   * Handle expired payment
   */
  private async handlePaymentExpired(payment: P100WebhookPayload): Promise<void> {
    try {
      const orderId = payment.order_id || payment.metadata?.orderId;
      if (orderId) {
        console.log(`Payment expired for order: ${orderId}`);
        
        // Update order status via webhook server
        const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz';
        
        try {
          await fetch(`${webhookServerUrl}/update-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId,
              status: 'failed'
            }),
          });
        } catch (error) {
          console.error('Failed to update order status:', error);
        }
      }
    } catch (error) {
      console.error('Error handling payment expiration:', error);
    }
  }

  /**
   * Handle SEPA transfer completed
   */
  private async handleSepaTransferCompleted(payload: P100WebhookPayload): Promise<void> {
    try {
      const transferId = payload.transfer_id;
      if (!transferId) {
        console.warn('SEPA transfer completed webhook received without transfer_id');
        return;
      }

      console.log(`SEPA transfer completed for transfer: ${transferId}`);

      // Update transfer status via webhook server
      const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz';
      
      try {
        await fetch(`${webhookServerUrl}/update-sepa-transfer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transferId,
            status: 'completed'
          }),
        });
      } catch (error) {
        console.error('Failed to update SEPA transfer status:', error);
      }
    } catch (error) {
      console.error('Error handling SEPA transfer completion:', error);
    }
  }

  /**
   * Handle SEPA transfer failed
   */
  private async handleSepaTransferFailed(payload: P100WebhookPayload): Promise<void> {
    try {
      const transferId = payload.transfer_id;
      if (!transferId) {
        console.warn('SEPA transfer failed webhook received without transfer_id');
        return;
      }

      console.log(`SEPA transfer failed for transfer: ${transferId}`);

      // Update transfer status via webhook server
      const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz';
      
      try {
        await fetch(`${webhookServerUrl}/update-sepa-transfer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transferId,
            status: 'failed'
          }),
        });
      } catch (error) {
        console.error('Failed to update SEPA transfer status:', error);
      }
    } catch (error) {
      console.error('Error handling SEPA transfer failure:', error);
    }
  }

  /**
   * Handle SEPA transfer processing
   */
  private async handleSepaTransferProcessing(payload: P100WebhookPayload): Promise<void> {
    try {
      const transferId = payload.transfer_id;
      if (!transferId) {
        console.warn('SEPA transfer processing webhook received without transfer_id');
        return;
      }

      console.log(`SEPA transfer processing for transfer: ${transferId}`);

      // Update transfer status via webhook server
      const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz';
      
      try {
        await fetch(`${webhookServerUrl}/update-sepa-transfer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transferId,
            status: 'processing'
          }),
        });
      } catch (error) {
        console.error('Failed to update SEPA transfer status:', error);
      }
    } catch (error) {
      console.error('Error handling SEPA transfer processing:', error);
    }
  }

  /**
   * Handle card 3DS code webhook
   */
  private async handleCard3DS(payload: P100WebhookPayload): Promise<void> {
    try {
      const { external_user_id, code } = payload;
      if (!external_user_id || !code) {
        console.warn('Card 3DS webhook received without required fields');
        return;
      }

      console.log(`Card 3DS code received for user: ${external_user_id}`);

      // Update card status via webhook server
      const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz';
      
      try {
        await fetch(`${webhookServerUrl}/update-card-3ds`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            externalUserId: external_user_id,
            code: code
          }),
        });
      } catch (error) {
        console.error('Failed to update card 3DS status:', error);
      }
    } catch (error) {
      console.error('Error handling card 3DS:', error);
    }
  }

  /**
   * Handle card activation code webhook
   */
  private async handleCardActivation(payload: P100WebhookPayload): Promise<void> {
    try {
      const { external_user_id, card_id, code } = payload;
      if (!external_user_id || !card_id || !code) {
        console.warn('Card activation webhook received without required fields');
        return;
      }

      console.log(`Card activation code received for user: ${external_user_id}, card: ${card_id}`);

      // Update card status via webhook server
      const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz';
      
      try {
        await fetch(`${webhookServerUrl}/update-card-activation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            externalUserId: external_user_id,
            cardId: card_id,
            code: code
          }),
        });
      } catch (error) {
        console.error('Failed to update card activation status:', error);
      }
    } catch (error) {
      console.error('Error handling card activation:', error);
    }
  }

  /**
   * Create a crypto withdrawal (send funds to external wallet)
   */
  async createCryptoWithdrawal(params: {
    sourceExternalUserId: string;
    currency: string;
    amount: number;
    walletAddress: string;
    memo?: string;
    network?: string;
    name: string;
    walletType: 'CUSTODIAL' | 'NON_CUSTODIAL' | 'OTHER';
    receiverType: 'NATURAL' | 'LEGAL';
  }): Promise<{ withdrawalId: string }> {
    const response = await fetch(`${this.config.apiUrl}/crypto-withdrawal`, {
      method: 'POST',
      headers: {
        'x-api-key': this.config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`P100 Withdrawal Error: ${errorData.errorName || response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Create a SEPA transfer using P100 API
   */
  async createSepaTransfer(request: P100SepaTransferRequest): Promise<P100SepaTransferResponse> {
    try {
      console.log('Creating P100 SEPA transfer:', {
        sourceExternalUserId: request.sourceExternalUserId,
        amount: request.amount,
        currency: request.currency,
        destinationIban: request.destinationIban,
        receiverType: request.receiverType
      });

      const response = await fetch(`${this.config.apiUrl}/sepa-transfer`, {
        method: 'POST',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceExternalUserId: request.sourceExternalUserId,
          currency: request.currency,
          amount: request.amount,
          receiverFirstName: request.receiverFirstName,
          receiverLastName: request.receiverLastName,
          companyName: request.companyName,
          receiverType: request.receiverType,
          destinationIban: request.destinationIban,
          transferTitle: request.transferTitle
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('P100 SEPA Transfer Error Response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`P100 SEPA Transfer Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const transferData = await response.json();
      console.log('P100 SEPA transfer created successfully:', {
        transferId: transferData.transferId
      });

      return {
        transferId: transferData.transferId
      };
    } catch (error) {
      console.error('Error creating P100 SEPA transfer:', error);
      throw error;
    }
  }

  /**
   * Get SEPA transfer details using P100 API
   */
  async getSepaTransferDetails(transferId: string): Promise<P100SepaTransferDetails> {
    try {
      console.log('Fetching P100 SEPA transfer details:', transferId);

      const response = await fetch(`${this.config.apiUrl}/sepa-transfer/details/${transferId}`, {
        headers: {
          'x-api-key': this.config.apiKey,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 SEPA Transfer Details Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const transferData = await response.json();
      console.log('P100 SEPA transfer details:', {
        id: transferData.id,
        status: transferData.status,
        amount: transferData.amount
      });

      return transferData;
    } catch (error) {
      console.error('Error fetching P100 SEPA transfer details:', error);
      throw error;
    }
  }

  /**
   * Create a virtual card using P100 API
   */
  async createVirtualCard(request: P100VirtualCardRequest): Promise<P100VirtualCardResponse> {
    try {
      console.log('Creating P100 virtual card:', {
        externalUserId: request.externalUserId,
        label: request.label
      });

      const baseUrl = this.getApiUrl('/card/virtual');

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalUserId: request.externalUserId,
          label: request.label,
          pin: request.pin
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('P100 Virtual Card Error Response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`P100 Virtual Card Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const cardData = await response.json();
      console.log('P100 virtual card created successfully:', {
        cardId: cardData.cardId,
        cardLastDigits: cardData.cardNumber.slice(-4)
      });

      return {
        cardId: cardData.cardId,
        cardNumber: cardData.cardNumber,
        cvv: cardData.cvv,
        exp: cardData.exp
      };
    } catch (error) {
      console.error('Error creating P100 virtual card:', error);
      throw error;
    }
  }

  /**
   * Get all user cards using P100 API
   */
  async getUserCards(externalUserId: string): Promise<P100VirtualCard[]> {
    try {
      console.log('Fetching P100 user cards:', externalUserId);

      const response = await fetch(this.getApiUrl(`/card/all/${externalUserId}`), {
        headers: {
          'x-api-key': this.config.apiKey,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 Get User Cards Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('P100 user cards fetched:', data.cards?.length || 0);

      return data.cards || [];
    } catch (error) {
      console.error('Error fetching P100 user cards:', error);
      throw error;
    }
  }

  /**
   * Get card details using P100 API
   */
  async getCardDetails(externalUserId: string, cardId: string): Promise<P100VirtualCardDetails> {
    try {
      console.log('Fetching P100 card details:', { externalUserId, cardId });

      const response = await fetch(this.getApiUrl(`/card/details/${externalUserId}/${cardId}`), {
        headers: {
          'x-api-key': this.config.apiKey,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 Get Card Details Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const cardData = await response.json();
      console.log('P100 card details fetched for card:', cardId);

      return cardData;
    } catch (error) {
      console.error('Error fetching P100 card details:', error);
      throw error;
    }
  }

  /**
   * Update card PIN using P100 API
   */
  async updateCardPin(request: P100UpdateCardPinRequest): Promise<{ message: string }> {
    try {
      console.log('Updating P100 card PIN:', {
        externalUserId: request.externalUserId,
        cardId: request.cardId
      });

      const response = await fetch(this.getApiUrl('/card/pin'), {
        method: 'PATCH',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalUserId: request.externalUserId,
          cardId: request.cardId,
          pin: request.pin
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 Update Card PIN Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('P100 card PIN updated successfully for card:', request.cardId);

      return result;
    } catch (error) {
      console.error('Error updating P100 card PIN:', error);
      throw error;
    }
  }

  /**
   * Block card using P100 API
   */
  async blockCard(request: P100BlockCardRequest): Promise<{ message: string }> {
    try {
      console.log('Blocking P100 card:', {
        externalUserId: request.externalUserId,
        cardId: request.cardId
      });

      const response = await fetch(this.getApiUrl('/card/block'), {
        method: 'PATCH',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalUserId: request.externalUserId,
          cardId: request.cardId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 Block Card Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('P100 card blocked successfully:', request.cardId);

      return result;
    } catch (error) {
      console.error('Error blocking P100 card:', error);
      throw error;
    }
  }

  /**
   * Unblock card using P100 API
   */
  async unblockCard(request: P100BlockCardRequest): Promise<{ message: string }> {
    try {
      console.log('Unblocking P100 card:', {
        externalUserId: request.externalUserId,
        cardId: request.cardId
      });

      const response = await fetch(this.getApiUrl('/card/unblock'), {
        method: 'PATCH',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalUserId: request.externalUserId,
          cardId: request.cardId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 Unblock Card Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('P100 card unblocked successfully:', request.cardId);

      return result;
    } catch (error) {
      console.error('Error unblocking P100 card:', error);
      throw error;
    }
  }

  /**
   * Get card limits using P100 API
   */
  async getCardLimits(externalUserId: string, cardId: string): Promise<P100VirtualCardLimits> {
    try {
      console.log('Fetching P100 card limits:', { externalUserId, cardId });

      const response = await fetch(this.getApiUrl(`/card/limits/${externalUserId}/${cardId}`), {
        headers: {
          'x-api-key': this.config.apiKey,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 Get Card Limits Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const limitsData = await response.json();
      console.log('P100 card limits fetched for card:', cardId);

      return limitsData;
    } catch (error) {
      console.error('Error fetching P100 card limits:', error);
      throw error;
    }
  }

  /**
   * Update card limits using P100 API
   */
  async updateCardLimits(request: P100UpdateCardLimitsRequest): Promise<{ message: string }> {
    try {
      console.log('Updating P100 card limits:', {
        externalUserId: request.externalUserId,
        cardId: request.cardId
      });

      const response = await fetch(this.getApiUrl('/card/limits'), {
        method: 'PATCH',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalUserId: request.externalUserId,
          cardId: request.cardId,
          monthlyTrxAll: request.monthlyTrxAll,
          dailyTrxAll: request.dailyTrxAll,
          monthlyTrxAtm: request.monthlyTrxAtm,
          dailyTrxAtm: request.dailyTrxAtm,
          monthlyTrxEcom: request.monthlyTrxEcom,
          dailyTrxEcom: request.dailyTrxEcom
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 Update Card Limits Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('P100 card limits updated successfully for card:', request.cardId);

      return result;
    } catch (error) {
      console.error('Error updating P100 card limits:', error);
      throw error;
    }
  }

  /**
   * Delete card using P100 API
   */
  async deleteCard(request: P100DeleteCardRequest): Promise<{ message: string }> {
    try {
      console.log('Deleting P100 card:', {
        externalUserId: request.externalUserId,
        cardId: request.cardId
      });

      const response = await fetch(this.getApiUrl('/card'), {
        method: 'DELETE',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalUserId: request.externalUserId,
          cardId: request.cardId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`P100 Delete Card Error: ${errorData.errorName || errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('P100 card deleted successfully:', request.cardId);

      return result;
    } catch (error) {
      console.error('Error deleting P100 card:', error);
      throw error;
    }
  }

  /**
   * Get crypto withdrawal details by withdrawalId
   */
  async getCryptoWithdrawalDetails(withdrawalId: string): Promise<any> {
    const response = await fetch(`${this.config.apiUrl}/crypto-withdrawal/details/${withdrawalId}`, {
      headers: {
        'x-api-key': this.config.apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`P100 Withdrawal Status Error: ${errorData.errorName || response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get crypto withdrawal network fee
   */
  async getCryptoWithdrawalNetworkFee(currency: string, network?: string): Promise<{ networkFee: number }> {
    const url = new URL(`${this.config.apiUrl}/crypto-withdrawal/get-network-fee`);
    url.searchParams.append('currency', currency);
    if (network) url.searchParams.append('network', network);

    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': this.config.apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`P100 Network Fee Error: ${errorData.errorName || response.statusText}`);
    }

    return await response.json();
  }
}

// Initialize P100 service with environment variables
export const p100Service = new P100Service({
  apiKey: process.env.P100_API_KEY || '',
  merchantId: process.env.P100_MERCHANT_ID || '',
  webhookSecret: process.env.P100_WEBHOOK_SECRET || '',
  apiUrl: process.env.P100_API_URL || 'https://partner-api-stage.p100.io/v1',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'sandbox' | 'production'
});

/**
 * Fetch user balances (fiat + crypto) from P100 by externalUserId
 */
export async function getUserBalances(externalUserId: string) {
  const apiUrl = p100Service.apiUrl;
  const apiKey = p100Service.apiKey;
  const response = await fetch(`${apiUrl}/user/${externalUserId}/balances`, {
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
}

/**
 * Register a user and generate all balances in P100
 * Returns userId, balances, etc. or throws error if user exists
 */
export async function registerUserWithBalances(payload: {
  externalUserId: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
  citizenship: string;
  documentType: 'PASSPORT' | 'ID_CARD' | 'RESIDENCE_PERMIT';
  documentNumber: string;
}) {
  const apiUrl = p100Service.apiUrl;
  const apiKey = p100Service.apiKey;
  const response = await fetch(`${apiUrl}/user/balances/crypto-and-fiat`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
}

// Helper functions
export const formatCryptoAmount = (amount: number, currency: string): string => {
  return `${amount.toFixed(6)} ${currency}`;
};

export const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

export const calculateFees = (amount: number): { total: number; fees: number } => {
  const fees = amount * 0.02; // 2% fee
  return { total: amount + fees, fees };
};

export default P100Service; 