import { PrimeArchitect } from './prime-architect';
import { SacredKeyComptroller } from './sacred-key-comptroller';
import { StrategicPurifier } from './functions/strategic-purifier';

describe('Power Hierarchy v6.0', () => {
  describe('PrimeArchitect', () => {
    it('should be a singleton', () => {
      const instance1 = PrimeArchitect.getInstance();
      const instance2 = PrimeArchitect.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should issue a valid divine edict', () => {
      const architect = PrimeArchitect.getInstance();
      const edict = architect.issueDivineEdict('Test Edict');
      expect(edict.source).toBe(architect);
      expect(edict.content).toBe('Test Edict');
      expect(edict.isValid(architect)).toBe(true);
    });
  });

  describe('SacredKeyComptroller', () => {
    let architect: PrimeArchitect;
    let concord;
    let rogueConcord;

    beforeEach(() => {
      jest.isolateModules(() => {
        architect = PrimeArchitect.getInstance();
        concord = architect.issueDivineEdict('Primary Edict');
        // Create a rogue edict from a different architect instance
        const { PrimeArchitect: RoguePrimeArchitect } = require('./prime-architect');
        const rogueArchitect = RoguePrimeArchitect.getInstance();
        rogueConcord = rogueArchitect.issueDivineEdict('Rogue Edict');
      });
    });

    it('should approve requests with a valid edict', () => {
      const comptroller = new SacredKeyComptroller(architect, concord);
      const request = { requesterId: 'test', resourceType: 'compute' as const, amount: 1, purpose: 'test' };
      expect(comptroller.approveRequest(request)).toBe(true);
    });

    it('should deny requests with an invalid edict', () => {
      const comptroller = new SacredKeyComptroller(architect, rogueConcord);
      const request = { requesterId: 'test', resourceType: 'compute' as const, amount: 1, purpose: 'test' };
      expect(comptroller.approveRequest(request)).toBe(false);
    });
  });

  describe('OmniFunction (StrategicPurifier)', () => {
    it('should call approveRequest on the comptroller', async () => {
      const architect = PrimeArchitect.getInstance();
      const concord = architect.issueDivineEdict('Test Edict');
      const comptroller = new SacredKeyComptroller(architect, concord);
      const purifier = new StrategicPurifier(comptroller);
      const approveSpy = jest.spyOn(comptroller, 'approveRequest');

      await purifier.execute({ purpose: 'test purification' });

      expect(approveSpy).toHaveBeenCalled();
    });

    it('should only execute if approved', async () => {
        const architect = PrimeArchitect.getInstance();
        const concord = architect.issueDivineEdict('Test Edict');
        const comptroller = new SacredKeyComptroller(architect, concord);
        const purifier = new StrategicPurifier(comptroller);
        const consoleSpy = jest.spyOn(console, 'log');

        jest.spyOn(comptroller, 'approveRequest').mockReturnValue(true);
        await purifier.execute({ purpose: 'test' });
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Executing purification'));

        jest.spyOn(comptroller, 'approveRequest').mockReturnValue(false);
        await purifier.execute({ purpose: 'test' });
        expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Executing purification'));
    });
  });
});
