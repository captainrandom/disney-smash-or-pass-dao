import {useAddress, useMetamask, useEditionDrop, useToken, useVote} from '@thirdweb-dev/react';
import {useState, useEffect, useMemo} from 'react';
import {AddressZero} from "@ethersproject/constants";
import SmashOrPassChooser from "./components/smash-or-pass-chooser";

const App = () => {
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    console.log('address:', address);

    const editionDrop = useEditionDrop("0x5881a8beEBf66f8bEbd17Ec56AD831a2B25f15dd");
    const token = useToken("0xABb69D3627428ae66F9edBFc1BeBE552aebc0943");
    const vote = useVote("0x8b20F39D3356c10f678B2b1e1adb07f2D1127B58");

    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);

    const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
    const [memberAddresses, setMemberAddresses] = useState([]);

    const shortenAddress = (str) => {
        return str.substring(0, 6) + "..." + str.substring(str.length - 4);
    };

    const [proposals, setProposals] = useState([]);
    const [isVoting, setIsVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        const getAllProposals = async () => {
            try {
                const proposals = await vote.getAll();
                setProposals(proposals);
            } catch (error) {
                console.error("failed to get proposals", error);
            }
        };
        getAllProposals();
    }, [hasClaimedNFT, vote]);

    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        if (!proposals.length) {
            return;
        }

        const checkIfUserHasVoted = async () => {
            try {
                const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
                setHasVoted(hasVoted);
                if (hasVoted) {
                    console.log("user has already voted");
                } else {
                    console.log("user has not voted yet");
                }
            } catch (error) {
                console.error("Failed to check if wallet has voted", error);
            }
        };
        checkIfUserHasVoted();
    }, [hasClaimedNFT, proposals, address, vote]);

    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        const getAllAddresses = async () => {
            try {
                const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
                setMemberAddresses(memberAddresses);
                console.log("Member addresses", memberAddresses);
            } catch (error) {
                console.error("failed to get memeber list", error);
            }
        };
        getAllAddresses();
    }, [hasClaimedNFT, editionDrop.history]);

    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        const getAllBalances = async () => {
            try {
                const amounts = await token.history.getAllHolderBalances();
                setMemberTokenAmounts(amounts);
                console.log("Amounts", amounts);
            } catch (error) {
                console.error("failed to get member  balances", error);
            }
        };
        getAllBalances();
    }, [hasClaimedNFT, token.history]);

    const memberList = useMemo(() => {
        return memberAddresses.map((address) => {
            const member = memberTokenAmounts?.find(({holder}) => holder === address);
            return {
                address,
                tokenAmount: member?.balance.displayValue || "0",
            }
        });
    }, [memberAddresses, memberTokenAmounts]);


    useEffect(() => {
        if (!address) {
            return;
        }

        const checkBalance = async () => {
            try {
                const balance = await editionDrop.balanceOf(address, 0);
                if (balance.gt(0)) {
                    setHasClaimedNFT(true);
                    console.log("this user has a membership NFT!");
                } else {
                    setHasClaimedNFT(false);
                    console.log("this user doesn't have a membership NFT.");
                }
            } catch (error) {
                setHasClaimedNFT(false);
                console.error("Failed to get balance", error);
            }
        };
        checkBalance();
    }, [address, editionDrop]);

    const mintNft = async () => {
        try {
            setIsClaiming(true);
            await editionDrop.claim("0", 1);
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
            setHasClaimed(true);
        } catch (error) {
            setHasClaimedNFT(false);
            console.error("Failed to mint NFT", error);
        } finally {
            setIsClaiming(false);
        }
    };



    return (
        <div className="landing">
            <h1>Welcome to Disney Smash or Pass</h1>
            <SmashOrPassChooser/>
        </div>
    );
    /*

    if (!address) {
        return (
            <div className="landing">
                <h1>Welcome to Disney Smash or Pass DAO</h1>
                <button onClick={connectWithMetamask} className="btn-hero">
                    Connect your wallet
                </button>
                <div className="slideshow-container">

                    <div className="mySlides fade">
                        <div className="numbertext">1 / 3</div>
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"/>
                        <div className="text">Caption Text</div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">2 / 3</div>
                        <img src="https://www.industrialempathy.com/img/remote/ZiClJf-1280w.avif"/>
                        <div className="text">Caption Two</div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">3 / 3</div>
                        <img src="https://cdn.pixabay.com/photo/2022/03/09/15/15/breakfast-7058063_1280.jpg"/>
                        <div className="text">Caption Three</div>
                    </div>
                    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>
                </div>
            </div>
        );
    }

    // this is the case where we have the user's address
    // which means they've connected their wallet to our site
    // Add this little piece!
    if (hasClaimedNFT) {
        return (
            <div className="member-page">
                <h1>🍪DAO Member Page</h1>
                <p>Congratulations on being a member</p>
                <div>
                    <div>
                        <h2>Member List</h2>
                        <table className="card">
                            <thead>
                            <tr>
                                <th>Address</th>
                                <th>Token Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {memberList.map((member) => {
                                return (
                                    <tr key={member.address}>
                                        <td>{shortenAddress(member.address)}</td>
                                        <td>{member.tokenAmount}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h2>Active Proposals</h2>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                //before we do async things, we want to disable the button to prevent double clicks
                                setIsVoting(true);

                                // lets get the votes from the form for the values
                                const votes = proposals.map((proposal) => {
                                    const voteResult = {
                                        proposalId: proposal.proposalId,
                                        //abstain by default
                                        vote: 2,
                                    };
                                    proposal.votes.forEach((vote) => {
                                        const elem = document.getElementById(
                                            proposal.proposalId + "-" + vote.type
                                        );

                                        if (elem.checked) {
                                            voteResult.vote = vote.type;
                                            return;
                                        }
                                    });
                                    return voteResult;
                                });

                                // first we need to make sure the user delegates their token to vote
                                try {
                                    //we'll check if the wallet still needs to delegate their tokens before they can vote
                                    console.log('delegation address', address);
                                    const delegation = await token.getDelegationOf(address);
                                    console.log('delegation', delegation);
                                    console.log('AddressZero', AddressZero);
                                    // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
                                    if (delegation === AddressZero) {
                                        //if they haven't delegated their tokens yet, we'll have them delegate them before voting
                                        await token.delegateTo(address);
                                    }
                                    // then we need to vote on the proposals
                                    try {
                                        await Promise.all(
                                            votes.map(async ({proposalId, vote: _vote}) => {
                                                // before voting we first need to check whether the proposal is open for voting
                                                // we first need to get the latest state of the proposal
                                                const proposal = await vote.get(proposalId);
                                                // then we check if the proposal is open for voting (state === 1 means it is open)
                                                if (proposal.state === 1) {
                                                    // if it is open for voting, we'll vote on it
                                                    return vote.vote(proposalId, _vote);
                                                }
                                                // if the proposal is not open for voting we just return nothing, letting us continue
                                                return;
                                            })
                                        );
                                        try {
                                            // if any of the propsals are ready to be executed we'll need to execute them
                                            // a proposal is ready to be executed if it is in state 4
                                            await Promise.all(
                                                votes.map(async ({proposalId}) => {
                                                    // we'll first get the latest state of the proposal again, since we may have just voted before
                                                    const proposal = await vote.get(proposalId);

                                                    //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
                                                    if (proposal.state === 4) {
                                                        return vote.execute(proposalId);
                                                    }
                                                })
                                            );
                                            // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
                                            setHasVoted(true);
                                            // and log out a success message
                                            console.log("successfully voted");
                                        } catch (err) {
                                            console.error("failed to execute votes", err);
                                        }
                                    } catch (err) {
                                        console.error("failed to vote", err);
                                    }
                                } catch (err) {
                                    console.error("failed to delegate tokens", err);
                                    console.trace("failed to delegate tokens", err);
                                } finally {
                                    // in *either* case we need to set the isVoting state to false to enable the button again
                                    setIsVoting(false);
                                }
                            }}
                        >
                            {proposals.map((proposal) => (
                                <div key={proposal.proposalId} className="card">
                                    <h5>{proposal.description}</h5>
                                    <div>
                                        {proposal.votes.map(({type, label}) => (
                                            <div key={type}>
                                                <input
                                                    type="radio"
                                                    id={proposal.proposalId + "-" + type}
                                                    name={proposal.proposalId}
                                                    value={type}
                                                    //default the "abstain" vote to checked
                                                    defaultChecked={type === 2}
                                                />
                                                <label htmlFor={proposal.proposalId + "-" + type}>
                                                    {label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button disabled={isVoting || hasVoted} type="submit">
                                {isVoting
                                    ? "Voting..."
                                    : hasVoted
                                        ? "You Already Voted"
                                        : "Submit Votes"}
                            </button>
                            {!hasVoted && (
                                <small>
                                    This will trigger multiple transactions that you will need to
                                    sign.
                                </small>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="landing">
                <h1>Mint your free 🍪DAO Membership NFT</h1>
                <button
                    disabled={isClaiming}
                    onClick={mintNft}
                >
                    {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
                </button>
            </div>
        );
    }

     */
};

export default App;
