import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// 1. POST: Criar uma nova notificação
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, message, type } = body;

    const newNotification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type: type || 'INFO',
      },
    });

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar notificação:", error);
    return NextResponse.json({ error: 'Erro ao criar notificação' }, { status: 500 });
  }
}

// ==========================================
// 2. GET: Listar notificações
// ==========================================
export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' }, // Mais recentes primeiro
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    return NextResponse.json({ error: 'Erro ao buscar notificações' }, { status: 500 });
  }
}