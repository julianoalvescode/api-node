import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';

export const app = fastify({ logger: true });

const prisma = new PrismaClient();
