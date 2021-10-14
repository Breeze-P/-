import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Form, Select} from 'antd';

const { Option } = Select;

const UpdateForm = (props) => {
    const [form] = Form.useForm();
    const { onSubmit, giftList } = props;
    const [ gift, setGift ] = useState(0);

    const onFinish = (values) => {
        console.log('Success:', values);
        onSubmit(values);
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value) => {
        fetchGift(value);
    }

    const fetchGift = (name) => {
        fetch(`https://qc72tz.fn.thelarkcloud.com/getGift?giftName=${name}`).then(
            res => {
                return res.json();
            }
        ).then(
            data => data.items[0]
        ).then(
            data => {
                console.log(data);
                const giftTemp = {
                    giftName: data.name,
                    iconLink: data.icon,
                    weight: data.weight
                }
                setGift(
                    giftTemp
                );
            }
        ).then(()=>{console.log(gift)}).catch((e) => {
            console.log(e);
        });
    }

    const giftListItems = (giftList)? giftList.map((item) =>
        <Option value={item.name} key={item.name}>{item.name}</Option>
    ): null;

    return (
        <div className="form-container">
            <Form
                className="form-form"
                name="basic"
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    className="form-item"
                    label="Table Size"
                    name="size"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the gift name',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a gift"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={handleChange}
                    >
                        {giftListItems}
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Delete
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateForm;