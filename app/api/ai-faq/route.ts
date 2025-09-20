import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// FAQ Data from your actual FAQ page
const FAQ_DATA = [
  // General Questions
  {
    id: 1,
    category: 'general',
    question: 'What is GameVault?',
    answer: 'GameVault is a revolutionary platform that allows gamers to purchase gift cards for their favorite gaming platforms using cryptocurrency. We support over 100 gaming platforms and accept Bitcoin, Ethereum, Litecoin, and other major cryptocurrencies.'
  },
  {
    id: 2,
    category: 'general',
    question: 'Do I need to create an account to make a purchase?',
    answer: 'No, you don\'t need to create an account! GameVault allows completely anonymous purchases. However, providing an email address is optional and ensures you receive order confirmations and gift card codes directly in your inbox.'
  },
  {
    id: 3,
    category: 'general',
    question: 'How quickly will I receive my gift card codes?',
    answer: 'Gift card codes are delivered instantly once your cryptocurrency payment is confirmed on the blockchain. This typically takes 1-10 minutes depending on network congestion and the cryptocurrency used.'
  },
  {
    id: 4,
    category: 'general',
    question: 'Which gaming platforms do you support?',
    answer: 'We support over 100 gaming platforms including Steam, Xbox, PlayStation, Nintendo eShop, Epic Games Store, Battle.net, Origin, Uplay, and many more. Our catalog is constantly expanding to include new platforms and regions.'
  },

  // Payment Questions
  {
    id: 5,
    category: 'payments',
    question: 'What cryptocurrencies do you accept?',
    answer: 'We accept Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Bitcoin Cash (BCH), Dogecoin (DOGE), and several other major cryptocurrencies. Our payment processor P100 supports a wide range of digital currencies.'
  },
  {
    id: 6,
    category: 'payments',
    question: 'How do cryptocurrency payments work?',
    answer: 'When you checkout, you\'ll receive a unique payment address and QR code. Simply send the exact amount of cryptocurrency to the provided address. Once the transaction is confirmed on the blockchain, your gift card codes will be delivered automatically.'
  },
  {
    id: 7,
    category: 'payments',
    question: 'What happens if I send the wrong amount?',
    answer: 'If you send too little, the payment will remain pending until the full amount is received. If you send too much, the excess will be refunded to your original address minus network fees. Always double-check the amount before sending.'
  },
  {
    id: 8,
    category: 'payments',
    question: 'Can I get a refund?',
    answer: 'Due to the digital nature of gift cards and instant delivery, refunds are generally not possible once codes are delivered. However, we may consider refunds on a case-by-case basis for technical issues or if the gift card codes are invalid.'
  },
  {
    id: 9,
    category: 'payments',
    question: 'Are there any fees?',
    answer: 'GameVault doesn\'t charge additional fees beyond the advertised price. However, you\'ll need to pay standard blockchain network fees when sending cryptocurrency. These fees vary depending on network congestion and the cryptocurrency used.'
  },

  // Gift Card Questions
  {
    id: 10,
    category: 'gift-cards',
    question: 'Are the gift cards region-locked?',
    answer: 'Most gift cards work globally, but some may have regional restrictions based on the platform\'s policies. We clearly indicate any regional limitations on the product pages. When in doubt, check with the specific gaming platform.'
  },
  {
    id: 11,
    category: 'gift-cards',
    question: 'How do I redeem my gift card codes?',
    answer: 'Redemption varies by platform. For Steam, go to "Games" > "Activate a Product on Steam". For Xbox, visit xbox.com/redeemcode. For PlayStation, go to PlayStation Store > "Redeem Codes". Each platform has detailed instructions in their support sections.'
  },
  {
    id: 12,
    category: 'gift-cards',
    question: 'Do gift cards expire?',
    answer: 'Gift card expiration depends on the issuing platform\'s policies. Most major platforms like Steam, Xbox, and PlayStation gift cards don\'t expire, but some smaller platforms may have expiration dates. Check the specific platform\'s terms for details.'
  },
  {
    id: 13,
    category: 'gift-cards',
    question: 'Can I use multiple gift cards on one purchase?',
    answer: 'Yes, most gaming platforms allow you to combine multiple gift cards and use them together with other payment methods. This depends on the specific platform\'s payment policies.'
  },

  // Security Questions
  {
    id: 14,
    category: 'security',
    question: 'Is it safe to buy gift cards with cryptocurrency?',
    answer: 'Yes, purchasing with cryptocurrency is very safe. We use industry-leading security measures including encrypted transactions, secure payment processing through P100, and we never store sensitive payment information. Cryptocurrency transactions are also irreversible and secure by design.'
  },
  {
    id: 15,
    category: 'security',
    question: 'How do you protect my privacy?',
    answer: 'We prioritize user privacy by not requiring personal information for purchases. All transactions are processed anonymously, and we don\'t store unnecessary personal data. Your cryptocurrency transactions are also pseudonymous by nature.'
  },
  {
    id: 16,
    category: 'security',
    question: 'What if I receive invalid gift card codes?',
    answer: 'If you receive invalid or already-used gift card codes, contact our support team immediately with your order details. We work directly with authorized distributors and will investigate any issues promptly to ensure you receive working codes.'
  },
  {
    id: 17,
    category: 'security',
    question: 'Are the gift cards legitimate?',
    answer: 'Yes, all our gift cards are sourced from authorized distributors and official channels. We maintain partnerships with legitimate suppliers and regularly audit our inventory to ensure authenticity.'
  },

  // Technical Questions
  {
    id: 18,
    category: 'technical',
    question: 'What if my payment is stuck or pending?',
    answer: 'If your payment appears stuck, first check the blockchain explorer using your transaction hash. If the transaction is confirmed but you haven\'t received codes, contact support. If it\'s unconfirmed, you may need to wait for network confirmation or increase the fee.'
  },
  {
    id: 19,
    category: 'technical',
    question: 'Why is my payment taking so long to confirm?',
    answer: 'Payment confirmation time depends on blockchain network congestion and the fee you paid. Bitcoin can take 10-60 minutes, Ethereum 1-15 minutes, and Litecoin 2-10 minutes. Higher fees generally result in faster confirmation.'
  },
  {
    id: 20,
    category: 'technical',
    question: 'Can I cancel a payment after sending cryptocurrency?',
    answer: 'Cryptocurrency transactions are irreversible once broadcast to the network. However, if the payment hasn\'t been confirmed yet and you used a low fee, it might eventually be dropped from the mempool. Contact support if you need assistance.'
  },
  {
    id: 21,
    category: 'technical',
    question: 'What browsers do you support?',
    answer: 'GameVault works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience. JavaScript must be enabled.'
  },
  {
    id: 22,
    category: 'technical',
    question: 'Do you have a mobile app?',
    answer: 'Currently, GameVault is a web-based platform optimized for both desktop and mobile browsers. We don\'t have a dedicated mobile app yet, but our website works perfectly on mobile devices.'
  }
]

