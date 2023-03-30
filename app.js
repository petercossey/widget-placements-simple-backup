import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getPlacements from './lib/getPlacements.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = './data';

const bc_access_token = process.env['access_token']
const bc_store_hash = process.env['store_hash']

if (!bc_access_token && !bc_store_hash) {
  console.error('Please set the access_token and store_hash environment variables.');
  process.exit(1);
}

async function fetchWidgetsAndSave(store_hash, access_token) {
  const widgetData = await getPlacements(store_hash, access_token);

  if (widgetData.data.length > 0) {
    const widgets = widgetData.data;

    widgets.forEach(widget => {
      const uuid = widget.uuid;
      const filePath = path.join(__dirname, "data", `${uuid}.json`);
      fs.writeFileSync(filePath, JSON.stringify(widget, null, 2));
      console.log(`Widgets saved to ${filePath}`);
    })

    console.log("Widget placement data saved");
  } else {
    console.error("Error: Unable to fetch data from the API or no data found");
  }
}

fetchWidgetsAndSave(bc_store_hash, bc_access_token)
