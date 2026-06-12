import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { getActiveUser } from "@/lib/site-data";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userParam = searchParams.get("user") || undefined;
  
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  const user = getActiveUser(host, userParam);
  
  const dataDir = path.join(process.cwd(), "data");
  let userDir = path.join(dataDir, user);
  
  try {
    // If the directory doesn't exist, fallback to "ajay"
    if (!fs.existsSync(userDir)) {
      userDir = path.join(dataDir, "ajay");
    }
    
    // Find the first PDF file in the directory
    const files = fs.readdirSync(userDir);
    const pdfFile = files.find((file) => file.toLowerCase().endsWith(".pdf"));
    
    if (!pdfFile) {
      // If no PDF in current user's directory, check "ajay" directory as fallback
      const ajayDir = path.join(dataDir, "ajay");
      if (fs.existsSync(ajayDir)) {
        const ajayFiles = fs.readdirSync(ajayDir);
        const ajayPdf = ajayFiles.find((file) => file.toLowerCase().endsWith(".pdf"));
        if (ajayPdf) {
          const filePath = path.join(ajayDir, ajayPdf);
          const fileBuffer = fs.readFileSync(filePath);
          const encodedFilename = encodeURIComponent(ajayPdf);
          return new NextResponse(fileBuffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `inline; filename="${ajayPdf}"; filename*=UTF-8''${encodedFilename}`,
            },
          });
        }
      }
      return new NextResponse("Resume PDF not found", { status: 404 });
    }
    
    const filePath = path.join(userDir, pdfFile);
    const fileBuffer = fs.readFileSync(filePath);
    const encodedFilename = encodeURIComponent(pdfFile);
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${pdfFile}"; filename*=UTF-8''${encodedFilename}`,
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return new NextResponse("Error serving resume", { status: 500 });
  }
}
