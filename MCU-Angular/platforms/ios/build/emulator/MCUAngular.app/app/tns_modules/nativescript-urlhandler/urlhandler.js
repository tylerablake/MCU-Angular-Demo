"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("application");
var urlhandler_common_1 = require("./urlhandler.common");
var urlhandler_common_2 = require("./urlhandler.common");
exports.handleOpenURL = urlhandler_common_2.handleOpenURL;
var UrlHandlerAppDelegate = (function (_super) {
    __extends(UrlHandlerAppDelegate, _super);
    function UrlHandlerAppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlHandlerAppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        if (launchOptions != null) {
            var urlOptions = launchOptions.valueForKey('UIApplicationLaunchOptionsURLKey');
            if (urlOptions) {
                var appURL = urlhandler_common_1.extractAppURL(urlOptions);
                if (appURL != null) {
                    urlhandler_common_1.getCallback()(appURL);
                }
            }
        }
        return true;
    };
    UrlHandlerAppDelegate.prototype.applicationOpenURLOptions = function (application, url, options) {
        var appURL = urlhandler_common_1.extractAppURL(url.absoluteString);
        if (appURL != null) {
            urlhandler_common_1.getCallback()(urlhandler_common_1.extractAppURL(appURL));
        }
        return true;
    };
    UrlHandlerAppDelegate.ObjCProtocols = [UIApplicationDelegate];
    return UrlHandlerAppDelegate;
}(UIResponder));
exports.UrlHandlerAppDelegate = UrlHandlerAppDelegate;
application.ios.delegate = UrlHandlerAppDelegate;
//# sourceMappingURL=urlhandler.js.map