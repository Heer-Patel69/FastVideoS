
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename") || "download";

    // Manually extract the full media URL from the raw request URL query string.
    // This prevents the browser or Next.js from splitting the nested query parameters
    // (such as &sig, &exp, &iv, etc. required by the downloader backend) into separate parameters.
    const requestUrl = request.url;
    let mediaUrl = "";
    const urlParamIndex = requestUrl.indexOf("?url=");
    const urlParamIndexAlt = requestUrl.indexOf("&url=");
    const startIndex = urlParamIndex !== -1 ? urlParamIndex + 5 : (urlParamIndexAlt !== -1 ? urlParamIndexAlt + 5 : -1);

    if (startIndex !== -1) {
      const remainingString = requestUrl.substring(startIndex);
      const filenameIndex = remainingString.indexOf("&filename=");
      if (filenameIndex !== -1) {
        mediaUrl = remainingString.substring(0, filenameIndex);
      } else {
        mediaUrl = remainingString;
      }
      mediaUrl = decodeURIComponent(mediaUrl);
    }

    if (!mediaUrl) {
      mediaUrl = searchParams.get("url") || "";
    }

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

    const response = await fetch(mediaUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      }
    });

    if (!response.ok) {
      return new Response(`Failed to fetch media file: ${response.statusText}`, { status: response.status });
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
