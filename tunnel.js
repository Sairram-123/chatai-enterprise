const localtunnel = require('localtunnel');

let activeTunnel = null;

async function startTunnel() {
  try {
    const tunnel = await localtunnel({ port: 3000, subdomain: 'chatai-enterprise' });
    activeTunnel = tunnel;
    console.log(`[Public Tunnel] Live URL: ${tunnel.url}`);

    tunnel.on('close', () => {
      console.log('[Public Tunnel] Closed. Reconnecting in 3s...');
      setTimeout(startTunnel, 3000);
    });

    tunnel.on('error', (err) => {
      console.error('[Public Tunnel] Error:', err.message);
      try { tunnel.close(); } catch (e) {}
      setTimeout(startTunnel, 3000);
    });
  } catch (err) {
    console.error('[Public Tunnel] Connection failed:', err.message, '. Retrying in 4s...');
    setTimeout(startTunnel, 4000);
  }
}

startTunnel();

// Keep process alive indefinitely
setInterval(() => {}, 1000 * 60 * 60);
