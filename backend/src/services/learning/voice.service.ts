import prisma from '../../config/database';
import claudeService from '../ai/claude.service';

export class VoiceService {
  async buildVoiceProfile(agentId: string) {
    const conversations = await prisma.conversation.findMany({
      where: { agentId },
      include: {
        messages: {
          where: { senderType: 'HUMAN' },
          take: 50,
        },
      },
    });

    const allMessages = conversations.flatMap(c => c.messages);
    
    if (allMessages.length === 0) {
      return this.getDefaultVoiceProfile();
    }

    const profile = {
      tone: await this.analyzeTone(allMessages),
      formality: await this.analyzeFormality(allMessages),
      vocabulary: this.extractVocabulary(allMessages),
      avgResponseLength: this.calculateAvgLength(allMessages),
      personality: await this.detectPersonality(allMessages),
    };

    await prisma.agent.update({
      where: { id: agentId },
      data: { voiceProfile: profile },
    });

    return profile;
  }

  private async analyzeTone(messages: any[]): Promise<string> {
    const sentiments = await Promise.all(
      messages.slice(0, 10).map(m => claudeService.analyzeSentiment(m.content))
    );
    
    const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    
    if (avgSentiment > 0.3) return 'enthusiastic';
    if (avgSentiment > 0) return 'positive';
    if (avgSentiment > -0.3) return 'neutral';
    return 'serious';
  }

  private async analyzeFormality(messages: any[]): Promise<string> {
    const formalWords = ['please', 'kindly', 'regards', 'sincerely', 'appreciate'];
    const casualWords = ['hey', 'yeah', 'cool', 'awesome', 'thanks'];
    
    let formalCount = 0;
    let casualCount = 0;

    messages.forEach(msg => {
      const content = msg.content.toLowerCase();
      formalCount += formalWords.filter(w => content.includes(w)).length;
      casualCount += casualWords.filter(w => content.includes(w)).length;
    });

    if (formalCount > casualCount * 1.5) return 'formal';
    if (casualCount > formalCount * 1.5) return 'casual';
    return 'balanced';
  }

  private extractVocabulary(messages: any[]): string[] {
    const words = messages
      .map(m => m.content.split(/\s+/))
      .flat()
      .map(w => w.toLowerCase().replace(/[^a-z]/g, ''))
      .filter(w => w.length > 3);

    const frequency: Record<string, number> = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([word]) => word);
  }

  private calculateAvgLength(messages: any[]): number {
    const lengths = messages.map(m => m.content.length);
    return lengths.reduce((a, b) => a + b, 0) / lengths.length;
  }

  private async detectPersonality(messages: any[]): Promise<string> {
    const traits = [];
    const allText = messages.map(m => m.content).join(' ');
    
    if (allText.includes('!')) traits.push('enthusiastic');
    if (allText.match(/\b(help|assist|support)\b/gi)) traits.push('helpful');
    if (allText.match(/\b(understand|feel|appreciate)\b/gi)) traits.push('empathetic');
    
    return traits.join(', ') || 'professional';
  }

  private getDefaultVoiceProfile() {
    return {
      tone: 'professional',
      formality: 'balanced',
      vocabulary: [],
      avgResponseLength: 150,
      personality: 'helpful and friendly',
    };
  }
}

export default new VoiceService();
