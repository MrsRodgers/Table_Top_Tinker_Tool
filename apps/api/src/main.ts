import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Prefix all routes with /api
  // so your endpoints are /api/campaigns not /campaigns
  app.setGlobalPrefix('api')

  // Allow your Next.js frontend to call the API
  app.enableCors({
    origin: process.env.WEB_URL ?? 'http://localhost:3000',
    credentials: true
  })

  const port = process.env.PORT ?? 3001
  await app.listen(port)
  Logger.log(`API running on http://localhost:${port}/api`)
}

bootstrap()