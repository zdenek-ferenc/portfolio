const fs = require('fs');
const path = require('path');

const files = [
  'components/about-me.tsx',
  'components/bento-grid.tsx',
  'components/bento-tile.tsx',
  'components/footer.tsx',
  'components/project-card.tsx',
  'components/projects-section.tsx',
  'components/services-section.tsx',
  'components/services/service-card.tsx',
  'components/timeline.tsx'
];

files.forEach(file => {
  const filePath = path.join('/Users/zdenekferenc/Desktop/portfolio', file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all elements that have whileInView.
  // We'll replace `className="` with `className="mobile-no-animate ` 
  // on elements that are likely animated.
  // A safer regex: find `className="` and add `mobile-no-animate ` to it for ALL motion elements.
  // Actually, let's just add `mobile-no-animate` to any className inside a <motion.div, <motion.p, <motion.button, <motion.a
  
  content = content.replace(/<motion\.([a-zA-Z]+)([\s\S]*?)className="([^"]*)"/g, (match, tag, before, classNames) => {
    if (!classNames.includes('mobile-no-animate')) {
      return `<motion.${tag}${before}className="mobile-no-animate ${classNames}"`;
    }
    return match;
  });

  // What if className is using curly braces? className={`...`}
  content = content.replace(/<motion\.([a-zA-Z]+)([\s\S]*?)className=\{`([^`]+)`\}/g, (match, tag, before, classNames) => {
    if (!classNames.includes('mobile-no-animate')) {
      return `<motion.${tag}${before}className={\`mobile-no-animate ${classNames}\`}`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log("Done");
