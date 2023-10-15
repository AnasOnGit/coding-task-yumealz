"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
var google_1 = require("next/font/google");
// theme
var theme_provider_1 = require("@/components/theme-provider");
var Header_1 = require("@/components/Header");
// toast
var toaster_1 = require("@/components/ui/toaster");
var cuprum = google_1.Cuprum({ subsets: ['latin'] });
exports.metadata = {
    title: 'Yumealz Interview Task',
    description: 'Yumealz Interview Task'
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", suppressHydrationWarning: true },
        React.createElement("body", { className: cuprum.className },
            React.createElement(theme_provider_1.ThemeProvider, { attribute: "class", defaultTheme: "dark", enableSystem: true, disableTransitionOnChange: true },
                React.createElement(Header_1["default"], null),
                children,
                React.createElement(toaster_1.Toaster, null)))));
}
exports["default"] = RootLayout;
