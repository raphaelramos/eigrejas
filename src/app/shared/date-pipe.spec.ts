import { ToDateObjPipe  } from './date-pipe.pipe';

describe('toDateObj', () => {
  it('create an instance', () => {
    const pipe = new ToDateObjPipe();
    expect(pipe).toBeTruthy();
  });
});
