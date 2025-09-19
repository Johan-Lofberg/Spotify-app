export const formatTime = (ms) => {
  if (!ms && ms !== 0) return "0:00";
  
  const totalSeconds = Math.floor(ms / 1000); // ✅ från ms → s
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${paddedSeconds}`;
};
