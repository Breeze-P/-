import React from 'react';
import 'antd/dist/antd.css';
import { Form, Select, Button } from 'antd';

const { Option } = Select;

const DeleteForm = (props) => {
    const [form] = Form.useForm();
    const { onSubmit, giftList } = props;

    const onFinish = (values) => {
        console.log('Success:', values);
        onSubmit(values);
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                    label="Gift Name"
                    name="giftName"
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

export default DeleteForm;