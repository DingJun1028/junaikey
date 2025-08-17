// omni_center/src/interfaces.ts

export interface Card {
  card_name: {
    'zh-Hant': string;
    en: string;
  };
  rarity: string;
  card_type: string;
  description: {
    'zh-Hant': string;
    en: string;
  };
  abilities: {
    passive: Ability;
    active: Ability;
  };
  constraints: Constraint[];
  system_log: {
    record: string;
    status: string;
    imprint: string;
  };
}

export interface Ability {
  name: {
    'zh-Hant': string;
    en: string;
  };
  activation: string;
  mechanism: string;
  effect: string;
}

export interface Constraint {
  name: string;
  description: string;
}

export interface VisualSpec {
  spec_id: string;
  card_name: string;
  design_document: {
    overall_aesthetics: {
      style: string;
      color_palette: {
        base: string[];
        accents: string[];
        notes: string;
      };
      texture: string;
    };
    front_cover: {
      artwork: {
        subject: string;
        structure: string;
        dynamics: string;
      };
      ui_ux: {
        header: {
          card_name: string;
          font: string;
          badge: string;
        };
        main_area: string;
        footer: {
          background: string;
          elements: {
            position: string;
            content: string;
          }[];
          ux_consideration: string;
        };
      };
    };
    back_cover: {
      artwork: {
        emblem: string;
        design: string;
        finish: string;
      };
      design_philosophy: string;
    };
  };
}
