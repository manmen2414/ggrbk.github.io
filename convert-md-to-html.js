const fs = require('fs');
const path = require('path');
const showdown = require('showdown');
const yaml = require('js-yaml');
const format = require('html-format');

const converter = new showdown.Converter();

const template = fs.readFileSync('faq/.template.html', 'utf8');

const faqDir = 'faq';
const files = fs.readdirSync(faqDir);

files.forEach(file => {
  if (path.extname(file) === '.md') {
    const filePath = path.join(faqDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const [metadata, markdown] = content.split('---\n').slice(1);
    const meta = yaml.load(metadata);
    if (!meta.description) {
      console.error(`Invalid metadata in ${file}: missing description`);
      return;
    }
    if (!markdown) {
      console.error(`Invalid content in ${file}: missing markdown`);
      return;
    }
    const htmlContent = converter.makeHtml(markdown);
    const formattedHtmlContent = format(htmlContent, "  ").replace(/^/gm, "  ");
    const finalHtml = template
      .replace('<h2>テンプレート</h2>\n', '')
      .replace('<meta property="og:description" content="テンプレート">', `<meta property="og:description" content="${meta.description}">`)
      .replace(/<ul>[\n ]+<\/ul>/, `\n${formattedHtmlContent}`);
    const htmlFilePath = path.join(faqDir, file.replace('.md', '.html'));
    fs.writeFileSync(htmlFilePath, finalHtml);
  }
});
