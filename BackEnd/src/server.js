import app from "./config/app.js";
import { colors } from "./utils/colors.js";

const startServer = () => {
  try {
    // API_PORT prioritaire : évite un conflit si PORT est déjà défini pour le front
    const PORT = process.env.API_PORT || process.env.PORT || 3001;
    app.listen(PORT, (error) => {
      if (error) {
        console.error(`${colors.red}❌ Impossible d'écouter sur le port ${PORT} : ${error.message}${colors.reset}`);
        process.exit(1);
      }
      console.log(`${colors.blue}
      ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
      ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
      ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
      ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
      ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
      ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝${colors.reset}
      ${colors.green}🚀 Portfolio API running on http://localhost:${PORT}${colors.reset}
      `);
    });
  } catch (error) {
    console.error("Échec du démarrage du serveur:", error);
    process.exit(1);
  }
};

startServer();
