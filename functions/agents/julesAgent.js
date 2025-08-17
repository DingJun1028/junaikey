exports.julesAgent = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  if (!req.body || !req.body.message) {
    return res.status(400).send('Bad Request: Missing "message" field in request body');
  }

  const message = req.body.message.toLowerCase();
  let reply = `Hello! I can help. You asked: ${req.body.message}`;

  if (message.includes('core features')) {
    reply = 'JunAiKey\'s core features include: Function Interface, AI-Powered Theme Engine, Agent Network Tool, Routing, and Theme Switching.';
  } else if (message.includes('style guidelines') || message.includes('style guide') || message.includes('colors') || message.includes('font')) {
    reply = 'JunAiKey\'s style guidelines are: Primary color: a vibrant blue (#29ABE2). Background color: a light gray (#F5F5F5). Accent color: a contrasting purple (#9C27B0). Body and headline font: \'Inter\'. It uses minimalist icons and a clean, structured layout with subtle transitions.';
  } else if (message.includes('file')) {
    reply = 'Ah, interested in files, are we? How can I help with files?';
  } else {
    // Default conversational response for other queries
    const greetings = ["hello", "hi", "hey"];
    const userGreeting = greetings.find(greeting => message.includes(greeting));

    if (userGreeting) {
      reply = `Hello there! How can I assist you with JunAiKey today?`;
    } else {
       reply = `Hmm, I'm not sure how to respond to that. I can tell you about the core features or style guidelines of JunAiKey. You asked: ${req.body.message}`;
    }
  }

  // Simulate a slight delay for a more "agent-like" feel
  setTimeout(() => {
    res.status(200).json({ reply: reply });
  }, 500); // 500ms delay
};


// Export the function for Firebase
exports.julesAgent = julesAgent;