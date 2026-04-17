press ctrl+shift+I
then paste this code into the dev console:

  // Securly Disruption Script
(function() {
    console.log("Starting Securly disruption...");
    
    // Function to clear all cookies
    function clearCookies() {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
        }
        console.log("Cookies cleared");
    }
    
    // Function to set invalid cookies that might confuse Securly
    function setInvalidCookies() {
        const invalidCookies = [
            "securly_session=invalid;path=/;domain=." + window.location.hostname,
            "securly_token=expired;path=/;domain=." + window.location.hostname,
            "securly_check=disabled;path=/;domain=." + window.location.hostname,
            "__Secure-securly=corrupted;path=/;domain=." + window.location.hostname
        ];
        
        invalidCookies.forEach(cookie => {
            document.cookie = cookie;
        });
        console.log("Invalid cookies set");
    }
    
    // Function to attempt to disable Securly extension
    function disableSecurlyExtension() {
        // Try to remove Securly elements from DOM
        const securlyElements = document.querySelectorAll('[id*="securly"], [class*="securly"], [data-securly]');
        securlyElements.forEach(el => {
            el.remove();
        });
        
        // Try to override Securly functions if they exist
        if (window.securly) {
            window.securly = undefined;
        }
        
        // Try to disable Securly event listeners
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (type === 'securly' || (listener && listener.toString().includes('securly'))) {
                return;
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
        
        // Try to block Securly scripts
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
            const element = originalCreateElement.call(this, tagName);
            if (tagName.toLowerCase() === 'script') {
                const originalSetAttribute = element.setAttribute;
                element.setAttribute = function(name, value) {
                    if (name === 'src' && (value.includes('securly') || value.includes('filter'))) {
                        return;
                    }
                    return originalSetAttribute.call(this, name, value);
                };
            }
            return element;
        };
        
        console.log("Securly extension disruption attempted");
    }
    
    // Function to prevent Securly from reloading
    function preventSecurlyReload() {
        const originalReload = location.reload;
        location.reload = function() {
            console.log("Securly reload blocked");
            return false;
        };
        
        // Override beforeunload to prevent Securly warnings
        window.addEventListener('beforeunload', function(e) {
            if (e && e.message && e.message.includes('securly')) {
                e.preventDefault = function() { return false; };
                e.returnValue = undefined;
            }
        });
        
        console.log("Securly reload prevention enabled");
    }
    
    // Execute all functions
    clearCookies();
    setInvalidCookies();
    disableSecurlyExtension();
    preventSecurlyReload();
    
    // Set up interval to repeatedly disrupt Securly
    setInterval(function() {
        clearCookies();
        setInvalidCookies();
        disableSecurlyExtension();
        console.log("Securly disruption repeated");
    }, 5000);
    
    console.log("Securly disruption script loaded successfully");
})();
