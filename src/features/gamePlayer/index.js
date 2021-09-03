import React, { useState, useEffect } from 'react';
import getGift from "../../data_api";

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const GamePlayer = () => {
    const [ giftList ] = useState(getGift(0));
    const [ oreNum, setOreNum ] = useState(1000);
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ isDrawing, setIsDrawing ] = useState(false);
    const [ showDialog, setShowDialog ] = useState(false);
    const [ gotGift, setGotGift ] = useState(null);
    const [ message, setMassage ] = useState(null);

    let timer = null;

    useEffect(() => {
        return () => {
            timer && clearTimeout(timer);
            console.log("顺序");
        }
    }, [giftList, timer]);
    console.log(oreNum + 1);

    const myCount = oreNum / 200;   // 一次消耗200矿石

    const stepCount = (giftList) ? giftList.length: 0;

    let endStopIndex = 0;    // 服务端获取

    const speed = [336, 168, 84, 42, 42, 42];

    const messageInfo = {
        success: {
            message: `恭喜您中奖了!`
        },
        warning: {
            message: `抽奖进行中，请稍后再试!`
        },
        error: {
            message: `矿石数不足,抓紧去完成任务获得抽奖资格吧~`
        }
    }

    const alertMessage = (messageType) => {
        let { message } = messageInfo[messageType]
        setMassage(message)
    }

    const mockApi = () => {
        // 假装发了一个ajax请求：success,catch,error
        setTimeout(() => {
            let result = {
                ret_code: '0', //success
                endStopIndex: getRandomNum(0, 8)
            }
            // 是否正抽可能还需要接口来限制：如是否绑定手机号、、
            if (result.ret_code === '0') {
                endStopIndex = result.endStopIndex
                // 开启转盘,開啟限制再次點擊抽獎
                setIsDrawing(true);
                setOreNum(oreNum - 200);
                console.log(oreNum + 2);
                startRun();
                console.log(`最終要停在:${endStopIndex}`)
            } else if (result.ret_code === 'error') {
                setMassage('error');
            }
        }, 300)
    }

    const startDraw = () => {
        // 抽奖进行中禁止点击，抽奖次数<=0禁止点击
        if (isDrawing) return alertMessage('warning')
        if (myCount <= 0) return alertMessage('error')
        // api
        mockApi()
    }

    const addOneStep = params => {
        let activeIndexTemp = activeIndex
        let { isContinue, leftRound } = params
        activeIndexTemp += 1
        if (isContinue) {
            // 如果到超过奖品个数，重置为0
            if (activeIndexTemp >= stepCount) {
                console.log(`转了${leftRound}圈`)
                leftRound -= 1
                activeIndexTemp = 0
            }
            // 如果已经到最后一圈了  且  已经到了指定要中奖的位置了  就不需要继续了
            if (leftRound === 0 && activeIndexTemp === endStopIndex) {
                console.log(`現在停在:${endStopIndex}`)
                isContinue = false
            }
            setActiveIndex(activeIndexTemp);
            setOreNum(oreNum - 200);
            console.log(activeIndex);
            console.log(oreNum);
            const nextParams = {
                isContinue,
                leftRound
            }
            timer = setTimeout(() => {
                addOneStep(nextParams)
            }, speed[leftRound])
        } else {
            clearTimeout(timer)
            timer = null
            let gotGift = giftList[endStopIndex - 1]
            setIsDrawing(false);
            setShowDialog(true);
            setGotGift(gotGift);
            alertMessage('success')
        }
    }
    const startRun = () => {
        // 总共需要转的圈数
        let leftRound = speed.length - 1
        addOneStep({ isContinue: true, leftRound })
    }

    const removeAlert = () => {
        setMassage(null);
    }

    const hideGotDialog = () => {
        setShowDialog(false);
    }

    return (
        <div className="draw-box">
            {/* tipsBox */}
            {message ? (
                <div className="message-wrap">
                    <div className="message-content">
                        {message}
                    </div>
                    <button className="alert-close" onClick={removeAlert}/>
                </div>
            ) : null}

            {/* main */}
            <div className="lottery-wrap">
                <div className="lottery-header">
                    当前矿石数：
                    {oreNum}
                </div>
                <div className="lottery">
                    {showDialog ? (
                        <div className="got-gift-show">
                            <button className="got-close" onClick={hideGotDialog} />
                            <img className="got-icon" src={gotGift.icon} alt="got icon"/>
                            <div className="got-name">{gotGift.name}</div>
                        </div>
                    ) : null}

                    <div className="item-container">
                        {giftList.map((item, index) => (
                            <div className={`item${(index === activeIndex) ? " active-item": ""}`} key={index}>
                                <img className="item-icon" src={item.icon} alt="item icon"/>
                                <div className="item-name">
                                    {item.name}
                                </div>
                            </div>
                        ))}
                        <div className="item-lottery" onClick={startDraw}>
                            {(isDrawing) ? '抽奖中...': "开始"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamePlayer;