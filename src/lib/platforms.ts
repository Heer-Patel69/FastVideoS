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
  {
    name: "Instagram Story",
    slug: "instagram-story-saver",
    icon: "instagram",
    color: "#E4405F",
    description: "Save Instagram Stories and highlights online. Keep IG videos and photos before they disappear.",
    longDescription: "FastVideoS is a free online Instagram Story Saver that lets you download any public IG story or active highlight in HD quality. Save photos and videos directly to your device with ease. No login or signup required.",
    features: ["Save IG stories in HD", "Download stories anonymously", "No login or password needed", "Works on mobile & desktop", "Extract photo & video stories", "100% secure processing"],
    supportedFormats: ["MP4", "JPG"],
    steps: [
      { title: "Copy the Instagram story link", description: "Open the Instagram story, tap the share icon, and select 'Copy Link'." },
      { title: "Paste URL in FastVideoS", description: "Paste the copied story link into the downloader field on FastVideoS." },
      { title: "Download story media", description: "Click 'Extract Media' to view available story contents, then click download." }
    ],
    faqs: [
      { question: "Is it anonymous to download stories?", answer: "Yes, downloading Instagram Stories using FastVideoS is completely anonymous. The account owner will not know you downloaded or viewed their story." },
      { question: "Can I download stories from private accounts?", answer: "No, our story downloader only accesses public Instagram profiles for privacy and security compliance." }
    ]
  },
  {
    name: "Instagram Highlights",
    slug: "instagram-highlights-downloader",
    icon: "instagram",
    color: "#E4405F",
    description: "Download Instagram Story Highlights in high quality. Archive your favorite highlight reels.",
    longDescription: "Save Instagram Highlights online for free. Download high-quality video highlights and photos directly to your device instantly. No sign-up required.",
    features: ["Download Highlights in HD", "No Instagram login or credentials required", "Works with all highlight posts", "Extract high-quality MP4 files", "Fast processing speeds", "Completely free to use"],
    supportedFormats: ["MP4", "JPG"],
    steps: [
      { title: "Copy Highlight link", description: "Navigate to the highlight on Instagram and copy its link from the menu." },
      { title: "Paste URL", description: "Paste the highlight URL into the input field at the top of this page." },
      { title: "Download", description: "Click 'Extract Media', view the available highlight items, and download." }
    ],
    faqs: [
      { question: "Can I download active Highlights?", answer: "Yes, you can download any active Instagram story highlights as long as they are publicly accessible." },
      { question: "Does this require my Instagram password?", answer: "No, FastVideoS does not require any passwords or account access to extract public media." }
    ]
  },
  {
    name: "Instagram Profile Picture",
    slug: "instagram-dp-viewer",
    icon: "instagram",
    color: "#E4405F",
    description: "View and download Instagram profile pictures in full size and high resolution.",
    longDescription: "FastVideoS Instagram Profile Picture Downloader and Viewer lets you view and save any Instagram user's profile photo in its original full-size HD resolution. Works on any account — public or private.",
    features: ["View profile pictures in full size", "Download high-resolution HD profile photos", "Works on both public & private profiles", "Simple search by profile URL", "No account required", "Fast and free"],
    supportedFormats: ["JPG", "PNG"],
    steps: [
      { title: "Copy Profile URL", description: "Go to the Instagram profile and copy the profile page URL or username." },
      { title: "Paste Profile URL", description: "Paste the copied URL or username into the download box on FastVideoS." },
      { title: "View and Download HD DP", description: "Click 'Extract Media' to load the full-size profile picture, then click download." }
    ],
    faqs: [
      { question: "Can I view profile pictures of private accounts?", answer: "Yes. Profile pictures are always public on Instagram, so you can view and download them in high resolution even for private profiles." },
      { question: "Is this tool free?", answer: "Yes, viewing and saving profile pictures is 100% free and unlimited." }
    ]
  },
  {
    name: "SoundCloud to MP3",
    slug: "soundcloud-mp3-downloader",
    icon: "soundcloud",
    color: "#FF5500",
    description: "Convert and download SoundCloud tracks as high-quality MP3 files.",
    longDescription: "Extract and convert SoundCloud tracks to high-quality MP3 files (up to 320kbps) with FastVideoS. Our tool lets you easily save tracks and sets for offline playback on any device.",
    features: ["Convert SoundCloud to MP3 (128kbps/320kbps)", "Preserves track metadata", "Extract tracks fast", "No login required", "Works on mobile & desktop", "Completely free"],
    supportedFormats: ["MP3", "M4A"],
    steps: [
      { title: "Copy SoundCloud Link", description: "Find the track or podcast on SoundCloud and copy its URL." },
      { title: "Paste Link", description: "Paste the SoundCloud link into the download box above." },
      { title: "Convert to MP3", description: "Select MP3 as the output format and click download to save the track." }
    ],
    faqs: [
      { question: "Can I download tracks offline?", answer: "Yes, converting SoundCloud tracks to MP3 allows you to listen offline on any player." },
      { question: "Is there any duration limit?", answer: "No, you can download tracks of any length, including long podcasts or DJ sets." }
    ]
  },
  {
    name: "Instagram Post",
    slug: "instagram-post-downloader",
    icon: "instagram",
    color: "#E4405F",
    description: "Download Instagram posts, photos, and carousel slides in high resolution.",
    longDescription: "FastVideoS is a free online Instagram Post Downloader that lets you download any public IG post, single photo, video, or multi-slide carousel to your device in high-definition quality. No login required.",
    features: ["Save single photos and videos", "Download multi-image carousels", "HD image quality preserved", "No sign-up or accounts needed", "Works on mobile, tablet, and PC", "Fast & secure processing"],
    supportedFormats: ["JPG", "MP4"],
    steps: [
      { title: "Copy the Instagram post link", description: "Open the Instagram post you want to download, tap the menu button (three dots), and click 'Copy Link'." },
      { title: "Paste the URL", description: "Return to FastVideoS and paste the copied link into the input field at the top." },
      { title: "Download post media", description: "Click 'Extract Media', preview the post slides, and download the individual files to your device." }
    ],
    faqs: [
      { question: "Can I download multiple photos from a carousel post?", answer: "Yes! When you paste a carousel link, FastVideoS detects all slides, allowing you to select and download each image or video individually." },
      { question: "Do I need to log in with my Instagram credentials?", answer: "No. FastVideoS is completely stateless and anonymous; we never ask for your username or password." },
      { question: "Does it work for private posts?", answer: "No. For compliance and privacy, this tool only extracts media from publicly accessible Instagram posts." }
    ]
  },
  {
    name: "Instagram Photo",
    slug: "instagram-photo-downloader",
    icon: "instagram",
    color: "#E4405F",
    description: "Save high-quality photos and images from Instagram posts online.",
    longDescription: "Download Instagram photos, profile images, and carousel pictures in their original full size and resolution with FastVideoS. Safe, quick, and free.",
    features: ["Save original high-res photos", "Download carousel image slides", "No signup or account registration", "Instant download link generation", "Works on all modern web browsers", "Safe, anonymous extraction"],
    supportedFormats: ["JPG", "PNG"],
    steps: [
      { title: "Copy the photo link", description: "Find the Instagram post containing the photo, tap the share icon, and select 'Copy Link'." },
      { title: "Paste URL in FastVideoS", description: "Paste the copied photo URL into our input box above." },
      { title: "Save the image", description: "Click 'Extract Media' to load the full-res photo preview, then click the download button to save." }
    ],
    faqs: [
      { question: "What is the resolution of downloaded photos?", answer: "FastVideoS downloads photos in the highest resolution served by Instagram, typically up to 1080x1080 pixels for square images." },
      { question: "Can I save pictures on my iPhone or Android?", answer: "Yes! Our web utility works on iOS and Android devices directly inside Safari, Chrome, or any other browser." },
      { question: "Is there any limit to the number of photo downloads?", answer: "No. You can download as many Instagram photos as you want, completely free of charge." }
    ]
  },
  {
    name: "Instagram Video",
    slug: "instagram-video-downloader",
    icon: "instagram",
    color: "#E4405F",
    description: "Download Instagram feed videos and video posts in MP4 format.",
    longDescription: "Save public Instagram videos directly to your device with FastVideoS. Extract and download IG feed videos in MP4 format in full HD quality without any watermarks or signups.",
    features: ["Download feed videos in HD MP4", "No watermarks or quality loss", "Works on mobile, desktop, and tablet", "Quick direct download link generation", "Anonymous and secure", "No Instagram login required"],
    supportedFormats: ["MP4"],
    steps: [
      { title: "Copy video link", description: "Locate the Instagram video post, tap the three dots or share menu, and select 'Copy Link'." },
      { title: "Paste URL", description: "Paste the copied video link into the download form on FastVideoS." },
      { title: "Download video", description: "Click 'Extract Media' to display the video player preview, then click download to save the MP4." }
    ],
    faqs: [
      { question: "Can I convert Instagram videos to MP3?", answer: "Yes. After extracting the video, FastVideoS will display the audio-only option if available, allowing you to download the audio track as an MP3." },
      { question: "What video formats are supported?", answer: "We extract and serve the videos in MP4 format, ensuring universal compatibility across all media players." },
      { question: "Are video downloads anonymous?", answer: "Absolutely. FastVideoS does not share your IP address or activities with Instagram; downloads are fully private." }
    ]
  },
  {
    name: "Instagram Profile Picture",
    slug: "instagram-profile-picture-downloader",
    icon: "instagram",
    color: "#E4405F",
    description: "Download Instagram profile pictures (DP) in full size and high resolution.",
    longDescription: "Save full-size profile pictures from any Instagram account. FastVideoS lets you search for any Instagram user to view and download their profile picture in full HD resolution. Works for both public and private profiles.",
    features: ["Download full-size profile photos", "High-definition quality output", "Works on public and private accounts", "Simple username or link lookup", "No login required", "Totally free and anonymous"],
    supportedFormats: ["JPG", "PNG"],
    steps: [
      { title: "Copy Profile URL or username", description: "Copy the profile page link of the user or note their exact Instagram username." },
      { title: "Paste Profile details", description: "Paste the profile URL or username into the downloader box on FastVideoS." },
      { title: "Save the profile photo", description: "Click 'Extract Media', view the full-size DP, and download it directly to your device." }
    ],
    faqs: [
      { question: "Can I save DPs of private profiles?", answer: "Yes. Since Instagram profile pictures are publicly visible by default, our tool can extract and download full-size DPs even for private accounts." },
      { question: "Is it anonymous to download a profile picture?", answer: "Yes. The user will never be notified that you viewed or downloaded their profile picture." },
      { question: "Do I need to sign up to use this?", answer: "No. No registrations or user accounts are required." }
    ]
  },
  {
    name: "Instagram Profile",
    slug: "instagram-profile-downloader",
    icon: "instagram",
    color: "#E4405F",
    description: "Download media, posts, and details from public Instagram profiles.",
    longDescription: "Easily download posts, reels, and stories from public Instagram profiles. Enter the profile link to view and save public media streams to your device instantly.",
    features: ["Browse and download profile posts", "View reels and feed videos", "No login or password needed", "Download files in original resolution", "Quick layout extraction", "Completely free online tool"],
    supportedFormats: ["MP4", "JPG"],
    steps: [
      { title: "Copy the Profile URL", description: "Navigate to the public Instagram profile in your browser and copy its URL." },
      { title: "Paste the URL", description: "Paste the profile link into the extraction input field at the top." },
      { title: "Select and download posts", description: "Click 'Extract Media' to preview recent posts and download the media items you want." }
    ],
    faqs: [
      { question: "Can I download private profiles?", answer: "No. Out of respect for user privacy and platform compliance, we only extract media from public profiles." },
      { question: "How many posts can I download at once?", answer: "You can download posts individually from the profile feed extraction. There is no daily download limit." }
    ]
  },
  {
    name: "YouTube Shorts",
    slug: "youtube-shorts-downloader",
    icon: "youtube",
    color: "#FF0000",
    description: "Download YouTube Shorts videos in high quality MP4 format.",
    longDescription: "FastVideoS YouTube Shorts Downloader lets you download vertical YouTube Shorts videos in high definition. Save Shorts as MP4 with audio directly to your phone or computer.",
    features: ["Download Shorts in HD quality", "Save as compatible MP4 format", "Extract audio tracks as MP3", "No registration required", "Fast download speeds", "Works on mobile and desktop"],
    supportedFormats: ["MP4", "MP3"],
    steps: [
      { title: "Copy the Shorts link", description: "Open the YouTube Short, click the 'Share' button, and copy the video URL." },
      { title: "Paste into FastVideoS", description: "Paste the Shorts link into the input field above. The platform is detected automatically." },
      { title: "Download", description: "Select the desired video quality and click download to save the MP4 file." }
    ],
    faqs: [
      { question: "Can I download Shorts in Full HD?", answer: "Yes, we download the highest resolution available on YouTube's servers, which is typically 1080p for Shorts." },
      { question: "Can I extract audio from YouTube Shorts?", answer: "Yes, you can extract the audio track and download it as an MP3 file." },
      { question: "Do you charge anything for Shorts downloads?", answer: "No. The service is 100% free and unlimited." }
    ]
  },
  {
    name: "YouTube Audio",
    slug: "youtube-audio-downloader",
    icon: "youtube",
    color: "#FF0000",
    description: "Extract and download high-quality audio tracks from YouTube videos.",
    longDescription: "Extract high-fidelity audio streams from YouTube videos online. Save soundtracks, music, lectures, and podcasts as MP3 or M4A files for offline listening.",
    features: ["High-fidelity audio extraction", "Convert YouTube to MP3/M4A", "Fast extraction speeds", "Works with long videos", "No account required", "Mobile-optimized interface"],
    supportedFormats: ["MP3", "M4A"],
    steps: [
      { title: "Copy video link", description: "Find the YouTube video containing the audio you want and copy its URL." },
      { title: "Paste into the downloader", description: "Return to FastVideoS and paste the YouTube link into the input field." },
      { title: "Save audio track", description: "Select the audio quality (e.g. 128kbps or 320kbps) and download the MP3 or M4A file." }
    ],
    faqs: [
      { question: "What audio formats are supported?", answer: "We support extracting audio in MP3 and M4A formats for broad device compatibility." },
      { question: "Can I download audio from long videos?", answer: "Yes, you can extract audio from videos of any length, including 1-hour or longer lectures." },
      { question: "Is the audio quality high?", answer: "Yes, we extract the highest bitrate audio stream available from the source video." }
    ]
  },
  {
    name: "YouTube to MP3",
    slug: "youtube-to-mp3-downloader",
    icon: "youtube",
    color: "#FF0000",
    description: "Convert YouTube videos to high-quality MP3 audio files.",
    longDescription: "FastVideoS is a free online YouTube to MP3 converter. Convert any YouTube video to an offline MP3 audio track in high quality (up to 320kbps) instantly.",
    features: ["High-bitrate MP3 conversion", "Fast cloud-based extraction", "No registrations or plugins", "Works on iOS, Android, and PC", "Supports videos of any length", "100% safe and secure"],
    supportedFormats: ["MP3", "M4A"],
    steps: [
      { title: "Copy the YouTube link", description: "Find the video on YouTube and copy its URL from the address bar or share sheet." },
      { title: "Paste and extract", description: "Paste the YouTube URL in the downloader input above to retrieve format options." },
      { title: "Download MP3", description: "Select your desired MP3 audio quality and click download to convert and save." }
    ],
    faqs: [
      { question: "What bitrates are supported?", answer: "We extract the best available audio streams, offering download options for standard 128kbps and premium 320kbps bitrates depending on the source." },
      { question: "Can I use this on my iPhone?", answer: "Yes, our web converter works directly in Safari on iOS, allowing you to save audio files straight to your device." },
      { question: "Are there duration limits for MP3 conversion?", answer: "No, you can convert videos of any length, including playlists (one-by-one) and long mix tapes." }
    ]
  },
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((p) => p.slug === slug);
}

export function getAllPlatformSlugs(): string[] {
  return platforms.map((p) => p.slug);
}
