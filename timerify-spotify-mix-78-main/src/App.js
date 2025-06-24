"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toaster_1 = require("@/components/ui/toaster");
var sonner_1 = require("@/components/ui/sonner");
var tooltip_1 = require("@/components/ui/tooltip");
var react_query_1 = require("@tanstack/react-query");
var react_router_dom_1 = require("react-router-dom");
var SettingsContext_1 = require("./contexts/SettingsContext");
var Index_1 = require("./pages/Index");
var queryClient = new react_query_1.QueryClient();
var App = function () { return (<react_query_1.QueryClientProvider client={queryClient}>
    <SettingsContext_1.SettingsProvider>
      <tooltip_1.TooltipProvider>
        <toaster_1.Toaster />
        <sonner_1.Toaster />
        <react_router_dom_1.BrowserRouter>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<Index_1.default />}/>
          </react_router_dom_1.Routes>
        </react_router_dom_1.BrowserRouter>
      </tooltip_1.TooltipProvider>
    </SettingsContext_1.SettingsProvider>
  </react_query_1.QueryClientProvider>); };
exports.default = App;
