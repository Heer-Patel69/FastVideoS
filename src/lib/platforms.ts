import type { Platform } from "@/types";

export const platforms: Platform[] = [
  {
    name: "YouTube",
    slug: "youtube-video-downloader",
    icon: "youtube",
    color: "#FF0000",
    description:
      "Download YouTube videos in HD, Full HD, and 4K quality. Extract audio as MP3.",
    longDescription:
      "FastVideoS is the fastest YouTube video downloader online. Save any YouTube video to your device in MP4, WebM, or extract the audio track as MP3. Supports HD (720p), Full HD (1080p), and 4K (2160p) quality options. No software installation needed — works directly in your browser on any device.",
    features: [
      "Download in 4K, 1080p, 720p, 480p",
      "Extract audio as MP3",
      "No sign-up required",
      "Works on mobile and desktop",
      "Fast processing speed",
      "Multiple format options",
    ],
    supportedFormats: ["MP4", "WebM", "MP3", "M4A"],
    steps: [
      {
        title: "Copy the YouTube URL",
        description:
          "Navigate to YouTube, find the video you want to download, and copy the URL from your browser address bar or the share button.",
      },
      {
        title: "Paste the URL",
        description:
          "Return to FastVideoS and paste the copied YouTube URL into the input field above. Our system automatically detects the platform.",
      },
      {
        title: "Select quality and download",
        description:
          "Choose your preferred quality (4K, 1080p, 720p) and format (MP4 or MP3). Click the download button to save the file to your device.",
      },
    ],
    faqs: [
      {
        question: "Is it legal to download YouTube videos?",
        answer:
          "Downloading YouTube videos for personal, offline viewing is generally acceptable under YouTube's terms. However, you should only download content you own or have permission to download. Redistribution or commercial use of copyrighted content without authorization violates copyright law.",
      },
      {
        question: "What quality options are available for YouTube downloads?",
        answer:
          "FastVideoS supports multiple quality levels including 4K (2160p), Full HD (1080p), HD (720p), and SD (480p/360p). Audio can be extracted as MP3 (128kbps, 192kbps, 320kbps) or M4A format.",
      },
      {
        question: "Can I download YouTube playlists?",
        answer:
          "Currently, FastVideoS supports downloading individual YouTube videos. Playlist support is on our roadmap and will be available in a future update.",
      },
      {
        question: "Do I need to install any software?",
        answer:
          "No. FastVideoS works entirely in your web browser. There is nothing to install — it works on Windows, Mac, Linux, iOS, and Android devices.",
      },
      {
        question: "Why is my YouTube download slow?",
        answer:
          "Download speed depends on your internet connection and the video file size. 4K videos are significantly larger than 720p. Try selecting a lower quality if you need faster downloads.",
      },
    ],
  },
  {
    name: "Twitter / X",
    slug: "twitter-video-downloader",
    icon: "twitter",
    color: "#1DA1F2",
    description:
      "Save Twitter/X videos and GIFs instantly. Download tweets with media in HD quality.",
    longDescription:
      "Download videos and GIFs from Twitter (X) in full HD quality. FastVideoS makes it easy to save any tweet's video content directly to your device. Simply paste the tweet URL and choose your preferred format. Works with all public tweets containing video or GIF content.",
    features: [
      "Download Twitter videos in HD",
      "Save GIFs as MP4 or GIF",
      "Works with public tweets",
      "Fast extraction",
      "No login needed",
      "Mobile friendly",
    ],
    supportedFormats: ["MP4", "GIF"],
    steps: [
      {
        title: "Find the tweet",
        description:
          "Navigate to Twitter/X and find the tweet containing the video or GIF you want to download. Tap the share icon and copy the tweet link.",
      },
      {
        title: "Paste the tweet URL",
        description:
          "Come back to FastVideoS and paste the tweet URL into the download box. The system will automatically detect it as a Twitter/X link.",
      },
      {
        title: "Download the media",
        description:
          "Select your preferred quality and format, then click download. The video or GIF will be saved directly to your device.",
      },
    ],
    faqs: [
      {
        question: "Can I download videos from private Twitter accounts?",
        answer:
          "No. FastVideoS can only access and download media from public tweets. Videos from private or protected accounts cannot be downloaded.",
      },
      {
        question: "How do I download a Twitter GIF?",
        answer:
          "Twitter GIFs are actually short MP4 videos. Paste the tweet URL containing the GIF into FastVideoS, and you can download it as either MP4 or GIF format.",
      },
      {
        question: "Does this work with Twitter Spaces?",
        answer:
          "Currently, FastVideoS supports downloading video and GIF content from tweets. Twitter Spaces audio downloads are not yet supported.",
      },
      {
        question: "What is the maximum video quality available?",
        answer:
          "Twitter typically serves video up to 1280x720 (720p) resolution. FastVideoS downloads the highest quality version available from Twitter's servers.",
      },
    ],
  },
  {
    name: "Instagram",
    slug: "instagram-reels-downloader",
    icon: "instagram",
    color: "#E4405F",
    description:
      "Download Instagram Reels, Stories, and posts. Save Instagram videos and photos in high quality.",
    longDescription:
      "Save Instagram Reels, Stories, and video posts with FastVideoS. Our Instagram downloader extracts media from any public Instagram post in the highest available quality. Download Reels as MP4, save Story highlights, and extract photos in full resolution.",
    features: [
      "Download Reels in HD",
      "Save Stories and highlights",
      "Extract photos in full resolution",
      "Works with public profiles",
      "No Instagram login required",
      "Batch carousel support",
    ],
    supportedFormats: ["MP4", "JPG", "PNG"],
    steps: [
      {
        title: "Copy the Instagram link",
        description:
          "Open Instagram, navigate to the Reel, Story, or post you want to download. Tap the three dots menu and select 'Copy Link'.",
      },
      {
        title: "Paste into FastVideoS",
        description:
          "Open FastVideoS and paste the copied Instagram URL into the download field. Our system will identify the content type automatically.",
      },
      {
        title: "Download your content",
        description:
          "Review the available media (video, photos, carousel items) and download each file individually or all at once.",
      },
    ],
    faqs: [
      {
        question: "Can I download Instagram Stories?",
        answer:
          "Yes, FastVideoS supports downloading Instagram Stories from public profiles. Simply paste the Story URL to download the video or image.",
      },
      {
        question: "Does this work with Instagram carousel posts?",
        answer:
          "Yes. When you paste a carousel post URL, FastVideoS will detect all images and videos in the carousel, allowing you to download each item individually.",
      },
      {
        question: "Can I download from private Instagram accounts?",
        answer:
          "No. FastVideoS only works with content from public Instagram profiles. Private account content requires authentication and cannot be accessed by our tool.",
      },
      {
        question: "What quality are Instagram downloads?",
        answer:
          "FastVideoS downloads Instagram content at the highest quality available from Instagram's servers, typically 1080x1920 for Reels and Stories, and up to 1080x1080 for feed posts.",
      },
    ],
  },
  {
    name: "TikTok",
    slug: "tiktok-video-downloader",
    icon: "tiktok",
    color: "#010101",
    description:
      "Download TikTok videos without watermark. Save TikTok content in HD quality.",
    longDescription:
      "Download TikTok videos in HD quality with FastVideoS. Our TikTok downloader extracts videos from any public TikTok post and provides options to save them with or without the TikTok watermark. Works with standard TikTok videos, slideshows, and audio content.",
    features: [
      "Download without watermark option",
      "HD video quality",
      "Save TikTok audio as MP3",
      "Slideshow support",
      "No TikTok account needed",
      "Works on all devices",
    ],
    supportedFormats: ["MP4", "MP3"],
    steps: [
      {
        title: "Copy the TikTok link",
        description:
          "Open TikTok and find the video you want to save. Tap the 'Share' button and select 'Copy Link' to copy the video URL.",
      },
      {
        title: "Paste the URL here",
        description:
          "Return to FastVideoS and paste the TikTok link into the download box. The platform will be detected automatically.",
      },
      {
        title: "Choose format and download",
        description:
          "Select whether you want the video with or without watermark, choose MP4 or MP3 format, and click download.",
      },
    ],
    faqs: [
      {
        question: "Can I download TikTok videos without watermark?",
        answer:
          "FastVideoS provides the option to download TikTok videos without the TikTok watermark when available. The watermark-free version is processed from the original video source.",
      },
      {
        question: "How do I download TikTok audio only?",
        answer:
          "After pasting the TikTok URL, select the MP3 format option to extract just the audio track from the TikTok video.",
      },
      {
        question: "Does this work with TikTok slideshows?",
        answer:
          "Yes. For TikTok slideshow posts, FastVideoS can download the video version of the slideshow or extract individual images from the post.",
      },
      {
        question: "Can I download private TikTok videos?",
        answer:
          "No. FastVideoS only supports downloading public TikTok content. Private videos require TikTok authentication and cannot be accessed.",
      },
    ],
  },
  {
    name: "Facebook",
    slug: "facebook-video-downloader",
    icon: "facebook",
    color: "#1877F2",
    description:
      "Download Facebook videos and Reels in HD. Save public Facebook video content easily.",
    longDescription:
      "FastVideoS enables you to download Facebook videos, Reels, and Watch content in HD quality. Simply paste the Facebook video URL and select your preferred quality. Works with all public Facebook video content including pages, groups, and personal profiles with public visibility.",
    features: [
      "Download Facebook Reels",
      "Save Watch videos",
      "HD and SD quality options",
      "Public videos and pages",
      "No Facebook login needed",
      "Fast processing",
    ],
    supportedFormats: ["MP4"],
    steps: [
      {
        title: "Copy the Facebook video URL",
        description:
          "Find the Facebook video you want to download. Right-click the video or use the share menu to copy the direct link.",
      },
      {
        title: "Paste into the download box",
        description:
          "Navigate to FastVideoS and paste the Facebook video URL into the input field.",
      },
      {
        title: "Select quality and save",
        description:
          "Choose between HD (720p) or SD (360p) quality and click download to save the video file.",
      },
    ],
    faqs: [
      {
        question: "Can I download Facebook Reels?",
        answer:
          "Yes, FastVideoS fully supports downloading Facebook Reels. Copy the Reel URL and paste it into our download box.",
      },
      {
        question: "Does this work with Facebook Live videos?",
        answer:
          "FastVideoS can download Facebook Live videos after the live broadcast has ended and been saved as a regular video post.",
      },
      {
        question: "Can I download videos from private Facebook groups?",
        answer:
          "No. Only publicly accessible Facebook videos can be downloaded. Content from private groups or profiles with restricted visibility is not accessible.",
      },
    ],
  },
  {
    name: "Vimeo",
    slug: "vimeo-video-downloader",
    icon: "vimeo",
    color: "#1AB7EA",
    description:
      "Download Vimeo videos in high quality. Save Vimeo content when downloads are permitted.",
    longDescription:
      "Download Vimeo videos in up to 4K quality with FastVideoS. Our Vimeo downloader works with publicly accessible Vimeo videos where the creator has enabled downloads. Get the highest quality version available including original source quality uploads.",
    features: [
      "Up to 4K quality downloads",
      "Original source quality",
      "Multiple format options",
      "Creator-permitted downloads",
      "No account required",
      "Fast and reliable",
    ],
    supportedFormats: ["MP4", "WebM"],
    steps: [
      {
        title: "Copy the Vimeo URL",
        description:
          "Find the Vimeo video you want to download and copy the URL from your browser address bar.",
      },
      {
        title: "Paste the link",
        description:
          "Come to FastVideoS and paste the Vimeo URL into the download input.",
      },
      {
        title: "Download the video",
        description:
          "Select your preferred quality and format, then download the video to your device.",
      },
    ],
    faqs: [
      {
        question: "Can I download any Vimeo video?",
        answer:
          "FastVideoS can download Vimeo videos that are publicly accessible. Some creators disable downloads on their videos — in those cases, downloads may not be available.",
      },
      {
        question: "What quality options are available for Vimeo?",
        answer:
          "Vimeo supports high-quality uploads, so downloads may be available in 4K (2160p), 1080p, 720p, and lower resolutions depending on the original upload quality.",
      },
    ],
  },
  {
    name: "Reddit",
    slug: "reddit-video-downloader",
    icon: "reddit",
    color: "#FF4500",
    description:
      "Download Reddit videos with audio. Save Reddit video posts with sound included.",
    longDescription:
      "FastVideoS solves the common problem of downloading Reddit videos with audio. Reddit stores video and audio as separate streams — our tool automatically merges them into a single MP4 file with full audio. Works with all public Reddit video posts.",
    features: [
      "Downloads video with audio merged",
      "Solves Reddit's split audio issue",
      "HD quality available",
      "Works with all subreddits",
      "GIF and GIFV support",
      "No Reddit account needed",
    ],
    supportedFormats: ["MP4", "GIF"],
    steps: [
      {
        title: "Get the Reddit post URL",
        description:
          "Find the Reddit post with the video you want to download. Copy the post URL from your browser or the share menu.",
      },
      {
        title: "Paste the Reddit URL",
        description:
          "Paste the Reddit post URL into FastVideoS. The system will detect the video and audio streams.",
      },
      {
        title: "Download with audio",
        description:
          "FastVideoS automatically merges the video and audio tracks. Click download to save the complete video file.",
      },
    ],
    faqs: [
      {
        question: "Why do Reddit videos usually download without sound?",
        answer:
          "Reddit stores video and audio as separate streams (DASH format). Most download tools only grab the video stream. FastVideoS automatically detects and merges both streams into a single file with audio.",
      },
      {
        question: "Can I download Reddit GIFs?",
        answer:
          "Yes. FastVideoS supports downloading Reddit GIF and GIFV posts. These are typically short video clips that can be saved as MP4 or GIF format.",
      },
    ],
  },
  {
    name: "SoundCloud",
    slug: "soundcloud-downloader",
    icon: "soundcloud",
    color: "#FF5500",
    description:
      "Download SoundCloud tracks and playlists as MP3. Save SoundCloud music for offline listening.",
    longDescription:
      "Download SoundCloud tracks as high-quality MP3 files with FastVideoS. Our SoundCloud downloader extracts audio from any public SoundCloud track, set, or playlist. Get your favorite music, podcasts, and audio content for offline listening.",
    features: [
      "Download as MP3 (128kbps, 320kbps)",
      "Track metadata preserved",
      "Playlist support",
      "Podcast downloads",
      "No SoundCloud login needed",
      "Album art included",
    ],
    supportedFormats: ["MP3", "M4A", "WAV"],
    steps: [
      {
        title: "Copy the SoundCloud URL",
        description:
          "Navigate to SoundCloud and find the track or playlist you want to download. Copy the URL from your browser.",
      },
      {
        title: "Paste into FastVideoS",
        description:
          "Paste the SoundCloud track or playlist URL into the download field on FastVideoS.",
      },
      {
        title: "Download the audio",
        description:
          "Select your preferred audio quality (128kbps or 320kbps) and format (MP3 or M4A), then download.",
      },
    ],
    faqs: [
      {
        question: "Can I download SoundCloud tracks for free?",
        answer:
          "FastVideoS can download publicly available SoundCloud tracks. Some tracks may be restricted by the artist. Always respect copyright and only download content you have permission to save.",
      },
      {
        question: "What audio quality is available?",
        answer:
          "SoundCloud streams at 128kbps by default. FastVideoS provides the best available quality from SoundCloud's servers, typically 128kbps MP3 for free tracks and up to 256kbps for Go+ tracks.",
      },
    ],
  },
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((p) => p.slug === slug);
}

export function getAllPlatformSlugs(): string[] {
  return platforms.map((p) => p.slug);
}
