// Securly Cookie Corruption Script
(function() {
    // Find all cookies related to Securly
    var cookies = document.cookie.split(";");
    
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        
        // Target Securly-related cookies
        if (name.includes("securly") || name.includes("SECURLY") || 
            name.includes("filter") || name.includes("FILTER")) {
            
            // Corrupt the cookie by setting it to an invalid value
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            document.cookie = name + "=corrupted; path=/";
            
            // Try multiple paths to ensure the cookie is corrupted
            document.cookie = name + "=corrupted; path=/; domain=" + window.location.hostname;
            document.cookie = name + "=corrupted; path=/; domain=." + window.location.hostname;
        }
    }
    
    // Clear localStorage and sessionStorage for Securly
    try {
        for (var key in localStorage) {
            if (key.includes("securly") || key.includes("SECURLY") || 
                key.includes("filter") || key.includes("FILTER")) {
                localStorage.removeItem(key);
                localStorage.setItem(key, "corrupted");
            }
        }
        
        for (var key in sessionStorage) {
            if (key.includes("securly") || key.includes("SECURLY") || 
                key.includes("filter") || key.includes("FILTER")) {
                sessionStorage.removeItem(key);
                sessionStorage.setItem(key, "corrupted");
            }
        }
    } catch (e) {
        console.log("Error accessing storage:", e);
    }
    
    console.log("Securly cookies and storage corrupted");
})();
