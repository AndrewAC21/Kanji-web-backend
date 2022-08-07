import { Test, TestingModule } from '@nestjs/testing';
import { KanjisService } from './kanjis.service';

describe('KanjisService', () => {
  let service: KanjisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KanjisService],
    }).compile();

    service = module.get<KanjisService>(KanjisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