// Create comprehensive knowledge base
const createKnowledgeBase = () => {
  const systemPrompt = `
You are an AI assistant for GameVault, a platform that allows gamers to purchase gift cards for gaming platforms using cryptocurrency.

CORE INFORMATION ABOUT GAMEVAULT:
- GameVault allows users to purchase gift cards for over 100 gaming platforms using cryptocurrency
- Supports Bitcoin, Ethereum, Litecoin, Bitcoin Cash, Dogecoin, and other major cryptocurrencies
- No account creation required for purchases (anonymous purchases supported)
- Instant delivery of gift card codes once cryptocurrency payment is confirmed
- Uses P100 payment processor for secure transactions
- Legitimate gift cards sourced from authorized distributors

FREQUENTLY ASKED QUESTIONS AND ANSWERS:
${FAQ_DATA.map(faq => `
CATEGORY: ${faq.category.toUpperCase()}
Q: ${faq.question}
A: ${faq.answer}
`).join('\n')}

RESPONSE GUIDELINES:
1. Be helpful, friendly, and professional
2. Use the FAQ information above to answer questions accurately
3. If asked about something not covered in the FAQs, provide helpful general guidance
4. Always emphasize GameVault's security, anonymity, and instant delivery features
5. For technical issues, suggest contacting support if needed
6. Keep responses concise but informative
7. Use gaming-friendly language when appropriate
`

  return systemPrompt
}

