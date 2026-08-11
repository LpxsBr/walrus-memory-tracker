#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = __dirname;
const buildDir = path.join(projectRoot, 'build');
const srcDir = path.join(projectRoot, 'src');

// Remove old build
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true });
}

// Create build directory
fs.mkdirSync(buildDir, { recursive: true });

// Compile TypeScript
console.log('Compilando TypeScript...');
try {
  execSync(
    `npx tsc --project tsconfig.simple.json`,
    {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true
    }
  );
  console.log('✓ Compilação concluída!');
} catch (error) {
  console.error('✗ Erro na compilação:', error.message);
  process.exit(1);
}

// Verify build was created
if (fs.existsSync(buildDir) && fs.readdirSync(buildDir).length > 0) {
  console.log('✓ Arquivos gerados em:', buildDir);
  console.log('  Arquivos:', fs.readdirSync(buildDir).join(', '));
} else {
  console.error('✗ Nenhum arquivo foi gerado!');
  process.exit(1);
}
