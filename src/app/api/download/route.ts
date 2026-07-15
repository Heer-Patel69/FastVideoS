
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaUrl = searchParams.get("url");
    const filename = searchParams.get("filename") || "download";

    if (!mediaUrl) {
      return new Response("Missing url parameter", { status: 400 });
    }

    // Validate URL
    try {
      const parsedUrl = new URL(mediaUrl);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        return new Response("Invalid protocol", { status: 400 });
      }
    } catch {
      return new Response("Invalid url parameter", { status: 400 });
    }

    const response = await fetch(mediaUrl);

    if (!response.ok) {
      return new Response("Failed to fetch media file", { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const contentLength = response.headers.get("content-length");

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(filename)}"`
    );
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Stream the response back to the client
    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
