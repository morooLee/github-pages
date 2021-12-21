export default function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return 'hsl(' + hue + ', 100%, 80%)';
}
