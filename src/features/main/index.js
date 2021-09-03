import React from 'react';
import GamePlayer from "../gamePlayer";

function Home() {
    return (
        <main className="lottery_wrapper">
            {/*<Title/>*/}
            <div className="game-container">
                <GamePlayer/>
                {/*<MessageTable/>*/}
            </div>
        </main>
    )
}

export default Home;