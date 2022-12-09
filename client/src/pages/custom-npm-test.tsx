const react = require("react");

//package
function CustomTag(props: { textToUrl: string }) {
  const monsterText = props.textToUrl.matchAll(/<ddb> (.*?) <\/ddb>/g);
  const monster = Array.from(monsterText, (x) => x[1]);
  const url = `https://www.dndbeyond.com/monsters/${monster[0]}`;

  return <a href={url}>{monster}</a>;
}

export default CustomTag;
