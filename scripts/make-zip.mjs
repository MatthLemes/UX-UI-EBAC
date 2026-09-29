import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();

function addDirectoryToZip(dirPath, zipFolder) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (item === 'node_modules' || item === 'dist' || item === '.git' || item === 'public') continue;
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subFolder = zipFolder.folder(item);
      addDirectoryToZip(fullPath, subFolder);
    } else {
      const content = fs.readFileSync(fullPath);
      zipFolder.file(item, content);
    }
  }
}

const rootDir = process.cwd();
addDirectoryToZip(rootDir, zip);

// Also add a friendly README for Matheus
zip.file(
  'README_BEHANCE.md',
  `# Ket - App Mobile para Cálculos no Supermercado
Case Study UX/UI por Matheus Lemes (EBAC)

## Como Rodar Localmente:
1. Instale as dependências: npm install
2. Inicie o servidor de desenvolvimento: npm run dev
3. Acesse no navegador: http://localhost:3000

## Assets para Behance:
- Os mockups em alta resolução estão disponíveis na pasta /src/assets/images
- Toda a documentação e heurísticas de usabilidade estão em /src/components/CaseStudyModal.tsx
`
);

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }).then((buffer) => {
  fs.writeFileSync('public/ket-supermercado-source.zip', buffer);
  console.log('Zip file created at public/ket-supermercado-source.zip (Size:', buffer.length, 'bytes)');
});
