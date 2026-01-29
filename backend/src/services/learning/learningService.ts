import prisma from '../../config/database';
import redisClient from '../../config/redis';

export class PatternService {
  async analyzeConversation(agentId: string, conversationId: string) {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });

    const patterns = {
      greetings: [] as string[],
      closings: [] as string[],
      commonPhrases: [] as string[],
      tone: 'neutral',
    };

    messages.forEach(message => {
      if (message.senderType === 'HUMAN') {
        const content = message.content.toLowerCase();
        
        if (this.isGreeting(content)) {
          patterns.greetings.push(message.content);
        }
        
        if (this.isClosing(content)) {
          patterns.closings.push(message.content);
        }
      }
    });

    await this.storePatterns(agentId, patterns);
    return patterns;
  }

  private isGreeting(text: string): boolean {
    const greetingWords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'greetings'];
    return greetingWords.some(word => text.includes(word));
  }

  private isClosing(text: string): boolean {
    const closingWords = ['goodbye', 'bye', 'thanks', 'thank you', 'have a great', 'take care'];
    return closingWords.some(word => text.includes(word));
  }

  async storePatterns(agentId: string, patterns: any) {
    const cacheKey = `agent:${agentId}:patterns`;
    await redisClient.set(cacheKey, JSON.stringify(patterns), { EX: 3600 });

    for (const [type, data] of Object.entries(patterns)) {
      if (Array.isArray(data) && data.length > 0) {
        await prisma.voicePattern.create({
          data: {
            agentId,
            patternType: type.toUpperCase() as any,
            patternData: data,
            frequency: data.length,
          },
        });
      }
    }
  }

  async getAgentPatterns(agentId: string) {
    const cacheKey = `agent:${agentId}:patterns`;
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const patterns = await prisma.voicePattern.findMany({
      where: { agentId },
      orderBy: { frequency: 'desc' },
    });

    return patterns.reduce((acc, pattern) => {
      acc[pattern.patternType.toLowerCase()] = pattern.patternData;
      return acc;
    }, {} as any);
  }
}

export default new PatternService();
