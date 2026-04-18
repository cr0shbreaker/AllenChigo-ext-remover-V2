import java.awt.Desktop;
import java.net.URI;

public class OnevOneLauncher {
    public static void main(String[] args) {
        try {
            // The URL for 1v1.lol
            String url = "https://1v1.lol";
            
            if (Desktop.isDesktopSupported()) {
                Desktop desktop = Desktop.getDesktop();
                desktop.browse(new URI(url));
                System.out.println("Launching 1v1.lol...");
            } else {
                // For Linux systems where Desktop might not be supported
                Runtime runtime = Runtime.getRuntime();
                runtime.exec("xdg-open " + url);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
