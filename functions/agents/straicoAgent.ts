/**
 * Simulates interaction with the Straico AI API.
 * In a real application, this function would make actual API calls to Straico AI.
 */

interface StraicoRequest {
  message: string;
}

interface StraicoResponse {
  reply: string;
}

interface Offer {
    name: string;
    description: string;
    expiry: string;
}

const straicoAgent = async (request: StraicoRequest): Promise<StraicoResponse> => {
  const message = request.message;

  // Check if the message is related to "優惠" (offers)
  if (message.includes('優惠')) {
    const simulatedOffers: Offer[] = [
      { name: '電子產品大優惠', description: '指定電子產品最高享八折優惠。', expiry: '2024-12-31' },
      { name: '服飾換季促銷', description: '全館服飾五折起，會員再享額外折扣。', expiry: '2024-11-15' },
      { name: '餐廳消費滿額贈', description: '於合作餐廳消費滿500元，贈送甜點一份。', expiry: '2024-11-30' },
    ];

    let reply = "好的，這是一些我為您找到的模擬優惠資訊：\n\n";
    simulatedOffers.forEach(offer => {
      reply += `- **${offer.name}**: ${offer.description} (到期日: ${offer.expiry})\n`;
    });
    reply += "\n請注意，這些是模擬資訊，實際優惠請以商家公告為準。";

    return { reply: reply };
  }

  const simulatedReply = `This is a simulated response from Straico AI for your message: "${message}"`;
  return { reply: simulatedReply };
};

export { straicoAgent };
