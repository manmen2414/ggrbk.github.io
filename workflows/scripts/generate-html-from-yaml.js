const fs = require('fs');
const yaml = require('js-yaml');

const template = `\
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta property="og:type" content="website">
  <meta property="og:description" content="DESCRIPTION_PLACEHOLDER">
  <title>GooglingGo!Japan</title>
</head>
<body onload="location.href = '/' + location.hash">
</body>
</html>
`;

const familyYaml = fs.readFileSync('family.yaml', 'utf8');
const familyData = yaml.load(familyYaml);

Object.entries(familyData).forEach(([key, value]) => {
  const htmlContent = template.replace('DESCRIPTION_PLACEHOLDER', value);
  fs.writeFileSync(`${key}.html`, htmlContent);
  console.log(`Generated ${key}.html with description: ${value}`);
});
