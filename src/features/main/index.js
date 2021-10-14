import React from 'react';
import GamePlayer from "../gamePlayer";
import {Link} from "react-router-dom";

function Home() {
    return (
        <main className="lottery_wrapper">
            {/*<Title/>*/}
            <div className="backstage-load">
                <Link to='/backstage'>
                    后台
                </Link>
            </div>
            <div className="game-container">
                <GamePlayer/>
                {/*<MessageTable/>*/}
            </div>
        </main>
    )
}

export default Home;