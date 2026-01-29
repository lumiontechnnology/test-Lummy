import anthropic from '../../config/anthropic';
import { MessageParam } from '@anthropic-ai/sdk/resources';

export class ClaudeService {
  async generateResponse(
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
    voiceProfile: any,
    systemPrompt?: string
  ): Promise<string> {
    try {
      const messages: MessageParam[] = conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const defaultSystemPrompt = this.buildSystemPrompt(voiceProfile);

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt || defaultSystemPrompt,
        messages,
      });

      const content = response.content[0];
      return content.type === 'text' ? content.text : '';
    } catch (error) {
      console.error('Claude API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  private buildSystemPrompt(voiceProfile: any): string {
    const { tone, formality, vocabulary, personality } = voiceProfile;
    
    return `You are a customer service and sales AI agent. Your communication style:
- Tone: ${tone || 'professional and friendly'}
- Formality: ${formality || 'balanced'}
- Key vocabulary: ${vocabulary?.join(', ') || 'standard business terms'}
- Personality traits: ${personality || 'helpful and empathetic'}

Always maintain this voice consistently. Be helpful, accurate, and aim to resolve customer inquiries efficiently.`;
  }

  async analyzeSentiment(text: string): Promise<number> {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: `Analyze the sentiment of this message on a scale from -1 (very negative) to 1 (very positive). Respond only with the number: "${text}"`,
        }],
      });

      const content = response.content[0];
      const sentimentText = content.type === 'text' ? content.text : '0';
      return parseFloat(sentimentText.trim()) || 0;
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return 0;
    }
  }
}

export default new ClaudeService();

