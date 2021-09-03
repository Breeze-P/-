import React, { PureComponent } from 'react';
import getGift from "../../data_api";
import './style.css';

function getResNum(giftList) {
    let totalWeight = 0;
    giftList.map((item) => {
        totalWeight += item.weight;
        return null;
    })
    let reed = Math.floor(Math.random() * totalWeight);
    let res = 0;
    while (reed >= 0) {
        reed -= giftList[res].weight;
        res++;
    }
    return res - 1;
}

class GamePlayer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            giftList: getGift(),

            oreNum: 1000,

            activeIndex: 0,

            isDrawing: false,

            showDialog: false,

            gotGift: null,

            message: null,
        };

        this.stepCount = getGift().length;

        this.endStopIndex = 0;

        this.speed = [336, 168, 84, 42, 42, 42];

        this.timer = null;

        //alert message list
        this.messageInfo = {
            success: {
                message: `恭喜您中奖了!`,
            },
            warning: {
                message: `抽奖进行中，请稍后再试!`,
            },
            error: {
                message: `矿石不够，快去赚取吧~`,
            }
        };
    }

    componentDidMount() {
        console.log(`mounted`);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    startDraw = () => {
        let { isDrawing, oreNum } = this.state;
        if (isDrawing) return this.alertMessage('warning');
        if (oreNum < 200) return this.alertMessage('error');
        // api
        this.mockApi();
    }

    mockApi = () => {
        setTimeout(() => {
            let result = {
                ret_code: '0', //success
                endStopIndex: getResNum(this.state.giftList)
            };

            if (result.ret_code === '0') {
                let oreNum = this.state.oreNum - 200;
                this.endStopIndex = result.endStopIndex;

                this.setState({ isDrawing: true, oreNum }, this.startRun);
                console.log(`stop at: ${this.endStopIndex}`);
            } else if (result.ret_code === 'error') {
                this.setState({
                    messageType: 'error',
                });
            }
        }, 300);
    }

    startRun() {
        // all the circle
        let leftRound = this.speed.length - 1;
        this.addOneStep({ isContinue: true, leftRound });
    }

    /*
      * What's up?
      */
    addOneStep = params => {
        let { activeIndex } = this.state;
        let { isContinue, leftRound } = params;
        activeIndex += 1;
        if (isContinue) {
            if (activeIndex > this.stepCount) {
                console.log(`run ${leftRound} circles.`);
                leftRound -= 1;
                activeIndex = 0;
            }
            // stop if in the target
            if (leftRound === 0 && activeIndex === this.endStopIndex) {
                console.log(`now stop: ${this.endStopIndex}`);
                isContinue = false;
            }
            this.setState({ activeIndex });
            const nextParams = {
                isContinue,
                leftRound
            };
            this.timer = setTimeout(() => {
                this.addOneStep(nextParams);
            }, this.speed[leftRound]);
        } else {
            clearTimeout(this.timer);
            this.timer = null;
            let gotGift = this.state.giftList[this.endStopIndex];

            this.setState({
                isDrawing: false,
                showDialog: true,
                gotGift
            });
        }
    }

    alertMessage(messageType) {
        let { message } = this.messageInfo[messageType];
        this.setState({ message });
    }

    removeAlert = () => {
        this.setState({ message: null });
    }

    hideGotDialog = () => {
        this.setState({ showDialog: false });
    }

    render() {
        // readonly
        const {
            giftList,
            activeIndex,
            isDrawing,
            showDialog,
            gotGift,
            message,
        } = this.state;
        return (
            <div className="draw-box">
                <img className="background" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/background.f2441ca.png" alt="background"/>
                {/* tipsBox */}
                {message ? (
                    <div className="message-wrap">
                        <div className="message-content">
                            {message}
                        </div>
                        <button className="alert-close" onClick={this.removeAlert}>
                            ×
                        </button>
                    </div>
                ) : null}

                {/* main */}
                <div className="lottery-wrap">
                    <div className="lottery-header">
                        当前矿石数：
                        {this.state.oreNum}
                    </div>
                    <div className="turntable-box">
                        {showDialog ? (
                            <div className="got-gift-show">
                                <div className="show-show">
                                    <button className="got-close" onClick={this.hideGotDialog} />
                                    <img className="got-icon" src={gotGift.icon} alt="got icon"/>
                                    <div className="got-name">{gotGift.name}</div>
                                </div>
                            </div>
                        ) : null}
                        <div className={`item-container grid9`}>
                            {giftList.map((item, index) => (
                                <div className={`item${(index === activeIndex && isDrawing) ? " active-item": ""} num${index}`} key={index}>
                                    <img className="item-icon" src={item.icon} alt="item icon"/>
                                    <div className="item-name">
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                            <div className="item-lottery" onClick={this.startDraw}>
                                <div className="start-button">
                                    {(isDrawing) ? '抽奖中...': "开始"}
                                </div>
                                <div className="text">
                                    200矿石/次
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GamePlayer;