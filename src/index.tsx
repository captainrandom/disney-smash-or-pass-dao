import React from 'react';
import NFTAnimationApp from "./NFT-AnimationApp";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root')
// @ts-ignore
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <NFTAnimationApp/>
        </BrowserRouter>
    </React.StrictMode>
);