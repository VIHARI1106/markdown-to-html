// convert.js
import { readFile, writeFile } from 'fs/promises';
import { marked } from 'marked';
import path from 'path';

// Get CLI arguments
const inputPath = process.argv[2];
const outputPath = process.argv[3] || 'output.html';

try {
    const data = await readFile(inputPath, 'utf8');
    const htmlContent = marked(data);

    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Markdown Output</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
    </style>
</head>
<body>
${htmlContent}
</body>
</html>
`;

    await writeFile(outputPath, fullHtml);
    console.log(`✅ Markdown converted to HTML and saved to ${outputPath}`);
} catch (err) {
    console.error("❌ Error:", err.message);
}
