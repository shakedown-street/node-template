import path from 'path';

export const BASE_DIR = __dirname;

export const SERVER_PORT = 3000;

export const STATIC_DIR = path.join(BASE_DIR, 'static');
export const STATIC_URL = '/static';

export const TEMPLATE_DIR = path.join(BASE_DIR, 'templates');
