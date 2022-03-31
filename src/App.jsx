import { useAddress, useMetamask } from '@thirdweb-dev/react';

const App = () => {
	console.log('hello');
	const address = useAddress();
	const connectWithMetamask = useMetamask();
	console.log('address:', address);

	if (!address) {
		return (
			<div className="landing">
				<h1>Welcome to Disney Smash or Pass DAO</h1>
				<button onClick={connectWithMetamask} className="btn-hero">
					Connect your wallet
				</button>
			</div>
		);
	}

	// this is the case where we have the user's address
	// which means they've connected their wallet to our site
	return (
		<div className="landing">
			<h1>wallet connected, now what!</h1>
		</div>
	);
};

export default App;
