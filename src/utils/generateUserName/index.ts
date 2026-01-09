export function generateUserName(): string {
  const adjectives = ['Quick', 'Bright', 'Swift', 'Bold', 'Calm', 'Eager', 'Gentle', 'Happy'];
  const nouns = ['Fox', 'Eagle', 'Lion', 'Bear', 'Wolf', 'Hawk', 'Tiger', 'Panda'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);
  
  return `${adjective}${noun}${number}`;
}
