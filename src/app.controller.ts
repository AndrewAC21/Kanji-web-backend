import { Controller, Get, HostParam } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //{ host: 'admin@admin.com' }
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Bienvendo a la pagina, pronto se actualizará con el landing page';
  }
  @Get('prueba')
  prueba() {
    // return JSON.stringify('./index.html');
    return 'hola desde prueba';
  }
}
