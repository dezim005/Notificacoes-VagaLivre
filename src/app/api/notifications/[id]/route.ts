import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// 3. PATCH: Marcar notificação como lida
// ==========================================
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedNotification = await prisma.notification.update({
      where: { id: params.id },
      data: { isRead: true },
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar notificação:", error);
    return NextResponse.json({ error: 'Notificação não encontrada ou erro no servidor' }, { status: 500 });
  }
}

// ==========================================
// 4. DELETE: Apagar uma notificação
// ==========================================
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.notification.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Notificação deletada com sucesso' }, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar notificação:", error);
    return NextResponse.json({ error: 'Erro ao deletar notificação' }, { status: 500 });
  }
}