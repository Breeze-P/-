import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';

const UpdateForm = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            className="form-form"
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                className="form-item"
                label="GiftName"
                name="GiftName"
                rules={[
                    {
                        required: true,
                        message: 'Please input the gift name',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                className="form-item"
                label=""
                name="GiftName"
                rules={[
                    {
                        required: true,
                        message: 'Please input the gift name',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateForm;