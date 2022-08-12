import { Test, TestingModule } from '@nestjs/testing';
import { KanjisController } from './kanjis.controller';

describe('KanjisController', () => {
  let controller: KanjisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KanjisController],
    }).compile();

    controller = module.get<KanjisController>(KanjisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
