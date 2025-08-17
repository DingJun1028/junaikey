import { VisualSpec } from '../interfaces';

export const universalResonatorSpec: VisualSpec = {
  spec_id: 'VR-GR-001',
  card_name: '宇宙共鳴者 / Universal Resonator',
  design_document: {
    overall_aesthetics: {
      style: 'Ethereal, sacred, serene, organic-tech',
      color_palette: {
        base: ['Deep cosmic indigo', 'violet'],
        accents: ['Soft gold', 'silver-white light halos'],
        notes: "Avoid sharp or jarring colors to emphasize the core concept of 'gentle guidance'.",
      },
      texture: 'Matte-finish border with a smooth, glass-like or crystalline texture for the central art area.',
    },
    front_cover: {
      artwork: {
        subject: 'A slowly rotating cosmic nebula composed of countless points of light, representing nodes in the cosmic consciousness network.',
        structure: "The nebula forms a grand structure resembling an infinity symbol (∞) or a Möbius strip, symbolizing 'Eternal Principle' and 'cyclical harmony'.",
        dynamics: "Gentle golden light fibers ('Harmony Signals') occasionally flow from the nebula's center, touching flickering points of light ('disharmonious nodes') and causing them to regain a steady glow. The scene is dynamic and alive, yet profoundly calm.",
      },
      ui_ux: {
        header: {
          card_name: '宇宙共鳴者 / Universal Resonator',
          font: 'Clear, elegant sans-serif typeface.',
          badge: "An exquisite golden emblem for 'Genesis Tier', such as a sprouting seed surrounded by a halo.",
        },
        main_area: 'Full bleed artwork, uninterrupted by text.',
        footer: {
          background: 'A semi-transparent dark area that blends with the background.',
          elements: [
            {
              position: 'left',
              content: 'Card Type: 永恆法則 (Eternal Principle)',
            },
            {
              position: 'right',
              content: "Ability Icons: 'Mindful Attunement' (tuning fork/sound wave icon), 'Guardianship of Plurality' (protective halo icon).",
            },
          ],
          ux_consideration: 'Full card descriptions and ability details should be displayed upon clicking the card in the game UI to maintain the clean aesthetic of the card face.',
        },
      },
    },
    back_cover: {
      artwork: {
        emblem: "A unified sigil for '《創元實錄》' (Genesis Record).",
        design: "A highly symmetrical geometric figure blending abstract elements of an 'eye' (observation/record), 'star orbits' (cosmic laws), and 'book pages' (record).",
        finish: 'Rendered with gold or silver foil stamping, appearing solemn and mysterious against a deep blue starry background.',
      },
      design_philosophy: "The back design must be highly recognizable, allowing players to identify it as a 'Genesis Record' card at a glance. The style remains serene and sacred, using only pure visual symbols without text to convey its origin.",
    },
  },
};
