export default function randomId() {
  return Math.floor(new Date().getTime() * Math.random());
}
