import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
// import { RefineKbar , } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, dataProvider, liveProvider} from "./providers";
import { Home, ForgetPassword ,Login , Register} from './pages';
import Layout from "./components/layout";
import { resources } from "./config/ressources";

// import EditPlayer from "./components/players/EditPlayer";
import Player from "./components/players/PlayerDetail"
import FootballField from "./components/terrain/heatMap";
import ChatbotComponent from "./components/chatbot/chatbot";
function App() {
  return (
    <BrowserRouter>
          <AntdApp>
            <DevtoolsProvider>
            <RefineKbarProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "rO1Cxe-ytqxK0-81aOzL",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" index element={<Register/>}/>
                  <Route path="/login" index element={<Login />}/>
                  <Route path="/forgot-password" index element={<ForgetPassword />}/>
                  <Route
                  element={
                    //I should add this after fixing the isuue of Cross Origin
                    // <Authenticated
                    //   key="authenticated-auth"
                    //   fallback={<CatchAllNavigate to="/login"/>}
                    // >
                      <Layout>
                    <Outlet />
                  </Layout>
                    // </Authenticated>
                  }
                >
                  <Route index element={<Home />}/>
                  {/* <Route path="/players" element={<PlayerTable />} /> */}
                  <Route path="/players" element={<Player />} />
                  {/* <Route path="/players/edit/:id" element={<EditPlayer />} /> */} 
                  
                  <Route path="/heatmap" element={<FootballField/>} />
                  <Route path="/chatbot" element={<ChatbotComponent/>}/>
                  
                  </Route>

                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
               

              </Refine>
              </RefineKbarProvider>
            </DevtoolsProvider>
          </AntdApp>
   
    </BrowserRouter>
  );
}

export default App;
