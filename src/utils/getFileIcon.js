export const getFileIcon = (type, extension) => {
  if (type === "directory") return "📁";
  if (!extension) return "📄";

  const ext = extension.toLowerCase();

  // Video
  if ([".mp4", ".mov", ".avi", ".mkv", ".webm", ".wmv"].includes(ext))
    return "🎬";
  // Image
  if (
    [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico"].includes(
      ext,
    )
  )
    return "🖼️";
  // Audio
  if ([".mp3", ".wav", ".ogg", ".m4a", ".flac"].includes(ext)) return "🎵";
  // Documents
  if ([".pdf"].includes(ext)) return "📕";
  if ([".doc", ".docx", ".txt", ".rtf"].includes(ext)) return "📝";
  if ([".xls", ".xlsx", ".csv"].includes(ext)) return "📊";
  // Code
  if ([".js", ".jsx", ".html", ".css", ".json", ".py", ".java"].includes(ext))
    return "💻";
  // Archive
  if ([".zip", ".rar", ".7z", ".tar", ".gz"].includes(ext)) return "📦";

  return "📄";
};
