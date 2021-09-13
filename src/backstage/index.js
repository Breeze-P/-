import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Layout, Alert, Tabs } from 'antd';
import AddForm from "./commponents/AddForm";
import DeleteForm from "./commponents/DeleteForm";
import UpdateForm from "./commponents/UpdateForm";

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

class Backstage extends React.Component {
    state = {
        giftList: [],
        alertValue: "hide"
    }

    postData = (values, url) => {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', url, true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify(values));
        return httpRequest;
    }

    onAddGift = (values) => {
        const httpRequest = this.postData(values, 'https://qc72tz.fn.thelarkcloud.com/insertToGiftsTable');
        const thisPer = this;

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                const json = httpRequest.responseText;
                thisPer.setState({
                    alertValue: "success"
                });
                thisPer.fetchGiftList();
            } else {
                thisPer.setState({
                    alertValue: "wrong"
                });
            }

            setTimeout(() => {
                thisPer.setState({
                    alertValue: "hide"
                });
                console.log("alert unload");
            }, 2000);
        };
    }

    onDeleteGift = (values) => {
        const httpRequest = this.postData(values, 'https://qc72tz.fn.thelarkcloud.com/deleteGift');
        const thisPer = this;

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                thisPer.setState({
                    alertValue: "success"
                });
                thisPer.fetchGiftList();
            } else {
                thisPer.setState({
                    alertValue: "wrong"
                });
            }

            setTimeout(() => {
                thisPer.setState({
                    alertValue: "hide"
                });
                console.log("alert unload");
            }, 2000);
        };
    }

    onUpdateGift = () => {

    }

    fetchGiftList = () => {
        fetch("https://qc72tz.fn.thelarkcloud.com/getGiftList").then(
            res => {
                return res.json()
            }
        ).then(
            data => {
                console.log(data);
                this.setState({
                    giftList: data.giftList,
                });
            }
        ).catch((e) => {
            console.log(e);
        });
    }

    componentDidMount() {
        this.fetchGiftList();
    }

    render() {
        const { giftList } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <h1 className="backstage-title">
                            掘金九宫格抽奖控制台
                        </h1>
                    </Header>
                    <Content className="site-layout-background content-container">
                        <Tabs className="tab-container" defaultActiveKey="1">
                            <TabPane classname="tab-item" value="add" tab="增加" key="1">
                                <div className="form-wrap">
                                    <div className="alert-container">
                                        { (this.state.alertValue === "success") && <Alert className="alert-item" message="上传成功" type="success" />}
                                        { (this.state.alertValue === "wrong") && <Alert className="alert-item" message="礼品名称重复" type="error" />}
                                    </div>
                                    <AddForm onSubmit={this.onAddGift} />
                                </div>
                            </TabPane>
                            <TabPane classname="tab-item" value="delete" tab="删除" key="2">
                                <div className="form-container">
                                    <div className="alert-container">
                                        { (this.state.alertValue === "success") && <Alert className="alert-item" message="删除成功" type="success" />}
                                        { (this.state.alertValue === "wrong") && <Alert className="alert-item" message="删除失败" type="error" />}
                                        { (this.state.alertValue === "null") && <Alert className="alert-item" message="未发现该礼品" type="error" />}
                                    </div>
                                    <DeleteForm onSubmit={this.onDeleteGift} giftList={giftList} />
                                </div>
                            </TabPane>
                            <TabPane classname="tab-item" value="update" tab="修改" key="3">
                                <div className="form-container">
                                    <UpdateForm onSubmit={this.onUpdateGift} />
                                </div>
                            </TabPane>
                        </Tabs>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Author: Breeze-P Github:
                        <a href="https://github.com/Breeze-P" style={{ whiteSpace: "pre" }}>  https://github.com/Breeze-P</a>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Backstage;