import fs from 'fs';
const file = './src/models/usuarios.json';

export const getUsuarios = () => {
  try {
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

export const saveUsuarios = (usuarios) => {
  fs.writeFileSync(file, JSON.stringify(usuarios, null, 2));
};
