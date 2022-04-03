import React from 'react';
import './index.css';

// Import thirdweb provider and Rinkeby ChainId
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createRoot} from "react-dom/client";
import App from "./App";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

// Wrap your app with the thirdweb provider
const container = document.getElementById('root')
// @ts-ignore
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ThirdwebProvider desiredChainId={activeChainId}>
            <App/>
        </ThirdwebProvider>
    </React.StrictMode>,
);