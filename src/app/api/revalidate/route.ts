import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, tags } = body;

    // Revalidate by path
    if (path) {
      if (Array.isArray(path)) {
        path.forEach((p: string) => revalidatePath(p));
      } else {
        revalidatePath(path);
      }
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag);
    }

    // Revalidate by multiple tags
    if (tags && Array.isArray(tags)) {
      tags.forEach((t: string) => revalidateTag(t));
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
