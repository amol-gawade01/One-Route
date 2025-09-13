import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";
import UserContext from "../context/UserContext";
import CaptainContext from "../context/CaptainContext";


const main = () => {
  
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <CaptainContext>
     <UserContext>

    
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
      </CaptainContext> 
    </StrictMode>
  );
};

main();

export default main;