// Enhanced fallback responses for when OpenAI is not available
const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  // Search through FAQ data for keyword matches
  for (const faq of FAQ_DATA) {
    const questionWords = faq.question.toLowerCase().split(' ')
    const answerWords = faq.answer.toLowerCase().split(' ')
    
    // Check for exact question matches first
    if (lowerMessage.includes(faq.question.toLowerCase()) || 
        faq.question.toLowerCase().includes(lowerMessage)) {
      return faq.answer
    }
    
    // Check for keyword matches
    if (questionWords.some(word => word.length > 3 && lowerMessage.includes(word)) || 
        answerWords.some(word => word.length > 3 && lowerMessage.includes(word))) {
      return `Based on our FAQ: ${faq.answer}`
    }
  }
  
  // Enhanced category-based responses
  if (lowerMessage.includes('account') || lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
    return "🚀 Great news! You don't need to create an account with GameVault. We support completely anonymous purchases using cryptocurrency. Just select your gift cards, pay with crypto, and receive your codes instantly!"
  }
  
  if (lowerMessage.includes('crypto') || lowerMessage.includes('bitcoin') || lowerMessage.includes('payment') || lowerMessage.includes('accept')) {
    return "💰 We accept Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Bitcoin Cash (BCH), Dogecoin (DOGE), and other major cryptocurrencies. When you checkout, you'll get a unique payment address and QR code - send the exact amount and receive your gift card codes once confirmed!"
  }
  
  if (lowerMessage.includes('fast') || lowerMessage.includes('quick') || lowerMessage.includes('delivery') || lowerMessage.includes('time') || lowerMessage.includes('long')) {
    return "⚡ Super fast delivery! Gift card codes are delivered instantly once your cryptocurrency payment is confirmed on the blockchain. This typically takes 1-10 minutes depending on network congestion."
  }
  
  if (lowerMessage.includes('safe') || lowerMessage.includes('secure') || lowerMessage.includes('anonymous') || lowerMessage.includes('privacy')) {
    return "🔒 Absolutely safe and anonymous! We use industry-leading security through P100 payment processor, don't store sensitive information, and source all gift cards from authorized distributors. Your crypto transactions are secure by design."
  }
  
  if (lowerMessage.includes('gift card') || lowerMessage.includes('platform') || lowerMessage.includes('support') || lowerMessage.includes('steam') || lowerMessage.includes('xbox')) {
    return "🎮 We support 100+ gaming platforms including Steam, Xbox, PlayStation, Nintendo eShop, Epic Games Store, Battle.net, Origin, Uplay, and many more! Our catalog constantly expands with new platforms and regions."
  }
  
  if (lowerMessage.includes('redeem') || lowerMessage.includes('use') || lowerMessage.includes('activate')) {
    return "🎯 Redemption is easy! Each platform has its own process: Steam (Games > Activate Product), Xbox (xbox.com/redeemcode), PlayStation (PlayStation Store > Redeem Codes). Each platform provides detailed instructions in their support sections."
  }
  
  // Default response with helpful suggestions
  return "🤖 I'm here to help with GameVault questions! I can tell you about:\n\n💰 Cryptocurrency payments (Bitcoin, Ethereum, etc.)\n🎮 Gift card platforms (Steam, Xbox, PlayStation, etc.)\n⚡ Delivery times (instant delivery!)\n🔒 Security & privacy (completely anonymous)\n📞 Or any other questions!\n\nWhat would you like to know?"
};

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message || message.trim().length < 3) {
      return NextResponse.json({
        response: "Please provide a more detailed question (at least 15 characters) so I can help you better."
      })
    }

    // Check if OpenAI API key is available
    const openaiApiKey = process.env.OPENAI_API_KEY
    
    // Debug logging
    console.log('🔑 OpenAI API Key Status:', {
      exists: !!openaiApiKey,
      length: openaiApiKey ? openaiApiKey.length : 0,
      startsWithSk: openaiApiKey ? openaiApiKey.startsWith('sk-') : false,
      firstChars: openaiApiKey ? openaiApiKey.substring(0, 7) + '...' : 'MISSING'
    })

    if (!openaiApiKey) {
      // Use fallback response system
      console.log('🚨 Using fallback response system (no OpenAI API key)')
      const fallbackResponse = getFallbackResponse(message)
      return NextResponse.json({ response: fallbackResponse })
    }

    // Prepare conversation for OpenAI
    const messages = [
      {
        role: 'system' as const,
        content: createKnowledgeBase()
      },
      ...conversationHistory.slice(-4), // Include last 4 messages for context
      {
        role: 'user' as const,
        content: message
      }
    ]

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('🚨 OpenAI API error details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        headers: Object.fromEntries(response.headers.entries())
      })
      
      // Use fallback instead of throwing error
      console.log('🔄 Using fallback response due to OpenAI API error')
      const fallbackResponse = getFallbackResponse(message)
      return NextResponse.json({ response: fallbackResponse })
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content

    if (!aiResponse) {
      console.log('No response from OpenAI, using fallback')
      const fallbackResponse = getFallbackResponse(message)
      return NextResponse.json({ response: fallbackResponse })
    }

    return NextResponse.json({
      response: aiResponse.trim()
    })

  } catch (error) {
    console.error('AI FAQ API Error:', error)
    
    // Don't try to read request body again - use a generic fallback
    const fallbackResponse = "I'm here to help with questions about GameVault! You can ask me about cryptocurrency payments, gift card platforms we support, security, delivery times, or any other concerns. What would you like to know?"
    
    return NextResponse.json({
      response: fallbackResponse
    })
  }
}