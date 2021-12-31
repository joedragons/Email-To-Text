import Router from '@koa/router'
import { HealthEndpoint } from './Health'

const Endpoints = [HealthEndpoint]

export function getRoutes(): Router[] {
  const routes: Router[] = []

  for (const Endpoint of Endpoints) {
    routes.push(new Endpoint().build())
  }

  return routes
}
