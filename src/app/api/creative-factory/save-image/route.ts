import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, fileName } = body || {};

    if (!image || !fileName) {
      return NextResponse.json({ status: 'error', message: 'Falta la imagen o el nombre de archivo' }, { status: 400 });
    }

    // Limpiamos el nombre de archivo para evitar vulnerabilidades de directory traversal
    const safeFileName = path.basename(fileName);
    if (!safeFileName.endsWith('.png') && !safeFileName.endsWith('.jpg') && !safeFileName.endsWith('.webp')) {
      return NextResponse.json({ status: 'error', message: 'Extensión de archivo no permitida' }, { status: 400 });
    }

    // Ruta de guardado físico en public/images/demo/
    const targetDir = path.join(process.cwd(), 'public', 'images', 'demo');
    
    // Nos aseguramos de que el directorio exista
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, safeFileName);

    // Quitamos el prefijo base64 si existe
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Escribimos el archivo
    fs.writeFileSync(targetPath, buffer);

    console.log(`[creative-factory/save-image] Imagen guardada con éxito en ${targetPath}`);

    return NextResponse.json({ 
      status: 'ok', 
      message: `Imagen guardada como /images/demo/${safeFileName}`,
      url: `/images/demo/${safeFileName}?t=${Date.now()}` // Timestamp para romper la caché del navegador
    });

  } catch (err: any) {
    console.error('[creative-factory/save-image] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
