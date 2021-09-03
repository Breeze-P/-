import React, { PureComponent } from 'react'
import getGift from "../../data_api";
import './style.css'

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class GonggeDraw extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            giftList: getGift(),

            oreNum: 1000,

            activeIndex: 0,

            isDrawing: false,

            showDialog: false,

            gotGift: null,

            message: null,
        }
        this.myCount = this.state.oreNum / 200;

        this.stepCount = getGift().length

        this.endStopIndex = 0

        this.speed = [336, 168, 84, 42, 42, 42]

        this.timer = null

        //alert message list
        this.messageInfo = {
            success: {
                message: `恭喜您中奖了!`,
            },
            warning: {
                message: `抽奖进行中，请稍后再试!`,
            },
            error: {
                message: `抽奖次数不足,抓紧去完成任务获得抽奖资格吧~`,
            }
        }
    }

    componentDidMount() {
        console.log(`mounted`)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    startDraw = () => {
        let { isDrawing, myCount } = this.state
        if (isDrawing) return this.alertMessage('warning')
        if (myCount <= 0) return this.alertMessage('error')
        // api
        this.mockApi()
    }

    mockApi = () => {
        setTimeout(() => {
            let result = {
                ret_code: '0', //success
                endStopIndex: getRandomNum(0, 8)
            }

            if (result.ret_code === '0') {
                let oreNum = this.state.oreNum - 1
                this.endStopIndex = result.endStopIndex

                this.setState({ isDrawing: true, oreNum }, this.startRun)
                console.log(`stop at: ${this.endStopIndex}`)
            } else if (result.ret_code === 'error') {
                this.setState({
                    messageType: 'error',
                })
            }
        }, 300)
    }

    startRun() {
        // all the circle
        let leftRound = this.speed.length - 1
        this.addOneStep({ isContinue: true, leftRound })
    }

    /*
      * What's up?
      */
    addOneStep = params => {
        let { activeIndex } = this.state
        let { isContinue, leftRound } = params
        activeIndex += 1
        if (isContinue) {
            if (activeIndex > this.stepCount) {
                console.log(`run ${leftRound} circles.`)
                leftRound -= 1
                activeIndex = 0
            }
            // stop if in the target
            if (leftRound === 0 && activeIndex === this.endStopIndex) {
                console.log(`now stop: ${this.endStopIndex}`)
                isContinue = false
            }
            this.setState({ activeIndex })
            const nextParams = {
                isContinue,
                leftRound
            }
            this.timer = setTimeout(() => {
                this.addOneStep(nextParams)
            }, this.speed[leftRound])
        } else {
            clearTimeout(this.timer)
            this.timer = null
            let gotGift = this.state.giftList[this.endStopIndex]
            this.setState({
                isDrawing: false,
                showDialog: true,
                gotGift
            })
            this.alertMessage('success')
        }
    }

    alertMessage(messageType) {
        let { message } = this.messageInfo[messageType]
        this.setState({ message })
    }

    removeAlert = () => {
        this.setState({ message: null })
    }

    hideGotDialog = () => {
        this.setState({ showDialog: false })
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
        } = this.state
        return (
            <div className="draw-box">
                <img className="background" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/background.f2441ca.png" alt="background"/>
                {/* tipsBox */}
                {message ? (
                    <div className="message-wrap">
                        <div className="message-content">
                            {message}
                        </div>
                        <button className="alert-close" onClick={this.removeAlert}/>
                    </div>
                ) : null}

                {/* main */}
                <div className="lottery-wrap">
                    <div className="lottery-header">
                        当前矿石数：
                        {this.state.oreNum}
                    </div>
                    {showDialog ? (
                        <div className="got-gift-show">
                            <button className="got-close" onClick={this.hideGotDialog} />
                            <img className="got-icon" src={gotGift.icon} alt="got icon"/>
                            <div className="got-name">{gotGift.name}</div>
                        </div>
                    ) : null}
                    <div className="turntable-box">
                        {/*<div className="upper-border up-down">*/}
                        {/*    <div className="dot vertex"/>*/}
                        {/*    <div className="dot border left-border-dot"/>*/}
                        {/*    <div className="dot white"/>*/}
                        {/*    <div className="dot border right-border-dot"/>*/}
                        {/*    <div className="dot vertex"/>*/}
                        {/*</div>*/}
                        {/*<div className="lower-border up-down">*/}
                        {/*    <div className="dot vertex"/>*/}
                        {/*    <div className="dot border left-border-dot"/>*/}
                        {/*    <div className="dot white"/>*/}
                        {/*    <div className="dot border right-border-dot"/>*/}
                        {/*    <div className="dot vertex"/>*/}
                        {/*</div>*/}
                        {/*<div className="left-border left-right">*/}
                        {/*    <div className="dot vertex"/>*/}
                        {/*    <div className="dot border left-border-dot"/>*/}
                        {/*    <div className="dot white"/>*/}
                        {/*    <div className="dot border right-border-dot"/>*/}
                        {/*    <div className="dot vertex"/>*/}
                        {/*</div>*/}
                        {/*<div className="right-border left-right">*/}
                        {/*    <div className="dot vertex"/>*/}
                        {/*    <div className="dot border left-border-dot"/>*/}
                        {/*    <div className="dot white"/>*/}
                        {/*    <div className="dot border right-border-dot"/>*/}
                        {/*    <div className="dot vertex"/>*/}
                        {/*</div>*/}
                        <div className="item-container">
                            {giftList.map((item, index) => (
                                <div className={`item${(index === activeIndex && isDrawing) ? " active-item": ""}`} key={index}>
                                    <img className="item-icon" src={item.icon} alt="item icon"/>
                                    <div className="item-name">
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                            <div className="item-lottery" onClick={this.startDraw}>
                                {(isDrawing) ? '抽奖中...': "开始"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GonggeDraw