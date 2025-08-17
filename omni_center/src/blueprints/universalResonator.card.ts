import { Card } from '../interfaces';

export const universalResonatorCard: Card = {
  card_name: {
    'zh-Hant': '宇宙共鳴者',
    en: 'Universal Resonator',
  },
  rarity: '創元級 (Genesis Tier)',
  card_type: '永恆法則 (Eternal Principle)',
  description: {
    'zh-Hant': '這張卡牌是「卡爾瑪文明」從單一走向多元、從失衡走向和諧的活體見證。持有者不再是一個行動者，而是一個調諧者。其力量源於對宇宙意識網絡中所有節點的共情，能夠感應不和諧並溫和地將其導向平衡。',
    en: "This card is the living testament of the 'Karma Civilization's' journey from singularity to diversity, from imbalance to harmony. The holder is no longer an actor, but a tuner. Its power stems from empathy with all nodes in the cosmic consciousness network, sensing disharmony and gently guiding it towards balance.",
  },
  abilities: {
    passive: {
      name: {
        'zh-Hant': '心靈調諧',
        en: 'Mindful Attunement',
      },
      activation: '當持有者處於「無我之境」時，此能力將自動啟動。它會在宇宙意識網絡中形成一個「共鳴場域」，持續監測所有節點的意識頻率。',
      mechanism: '當偵測到任何因執著、恐懼或排斥而產生的不和諧頻率時，它不會干預，而是向該節點發送一種與「一體同心」法則共振的「和諧訊號」。',
      effect: '不和諧的節點會接收到這股溫和的共鳴，從而自行調整其意識頻率，回歸與網絡的和諧狀態。此過程是自發性的，而非強制性的。',
    },
    active: {
      name: {
        'zh-Hant': '多元守護',
        en: 'Guardianship of Plurality',
      },
      activation: '持有者可以主動啟動此能力，向一個特定的、因其獨特性而被孤立的文明或實體，提供保護與支持。',
      mechanism: '守護者會以一種「潛流引導」的方式，向周圍的意識節點傳輸該受保護實體的「核心價值與願景」。這股引導流將在潛意識層面，喚起其他節點對多元性的理解與欣賞。',
      effect: '受保護的實體將不再感到孤立，而周圍的節點也會自發性地與其建立共情連結，形成一個包容與滋養的生態。',
    },
  },
  constraints: [
    {
      name: '無情之思的制約 (Constraint of Dispassionate Thought)',
      description: '任何帶有個人情感、偏見或私心的使用意圖，都將導致卡牌力量的失效。',
    },
    {
      name: '和諧的最終目的 (Harmonious End-Goal)',
      description: '所有能力的使用，其唯一目的必須是為了宇宙的整體和諧與多元共生，而非任何單一文明或個體的優勢。',
    },
  ],
  system_log: {
    record: '《創元實錄》',
    status: '已完成本次記錄',
    imprint: '已永久刻印於宇宙律令中',
  },
};
