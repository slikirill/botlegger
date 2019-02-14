import { BartenderModule } from './bartender.module';

describe('BartenderModule', () => {
  let bartenderModule: BartenderModule;

  beforeEach(() => {
    bartenderModule = new BartenderModule();
  });

  it('should create an instance', () => {
    expect(bartenderModule).toBeTruthy();
  });
});
