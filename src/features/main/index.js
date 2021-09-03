import React from 'react';
// import GamePlayer from "../gamePlayer";
import GonggeDraw from "../gamePlayer/replaceOne";

function Home() {
    return (
        <main className="lottery_wrapper">
            {/*<Title/>*/}
            <div className="game-container">
                <GonggeDraw/>
                {/*<MessageTable/>*/}
            </div>
        </main>
    )
}

export default Home;