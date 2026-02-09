export interface LyricLine {
  time: number; // Time in seconds
  text: string;
}

export const parseLrc = (lrc: string): LyricLine[] => {
  if (!lrc) return [];

  const lines = lrc.split('\n');
  const result: LyricLine[] = [];
  const timeReg = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?\]/g;

  lines.forEach((line) => {
    // Reset regex state
    timeReg.lastIndex = 0;

    // Check if line contains time tags
    const matches = line.match(timeReg);
    if (!matches) return;

    const text = line.replace(timeReg, '').trim();
    if (!text) return; // Skip empty lines

    // A line might have multiple time tags, e.g. [00:01.00][00:03.00]Hello
    let match;
    while ((match = timeReg.exec(line)) !== null) {
      const min = parseInt(match[1]);
      const sec = parseInt(match[2]);
      const ms = match[4] ? parseInt(match[4].padEnd(3, '0')) : 0;

      const time = min * 60 + sec + ms / 1000;
      result.push({ time, text });
    }
  });

  return result.sort((a, b) => a.time - b.time);
};
